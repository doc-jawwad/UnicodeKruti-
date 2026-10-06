/**
 * Local redirect/status matrix for the Astro POC Worker.
 * Run against a live preview URL: POC_BASE_URL=https://….workers.dev npx tsx scripts/redirect-matrix.test.ts
 * Or against wrangler dev: POC_BASE_URL=http://127.0.0.1:8787
 */
import assert from 'node:assert/strict';

const BASE = (process.env.POC_BASE_URL || 'http://127.0.0.1:8787').replace(
  /\/$/,
  ''
);

type Expect = {
  name: string;
  path: string;
  status: number;
  finalPath?: string;
  maxRedirects?: number;
  robotsTag?: string | null;
};

const cases: Expect[] = [
  {
    name: 'home 200',
    path: '/',
    status: 200,
    finalPath: '/',
    maxRedirects: 0,
  },
  {
    name: 'k2u without slash → slash',
    path: '/krutidev-to-unicode-converter',
    status: 200,
    finalPath: '/krutidev-to-unicode-converter/',
    maxRedirects: 1,
  },
  {
    name: 'about without slash → slash',
    path: '/about-us',
    status: 200,
    finalPath: '/about-us/',
    maxRedirects: 1,
  },
  {
    name: 'legacy k2u short → canonical',
    path: '/krutidev-to-unicode',
    status: 200,
    finalPath: '/krutidev-to-unicode-converter/',
    maxRedirects: 1,
  },
  {
    name: 'legacy /about → /about-us/',
    path: '/about',
    status: 200,
    finalPath: '/about-us/',
    maxRedirects: 1,
  },
  {
    name: 'legacy /home → /',
    path: '/home',
    status: 200,
    finalPath: '/',
    maxRedirects: 1,
  },
  {
    name: 'hard 404 wp-admin',
    path: '/wp-admin/',
    status: 404,
    maxRedirects: 0,
    robotsTag: 'noindex, nofollow',
  },
  {
    name: 'hard 404 unknown blog',
    path: '/blog/does-not-exist/',
    status: 404,
    maxRedirects: 0,
    robotsTag: 'noindex, nofollow',
  },
];

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

  const finalUrl = new URL(url);
  return {
    status: res.status,
    finalPath: finalUrl.pathname,
    redirects,
    robotsTag: res.headers.get('x-robots-tag'),
    chain,
  };
}

async function main() {
  console.log(`=== Redirect matrix vs ${BASE} ===\n`);
  let failed = 0;

  for (const c of cases) {
    try {
      const result = await follow(c.path);
      assert.equal(result.status, c.status, `status for ${c.name}`);
      if (c.finalPath !== undefined) {
        assert.equal(result.finalPath, c.finalPath, `finalPath for ${c.name}`);
      }
      if (c.maxRedirects !== undefined) {
        assert.ok(
          result.redirects <= c.maxRedirects,
          `redirects ${result.redirects} > ${c.maxRedirects} for ${c.name}: ${JSON.stringify(result.chain)}`
        );
      }
      if (c.robotsTag !== undefined) {
        assert.equal(
          result.robotsTag,
          c.robotsTag,
          `robots for ${c.name}`
        );
      }
      console.log(`PASS  ${c.name}`);
    } catch (err) {
      failed += 1;
      console.error(`FAIL  ${c.name}:`, err instanceof Error ? err.message : err);
    }
  }

  if (failed) {
    console.error(`\n${failed} case(s) failed`);
    process.exit(1);
  }
  console.log('\nAll redirect matrix cases passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
