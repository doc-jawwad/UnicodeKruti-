/**
 * HTML / JS size snapshot for the Astro POC dist.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '../dist');

function sizeOf(rel) {
  const p = path.join(dist, rel);
  if (!fs.existsSync(p)) return null;
  return fs.statSync(p).size;
}

function walkJs(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkJs(full, acc);
    else if (name.endsWith('.js')) acc.push({ name, bytes: st.size });
  }
  return acc;
}

const pages = [
  'index.html',
  'krutidev-to-unicode-converter/index.html',
  'about-us/index.html',
  'font-download/index.html',
  'contact-us/index.html',
];

console.log('=== POC performance snapshot (dist) ===\n');
console.log('HTML:');
for (const p of pages) {
  const n = sizeOf(p);
  console.log(`  ${p}: ${n == null ? 'MISSING' : `${n} bytes (${(n / 1024).toFixed(1)} KB)`}`);
}

const js = walkJs(path.join(dist, '_astro')).sort((a, b) => b.bytes - a.bytes);
const totalJs = js.reduce((s, x) => s + x.bytes, 0);
console.log(`\n/_astro JS files: ${js.length}, total ${totalJs} bytes (${(totalJs / 1024).toFixed(1)} KB)`);
console.log('Top chunks:');
for (const c of js.slice(0, 8)) {
  console.log(`  ${c.name}: ${(c.bytes / 1024).toFixed(1)} KB`);
}

console.log('\nIslands (expected): ConverterHostIsland, FontPackGrid, ContactForm, Analytics');
console.log('About page: no converter island (static HTML only).');
