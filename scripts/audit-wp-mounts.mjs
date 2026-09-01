import { renderWpHtml } from '../src/lib/wp-html.ts';

const slugs = [
  'home',
  'krutidev-to-unicode-converter',
  'krutidev-010-to-unicode-converter',
  'krutidev-10-to-unicode-converter',
];

for (const s of slugs) {
  const h = renderWpHtml(s);
  const m = h.match(/data-kdc-mode="([^"]+)"[^>]*data-kdc-variant="([^"]+)"/);
  const hasHero = h.includes('id="hero"');
  const hasMount = h.includes('kdc-wp-mount');
  console.log(`${s}: mount=${m ? `${m[1]} variant=${m[2]}` : 'MISSING'} hero=${hasHero} tool=${hasMount}`);
}
