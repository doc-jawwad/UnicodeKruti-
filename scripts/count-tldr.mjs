import fs from 'fs';
function wc(s) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
for (const f of [
  'src/content/wp-html/home.html',
  'src/content/wp-html/krutidev-to-unicode-converter.html',
  'src/content/wp-html/krutidev-10-to-unicode-converter.html',
  'src/content/wp-html/krutidev-010-to-unicode-converter.html',
  'src/app/unicode-to-krutidev-10-converter/page.tsx',
  'src/app/font-download/page.tsx',
]) {
  const s = fs.readFileSync(f, 'utf8');
  const m = s.match(/id=["']tldr-block["'][\s\S]*?>([\s\S]*?)<\/p>/);
  console.log(f, m ? wc(m[1]) : 'MISSING');
}
