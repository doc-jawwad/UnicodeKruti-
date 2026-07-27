import fs from 'fs';

for (const f of [
  'src/content/wp-html/home.html',
  'src/content/wp-html/krutidev-to-unicode-converter.html',
  'src/content/wp-html/krutidev-10-to-unicode-converter.html',
  'src/content/wp-html/krutidev-010-to-unicode-converter.html',
]) {
  const s = fs.readFileSync(f, 'utf8');
  const refs = /aria-label=["']References["']/.test(s);
  const ol = /id=["']references/.test(s) && /<ol[\s>]/.test(s);
  const nofollow = (s.match(/rel=["']noopener noreferrer nofollow["']/g) || []).length;
  const hiSec = (s.match(/lang=["']hi["']/g) || []).length;
  const double = (s.match(/lang=["']hi["'][^>]*>\s*<span lang=["']hi["']/g) || []).length;
  console.log(f.split('/').pop(), { refs, ol, nofollow, hiSec, nestedHi: double });
}
