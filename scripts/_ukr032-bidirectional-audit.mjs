/**
 * UKR-032 — bidirectional live clipboard parity audit
 * Competitor (krutidevunicodeconverter.com) vs UnicodeKruti production.
 *
 * Rules:
 * - Never silently treat textarea field as clipboard evidence.
 * - Exact string equality (no NFC/trim) for match decisions.
 * - Rate-conscious batches; stop on abnormal competitor failures.
 * - Audit only — does not modify the conversion engine.
 *
 * Usage:
 *   node scripts/_ukr032-bidirectional-audit.mjs [--limit=30] [--offset=0]
 *     [--direction=kd-to-uni|uni-to-kd|both] [--stratified] [--ids=AUD001,AUD002]
 *     [--delay-ms=400] [--reproduce-mismatches] [--negative-controls]
 */
import { chromium } from 'playwright';
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from 'node:fs';
import { join } from 'node:path';

const OUT = join('scripts', '_qa-artifacts', 'ukr032');
mkdirSync(OUT, { recursive: true });

const CORPUS_PATH = join(
  'tests',
  'competitor-reference',
  'ukr032-audit-inputs.json',
);

const COMPETITOR = {
  'kd-to-uni': {
    url: 'https://www.krutidevunicodeconverter.com/',
    inputSel: '#krutitext',
    outputSel: '#unicodetext',
    convertText: /Convert To Unicode/i,
    copyText: /Copy To Clipboard/i,
  },
  'uni-to-kd': {
    url: 'https://www.krutidevunicodeconverter.com/unicode-to-krutidev-converter.php',
    inputSel: '#unicodetext',
    outputSel: '#krutitext',
    convertText: /Convert To Krutidev/i,
    copyText: /Copy To Clipboard/i,
  },
};

const OURS = {
  'kd-to-uni': {
    url: 'https://unicodekruti.com/krutidev-to-unicode-converter',
    inputSel: '#krutidev-input',
    outputSel: '#krutidev-output',
    expectedMode: 'kd-to-uni',
  },
  'uni-to-kd': {
    url: 'https://unicodekruti.com/',
    inputSel: '#krutidev-input',
    outputSel: '#krutidev-output',
    expectedMode: 'uni-to-kd',
  },
};

/** Previously shipped competitor-aligned goldens — must stay matched. */
const NEGATIVE_CONTROLS = [
  {
    id: 'NEG-RZ;',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'RZ;',
    notes: 'UKR-028',
  },
  {
    id: 'NEG-R;Z',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'R;Z',
    notes: 'UKR-022/028',
  },
  {
    id: 'NEG-R;kZ',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'R;kZ',
    notes: 'UKR-022/028',
  },
  {
    id: 'NEG-foHkkx-Z',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'foHkkx Z',
    notes: 'UKR-028',
  },
  {
    id: 'NEG-d-pct-spaced',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'd %',
    notes: 'UKR-028',
  },
  {
    id: 'NEG-d-pct',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'd%',
    notes: 'UKR-028',
  },
  {
    id: 'NEG-fd-k',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'fd k',
    notes: 'UKR-024',
  },
  {
    id: 'NEG-Z;',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'Z;',
    notes: 'UKR-030',
  },
  {
    id: 'NEG-1pct',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: '1%',
    notes: 'UKR-030',
  },
  {
    id: 'NEG-1-pct-spaced',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: '1 %',
    notes: 'UKR-030',
  },
  {
    id: 'NEG-bare-Z',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'Z',
    notes: 'UKR-030',
  },
  {
    id: 'NEG-pkS',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: 'pkS',
    notes: 'UKR-023',
  },
  {
    id: 'NEG-emdash',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: '\u2014',
    notes: 'UKR-020',
  },
  {
    id: 'NEG-endash',
    direction: 'kd-to-uni',
    category: 'negative-control',
    input: '\u2013',
    notes: 'UKR-021',
  },
  {
    id: 'NEG-trya-uni',
    direction: 'uni-to-kd',
    category: 'negative-control',
    input: 'त्र्य',
    notes: 'UKR-022',
  },
  {
    id: 'NEG-chai-uni',
    direction: 'uni-to-kd',
    category: 'negative-control',
    input: 'चै',
    notes: 'UKR-023',
  },
  {
    id: 'NEG-kr-uni',
    direction: 'uni-to-kd',
    category: 'negative-control',
    input: 'कृ',
    notes: 'UKR-020',
  },
  {
    id: 'NEG-dr-uni',
    direction: 'uni-to-kd',
    category: 'negative-control',
    input: 'दृ',
    notes: 'UKR-021',
  },
];

