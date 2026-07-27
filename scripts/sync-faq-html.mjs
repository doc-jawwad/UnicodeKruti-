/**
 * Sync English FAQ <details> blocks in WP HTML / note React pages need manual map.
 * Reads FAQ arrays from content TS files and patches matching <summary> answers in HTML.
 */
import fs from 'fs';

function parseFaqs(file, exportName) {
  const s = fs.readFileSync(file, 'utf8');
  const start = s.indexOf(`export const ${exportName} = [`);
  if (start < 0) throw new Error(`missing ${exportName} in ${file}`);
  let i = start + `export const ${exportName} = [`.length;
  let depth = 1;
  let end = i;
  while (end < s.length && depth > 0) {
    if (s[end] === '[') depth++;
    if (s[end] === ']') depth--;
    end++;
  }
  const block = s.slice(i, end - 1);
  const items = [];
  const re = /question:\s*'((?:\\'|[^'])*)'[\s\S]*?answer:\s*'((?:\\'|[^'])*)'/g;
  let m;
  while ((m = re.exec(block))) {
    items.push({
      q: m[1].replace(/\\'/g, "'"),
      a: m[2].replace(/\\'/g, "'"),
    });
  }
  return items;
}

function escapeHtml(t) {
  return t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function patchHtmlFaqs(htmlPath, faqs) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  let patched = 0;
  for (const { q, a } of faqs) {
    const qEsc = escapeHtml(q);
    // Match details block whose summary text equals question
    const re = new RegExp(
      `(<details[^>]*>\\s*<summary[^>]*>\\s*${qEsc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<\\/summary>\\s*<div class="faq-content"[^>]*>\\s*<p>)([\\s\\S]*?)(<\\/p>)`,
      'i'
    );
    if (re.test(html)) {
      html = html.replace(re, `$1${escapeHtml(a)}$3`);
      patched++;
    } else {
      // try without html escape on summary (plain)
      const re2 = new RegExp(
        `(<details[^>]*>\\s*<summary[^>]*>\\s*${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<\\/summary>\\s*<div class="faq-content"[^>]*>\\s*<p>)([\\s\\S]*?)(<\\/p>)`,
        'i'
      );
      if (re2.test(html)) {
        html = html.replace(re2, `$1${escapeHtml(a)}$3`);
        patched++;
      } else {
        console.warn('NO MATCH', htmlPath, q.slice(0, 50));
      }
    }
  }
  fs.writeFileSync(htmlPath, html);
  console.log(htmlPath, 'patched', patched, '/', faqs.length);
}

const jobs = [
  ['src/content/home.ts', 'homeFaqs', 'src/content/wp-html/home.html'],
  ['src/content/k2u.ts', 'k2uFaqs', 'src/content/wp-html/krutidev-to-unicode-converter.html'],
  ['src/content/k10.ts', 'k10Faqs', 'src/content/wp-html/krutidev-10-to-unicode-converter.html'],
  ['src/content/k010.ts', 'k010Faqs', 'src/content/wp-html/krutidev-010-to-unicode-converter.html'],
];

for (const [ts, name, html] of jobs) {
  patchHtmlFaqs(html, parseFaqs(ts, name));
}
