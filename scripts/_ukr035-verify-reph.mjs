/**
 * UKR-035A — verify four standalone reph encodings:
 * competitor clipboard vs PR preview clipboard + local engine reverse.
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const OUT = join('scripts', '_qa-artifacts', 'ukr035');
mkdirSync(OUT, { recursive: true });

const PREVIEW =
  process.env.PREVIEW_URL ||
  'https://unicode-kruti-git-fix-ukr035-standa-568b46-doc-jawwads-projects.vercel.app';

const UNI_CASES = [
  { id: 'R156', input: 'र्य', expectKd: 'j~;' },
  { id: 'R157', input: 'र्क', expectKd: 'j~d' },
  { id: 'R158', input: 'र्ग', expectKd: 'j~x' },
  { id: 'R161', input: 'श्र्य', expectKd: "';Z" },
  { id: 'CTX1', input: 'र्य र्क र्ग श्र्य', expectKd: 'j~; j~d j~x J~;' },
  { id: 'CTX2', input: 'कार्य र्य', expectKd: 'dk;Z ;Z' },
  { id: 'CTX3', input: 'र्य,', expectKd: 'j~;]' },
  { id: 'CTL-DHARM', input: 'धर्म', expectKd: '/keZ' },
  { id: 'CTL-KARY', input: 'कार्य', expectKd: 'dk;Z' },
  { id: 'CTL-KARYK', input: 'कार्यक्रम', expectKd: 'dk;ZØe' },
  { id: 'CTL-TRYA', input: 'त्र्य', expectKd: 'R;Z' },
];

const KD_REVERSE = [
  { id: 'REV-j~;', input: 'j~;', notes: 'new encoding of र्य' },
  { id: 'REV-j~d', input: 'j~d', notes: 'new encoding of र्क' },
  { id: 'REV-j~x', input: 'j~x', notes: 'new encoding of र्ग' },
  { id: "REV-';Z", input: "';Z", notes: 'competitor श्र्य spelling — may be lossy' },
  { id: 'REV-Üz', input: 'Üz', notes: 'prior round-tripping श्र्य spelling' },
  { id: 'REV-R;Z', input: 'R;Z', notes: 'UKR-022 control' },
  { id: 'REV-fd k', input: 'fd k', notes: 'UKR-024' },
  { id: 'REV-Z;', input: 'Z;', notes: 'UKR-030' },
  { id: 'REV-pkS', input: 'pkS', notes: 'UKR-023' },
  { id: 'REV-em', input: '\u2014', notes: 'UKR-020' },
  { id: 'REV-en', input: '\u2013', notes: 'UKR-021' },
  { id: 'REV-RZ;', input: 'RZ;', notes: 'UKR-028' },
  { id: 'REV-foHkkx Z', input: 'foHkkx Z', notes: 'UKR-028' },
  { id: 'REV-d %', input: 'd %', notes: 'UKR-028' },
  { id: 'REV-1%', input: '1%', notes: 'UKR-030' },
];

function cps(s) {
  if (s == null) return null;
  return [...s].map(
    (c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'),
  );
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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

async function captureCompetitorUniToKd(page, input) {
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
    },
    { sel: '#unicodetext', t: input },
  );
  await sleep(300);
  const convert = page.locator('a.btn', { hasText: /Convert To Krutidev/i }).first();
  if (await convert.count()) await convert.click();
  await sleep(250);
  const field = await page.inputValue('#krutitext');
  await page.evaluate(async () => {
    try {
      await navigator.clipboard.writeText('__UKR035_MARKER__');
    } catch {
      /* ignore */
    }
  });
  const copy = page.locator('a.btn', { hasText: /Copy To Clipboard/i }).first();
  await copy.click();
  await sleep(250);
  const clip = await readClipboard(page);
  const clipboard =
    clip.ok && clip.text !== '__UKR035_MARKER__' ? clip.text : null;
  return {
    source: clipboard != null ? 'live-competitor-clipboard' : 'clipboard-unavailable',
    clipboard,
    field,
    fieldMatchesClipboard: clipboard != null ? clipboard === field : null,
    codePoints: cps(clipboard),
    outputJson: clipboard != null ? JSON.stringify(clipboard) : null,
  };
}