function parseArgs(argv) {
  const opts = {
    limit: 30,
    offset: 0,
    direction: 'both',
    stratified: true,
    ids: null,
    delayMs: 400,
    reproduceMismatches: true,
    negativeControls: true,
    batchLabel: null,
  };
  for (const a of argv) {
    if (a.startsWith('--limit=')) opts.limit = Number(a.slice(8));
    else if (a.startsWith('--offset=')) opts.offset = Number(a.slice(9));
    else if (a.startsWith('--direction=')) opts.direction = a.slice(12);
    else if (a === '--no-stratified') opts.stratified = false;
    else if (a === '--stratified') opts.stratified = true;
    else if (a.startsWith('--ids='))
      opts.ids = a
        .slice(6)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a.startsWith('--delay-ms=')) opts.delayMs = Number(a.slice(11));
    else if (a === '--no-reproduce') opts.reproduceMismatches = false;
    else if (a === '--no-negative-controls') opts.negativeControls = false;
    else if (a.startsWith('--batch-label=')) opts.batchLabel = a.slice(14);
  }
  return opts;
}

function cps(s) {
  if (s == null) return null;
  return [...s].map(
    (c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'),
  );
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function stratifiedPick(cases, limit, offset) {
  const byCat = new Map();
  for (const c of cases) {
    if (!byCat.has(c.category)) byCat.set(c.category, []);
    byCat.get(c.category).push(c);
  }
  const cats = [...byCat.keys()];
  const pools = cats.map((cat) => [...byCat.get(cat)]);
  // Skip offset within each category proportionally by walking round-robin
  const ordered = [];
  let idx = 0;
  while (pools.some((p) => p.length)) {
    const p = pools[idx % pools.length];
    if (p.length) ordered.push(p.shift());
    idx++;
  }
  return ordered.slice(offset, offset + limit);
}

function selectCases(corpus, opts) {
  let cases = corpus.cases;
  if (opts.direction !== 'both') {
    cases = cases.filter((c) => c.direction === opts.direction);
  }
  if (opts.ids?.length) {
    const set = new Set(opts.ids);
    return cases.filter((c) => set.has(c.id));
  }
  if (opts.direction === 'both') {
    const kd = cases.filter((c) => c.direction === 'kd-to-uni');
    const uni = cases.filter((c) => c.direction === 'uni-to-kd');
    const pickKd = opts.stratified
      ? stratifiedPick(kd, opts.limit, opts.offset)
      : kd.slice(opts.offset, opts.offset + opts.limit);
    const pickUni = opts.stratified
      ? stratifiedPick(uni, opts.limit, opts.offset)
      : uni.slice(opts.offset, opts.offset + opts.limit);
    return [...pickKd, ...pickUni];
  }
  return opts.stratified
    ? stratifiedPick(cases, opts.limit, opts.offset)
    : cases.slice(opts.offset, opts.offset + opts.limit);
}

async function readClipboard(page) {
  return page.evaluate(async () => {
    try {
      return { ok: true, text: await navigator.clipboard.readText() };
    } catch (e) {
      return { ok: false, error: String(e?.message || e) };
    }
  });
}

async function captureCompetitor(page, direction, input, delayMs) {
  const cfg = COMPETITOR[direction];
  const capturedAt = new Date().toISOString();
  const pageUrl = page.url();

  await page.evaluate(
    ({ sel, t }) => {
      const el = document.querySelector(sel);
      const setter = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        'value',
      ).set;
      setter.call(el, t);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('keyup', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    },
    { sel: cfg.inputSel, t: input },
  );
  await sleep(delayMs);

  const convert = page.locator('a.btn', { hasText: cfg.convertText }).first();
  if (await convert.count()) {
    await convert.click();
    await sleep(Math.max(200, delayMs / 2));
  }

  const field = await page.inputValue(cfg.outputSel).catch(() => null);

  let clipboard = null;
  let clipboardError = null;
  let source = null;

  const copy = page.locator('a.btn', { hasText: cfg.copyText }).first();
  if (await copy.count()) {
    // Clear clipboard marker so stale values are not mistaken for success
    await page.evaluate(async () => {
      try {
        await navigator.clipboard.writeText('__UKR032_CLIP_MARKER__');
      } catch {
        /* ignore */
      }
    });
    await copy.click();
    await sleep(250);
    const clip = await readClipboard(page);
    if (!clip.ok) {
      clipboardError = clip.error;
      source = 'clipboard-unavailable';
    } else if (clip.text === '__UKR032_CLIP_MARKER__') {
      clipboardError = 'Copy button did not update clipboard';
      source = 'clipboard-stale';
    } else {
      clipboard = clip.text;
      source = 'live-competitor-clipboard';
    }
  } else {
    clipboardError = 'Copy button not found';
    source = 'clipboard-unavailable';
  }

  return {
    source,
    field,
    clipboard,
    clipboardError,
    fieldMatchesClipboard:
      clipboard != null && field != null ? field === clipboard : null,
    pageUrl,
    capturedAt,
    codePoints: cps(clipboard),
    fieldCodePoints: cps(field),
    outputJson: clipboard != null ? JSON.stringify(clipboard) : null,
  };
}

async function ensureOursMode(page, expectedMode) {
  const mode = await page.evaluate(
    () => document.getElementById('kdc-converter-app')?.dataset?.defaultMode,
  );
  // dataset.defaultMode is the page default; live mode may differ after swap.
  // Prefer checking labels / aria.
  const liveMode = await page.evaluate(() => {
    const app = document.getElementById('kdc-converter-app');
    if (app?.dataset?.mode) return app.dataset.mode;
    const input = document.getElementById('krutidev-input');
    const ph = (input?.placeholder || '').toLowerCase();
    if (ph.includes('krutidev') && !ph.includes('unicode text')) return 'kd-to-uni';
    if (ph.includes('unicode')) return 'uni-to-kd';
    return null;
  });
  if (liveMode && liveMode !== expectedMode) {
    const swap = page.locator('[aria-label="Swap conversion direction"]');
    if (await swap.count()) {
      await swap.click();
      await sleep(300);
    }
  } else if (!liveMode && mode && mode !== expectedMode) {
    const swap = page.locator('[aria-label="Swap conversion direction"]');
    if (await swap.count()) {
      await swap.click();
      await sleep(300);
    }
  }
}

async function captureOurs(page, direction, input, delayMs) {
  const cfg = OURS[direction];
  const capturedAt = new Date().toISOString();
  await ensureOursMode(page, cfg.expectedMode);

  await page.evaluate(
    ({ sel, t }) => {
      const el = document.querySelector(sel);
      const setter = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        'value',
      ).set;
      setter.call(el, t);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    },
    { sel: cfg.inputSel, t: input },
  );
  await sleep(Math.max(350, delayMs));

  const field = await page.inputValue(cfg.outputSel).catch(() => null);

  let clipboard = null;
  let clipboardError = null;
  let source = null;

  await page.evaluate(async () => {
    try {
      await navigator.clipboard.writeText('__UKR032_CLIP_MARKER__');
    } catch {
      /* ignore */
    }
  });

  const copy = page
    .getByRole('button', { name: /Copy result|Copy converted text|Copied!/i })
    .first();
  if (await copy.count()) {
    await copy.click();
    await sleep(250);
    const clip = await readClipboard(page);
    if (!clip.ok) {
      clipboardError = clip.error;
      source = 'clipboard-unavailable';
    } else if (clip.text === '__UKR032_CLIP_MARKER__') {
      clipboardError = 'Copy button did not update clipboard';
      source = 'clipboard-stale';
    } else {
      clipboard = clip.text;
      source = 'live-unicodekruti-clipboard';
    }
  } else {
    clipboardError = 'Copy button not found';
    source = 'clipboard-unavailable';
  }

  return {
    source,
    field,
    clipboard,
    clipboardError,
    fieldMatchesClipboard:
      clipboard != null && field != null ? field === clipboard : null,
    pageUrl: page.url(),
    capturedAt,
    codePoints: cps(clipboard),
    fieldCodePoints: cps(field),
    outputJson: clipboard != null ? JSON.stringify(clipboard) : null,
  };
}

function classifyMismatch(observation) {
  const { case: c, competitor, ours, match } = observation;
  if (match === true) return null;
  if (match == null) return 'unverified';

  const inp = c.input;
  const cat = c.category || '';

  // Heuristics for severity — refined manually in report
  const comp = competitor?.clipboard ?? '';
  const oursText = ours?.clipboard ?? '';
  // Precomposed nukta letters (U+0958–U+095F) vs base+nukta — common, usually display-equivalent
  const nuktaPre = /[\u0958-\u095F]/;
  const nuktaComb = /\u093C/;
  if (
    (nuktaPre.test(comp) && nuktaComb.test(oursText)) ||
    (nuktaPre.test(oursText) && nuktaComb.test(comp))
  ) {
    return 'P2-nukta-composition';
  }
  if (
    /whitespace|mixed|unsupported|zwj/i.test(cat) ||
    /[\u200B\u200C\u200D\uFEFF]/.test(inp)
  ) {
    return 'P3';
  }
  if (
    inp.length <= 2 ||
    /^[%+\-~`|=;Z]$/.test(inp) ||
    /malformed|alias|edge/i.test(c.notes || '')
  ) {
    return 'P3';
  }
  if (inp.includes(' ') || /visarga|digit|punct/i.test(cat)) {
    return 'P2';
  }
  if (inp.length >= 4 && /[\u0900-\u097F]/.test(comp)) {
    return 'P1';
  }
  if (inp.length >= 4) return 'P2';
  return 'P2';
}

function diffSummary(a, b) {
  if (a == null || b == null) return { reason: 'missing-side' };
  if (a === b) return { equal: true };
  const ac = [...a];
  const bc = [...b];
  let first = -1;
  const n = Math.max(ac.length, bc.length);
  for (let i = 0; i < n; i++) {
    if (ac[i] !== bc[i]) {
      first = i;
      break;
    }
  }
  return {
    equal: false,
    oursLen: ac.length,
    competitorLen: bc.length,
    firstDiffIndex: first,
    oursAt: first >= 0 ? ac[first] : null,
    competitorAt: first >= 0 ? bc[first] : null,
    oursAtCp: first >= 0 && ac[first] != null ? cps(ac[first])[0] : null,
    competitorAtCp:
      first >= 0 && bc[first] != null ? cps(bc[first])[0] : null,
  };
}

async function openSite(browser, url, { retries = 4 } = {}) {
  const ctx = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await ctx.newPage();
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      await sleep(1000 + attempt * 250);
      return { ctx, page };
    } catch (e) {
      lastErr = e;
      console.log(`  goto retry ${attempt}/${retries} for ${url}: ${e.message}`);
      await sleep(1500 * attempt);
    }
  }
  await ctx.close().catch(() => {});
  throw lastErr;
}

function writePartial(observations, opts, batchLabel, extra = {}) {
  const partialPath = join(OUT, `${batchLabel}-partial.json`);
  writeFileSync(
    partialPath,
    JSON.stringify(
      {
        at: new Date().toISOString(),
        opts,
        count: observations.length,
        ...extra,
        observations,
      },
      null,
      2,
    ),
  );
  return partialPath;
}

async function runBatch(cases, opts, batchLabel) {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const observations = [];
  let consecutiveCompetitorFailures = 0;

  // Group by direction to reuse pages
  const byDir = {
    'kd-to-uni': cases.filter((c) => c.direction === 'kd-to-uni'),
    'uni-to-kd': cases.filter((c) => c.direction === 'uni-to-kd'),
  };

  for (const direction of ['kd-to-uni', 'uni-to-kd']) {
    const dirCases = byDir[direction];
    if (!dirCases.length) continue;

    let comp;
    let ours;
    try {
      comp = await openSite(browser, COMPETITOR[direction].url);
      ours = await openSite(browser, OURS[direction].url);
    } catch (e) {
      console.log(`Failed to open ${direction} sites:`, e.message);
      for (const c of dirCases) {
        observations.push({
          id: c.id,
          case: c,
          status: 'error',
          error: `site-open: ${e.message}`,
          competitor: null,
          ours: null,
          match: null,
        });
      }
      writePartial(observations, opts, batchLabel, {
        aborted: true,
        abortReason: 'site-open-failure',
        direction,
      });
      await browser.close();
      return {
        observations,
        aborted: true,
        abortReason: 'site-open-failure',
      };
    }

    for (const c of dirCases) {
      process.stdout.write(`\n[${c.id} ${direction}] ${JSON.stringify(c.input)} … `);
      let competitor;
      let oursCap;
      try {
        competitor = await captureCompetitor(
          comp.page,
          direction,
          c.input,
          opts.delayMs,
        );
        oursCap = await captureOurs(ours.page, direction, c.input, opts.delayMs);
      } catch (e) {
        consecutiveCompetitorFailures++;
        const obs = {
          id: c.id,
          case: c,
          status: 'error',
          error: String(e?.message || e),
          competitor: null,
          ours: null,
          match: null,
        };
        observations.push(obs);
        writePartial(observations, opts, batchLabel);
        console.log('ERROR', e?.message || e);
        if (consecutiveCompetitorFailures >= 3) {
          console.log('\nStopping: 3 consecutive capture failures.');
          await comp.ctx.close();
          await ours.ctx.close();
          await browser.close();
          return { observations, aborted: true, abortReason: 'consecutive-failures' };
        }
        continue;
      }

      const verified =
        competitor.source === 'live-competitor-clipboard' &&
        oursCap.source === 'live-unicodekruti-clipboard';
      const match = verified
        ? competitor.clipboard === oursCap.clipboard
        : null;

      if (competitor.source === 'live-competitor-clipboard') {
        consecutiveCompetitorFailures = 0;
      } else {
        consecutiveCompetitorFailures++;
      }

      const obs = {
        id: c.id,
        case: c,
        status: verified ? (match ? 'match' : 'mismatch') : 'skipped-unverified',
        competitor,
        ours: oursCap,
        match,
        verified,
        diff: verified ? diffSummary(oursCap.clipboard, competitor.clipboard) : null,
        severity: null,
      };
      obs.severity = classifyMismatch(obs);
      observations.push(obs);
      if (observations.length % 5 === 0) {
        writePartial(observations, opts, batchLabel);
      }
      console.log(
        obs.status,
        verified
          ? `comp=${JSON.stringify(competitor.clipboard)} ours=${JSON.stringify(oursCap.clipboard)}`
          : `compSrc=${competitor.source} oursSrc=${oursCap.source}`,
      );

      if (consecutiveCompetitorFailures >= 3) {
        console.log('\nStopping: 3 consecutive unverified competitor captures.');
        await comp.ctx.close();
        await ours.ctx.close();
        await browser.close();
        return {
          observations,
          aborted: true,
          abortReason: 'consecutive-unverified',
        };
      }

      await sleep(opts.delayMs);
    }

    await comp.ctx.close();
    await ours.ctx.close();
    writePartial(observations, opts, batchLabel, { directionDone: direction });
  }

  // Reproduce mismatches twice
  if (opts.reproduceMismatches) {
    const mismatches = observations.filter((o) => o.status === 'mismatch');
    if (mismatches.length) {
      console.log(`\nReproducing ${mismatches.length} mismatches ×2…`);
      for (const m of mismatches) {
        const direction = m.case.direction;
        const comp = await openSite(browser, COMPETITOR[direction].url);
        const ours = await openSite(browser, OURS[direction].url);
        const runs = [];
        for (let i = 0; i < 2; i++) {
          const competitor = await captureCompetitor(
            comp.page,
            direction,
            m.case.input,
            opts.delayMs,
          );
          const oursCap = await captureOurs(
            ours.page,
            direction,
            m.case.input,
            opts.delayMs,
          );
          const verified =
            competitor.source === 'live-competitor-clipboard' &&
            oursCap.source === 'live-unicodekruti-clipboard';
          runs.push({
            run: i + 1,
            verified,
            match: verified
              ? competitor.clipboard === oursCap.clipboard
              : null,
            competitorClipboard: competitor.clipboard,
            oursClipboard: oursCap.clipboard,
            competitorCps: cps(competitor.clipboard),
            oursCps: cps(oursCap.clipboard),
          });
          await sleep(opts.delayMs);
        }
        m.reproductions = runs;
        m.reproducedConfirmed =
          runs.every((r) => r.verified && r.match === false) &&
          runs.every(
            (r) =>
              r.competitorClipboard === m.competitor.clipboard &&
              r.oursClipboard === m.ours.clipboard,
          );
        await comp.ctx.close();
        await ours.ctx.close();
        console.log(
          `  ${m.id} reproducedConfirmed=${m.reproducedConfirmed}`,
        );
      }
    }
  }

  await browser.close();
  return { observations, aborted: false };
}

function summarize(observations, corpus) {
  const byDir = {};
  const byCat = {};
  const ensure = (map, key) => {
    if (!map[key]) {
      map[key] = {
        tested: 0,
        matched: 0,
        mismatched: 0,
        skipped: 0,
        errors: 0,
      };
    }
    return map[key];
  };

  for (const o of observations) {
    const d = ensure(byDir, o.case.direction);
    const c = ensure(byCat, `${o.case.direction}/${o.case.category}`);
    for (const bucket of [d, c]) {
      bucket.tested++;
      if (o.status === 'match') bucket.matched++;
      else if (o.status === 'mismatch') bucket.mismatched++;
      else if (o.status === 'error') bucket.errors++;
      else bucket.skipped++;
    }
  }

  const pct = (n, den) =>
    den ? `${((100 * n) / den).toFixed(1)}%` : 'n/a';

  const addRates = (bucket) => {
    const verified = bucket.matched + bucket.mismatched;
    return {
      ...bucket,
      verified,
      matchRateOfVerified: pct(bucket.matched, verified),
      matchRateOfTested: pct(bucket.matched, bucket.tested),
      mismatchRateOfVerified: pct(bucket.mismatched, verified),
      corpusDenominatorNote:
        'Rates use this batch denominator, not full 207 corpus unless batch covers all.',
    };
  };

  const mismatches = observations
    .filter((o) => o.status === 'mismatch')
    .map((o) => ({
      id: o.id,
      direction: o.case.direction,
      category: o.case.category,
      input: o.case.input,
      inputJson: JSON.stringify(o.case.input),
      competitor: o.competitor.clipboard,
      competitorJson: JSON.stringify(o.competitor.clipboard),
      competitorCps: o.competitor.codePoints,
      ours: o.ours.clipboard,
      oursJson: JSON.stringify(o.ours.clipboard),
      oursCps: o.ours.codePoints,
      severity: o.severity,
      diff: o.diff,
      reproducedConfirmed: o.reproducedConfirmed ?? null,
      notes: o.case.notes || null,
    }));

  const topDiscrepancies = [...mismatches]
    .sort((a, b) => {
      const rank = { P1: 0, P2: 1, P3: 2, unverified: 3 };
      return (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9);
    })
    .slice(0, 10);

  return {
    corpusSampleCount: corpus.sampleCount,
    batchSize: observations.length,
    totals: addRates(
      observations.reduce(
        (acc, o) => {
          acc.tested++;
          if (o.status === 'match') acc.matched++;
          else if (o.status === 'mismatch') acc.mismatched++;
          else if (o.status === 'error') acc.errors++;
          else acc.skipped++;
          return acc;
        },
        { tested: 0, matched: 0, mismatched: 0, skipped: 0, errors: 0 },
      ),
    ),
    byDirection: Object.fromEntries(
      Object.entries(byDir).map(([k, v]) => [k, addRates(v)]),
    ),
    byCategory: Object.fromEntries(
      Object.entries(byCat).map(([k, v]) => [k, addRates(v)]),
    ),
    mismatchCount: mismatches.length,
    mismatches,
    topDiscrepancies,
  };
}

function writeReportMarkdown(summary, meta) {
  const lines = [];
  lines.push('# UKR-032 Bidirectional Competitor Clipboard Audit');
  lines.push('');
  lines.push(`- **Captured at:** ${meta.capturedAt}`);
  lines.push(`- **Batch label:** ${meta.batchLabel}`);
  lines.push(`- **Baseline main:** ${meta.baselineMain}`);
  lines.push(`- **PR branch head (pre-push):** see git`);
  lines.push(`- **Engine changes:** none (audit only)`);
  lines.push(
    `- **Equality rule:** exact string compare; no NFC/trim before match decision`,
  );
  lines.push(
    `- **Clipboard rule:** textarea never substituted as clipboard evidence`,
  );
  lines.push('');
  lines.push('## Counts');
  lines.push('');
  lines.push(
    `| Scope | Tested | Matched | Mismatched | Skipped/unverified | Errors | Match% of verified |`,
  );
  lines.push(`|---|---:|---:|---:|---:|---:|---:|`);
  const row = (label, b) =>
    `| ${label} | ${b.tested} | ${b.matched} | ${b.mismatched} | ${b.skipped} | ${b.errors} | ${b.matchRateOfVerified} |`;
  lines.push(row('Batch total', summary.totals));
  for (const [k, v] of Object.entries(summary.byDirection)) {
    lines.push(row(k, v));
  }
  lines.push('');
  lines.push(
    `Corpus size for context: **${summary.corpusSampleCount}** input-only cases (not all necessarily tested in this batch).`,
  );
  lines.push('');
  lines.push('## By category');
  lines.push('');
  lines.push(
    `| Category | Tested | Matched | Mismatched | Skipped | Match% verified |`,
  );
  lines.push(`|---|---:|---:|---:|---:|---:|`);
  for (const [k, v] of Object.entries(summary.byCategory)) {
    lines.push(
      `| ${k} | ${v.tested} | ${v.matched} | ${v.mismatched} | ${v.skipped} | ${v.matchRateOfVerified} |`,
    );
  }
  lines.push('');
  lines.push('## Top discrepancies');
  lines.push('');
  if (!summary.topDiscrepancies.length) {
    lines.push('_No verified mismatches in this batch._');
  } else {
    for (const d of summary.topDiscrepancies) {
      lines.push(
        `### ${d.id} (${d.severity || '?'}) — ${d.direction} / ${d.category}`,
      );
      lines.push('');
      lines.push(`- Input: \`${d.inputJson}\``);
      lines.push(
        `- Competitor clipboard: \`${d.competitorJson}\` — \`${(d.competitorCps || []).join(' ')}\``,
      );
      lines.push(
        `- UnicodeKruti clipboard: \`${d.oursJson}\` — \`${(d.oursCps || []).join(' ')}\``,
      );
      lines.push(
        `- Reproduced ×2 confirmed: **${d.reproducedConfirmed}**`,
      );
      if (d.diff) {
        lines.push(
          `- First diff index ${d.diff.firstDiffIndex}: ours ${d.diff.oursAtCp} vs competitor ${d.diff.competitorAtCp}`,
        );
      }
      lines.push('');
    }
  }
  lines.push('## Recommended next fixes');
  lines.push('');
  lines.push(
    'Do **not** change the engine in this PR. For each confirmed P1/P2 mismatch, open a minimal follow-up PR with competitor clipboard golden + negative controls for shipped UKR-020..030 cases.',
  );
  lines.push('');
  return lines.join('\n');
}

