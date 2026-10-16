/**
 * UKR-032 — discover competitor + UnicodeKruti DOM for both directions.
 */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join('scripts', '_qa-artifacts', 'ukr032');
mkdirSync(OUT, { recursive: true });

async function discover(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(1500);
  return page.evaluate(() => {
    const areas = [...document.querySelectorAll('textarea, input[type=text]')].map(
      (el, i) => ({
        i,
        tag: el.tagName,
        id: el.id,
        name: el.name,
        placeholder: el.placeholder,
        className: String(el.className).slice(0, 100),
      }),
    );
    const buttons = [
      ...document.querySelectorAll(
        'button, input[type=button], input[type=submit], a.btn, a[href^="javascript"]',
      ),
    ].map((el) => ({
      tag: el.tagName,
      text: (el.textContent || el.value || '').trim().slice(0, 80),
      href: el.getAttribute('href'),
      id: el.id,
      className: String(el.className).slice(0, 80),
    }));
    return { title: document.title, url: location.href, areas, buttons };
  });
}

async function smokeCompetitorKd(page) {
  await page.goto('https://www.krutidevunicodeconverter.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 90000,
  });
  await page.waitForTimeout(800);
  await page.fill('#krutitext', 'jke');
  await page.locator('a.btn', { hasText: /Convert To Unicode/i }).click();
  await page.waitForTimeout(300);
  const field = await page.inputValue('#unicodetext');
  await page.locator('a.btn', { hasText: /Copy To Clipboard/i }).click();
  await page.waitForTimeout(250);
  const clip = await page.evaluate(async () => {
    try {
      return await navigator.clipboard.readText();
    } catch (e) {
      return { error: String(e) };
    }
  });
  return { field, clip, fieldMatchesClipboard: field === clip };
}

async function smokeCompetitorUni(page) {
  await page.goto(
    'https://www.krutidevunicodeconverter.com/unicode-to-krutidev-converter.php',
    { waitUntil: 'domcontentloaded', timeout: 90000 },
  );
  await page.waitForTimeout(800);
  const ids = await page.evaluate(() =>
    [...document.querySelectorAll('textarea')].map((t) => ({
      id: t.id,
      name: t.name,
      placeholder: t.placeholder,
    })),
  );
  // Try fill first textarea with राम and convert
  if (ids.length >= 2) {
    const inSel = '#' + ids[0].id;
    const outSel = '#' + ids[1].id;
    await page.fill(inSel, 'राम');
    const convert = page.locator('a.btn', { hasText: /Convert/i }).first();
    if (await convert.count()) await convert.click();
    await page.waitForTimeout(300);
    const field = await page.inputValue(outSel);
    const copy = page.locator('a.btn', { hasText: /Copy/i }).first();
    let clip = null;
    let clipboardError = null;
    if (await copy.count()) {
      await copy.click();
      await page.waitForTimeout(250);
      const r = await page.evaluate(async () => {
        try {
          return { clip: await navigator.clipboard.readText() };
        } catch (e) {
          return { error: String(e) };
        }
      });
      clip = r.clip ?? null;
      clipboardError = r.error ?? null;
    }
    return {
      ids,
      field,
      clip,
      clipboardError,
      fieldMatchesClipboard: clip != null && field === clip,
    };
  }
  return { ids };
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const ctx = await browser.newContext({
  permissions: ['clipboard-read', 'clipboard-write'],
});
const page = await ctx.newPage();

const report = {
  at: new Date().toISOString(),
  competitorKd: await discover(page, 'https://www.krutidevunicodeconverter.com/'),
  competitorUni: await discover(
    page,
    'https://www.krutidevunicodeconverter.com/unicode-to-krutidev-converter.php',
  ),
  oursKd: await discover(
    page,
    'https://unicodekruti.com/krutidev-to-unicode-converter',
  ),
  oursUni: await discover(page, 'https://unicodekruti.com/'),
  smokeKd: await smokeCompetitorKd(page),
  smokeUni: await smokeCompetitorUni(page),
};

writeFileSync(join(OUT, 'discover.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
