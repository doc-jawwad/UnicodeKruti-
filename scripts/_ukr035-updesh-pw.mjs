/**
 * Focused Updesh Playwright check (same convertUpdesh engine).
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.PREVIEW_URL || 'http://127.0.0.1:3017';
const OUT = join('scripts', '_qa-artifacts', 'ukr035');
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fill(page, input) {
  await page.evaluate((t) => {
    const el = document.querySelector('#kdc-source-input');
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(
      el,
      t,
    );
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, input);
  await sleep(400);
  return page.inputValue('#kdc-target-output');
}

async function mode(page) {
  return page.evaluate(
    () =>
      document.getElementById('updesh-converter-app')?.dataset?.defaultMode ||
      '',
  );
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
await page.goto(BASE + '/updesh-converter', {
  waitUntil: 'domcontentloaded',
  timeout: 90000,
});
await page.waitForSelector('#kdc-source-input', { timeout: 60000 });
await sleep(500);

const results = [];
let fail = 0;

// Default: updesh-to-unicode
console.log('mode', await mode(page));
const kdCases = [
  ['j~;', 'र्य'],
  ["';Z", 'श्र्य'],
  ['R;Z', 'त्र्य'],
  ['fd k', 'कि ा'],
  ['Z;', 'Zय'],
  ['1%', '1ः'],
  ['pkS', 'चै'],
  ['—', 'कृ'],
];
for (const [input, expect] of kdCases) {
  const got = await fill(page, input);
  const ok = got === expect;
  if (!ok) fail++;
  results.push({ dir: 'updesh-to-unicode', input, expect, got, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'} kd ${JSON.stringify(input)} => ${JSON.stringify(got)}`);
}

// Swap to unicode-to-updesh
await page.locator('.kdc-swap-btn, [aria-label="Swap conversion direction"]').first().click();
await sleep(400);
console.log('mode after swap', await mode(page));

const uniCases = [
  ['र्य', 'j~;'],
  ['र्क', 'j~d'],
  ['र्ग', 'j~x'],
  ['श्र्य', "';Z"],
  ['कार्य', 'dk;Z'],
  ['कार्य र्य', 'dk;Z ;Z'],
  ['र्य,', 'j~;]'],
  ['धर्म', '/keZ'],
  ['त्र्य', 'R;Z'],
];
for (const [input, expect] of uniCases) {
  const got = await fill(page, input);
  const ok = got === expect;
  if (!ok) fail++;
  results.push({ dir: 'unicode-to-updesh', input, expect, got, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'} uni ${JSON.stringify(input)} => ${JSON.stringify(got)}`);
}

writeFileSync(
  join(OUT, 'updesh-pw.json'),
  JSON.stringify({ base: BASE, fail, pass: results.length - fail, results }, null, 2),
);
await browser.close();
console.log(`Updesh PW: ${results.length - fail}/${results.length} pass`);
process.exit(fail ? 1 : 0);
