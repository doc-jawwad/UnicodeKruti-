/**
 * Offline SEO parity check: Astro dist HTML vs source-of-truth metadata.
 * Does not require network access to production.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { homeMeta } from '../../src/content/home.ts';
import { k2uMeta } from '../../src/content/k2u.ts';
import { getCanonicalUrl } from '../../src/lib/seo.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, '../dist');

function read(rel: string) {
  return fs.readFileSync(path.join(dist, rel), 'utf8');
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function text(html: string, re: RegExp): string {
  const m = html.match(re);
  return decodeEntities((m?.[1] || '').trim().replace(/\s+/g, ' '));
}

function meta(html: string) {
  return {
    title: text(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description:
      text(html, /name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      text(html, /content=["']([^"']*)["'][^>]*name=["']description["']/i),
    canonical:
      text(html, /rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
      text(html, /href=["']([^"']*)["'][^>]*rel=["']canonical["']/i),
    robots:
      text(html, /name=["']robots["'][^>]*content=["']([^"']*)["']/i) ||
      text(html, /content=["']([^"']*)["'][^>]*name=["']robots["']/i),
    ogTitle:
      text(html, /property=["']og:title["'][^>]*content=["']([^"']*)["']/i) ||
      text(html, /content=["']([^"']*)["'][^>]*property=["']og:title["']/i),
    ogImage:
      text(html, /property=["']og:image["'][^>]*content=["']([^"']*)["']/i) ||
      text(html, /content=["']([^"']*)["'][^>]*property=["']og:image["']/i),
    twitterCard:
      text(html, /name=["']twitter:card["'][^>]*content=["']([^"']*)["']/i) ||
      text(html, /content=["']([^"']*)["'][^>]*name=["']twitter:card["']/i),
    h1: text(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, ''),
    hasJsonLd: /application\/ld\+json/i.test(html),
    bytes: Buffer.byteLength(html, 'utf8'),
  };
}

const ABOUT_TITLE = 'About UnicodeKruti — Akshay Verma, Hindi Typing Expert';
const ABOUT_DESC =
  'UnicodeKruti is built and verified by Akshay Verma, a software developer and Hindi typing expert. Learn how conversion accuracy is tested and why this tool exists.';

const FONT_TITLE = 'KrutiDev Font Free Download — 010, 10, 055, 011 TTF Files';
const FONT_DESC =
  'Download KrutiDev TTF fonts free — KrutiDev 010 for CPCT and government exams, KrutiDev 055 for Marathi. Install on Windows 10, 11, and Mac in 3 minutes. No signup.';

const CONTACT_TITLE = 'Contact Us';
const CONTACT_DESC =
  'Contact UnicodeKruti.com for converter questions, feedback, or partnership inquiries.';

const pages = [
  {
    file: 'index.html',
    expectTitle: homeMeta.title,
    expectDesc: homeMeta.description,
    expectCanonical: getCanonicalUrl('/'),
    expectOgTitle: homeMeta.title,
  },
  {
    file: 'krutidev-to-unicode-converter/index.html',
    expectTitle: `${k2uMeta.title} | UnicodeKruti`,
    expectDesc: k2uMeta.description,
    expectCanonical: getCanonicalUrl('/krutidev-to-unicode-converter'),
  },
  {
    file: 'about-us/index.html',
    expectTitle: ABOUT_TITLE,
    expectDesc: ABOUT_DESC,
    expectCanonical: getCanonicalUrl('/about-us'),
  },
  {
    file: 'font-download/index.html',
    expectTitle: `${FONT_TITLE} | UnicodeKruti`,
    expectDesc: FONT_DESC,
    expectCanonical: getCanonicalUrl('/font-download'),
  },
  {
    file: 'contact-us/index.html',
    expectTitle: `${CONTACT_TITLE} | UnicodeKruti`,
    expectDesc: CONTACT_DESC,
    expectCanonical: getCanonicalUrl('/contact-us'),
  },
];

console.log('=== Offline SEO parity (dist vs source-of-truth) ===\n');

const sizes: Array<{ page: string; bytes: number }> = [];
let failed = 0;

for (const p of pages) {
  const html = read(p.file);
  const m = meta(html);
  sizes.push({ page: p.file, bytes: m.bytes });
  try {
    assert.equal(m.title, p.expectTitle, 'title');
    assert.equal(m.description, p.expectDesc, 'description');
    assert.equal(m.canonical, p.expectCanonical, 'canonical');
    assert.ok(m.robots.toLowerCase().includes('index'), 'robots index');
    assert.ok(m.hasJsonLd, 'json-ld');
    assert.equal(m.twitterCard, 'summary_large_image', 'twitter card');
    assert.ok(m.ogImage.includes('/og/'), 'og image static');
    assert.ok(m.h1.length > 0, 'h1 present');
    if (p.expectOgTitle) assert.equal(m.ogTitle, p.expectOgTitle, 'og title');
    console.log(`PASS  ${p.file} (${m.bytes} bytes)`);
  } catch (err) {
    failed += 1;
    console.error(`FAIL  ${p.file}:`, err instanceof Error ? err.message : err);
    console.error(m);
  }
}

const robots = read('robots.txt');
assert.ok(robots.includes('Allow: /'), 'robots allow');
assert.ok(robots.includes('Sitemap:'), 'robots sitemap');
assert.ok(!/Disallow: \/$/m.test(robots), 'robots does not block site root');
console.log('PASS  robots.txt');

const sitemap = read('sitemap.xml');
assert.ok(sitemap.includes(getCanonicalUrl('/')));
assert.ok(sitemap.includes(getCanonicalUrl('/krutidev-to-unicode-converter/')));
assert.ok(sitemap.includes(getCanonicalUrl('/about-us/')));
assert.ok(sitemap.includes(getCanonicalUrl('/font-download/')));
assert.ok(sitemap.includes(getCanonicalUrl('/contact-us/')));
console.log('PASS  sitemap.xml');

console.log('\nHTML sizes:', sizes);

if (failed) process.exit(1);
console.log('\nOffline SEO parity passed.');