const opts = parseArgs(process.argv.slice(2));
const corpus = JSON.parse(readFileSync(CORPUS_PATH, 'utf8'));
let selected = selectCases(corpus, opts);
if (opts.negativeControls) {
  const dirs =
    opts.direction === 'both'
      ? ['kd-to-uni', 'uni-to-kd']
      : [opts.direction];
  const negs = NEGATIVE_CONTROLS.filter((c) => dirs.includes(c.direction));
  // Avoid duplicate inputs already in batch
  const seen = new Set(selected.map((c) => c.direction + '\0' + c.input));
  for (const n of negs) {
    const key = n.direction + '\0' + n.input;
    if (!seen.has(key)) {
      selected.push(n);
      seen.add(key);
    }
  }
}

const batchLabel =
  opts.batchLabel ||
  `batch-limit${opts.limit}-off${opts.offset}-${opts.direction}`;

console.log(
  `UKR-032 audit: ${selected.length} cases (limit=${opts.limit}/dir, stratified=${opts.stratified}, direction=${opts.direction})`,
);

const { observations, aborted, abortReason } = await runBatch(
  selected,
  opts,
  batchLabel,
);
const summary = summarize(observations, corpus);
const capturedAt = new Date().toISOString();

const rawPath = join(OUT, `${batchLabel}-raw.json`);
const summaryPath = join(OUT, `${batchLabel}-summary.json`);
const reportPath = join(OUT, `${batchLabel}-report.md`);

