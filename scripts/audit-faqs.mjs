import fs from 'fs';

const files = {
  home: 'src/content/home.ts',
  k2u: 'src/content/k2u.ts',
  k10: 'src/content/k10.ts',
  k010: 'src/content/k010.ts',
  u2k10: 'src/content/u2k10.ts',
  font: 'src/content/font-download-faqs.ts',
};

function extractFaqs(s, name) {
  const start = s.indexOf(`export const ${name} = [`);
  if (start < 0) return [];
  let i = start + `export const ${name} = [`.length;
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
    const a = m[2].replace(/\\'/g, "'");
    items.push({
      q: m[1].replace(/\\'/g, "'"),
      words: a.trim().split(/\s+/).filter(Boolean).length,
    });
  }
  return items;
}

for (const [k, f] of Object.entries(files)) {
  const s = fs.readFileSync(f, 'utf8');
  const names = [...s.matchAll(/export const (\w*Faqs\w*) = \[/g)]
    .map((m) => m[1])
    .filter((n) => !/Hindi/.test(n));
  for (const n of names) {
    const faqs = extractFaqs(s, n);
    console.log(`\n${k} ${n} count=${faqs.length}`);
    faqs.forEach((x, i) =>
      console.log(`  ${i + 1}. words=${x.words} ${x.words < 40 || x.words > 80 ? 'BAD' : 'ok'} | ${x.q.slice(0, 60)}`)
    );
  }
}
