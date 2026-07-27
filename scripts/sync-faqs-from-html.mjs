/**
 * Sync English FAQ arrays from HTML FAQ sections (fixed section extraction).
 */
import fs from 'fs';

function strip(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractSection(html, id) {
  const re = new RegExp(`<section\\b[^>]*\\bid=["']${id}["'][^>]*>`, 'i');
  const m = html.match(re);
  if (!m) throw new Error(`Missing section #${id}`);
  const start = html.indexOf(m[0]);
  let depth = 0;
  let i = start;
  while (i < html.length) {
    if (html.slice(i).startsWith('<section')) {
      depth += 1;
      i += 8;
      continue;
    }
    if (html.slice(i).startsWith('</section>')) {
      depth -= 1;
      i += 10;
      if (depth === 0) return html.slice(start, i);
      continue;
    }
    i += 1;
  }
  throw new Error(`Unclosed section #${id}`);
}

function extractFaqs(sectionHtml) {
  const items = [];
  const re =
    /<summary[^>]*>([\s\S]*?)<\/summary>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(sectionHtml))) {
    const q = strip(m[1]);
    const a = strip(m[2]);
    if (/[\u0900-\u097F]/.test(q)) continue;
    if (!q || !a || a.split(/\s+/).length < 8) continue;
    items.push({ question: q, answer: a });
  }
  return items;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatFaqs(items) {
  return (
    items
      .map((item) => {
        const q =
          item.question.length > 80
            ? `question:\n      '${esc(item.question)}'`
            : `question: '${esc(item.question)}'`;
        return `  {\n    ${q},\n    answer:\n      '${esc(item.answer)}',\n  }`;
      })
      .join(',\n') + ',\n'
  );
}

function replaceExport(ts, exportName, items) {
  const re = new RegExp(`export const ${exportName} = \\[[\\s\\S]*?\\];`);
  if (!re.test(ts)) throw new Error(`Cannot find ${exportName}`);
  return ts.replace(re, `export const ${exportName} = [\n${formatFaqs(items)}];`);
}

const jobs = [
  {
    html: 'src/content/wp-html/krutidev-to-unicode-converter.html',
    sectionId: 'faq-main',
    ts: 'src/content/k2u.ts',
    exportName: 'k2uFaqs',
  },
  {
    html: 'src/content/wp-html/krutidev-10-to-unicode-converter.html',
    sectionId: 'faq-k10',
    ts: 'src/content/k10.ts',
    exportName: 'k10Faqs',
  },
  {
    html: 'src/content/wp-html/krutidev-010-to-unicode-converter.html',
    sectionId: 'faq',
    ts: 'src/content/k010.ts',
    exportName: 'k010Faqs',
  },
];

for (const job of jobs) {
  const html = fs.readFileSync(job.html, 'utf8');
  const section = extractSection(html, job.sectionId);
  const items = extractFaqs(section);
  console.log(`\n${job.exportName}: ${items.length} FAQs`);
  if (!items.length) throw new Error(`No FAQs for ${job.exportName}`);
  items.forEach((x, i) => {
    const w = x.answer.split(/\s+/).length;
    console.log(`  ${i + 1}. ${w}w ${w < 40 || w > 80 ? 'BAD' : 'ok'} | ${x.question.slice(0, 55)}`);
  });
  let ts = fs.readFileSync(job.ts, 'utf8');
  ts = replaceExport(ts, job.exportName, items);
  fs.writeFileSync(job.ts, ts);
  console.log(`  synced ${job.ts}`);
}
