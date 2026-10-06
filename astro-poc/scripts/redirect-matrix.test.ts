/**
 * Complete redirect/status matrix from production `site-redirects.ts`.
 *
 * POC_BASE_URL=http://127.0.0.1:8787 npx tsx scripts/redirect-matrix.test.ts
 *
 * Destination HTTP 200 is only required when the final path is a POC-hosted page.
 * Other destinations must still receive a single 308 to the exact canonical path.
 */
import assert from 'node:assert/strict';
import {
  LEGACY_REDIRECTS,
  SITEMAP_XML_REDIRECTS,
  assertNoRedirectChainsOrLoops,
  shouldHard404,
  withTrailingSlash,
} from '../../src/lib/site-redirects.ts';

const BASE = (process.env.POC_BASE_URL || 'http://127.0.0.1:8787').replace(
  /\/$/,
  ''
);

/** Pages that return 200 on this Astro POC. */
const POC_HOSTED = new Set([
  '/',
  '/krutidev-to-unicode-converter/',
  '/about-us/',
  '/font-download/',
  '/contact-us/',
  '/sitemap.xml',
  '/robots.txt',
]);

type Case = {
  name: string;
  path: string;
  expectRedirects: number;
  expectFinalPath: string;
  expectFinalStatus: number;
  expectRobots?: string | null;
};

function buildCases(): Case[] {
  assertNoRedirectChainsOrLoops();

  const cases: Case[] = [];

  for (const { source, destination } of [
    ...LEGACY_REDIRECTS,
    ...SITEMAP_XML_REDIRECTS,
  ]) {
    const hosted = POC_HOSTED.has(destination);
    cases.push({
      name: `legacy ${source} → ${destination}`,
      path: source,
      expectRedirects: 1,
      expectFinalPath: destination,
      expectFinalStatus: hosted ? 200 : 404,
    });
  }

  // Author remap
  for (const path of ['/author', '/author/', '/author/akshay-verma/']) {
    cases.push({
      name: `author remap ${path}`,
      path,
      expectRedirects: 1,
      expectFinalPath: '/about-us/',
      expectFinalStatus: 200,
    });
  }

  // Trailing slash on POC pages
  for (const path of [
    '/krutidev-to-unicode-converter',
    '/about-us',
    '/font-download',
    '/contact-us',
  ]) {
    cases.push({
      name: `slash ${path}`,
      path,
      expectRedirects: 1,
      expectFinalPath: withTrailingSlash(path),
      expectFinalStatus: 200,
    });
  }

  // Canonical already-slashed
  for (const path of [
    '/',
    '/krutidev-to-unicode-converter/',
    '/about-us/',
    '/font-download/',
    '/contact-us/',
  ]) {
    cases.push({
      name: `canonical 200 ${path}`,
      path,
      expectRedirects: 0,
      expectFinalPath: path,
      expectFinalStatus: 200,
    });
  }

  // Hard 404 samples (full pattern coverage + blog resurrection block)
  const hard404Samples = [
    '/wp-admin/',
    '/wp-login.php',
    '/xmlrpc.php',
    '/wp-includes/js/wp.js',
    '/wp-content/plugins/x/',
    '/wp-content/themes/x/',
    '/wp-content/uploads/fonts/x.ttf',
    '/feed/',
    '/comments/feed/',
    '/category/news/',
    '/tag/hindi/',
    '/page/2/',
    '/2024/01/15/',
    '/blog/',
    '/blog/unpublished-post/',
  ];

  for (const path of hard404Samples) {
    assert.equal(shouldHard404(path), true, `fixture shouldHard404 ${path}`);
    cases.push({
      name: `hard404 ${path}`,
      path,
      expectRedirects: 0,
      expectFinalPath: path,
      expectFinalStatus: 404,
      expectRobots: 'noindex, nofollow',
    });
  }

  // Known blog redirect must NOT hard-404
  assert.equal(
    shouldHard404('/blog/what-is-kruti-dev-font/'),
    false,
    'known blog must redirect not 404'
  );

  return cases;
}

async function follow(path: string) {
  let url = `${BASE}${path}`;
  let redirects = 0;
  let res = await fetch(url, { redirect: 'manual' });
  const chain: Array<{ status: number; location?: string | null }> = [
    { status: res.status, location: res.headers.get('location') },
  ];

  while (res.status >= 300 && res.status < 400 && redirects < 5) {
    const loc = res.headers.get('location');
    if (!loc) break;
    redirects += 1;
    url = new URL(loc, url).toString();
    res = await fetch(url, { redirect: 'manual' });
    chain.push({ status: res.status, location: res.headers.get('location') });
  }

  return {
    status: res.status,
    finalPath: new URL(url).pathname,
    redirects,
    robotsTag: res.headers.get('x-robots-tag'),
    chain,
  };
}

async function main() {
  const cases = buildCases();
  console.log(`=== Full redirect matrix (${cases.length} cases) vs ${BASE} ===\n`);
  let failed = 0;

  for (const c of cases) {
    try {
      const result = await follow(c.path);
      assert.equal(
        result.redirects,
        c.expectRedirects,
        `redirects for ${c.name}: ${JSON.stringify(result.chain)}`
      );
      assert.equal(result.finalPath, c.expectFinalPath, `finalPath ${c.name}`);
      assert.equal(result.status, c.expectFinalStatus, `status ${c.name}`);
      if (c.expectRobots !== undefined) {
        assert.equal(result.robotsTag, c.expectRobots, `robots ${c.name}`);
      }
      console.log(`PASS  ${c.name}`);
    } catch (err) {
      failed += 1;
      console.error(
        `FAIL  ${c.name}:`,
        err instanceof Error ? err.message : err
      );
    }
  }

  if (failed) {
    console.error(`\n${failed}/${cases.length} failed`);
    process.exit(1);
  }
  console.log(`\nAll ${cases.length} redirect cases passed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
