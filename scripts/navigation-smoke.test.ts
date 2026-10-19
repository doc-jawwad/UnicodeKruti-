import assert from 'node:assert/strict';
import fs from 'node:fs';
import { FOOTER, NAV_LINKS, NAV_VERSIONS } from '../src/lib/site';

const read = (p: string) => fs.readFileSync(p, 'utf8');
const nav = NAV_LINKS.map((item) => item.href);
const versions = NAV_VERSIONS.map((item) => item.href);

assert.deepEqual(nav, ['/', '/krutidev-to-unicode-converter/'], 'converter links lead primary navigation');
assert.equal(NAV_LINKS[0].label, 'Unicode to KrutiDev', 'Home label is replaced');
assert.equal(new Set([...nav, ...versions]).size, nav.length + versions.length, 'converter routes remain unique');
assert(!versions.includes('/mangal-to-krutidev-converter/' as (typeof versions)[number]), 'Mangal is not buried in the dropdown');

const header = read('src/components/layout/SiteHeader.tsx');
const firstLinks = header.indexOf('NAV_LINKS.map');
const dropdown = header.indexOf('Other KrutiDev Tools');
const mangal = header.indexOf('Mangal Converter', dropdown);
const keyboard = header.indexOf('<span>KrutiDev Keyboard</span>', mangal);
const fonts = header.indexOf('Download Fonts', keyboard);
const pwa = header.indexOf('<PwaInstallButton />', fonts);
assert(firstLinks >= 0 && firstLinks < dropdown && dropdown < mangal && mangal < keyboard && keyboard < fonts && fonts < pwa, 'header items must appear in approved order');
assert(header.includes('className="nav-keyboard-btn"') && header.includes('aria-hidden="true" width="18" height="18"'), 'keyboard link has icon');
assert(header.includes('nav-versions') && header.includes('aria-controls="nav-versions"'), 'accessible dropdown');
assert(!header.includes('header-search-container') && !header.includes('search-btn-icon'), 'header search icon removed');

const floating = read('src/components/layout/FloatingWidgets.tsx');
assert(floating.includes('href="/krutidev-keyboard-layout/"'), 'floating keyboard opens full page');
assert(!floating.includes('REMINGTON_ROWS') && !floating.includes('floating-kbd-panel'), 'obsolete panel not restored');
const layout = read('src/app/layout.tsx');
assert(layout.includes('<FloatingWidgets />') && !layout.includes('<FloatingWidgetsLazy />'));
const css = read('src/app/theme.css');
assert(!css.includes('#floating-kbd-panel') && !css.includes('.kbd-row kbd'), 'legacy keyboard CSS absent');
assert(!FOOTER.pages.some((p) => p.href === '/mangal-to-krutidev-converter/'), 'unapproved Mangal footer addition reverted');

// Footer contract: utilities are featured buttons, sitemap is a legal-row utility.
const footerComponent = read('src/components/layout/SiteFooter.tsx');
for (const href of ['/font-download/', '/krutidev-keyboard-layout/', '/sitemap/']) {
  assert(!FOOTER.pages.some((item) => item.href === href), href + ' must not appear in footer Pages');
}
assert(FOOTER.bottomLegal.some((item) => item.href === '/sitemap/'), 'Sitemap belongs in bottom legal links');
assert(footerComponent.indexOf('href="/font-download/"') < footerComponent.indexOf('href="/krutidev-keyboard-layout/"'), 'Keyboard CTA directly follows Font Download');
assert(footerComponent.includes('className="footer-keyboard-btn"') && footerComponent.includes('<svg'), 'Keyboard CTA has icon');
const footerCss = read('src/app/theme.css');
assert(footerCss.includes('.site-footer .footer-brand .footer-buttons-row'), 'footer CTAs are vertically aligned');
assert(footerCss.includes('font-size: clamp(0.84rem, 1.01vw, 0.98rem)'), 'header typography larger on desktop');
console.log('PASS: header/nav and footer utilities');
