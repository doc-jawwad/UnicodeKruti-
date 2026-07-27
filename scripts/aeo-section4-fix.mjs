/**
 * Sync HowTo step arrays in TS to match visible HowToStep markup (h3 + p only).
 * Also move #key-takeaways sections before FAQ where needed.
 */
import fs from 'fs';
import path from 'path';

const root = path.resolve('src');

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractHowToSteps(file) {
  const s = fs.readFileSync(file, 'utf8');
  // Scope to HowTo sections only
  const sections = [...s.matchAll(/itemtype=["']https:\/\/schema\.org\/HowTo["']([\s\S]*?)<\/section>/gi)];
  const steps = [];
  for (const sec of sections) {
    const body = sec[1];
    const re =
      /itemtype=["']https:\/\/schema\.org\/HowToStep["'][\s\S]*?<h3[^>]*item[Pp]rop=["']name["']>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*item[Pp]rop=["']text["']>([\s\S]*?)<\/p>/gi;
    let m;
    while ((m = re.exec(body))) {
      steps.push({ name: stripTags(m[1]), text: stripTags(m[2]) });
    }
  }
  return steps;
}

function replaceExportArray(ts, exportName, steps) {
  const arr = steps
    .map(
      (s) =>
        `  {\n    name: ${JSON.stringify(s.name)},\n    text: ${JSON.stringify(s.text)},\n  }`,
    )
    .join(',\n');
  const re = new RegExp(`export const ${exportName} = \\[[\\s\\S]*?\\];`);
  if (!re.test(ts)) throw new Error(`Cannot find ${exportName}`);
  return ts.replace(re, `export const ${exportName} = [\n${arr},\n];`);
}

function extractSectionById(html, id) {
  const start = html.search(new RegExp(`<section[^>]*\\bid=["']${id}["'][^>]*>`, 'i'));
  if (start < 0) return null;
  // include preceding HTML comment block if present
  let from = start;
  const before = html.slice(Math.max(0, start - 200), start);
  const commentMatch = before.match(/<!--[\s\S]*?-->\s*$/);
  if (commentMatch) from = start - commentMatch[0].length;

  let depth = 0;
  let i = start;
  while (i < html.length) {
    const open = html.slice(i).match(/^<section\b[^>]*>/i);
    const close = html.slice(i).match(/^<\/section>/i);
    if (open) {
      depth += 1;
      i += open[0].length;
      continue;
    }
    if (close) {
      depth -= 1;
      i += close[0].length;
      if (depth === 0) {
        return { from, to: i, block: html.slice(from, i) };
      }
      continue;
    }
    i += 1;
  }
  return null;
}

function moveSectionBefore(html, moveId, beforeId) {
  const move = extractSectionById(html, moveId);
  const before = extractSectionById(html, beforeId);
  if (!move || !before) {
    throw new Error(`Missing section move=#${moveId} before=#${beforeId}`);
  }
  if (move.from < before.from) {
    console.log(`  already before: #${moveId} < #${beforeId}`);
    return html;
  }
  const without = html.slice(0, move.from) + '\n\n' + html.slice(move.to);
  // re-find before after removal
  const before2 = extractSectionById(without, beforeId);
  if (!before2) throw new Error(`Lost #${beforeId} after removal`);
  return without.slice(0, before2.from) + move.block + '\n\n\n' + without.slice(before2.from);
}

const howToMap = [
  { html: 'content/wp-html/home.html', ts: 'content/home.ts', exportName: 'homeHowToSteps' },
  {
    html: 'content/wp-html/krutidev-to-unicode-converter.html',
    ts: 'content/k2u.ts',
    exportName: 'k2uHowToSteps',
  },
  {
    html: 'content/wp-html/krutidev-10-to-unicode-converter.html',
    ts: 'content/k10.ts',
    exportName: 'k10HowToSteps',
  },
  {
    html: 'content/wp-html/krutidev-010-to-unicode-converter.html',
    ts: 'content/k010.ts',
    exportName: 'k010HowToSteps',
  },
];

for (const item of howToMap) {
  const steps = extractHowToSteps(path.join(root, item.html));
  console.log(`\n${item.exportName}: ${steps.length} steps`);
  steps.forEach((s, i) => console.log(`  ${i + 1}. ${s.name} — ${s.text.slice(0, 70)}...`));
  const tsPath = path.join(root, item.ts);
  let ts = fs.readFileSync(tsPath, 'utf8');
  ts = replaceExportArray(ts, item.exportName, steps);
  fs.writeFileSync(tsPath, ts);
}

for (const [file, moveId, beforeId] of [
  ['content/wp-html/krutidev-10-to-unicode-converter.html', 'key-takeaways', 'faq-k10'],
  ['content/wp-html/krutidev-010-to-unicode-converter.html', 'key-takeaways', 'faq'],
]) {
  const p = path.join(root, file);
  let html = fs.readFileSync(p, 'utf8');
  html = moveSectionBefore(html, moveId, beforeId);
  // fix stray ul
  html = html.replace(/<\/aside>\s*<\/ul>\s*<\/div>/, '</aside>\n                </div>');
  fs.writeFileSync(p, html);
  console.log(`\nReordered ${file}: #${moveId} before #${beforeId}`);
}

console.log('\nDone.');