const meta = {
  capturedAt,
  batchLabel,
  baselineMain: corpus.baselineMain,
  opts,
  aborted: !!aborted,
  abortReason: abortReason || null,
  competitorUrls: {
    'kd-to-uni': COMPETITOR['kd-to-uni'].url,
    'uni-to-kd': COMPETITOR['uni-to-kd'].url,
  },
  oursUrls: {
    'kd-to-uni': OURS['kd-to-uni'].url,
    'uni-to-kd': OURS['uni-to-kd'].url,
  },
  browser: 'msedge (Playwright Chromium channel)',
};

writeFileSync(
  rawPath,
  JSON.stringify({ meta, observations }, null, 2),
);
writeFileSync(summaryPath, JSON.stringify({ meta, summary }, null, 2));
writeFileSync(reportPath, writeReportMarkdown(summary, meta));

// Also write a stable "latest" pointer for the PR
writeFileSync(
  join(OUT, 'latest-summary.json'),
  JSON.stringify({ meta, summary }, null, 2),
);
writeFileSync(join(OUT, 'latest-report.md'), writeReportMarkdown(summary, meta));

console.log('\n=== SUMMARY ===');
console.log(JSON.stringify(summary.totals, null, 2));
console.log('byDirection', JSON.stringify(summary.byDirection, null, 2));
console.log(`Wrote ${rawPath}`);
console.log(`Wrote ${summaryPath}`);
console.log(`Wrote ${reportPath}`);
if (aborted) {
  console.log('ABORTED:', abortReason);
  process.exit(2);
}
