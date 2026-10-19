/**
 * Builds public/downloads/kruti-dev-010-keyboard-layout-a4.pdf from the shared
 * keyboard map (src/lib/keyboard-map.ts) — the same source as the page tables and widget.
 *
 * Labels are Unicode Devanagari set in Noto Sans Devanagari (SIL OFL 1.1; files in
 * scripts/keyboard-pdf/fonts). No Kruti Dev or Mangal font is loaded or embedded.
 *
 * Declared deps: playwright + tsx (devDependencies). See scripts/keyboard-pdf/README.md.
 *
 *   npm install
 *   npx playwright install chromium
 *   npm run build:keyboard-pdf
 *
 * Set PLAYWRIGHT_MODULE=<path to a playwright package> to use an existing install.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import {
  KEYBOARD_ROWS,
  MAPPING_META,
  type KeyLayer,
  type KeyLayerId,
} from '../src/lib/keyboard-map';
import { KEYBOARD_LAYOUT_PATH, KEYBOARD_PDF_PATH } from '../src/content/keyboard-layout';

const ROOT = path.resolve(__dirname, '..');
const FONT_DIR = path.join(ROOT, 'scripts', 'keyboard-pdf', 'fonts');
const OUT = path.join(ROOT, 'public', KEYBOARD_PDF_PATH);
const PAGE_URL = `unicodekruti.com${KEYBOARD_LAYOUT_PATH}/`;

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fontUrl(file: string): string {
  return pathToFileURL(path.join(FONT_DIR, file)).href;
}

function keyHtml(layer: KeyLayer): string {
  const classes = ['key'];
  if (layer.status === 'unresolved') classes.push('unresolved');
  if (layer.behavior !== 'plain') classes.push('context');
  const dev =
    layer.status === 'unresolved'
      ? '<span class="dev dev--na">—</span><span class="tag">unresolved</span>'
      : `<span class="dev" lang="hi">${esc(layer.label)}</span>${
          layer.behavior !== 'plain' ? '<span class="tag">context key</span>' : ''
        }`;
  return `<div class="${classes.join(' ')}"><span class="stored">${esc(layer.stored)}</span>${dev}</div>`;
}

function pageHtml(which: KeyLayerId): string {
  const title = which === 'normal' ? 'Normal keys' : 'Shift keys';
  const rows = KEYBOARD_ROWS.map((row, r) => {
    const keys = row.map((k) => keyHtml(which === 'normal' ? k.normal : k.shift)).join('');
    return `<div class="row row--${r}">${keys}</div>`;
  }).join('');
  return `
  <section class="sheet">
    <header>
      <h1>Kruti Dev 010 keyboard layout — ${title}</h1>
      <p class="sub">Press the key shown at the top of each key${
        which === 'shift' ? ' while holding Shift' : ''
      }. Large Hindi label = what the Kruti Dev character stands for (Unicode Devanagari).</p>
    </header>
    <div class="board">${rows}</div>
    <ul class="legend">
      <li><b lang="hi">◌</b> dotted circle marks where a sign sits on a letter, for example <span lang="hi">◌ा</span>.</li>
      <li><b>Context keys:</b> <b>f</b> (<span lang="hi">◌ि</span>) is stored before the consonant; <b>z</b> (rakar) is added after a consonant; <b>Z</b> (reph) is stored after the letter it sits above.</li>
      <li><b>/</b> gives the half letter <span lang="hi">ध्</span>; <b>/k</b> gives <span lang="hi">ध</span>.</li>
      <li>Shift+4 (<b>$</b>) and Shift+5 (<b>%</b>) are unresolved: our decoder table and an external reference (LTRC) disagree, so no output is shown.</li>
    </ul>
    <footer>
      <p>Mapping: ${MAPPING_META.status} from the UnicodeKruti converter. Not tested on a physical keyboard. No Alt codes are listed.</p>
      <p>${esc(PAGE_URL)} · Generated ${MAPPING_META.generatedLabel} · Labels: Noto Sans Devanagari (SIL OFL 1.1)</p>
    </footer>
  </section>`;
}

function buildHtml(): string {
  return `<!doctype html>
<html lang="en-IN"><head><meta charset="utf-8">
<title>Kruti Dev 010 keyboard layout chart (A4)</title>
<style>
@font-face { font-family: 'NotoDev'; font-weight: 400; src: url('${fontUrl('noto-sans-devanagari-devanagari-400-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'NotoDev'; font-weight: 700; src: url('${fontUrl('noto-sans-devanagari-devanagari-700-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'NotoLatin'; font-weight: 400; src: url('${fontUrl('noto-sans-latin-400-normal.woff2')}') format('woff2'); }
@font-face { font-family: 'NotoLatin'; font-weight: 700; src: url('${fontUrl('noto-sans-latin-700-normal.woff2')}') format('woff2'); }
@page { size: A4 landscape; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: 'NotoLatin', 'NotoDev', sans-serif; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
[lang='hi'], .dev { font-family: 'NotoDev', 'NotoLatin', sans-serif; }
.sheet { width: 297mm; height: 210mm; padding: 11mm 12mm 9mm; display: flex; flex-direction: column; page-break-after: always; break-after: page; overflow: hidden; }
.sheet:last-child { page-break-after: auto; break-after: auto; }
h1 { font-size: 19pt; margin: 0 0 1mm; color: #8f3a00; }
.sub { font-size: 10pt; margin: 0 0 4mm; color: #333; }
.board { display: flex; flex-direction: column; gap: 2.2mm; margin-bottom: 4mm; }
.row { display: flex; gap: 2.2mm; }
.row--1 { margin-left: 5mm; }
.row--2 { margin-left: 10mm; }
.row--3 { margin-left: 17mm; }
.key { width: 18mm; height: 25mm; border: 0.4mm solid #444; border-bottom-width: 0.9mm; border-radius: 2mm; position: relative; display: flex; align-items: center; justify-content: center; background: #fff; }
.key .stored { position: absolute; top: 0.8mm; left: 1.6mm; font-size: 12pt; font-weight: 700; color: #1a1a1a; }
.key .dev { font-size: 22pt; font-weight: 700; line-height: 1; margin-top: 4mm; }
.key .dev--na { color: #666; }
.key .tag { position: absolute; bottom: 0.9mm; left: 0; right: 0; text-align: center; font-size: 6pt; color: #333; text-transform: uppercase; letter-spacing: 0.2pt; }
.key.context { background: #ffe9d6; border-color: #a65f14; border-width: 0.6mm; border-bottom-width: 1mm; }
.key.unresolved { border-style: dashed; background: #f1f1f1; }
.legend { list-style: none; margin: 0; padding: 0; font-size: 10pt; line-height: 1.5; }
.legend [lang='hi'] { font-size: 13pt; font-weight: 700; }
.legend li { margin-bottom: 1mm; }
footer { margin-top: auto; border-top: 0.3mm solid #888; padding-top: 2mm; font-size: 8.5pt; color: #333; }
footer p { margin: 0 0 0.6mm; }
</style></head>
<body>${pageHtml('normal')}${pageHtml('shift')}</body></html>`;
}

async function main() {
  const require = createRequire(__filename);
  const pwPath = process.env.PLAYWRIGHT_MODULE || 'playwright';
  const { chromium } = require(pwPath);

  const tmpHtml = path.join(ROOT, 'scripts', 'keyboard-pdf', '_keyboard-chart.html');
  fs.writeFileSync(tmpHtml, buildHtml(), 'utf8');

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(tmpHtml).href);
    await page.evaluate(() => document.fonts.ready);
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    await page.pdf({
      path: OUT,
      format: 'A4',
      landscape: true,
      printBackground: true,
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
    fs.rmSync(tmpHtml, { force: true });
  }
  console.log(`Wrote ${path.relative(ROOT, OUT)} (${fs.statSync(OUT).size} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
