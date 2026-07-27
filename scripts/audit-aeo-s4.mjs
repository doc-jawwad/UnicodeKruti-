/**
 * Section 4 AEO compliance audit for tool pages.
 */
import fs from 'fs';
import path from 'path';

const root = 'src';

function wordCount(s) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function has(file, pattern) {
  const s = fs.readFileSync(path.join(root, file), 'utf8');
  return pattern.test(s);
}

function orderOk(file, firstId, secondId) {
  const s = fs.readFileSync(path.join(root, file), 'utf8');
  const a = s.indexOf(`id="${firstId}"`) >= 0 ? s.indexOf(`id="${firstId}"`) : s.indexOf(`id='${firstId}'`);
  const b =
    s.indexOf(`id="${secondId}"`) >= 0 ? s.indexOf(`id="${secondId}"`) : s.indexOf(`id='${secondId}'`);
  // also jsx id=
  const a2 = a >= 0 ? a : s.indexOf(`id="${firstId}"`) >= 0 ? s.search(new RegExp(`id=["']${firstId}["']`)) : s.search(new RegExp(`id=["']${firstId}["']`));
  const b2 = b >= 0 ? b : s.search(new RegExp(`id=["']${secondId}["']`));
  const ai = s.search(new RegExp(`id=["']${firstId}["']`));
  const bi = s.search(new RegExp(`id=["']${secondId}["']`));
  return ai >= 0 && bi >= 0 && ai < bi;
}

const pages = [
  {
    name: 'home',
    file: 'content/wp-html/home.html',
    faqExport: null,
  },
  { name: 'k2u', file: 'content/wp-html/krutidev-to-unicode-converter.html' },
  { name: 'k10', file: 'content/wp-html/krutidev-10-to-unicode-converter.html' },
  { name: 'k010', file: 'content/wp-html/krutidev-010-to-unicode-converter.html' },
  { name: 'u2k10', file: 'components/pages/u2k10/U2K10PageBody.tsx' },
  { name: 'font', file: 'components/pages/font-download/FontDownloadPageBody.tsx' },
];

const heroes = {
  home: 'content/wp-html/home.html',
  k2u: 'content/wp-html/krutidev-to-unicode-converter.html',
  k10: 'content/wp-html/krutidev-10-to-unicode-converter.html',
  k010: 'content/wp-html/krutidev-010-to-unicode-converter.html',
  u2k10: 'app/unicode-to-krutidev-10-converter/page.tsx',
  font: 'app/font-download/page.tsx',
};

console.log('=== 4.1 TL;DR ===');
for (const [name, file] of Object.entries(heroes)) {
  const s = fs.readFileSync(path.join(root, file), 'utf8');
  const ok =
    /id=["']tldr-block["']/.test(s) &&
    /role=["']note["']/.test(s) &&
    /aria-label=["']Quick summary["']/.test(s) &&
    /item[Pp]rop=["']speakable["']/.test(s);
  const m = s.match(/id=["']tldr-block["'][\s\S]{0,400}?<p[^>]*>([\s\S]*?)<\/p>/i);
  const words = m ? wordCount(m[1]) : 0;
  console.log(
    `${name}: ${ok ? 'PASS' : 'FAIL'} attrs | words=${words} ${words >= 40 && words <= 60 ? 'PASS' : 'CHECK'}`,
  );
}

console.log('\n=== 4.6 Takeaways before FAQ ===');
const pairs = [
  ['home', 'content/wp-html/home.html', 'key-takeaways', 'faq'],
  ['k2u', 'content/wp-html/krutidev-to-unicode-converter.html', 'key-takeaways', 'faq-main'],
  ['k10', 'content/wp-html/krutidev-10-to-unicode-converter.html', 'key-takeaways', 'faq-k10'],
  ['k010', 'content/wp-html/krutidev-010-to-unicode-converter.html', 'key-takeaways', 'faq'],
  ['u2k10', 'components/pages/u2k10/U2K10PageBody.tsx', 'key-takeaways', 'faq'],
  ['font', 'components/pages/font-download/FontDownloadPageBody.tsx', 'key-takeaways', 'faq'],
];
for (const [name, file, a, b] of pairs) {
  const s = fs.readFileSync(path.join(root, file), 'utf8');
  const okOrder = orderOk(file, a, b);
  const aside = /aria-label=["']Key takeaways["']/.test(s);
  console.log(`${name}: order=${okOrder ? 'PASS' : 'FAIL'} aside=${aside ? 'PASS' : 'FAIL'}`);
}

console.log('\n=== 4.7 Cited stats + 4.8 blockquote ===');
for (const [name, file] of Object.entries({
  home: 'content/wp-html/home.html',
  k2u: 'content/wp-html/krutidev-to-unicode-converter.html',
  k10: 'content/wp-html/krutidev-10-to-unicode-converter.html',
  k010: 'content/wp-html/krutidev-010-to-unicode-converter.html',
  u2k10: 'components/pages/u2k10/U2K10PageBody.tsx',
  font: 'components/pages/font-download/FontDownloadPageBody.tsx',
})) {
  const s = fs.readFileSync(path.join(root, file), 'utf8');
  const stat = /\([^)]+,\s*20\d{2}\)/.test(s) || /\(Akshay Verma[^)]*20\d{2}\)/.test(s);
  const quote =
    /<blockquote[\s>]/.test(s) ||
    /ExpertQuote/.test(s) ||
    /Akshay Verma —/.test(s);
  const about = /href=["']\/about-us["']/.test(s);
  console.log(
    `${name}: stat=${stat ? 'PASS' : 'FAIL'} quote=${quote ? 'PASS' : 'FAIL'} about=${about ? 'PASS' : 'FAIL'}`,
  );
}

// FAQ uniqueness
console.log('\n=== 4.3 FAQ uniqueness ===');
const faqFiles = [
  'content/home.ts',
  'content/k2u.ts',
  'content/k10.ts',
  'content/k010.ts',
  'content/u2k10.ts',
  'content/font-download-faqs.ts',
];
const allQ = new Map();
for (const f of faqFiles) {
  const s = fs.readFileSync(path.join(root, f), 'utf8');
  const qs = [...s.matchAll(/question:\s*\n?\s*(?:'([^']+)'|"([^"]+)"|`([^`]+)`)/g)].map(
    (m) => m[1] || m[2] || m[3],
  );
  // also multiline template
  const qs2 = [...s.matchAll(/question:\s*((?:'[^']*'|"[^"]*"|`[^`]*`|\n\s*'[^']*'|\n\s*"[^"]*")+)/g)];
  // simpler: question: '...' or question:\n      '...'
  const qs3 = [
    ...s.matchAll(/question:\s*'([^']+)'/g),
    ...s.matchAll(/question:\s*"([^"]+)"/g),
    ...s.matchAll(/question:\s*\n\s*'([^']+)'/g),
    ...s.matchAll(/question:\s*\n\s*"([^"]+)"/g),
  ].map((m) => m[1]);
  for (const q of qs3) {
    if (!allQ.has(q)) allQ.set(q, []);
    allQ.get(q).push(f);
  }
}
const dups = [...allQ.entries()].filter(([, files]) => files.length > 1);
console.log(`unique questions=${allQ.size} duplicates=${dups.length}`);
dups.slice(0, 10).forEach(([q, files]) => console.log(' DUP', q.slice(0, 70), files));
