/**
 * Focused Playwright verify: local K2U + Updesh for UKR-028 cases.
 * Usage: BASE_URL=http://127.0.0.1:3000 node scripts/_ukr028-local-verify.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:3000';
const OUT = path.join('scripts', '_qa-artifacts', 'ukr028', 'local-verify.json');

const EXPECTED = {
  'RZ;': { text: 'तर््य', cps: ['U+0924', 'U+0930', 'U+094D', 'U+094D', 'U+092F'] },
  'R;Z': { text: 'त्र्य', cps: ['U+0924', 'U+094D', 'U+0930', 'U+094D', 'U+092F'] },
  'foHkkx Z': {
    text: 'विभार्ग ',
    cps: ['U+0935', 'U+093F', 'U+092D', 'U+093E', 'U+0930', 'U+094D', 'U+0917', 'U+0020'],
  },
  'd %': { text: 'क:', cps: ['U+0915', 'U+003A'] },
  'd%': { text: 'कः', cps: ['U+0915', 'U+0903'] },
  'fd k': { text: 'कि ा', cps: ['U+0915', 'U+093F', 'U+0020', 'U+093E'] },
};

function cps(s) {
  return [...s].map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'));
}

async function readTool(page, inputSel, outputSel, input) {
  await page.fill(inputSel, '');
  await page.fill(inputSel, input);
  await page.waitForTimeout(250);
  const output = await page.inputValue(outputSel);
  const copyBtn = page.locator('button:has-text("Copy"), button:has-text("Copy Output")').first();
  let clip = output;
  try {
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    await copyBtn.click({ timeout: 3000 });
    await page.waitForTimeout(150);
    clip = await page.evaluate(() => navigator.clipboard.readText());
  } catch {
    /* use textarea */
  }
  return { output, clip };
}

async function runRoute(browser, route, inputSel, outputSel, label) {
  const page = await browser.newPage();
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 60000 });
  const results = {};
  for (const input of Object.keys(EXPECTED)) {
    const { output, clip } = await readTool(page, inputSel, outputSel, input);
    const text = clip ?? output;
    const gotCps = cps(text);
    const exp = EXPECTED[input];
    results[input] = {
      text,
      codePoints: gotCps,
      match: text === exp.text && gotCps.join(' ') === exp.cps.join(' '),
      expected: exp.text,
      expectedCps: exp.cps,
    };
  }
  await page.close();
  return { label, route, results };
}

const browser = await chromium.launch({ headless: true });
const k2u = await runRoute(
  browser,
  '/krutidev-to-unicode-converter',
  '#krutidev-input',
  '#krutidev-output',
  'K2U',
);
const updesh = await runRoute(
  browser,
  '/updesh-converter',
  '#kdc-source-input',
  '#kdc-target-output',
  'Updesh',
);
await browser.close();

const report = { base: BASE, at: new Date().toISOString(), k2u, updesh };
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(report, null, 2), 'utf8');

let fail = 0;
for (const block of [k2u, updesh]) {
  console.log(`\n=== ${block.label} ${block.route} ===`);
  for (const [input, r] of Object.entries(block.results)) {
    const ok = r.match ? 'PASS' : 'FAIL';
    if (!r.match) fail++;
    console.log(`${ok} ${JSON.stringify(input)} => ${JSON.stringify(r.text)} ${r.codePoints.join(' ')}`);
  }
}
console.log(`\nWrote ${OUT}`);
process.exit(fail ? 1 : 0);