async function captureCompetitorKdToUni(page, input) {
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
    },
    { sel: '#krutitext', t: input },
  );
  await sleep(300);
  const convert = page.locator('a.btn', { hasText: /Convert To Unicode/i }).first();
  if (await convert.count()) await convert.click();
  await sleep(250);
  const field = await page.inputValue('#unicodetext');
  await page.evaluate(async () => {
    try {
      await navigator.clipboard.writeText('__UKR035_MARKER__');
    } catch {
      /* ignore */
    }
  });
  const copy = page.locator('a.btn', { hasText: /Copy To Clipboard/i }).first();
  await copy.click();
  await sleep(250);
  const clip = await readClipboard(page);
  const clipboard =
    clip.ok && clip.text !== '__UKR035_MARKER__' ? clip.text : null;
  return {
    source: clipboard != null ? 'live-competitor-clipboard' : 'clipboard-unavailable',
    clipboard,
    field,
    fieldMatchesClipboard: clipboard != null ? clipboard === field : null,
    codePoints: cps(clipboard),
    outputJson: clipboard != null ? JSON.stringify(clipboard) : null,
  };
}

async function captureOurs(page, input, delayMs = 400) {
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
    { sel: '#krutidev-input', t: input },
  );
  await sleep(delayMs);
  const field = await page.inputValue('#krutidev-output');
  await page.evaluate(async () => {
    try {
      await navigator.clipboard.writeText('__UKR035_MARKER__');
    } catch {
      /* ignore */
    }
  });
  const copy = page
    .getByRole('button', { name: /Copy result|Copy converted text|Copied!/i })
    .first();
  await copy.click();
  await sleep(250);
  const clip = await readClipboard(page);
  const clipboard =
    clip.ok && clip.text !== '__UKR035_MARKER__' ? clip.text : null;
  return {
    source: clipboard != null ? 'live-preview-clipboard' : 'clipboard-unavailable',
    clipboard,
    field,
    fieldMatchesClipboard: clipboard != null ? clipboard === field : null,
    codePoints: cps(clipboard),
    outputJson: clipboard != null ? JSON.stringify(clipboard) : null,
    pageUrl: page.url(),
  };
}

async function open(browser, url) {
  const ctx = await browser.newContext({
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await ctx.newPage();
  let lastErr;
  for (let i = 1; i <= 4; i++) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
      await sleep(1000);
      return { ctx, page };
    } catch (e) {
      lastErr = e;
      await sleep(1500 * i);
    }
  }
  await ctx.close().catch(() => {});
  throw lastErr;
}

