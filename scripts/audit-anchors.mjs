/**
 * Section 6.5 — internal anchor text audit map.
 */
import fs from 'fs';
import path from 'path';

const ROOT = 'src';
const BAD = /^(click here|read more|here|this page|link)$/i;

const files = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name === 'node_modules' || ent.name === '.next') continue;
      walk(p);
    } else if (/\.(tsx|html|ts)$/.test(ent.name)) files.push(p);
  }
}
walk(ROOT);

const map = new Map(); // href -> [{anchor, file}]
const bad = [];

for (const file of files) {
  const s = fs.readFileSync(file, 'utf8');
  // <a href="/...">text</a> and <Link href="/...">text</Link>
  const re =
    /<(?:a|Link)\b[^>]*\bhref=["'](\/[^"'#?]*|https:\/\/unicodekruti\.com[^"'#?]*)["'][^>]*>([\s\S]*?)<\/(?:a|Link)>/gi;
  let m;
  while ((m = re.exec(s))) {
    let href = m[1].replace(/^https:\/\/unicodekruti\.com/, '') || '/';
    href = href.replace(/\/$/, '') || '/';
    const anchor = m[2]
      .replace(/<[^>]+>/g, ' ')
      .replace(/\{[^}]+\}/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!anchor || anchor.length > 120) continue;
    if (!map.has(href)) map.set(href, []);
    map.get(href).push({ anchor, file: file.replace(/\\/g, '/') });
    if (BAD.test(anchor)) bad.push({ href, anchor, file });
  }
}

console.log('=== BAD ANCHORS ===');
if (!bad.length) console.log('(none)');
else bad.forEach((b) => console.log(b));

console.log('\n=== ANCHOR MAP (internal tool destinations) ===');
const targets = [
  '/',
  '/krutidev-to-unicode',
  '/krutidev-10-to-unicode-converter',
  '/krutidev-010-to-unicode-converter',
  '/unicode-to-krutidev-10-converter',
  '/font-download',
  '/about-us',
];
for (const t of targets) {
  const entries = map.get(t) || [];
  const byAnchor = new Map();
  for (const e of entries) {
    if (!byAnchor.has(e.anchor)) byAnchor.set(e.anchor, new Set());
    byAnchor.get(e.anchor).add(e.file);
  }
  console.log(`\n${t}`);
  if (!byAnchor.size) {
    console.log('  (no internal links found)');
    continue;
  }
  for (const [a, srcs] of [...byAnchor.entries()].sort((x, y) => y[1].size - x[1].size)) {
    console.log(`  "${a}" ← ${[...srcs].slice(0, 4).join(', ')}${srcs.size > 4 ? ` (+${srcs.size - 4})` : ''}`);
  }
}
