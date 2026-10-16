/**
 * UKR-028 — live KD→Unicode clipboard capture:
 * competitor (krutidevunicodeconverter.com) vs production (unicodekruti.com)
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join('scripts', '_qa-artifacts', 'ukr028');
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const CASES = [
  'RZ;',
  'R;Z',
  'R;kZ',
  'Z;',
  'RZ; ',
  'foHkkx Z',
  'foHkkxZ',
  'foHkkx  Z',
  'foHkkx Z ',
  'dk;Z',
  'd %',
  'd%',
  'd % ',
  'd%  ',
  '1%',
  '1 %',
  'd :',
  'fd k',
  'ln~ Hkko',
  // prior approved
  '\u2014',
  '\u2013',
  'pkS',
];

function cps(s) {
  return [...s].map(
    (c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'),
  );
}

async function setAndCopyOurs(page, text) {
  await page.evaluate((t) => {
    const input = document.getElementById('krutidev-input');
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      'value',
    ).set;
    setter.call(input, t);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, text);
  await page.waitForTimeout(450);
  const got = await page.evaluate(() => document.getElementById('krutidev-output').value);
  await page
    .getByRole('button', { name: /Copy converted text|Copied!/i })
    .first()
    .click();
  await page.waitForTimeout(250);
  const clip = await page.evaluate(async () => {
    try {
      return await navigator.clipboard.readText();
    } catch {
      return null;
    }
  });
  return { got, clip: clip ?? got };
}

async function captureOurs(base, label) {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const ctx = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForSelector('#krutidev-input', { timeout: 60000 });
  // Ensure KD→Uni
  const mode = await page.evaluate(
    () => document.getElementById('kdc-converter-app')?.dataset?.defaultMode,
  );
  if (mode === 'uni-to-kd') {
    const swap = page.locator('[aria-label="Swap conversion direction"]');
    if (await swap.count()) {
      await swap.click();
      await page.waitForTimeout(300);
    }
  }
  const results = {};
  for (const inp of CASES) {
    const r = await setAndCopyOurs(page, inp);
    results[inp] = {
      output: r.clip,
      codePoints: cps(r.clip),
      outputJson: JSON.stringify(r.clip),
      liveField: r.got,
      fieldMatchesClip: r.got === r.clip,
    };
  }
  await browser.close();
  return { label, base, results };
}

async function discoverCompetitor(page) {
  await page.goto('https://www.krutidevunicodeconverter.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000,
  });
  await page.waitForTimeout(1500);
  return page.evaluate(() => {
    const areas = [...document.querySelectorAll('textarea, input[type=text]')].map((el, i) => ({
      i,
      id: el.id,
      name: el.name,
      placeholder: el.placeholder,
      className: String(el.className).slice(0, 80),
      rows: el.rows,
    }));
    const buttons = [...document.querySelectorAll('button, input[type=button], a.btn, .btn')]
      .slice(0, 40)
      .map((el) => ({
        tag: el.tagName,
        text: (el.textContent || el.value || '').trim().slice(0, 60),
        id: el.id,
        className: String(el.className).slice(0, 60),
      }));
    return { areas, buttons, title: document.title, url: location.href };
  });
}

async function captureCompetitor() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const ctx = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await ctx.newPage();
  const disco = await discoverCompetitor(page);
  writeFileSync(join(OUT, 'competitor-dom.json'), JSON.stringify(disco, null, 2));

  // Heuristic: find KD input / Unicode output
  const sel = await page.evaluate(() => {
    const areas = [...document.querySelectorAll('textarea')];
    // Prefer labeled/id hints
    let kd =
      areas.find((a) => /kruti|legacy|ascii|input/i.test(a.id + a.name + a.placeholder + a.className)) ||
      areas[0];
    let uni =
      areas.find(
        (a) =>
          a !== kd &&
          /uni|mangal|output|result|devanagari/i.test(a.id + a.name + a.placeholder + a.className),
      ) ||
      areas[1] ||
      areas[0];
    return {
      kd: kd
        ? kd.id
          ? '#' + kd.id
          : `textarea:nth-of-type(${areas.indexOf(kd) + 1})`
        : null,
      uni: uni
        ? uni.id
          ? '#' + uni.id
          : `textarea:nth-of-type(${areas.indexOf(uni) + 1})`
        : null,
      count: areas.length,
    };
  });

  // Try common competitor IDs from past work
  const candidates = [
    { kd: '#krutidev', uni: '#unicode' },
    { kd: '#legacy_text', uni: '#unicode_text' },
    { kd: 'textarea[name="krutidev"]', uni: 'textarea[name="unicode"]' },
    sel,
  ];

  let kdSel = null;
  let uniSel = null;
  for (const c of candidates) {
    if (!c?.kd || !c?.uni) continue;
    if ((await page.locator(c.kd).count()) && (await page.locator(c.uni).count())) {
      kdSel = c.kd;
      uniSel = c.uni;
      break;
    }
  }
  if (!kdSel) {
    // fallback first two textareas
    kdSel = 'textarea >> nth=0';
    uniSel = 'textarea >> nth=1';
  }

  // Ensure KD→Unicode direction if toggle exists
  const dirBtn = page.getByRole('button', { name: /kruti.*uni|to unicode|convert/i }).first();
  if (await dirBtn.count()) {
    /* leave; many sites auto-convert */
  }

  const results = {};
  for (const inp of CASES) {
    await page.locator(kdSel).fill('');
    await page.locator(kdSel).fill(inp);
    await page.locator(kdSel).dispatchEvent('input');
    await page.locator(kdSel).dispatchEvent('keyup');
    await page.waitForTimeout(500);

    // Click convert if needed
    const convert = page
      .getByRole('button', { name: /convert|कन्वर्ट|परिवर्तित/i })
      .first();
    if (await convert.count()) {
      await convert.click().catch(() => {});
      await page.waitForTimeout(400);
    }

    let got = await page.locator(uniSel).inputValue().catch(() => '');
    // Some sites put result in contenteditable
    if (!got) {
      got = await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return el ? el.value ?? el.textContent ?? '' : '';
      }, uniSel);
    }

    // Prefer Copy button if present near unicode
    let clip = null;
    const copyBtns = page.getByRole('button', { name: /copy|कॉपी/i });
    const n = await copyBtns.count();
    if (n > 0) {
      // click the last copy (often output)
      await copyBtns.nth(n - 1).click().catch(() => {});
      await page.waitForTimeout(250);
      clip = await page.evaluate(async () => {
        try {
          return await navigator.clipboard.readText();
        } catch {
          return null;
        }
      });
    }
    const output = clip != null && clip.length ? clip : got;
    results[inp] = {
      output,
      codePoints: cps(output),
      outputJson: JSON.stringify(output),
      field: got,
      clip,
      kdSel,
      uniSel,
    };
  }

  await browser.close();
  return { label: 'competitor', base: 'https://www.krutidevunicodeconverter.com/', disco, results };
}

const oursProd = await captureOurs('https://unicodekruti.com/krutidev-to-unicode-converter', 'ours-prod');
const competitor = await captureCompetitor();

const compare = {};
for (const inp of CASES) {
  const c = competitor.results[inp]?.output ?? null;
  const o = oursProd.results[inp]?.output ?? null;
  compare[inp] = {
    competitor: c,
    competitorCps: c != null ? cps(c) : null,
    ours: o,
    oursCps: o != null ? cps(o) : null,
    match: c === o,
  };
}

const report = {
  capturedAt: new Date().toISOString(),
  oursProd,
  competitor: { label: competitor.label, base: competitor.base, results: competitor.results },
  compare,
  mismatches: Object.entries(compare)
    .filter(([, v]) => !v.match)
    .map(([k, v]) => ({ input: k, ...v })),
};
writeFileSync(join(OUT, 'live-capture.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ mismatches: report.mismatches, compare }, null, 2));
process.exit(0);