// Local engine for reverse analysis (tsx via dynamic import of compiled path fails;
// use npx tsx separately — here spawn isn't needed if we import via tsx runner).
async function loadEngine() {
  // Run via: node --import tsx  OR use child. Prefer converting with playwright only
  // for reverse; also dump local via a small inline require through tsx.
  try {
    const { convertText } = await import('../src/lib/converter/engine.ts');
    return convertText;
  } catch {
    return null;
  }
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const report = {
  at: new Date().toISOString(),
  preview: PREVIEW,
  competitorUniUrl:
    'https://www.krutidevunicodeconverter.com/unicode-to-krutidev-converter.php',
  competitorKdUrl: 'https://www.krutidevunicodeconverter.com/',
  uniToKd: [],
  kdToUni: [],
};

const compUni = await open(
  browser,
  'https://www.krutidevunicodeconverter.com/unicode-to-krutidev-converter.php',
);
const oursUni = await open(browser, PREVIEW + '/');
await oursUni.page.waitForSelector('#krutidev-input', { timeout: 60000 });

console.log('=== Uni → KD (competitor vs preview) ===');
for (const c of UNI_CASES) {
  process.stdout.write(`[${c.id}] ${JSON.stringify(c.input)} … `);
  const competitor = await captureCompetitorUniToKd(compUni.page, c.input);
  const ours = await captureOurs(oursUni.page, c.input);
  const verified =
    competitor.source === 'live-competitor-clipboard' &&
    ours.source === 'live-preview-clipboard';
  const match = verified ? competitor.clipboard === ours.clipboard : null;
  const expectOk =
    c.expectKd == null
      ? null
      : verified
        ? ours.clipboard === c.expectKd && competitor.clipboard === c.expectKd
        : null;
  const row = {
    ...c,
    competitor,
    ours,
    verified,
    match,
    expectOk,
    competitorJson: competitor.outputJson,
    oursJson: ours.outputJson,
    competitorCps: competitor.codePoints,
    oursCps: ours.codePoints,
  };
  report.uniToKd.push(row);
  console.log(
    verified
      ? `${match ? 'MATCH' : 'DIFF'} comp=${competitor.outputJson} ours=${ours.outputJson}`
      : `UNVERIFIED comp=${competitor.source} ours=${ours.source}`,
  );
  await sleep(350);
}

await compUni.ctx.close();
await oursUni.ctx.close();

const compKd = await open(browser, 'https://www.krutidevunicodeconverter.com/');
const oursKd = await open(
  browser,
  PREVIEW + '/krutidev-to-unicode-converter',
);
await oursKd.page.waitForSelector('#krutidev-input', { timeout: 60000 });

console.log('\n=== KD → Uni reverse (competitor vs preview) ===');
for (const c of KD_REVERSE) {
  process.stdout.write(`[${c.id}] ${JSON.stringify(c.input)} … `);
  const competitor = await captureCompetitorKdToUni(compKd.page, c.input);
  const ours = await captureOurs(oursKd.page, c.input);
  const verified =
    competitor.source === 'live-competitor-clipboard' &&
    ours.source === 'live-preview-clipboard';
  const match = verified ? competitor.clipboard === ours.clipboard : null;
  const row = {
    ...c,
    competitor,
    ours,
    verified,
    match,
    competitorJson: competitor.outputJson,
    oursJson: ours.outputJson,
    competitorCps: competitor.codePoints,
    oursCps: ours.codePoints,
  };
  report.kdToUni.push(row);
  console.log(
    verified
      ? `${match ? 'MATCH' : 'DIFF'} comp=${competitor.outputJson} ours=${ours.outputJson}`
      : `UNVERIFIED`,
  );
  await sleep(350);
}

await compKd.ctx.close();
await oursKd.ctx.close();
await browser.close();

const summary = {
  uniToKd: {
    tested: report.uniToKd.length,
    verified: report.uniToKd.filter((r) => r.verified).length,
    matched: report.uniToKd.filter((r) => r.match === true).length,
    mismatched: report.uniToKd.filter((r) => r.match === false).length,
    mismatches: report.uniToKd
      .filter((r) => r.match === false)
      .map((r) => ({
        id: r.id,
        input: r.input,
        competitor: r.competitorJson,
        ours: r.oursJson,
        competitorCps: r.competitorCps,
        oursCps: r.oursCps,
        expectKd: r.expectKd,
      })),
  },
  kdToUni: {
    tested: report.kdToUni.length,
    verified: report.kdToUni.filter((r) => r.verified).length,
    matched: report.kdToUni.filter((r) => r.match === true).length,
    mismatched: report.kdToUni.filter((r) => r.match === false).length,
    mismatches: report.kdToUni
      .filter((r) => r.match === false)
      .map((r) => ({
        id: r.id,
        input: r.input,
        competitor: r.competitorJson,
        ours: r.oursJson,
        competitorCps: r.competitorCps,
        oursCps: r.oursCps,
      })),
    shryaLossy: (() => {
      const a = report.kdToUni.find((r) => r.id === "REV-';Z");
      const b = report.kdToUni.find((r) => r.id === 'REV-Üz');
      return {
        apostropheZ: a
          ? {
              competitor: a.competitorJson,
              ours: a.oursJson,
              competitorCps: a.competitorCps,
              oursCps: a.oursCps,
              match: a.match,
            }
          : null,
        uDiaeresisZ: b
          ? {
              competitor: b.competitorJson,
              ours: b.oursJson,
              competitorCps: b.competitorCps,
              oursCps: b.oursCps,
              match: b.match,
            }
          : null,
      };
    })(),
  },
};

writeFileSync(join(OUT, 'live-verify.json'), JSON.stringify({ report, summary }, null, 2));
writeFileSync(join(OUT, 'live-verify-summary.json'), JSON.stringify(summary, null, 2));
console.log('\n=== SUMMARY ===');
console.log(JSON.stringify(summary, null, 2));
