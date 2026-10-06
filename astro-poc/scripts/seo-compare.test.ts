/**
 * Deterministic PROD vs POC meta-diff with retries.
 *
 * Modes:
 *   POC_BASE_URL=https://…workers.dev PROD_BASE_URL=https://unicodekruti.com
 *   POC_MODE=dist  → compare POC from dist HTML files (no network for POC)
 *
 * Known EXPECTED differences are allowlisted. Unexplained diffs fail the run.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');

const PROD = (process.env.PROD_BASE_URL || 'https://unicodekruti.com').replace(
  /\/$/,
  ''
);
const POC = (process.env.POC_BASE_URL || '').replace(/\/$/, '');
const POC_MODE = process.env.POC_MODE || (POC ? 'url' : 'dist');
const RETRIES = Number(process.env.META_DIFF_RETRIES || 3);
const RETRY_MS = Number(process.env.META_DIFF_RETRY_MS || 2000);

const PAGES = [
  '/',
  '/krutidev-to-unicode-converter/',
  '/about-us/',
  '/font-download/',
  '/contact-us/',
] as const;

type DiffClass = 'MATCH' | 'EXPECTED' | 'REGRESSION';

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function pick(html: string, ...res: RegExp[]): string {
  for (const re of res) {
    const m = html.match(re);
    if (m?.[1]) return decode(m[1]);
  }
  return '';
}

function extract(html: string) {
  return {
    title: pick(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: pick(
      html,
      /name=["']description["'][^>]*content=["']([^"']*)["']/i,
      /content=["']([^"']*)["'][^>]*name=["']description["']/i
    ),
    canonical: pick(
      html,
      /rel=["']canonical["'][^>]*href=["']([^"']*)["']/i,
      /href=["']([^"']*)["'][^>]*rel=["']canonical["']/i
    ),
    robots: pick(
      html,
      /name=["']robots["'][^>]*content=["']([^"']*)["']/i,
      /content=["']([^"']*)["'][^>]*name=["']robots["']/i
    ),
    ogTitle: pick(
      html,
      /property=["']og:title["'][^>]*content=["']([^"']*)["']/i,
      /content=["']([^"']*)["'][^>]*property=["']og:title["']/i
    ),
    ogImage: pick(
      html,
      /property=["']og:image["'][^>]*content=["']([^"']*)["']/i,
      /content=["']([^"']*)["'][^>]*property=["']og:image["']/i
    ),
    twitterCard: pick(
      html,
      /name=["']twitter:card["'][^>]*content=["']([^"']*)["']/i,
      /content=["']([^"']*)["'][^>]*name=["']twitter:card["']/i
    ),
    h1: pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, ''),
    hasJsonLd: /application\/ld\+json/i.test(html),
    hasTldr: /id=["']tldr-block["']/.test(html),
  };
}

function normalizeRobots(s: string): string {
  return s
    .toLowerCase()
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
    .sort()
    .join(', ');
}

function classify(
  field: string,
  prod: string | boolean,
  poc: string | boolean
): { classification: DiffClass; note?: string } {
  if (prod === poc) return { classification: 'MATCH' };

  if (field === 'robots' && typeof prod === 'string' && typeof poc === 'string') {
    const a = normalizeRobots(prod);
    const b = normalizeRobots(poc);
    if (a === b) return { classification: 'MATCH' };
    if (a.includes('index') && b.includes('index') && !a.includes('noindex') && !b.includes('noindex')) {
      return { classification: 'EXPECTED', note: 'index/follow token order/extra directives' };
    }
  }

  if (field === 'ogImage' && typeof prod === 'string' && typeof poc === 'string') {
    // Static /og/* is the POC contract; Next may also use /opengraph-image edge route in some tags
    if (poc.includes('/og/') && (prod.includes('/og/') || prod.includes('opengraph-image'))) {
      if (prod.includes('/og/') && poc.includes('/og/')) {
        const prodFile = prod.split('/og/')[1];
        const pocFile = poc.split('/og/')[1];
        if (prodFile === pocFile) return { classification: 'MATCH' };
      }
      return {
        classification: 'EXPECTED',
        note: 'static /og/* vs possible Next edge OG URL',
      };
    }
  }

  if (field === 'title' && typeof prod === 'string' && typeof poc === 'string') {
    const strip = (s: string) => s.replace(/\s*\|\s*UnicodeKruti\s*$/i, '');
    if (strip(prod) === strip(poc)) {
      return { classification: 'EXPECTED', note: 'title template suffix variance' };
    }
  }

  if (field === 'ogTitle' && typeof prod === 'string' && typeof poc === 'string') {
    const strip = (s: string) => s.replace(/\s*\|\s*UnicodeKruti\s*$/i, '');
    if (strip(prod) === strip(poc) || prod === poc) {
      return { classification: 'EXPECTED', note: 'site-name suffix variance' };
    }
  }

  return { classification: 'REGRESSION' };
}

async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function fetchHtml(url: string): Promise<{ status: number; html: string; finalUrl: string }> {
  let lastErr: unknown;
  for (let i = 0; i < RETRIES; i++) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: { 'user-agent': 'UnicodeKruti-AstroPoc-MetaDiff/1.0' },
      });
      const html = await res.text();
      return { status: res.status, html, finalUrl: res.url };
    } catch (err) {
      lastErr = err;
      if (i < RETRIES - 1) await sleep(RETRY_MS * (i + 1));
    }
  }
  throw lastErr;
}

function distFileFor(pagePath: string): string {
  if (pagePath === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, pagePath.replace(/^\//, ''), 'index.html');
}

async function loadPoc(pagePath: string) {
  if (POC_MODE === 'dist') {
    const file = distFileFor(pagePath);
    assert.ok(fs.existsSync(file), `missing dist ${file}`);
    const html = fs.readFileSync(file, 'utf8');
    return { status: 200, html, finalUrl: `file://${file}` };
  }
  assert.ok(POC, 'POC_BASE_URL required when POC_MODE=url');
  return fetchHtml(`${POC}${pagePath}`);
}

async function main() {
  console.log(`PROD: ${PROD}`);
  console.log(`POC mode: ${POC_MODE}${POC ? ` (${POC})` : ' (dist)'}\n`);

  let regressions = 0;
  let networkFailures = 0;

  for (const pagePath of PAGES) {
    console.log(`--- ${pagePath} ---`);
    let prod;
    let poc;
    try {
      prod = await fetchHtml(`${PROD}${pagePath}`);
    } catch (err) {
      networkFailures += 1;
      console.error(`NETWORK PROD ${pagePath}:`, err instanceof Error ? err.message : err);
      continue;
    }
    try {
      poc = await loadPoc(pagePath);
    } catch (err) {
      networkFailures += 1;
      console.error(`NETWORK/POC ${pagePath}:`, err instanceof Error ? err.message : err);
      continue;
    }

    assert.equal(prod.status, 200, `prod status ${pagePath}`);
    assert.equal(poc.status, 200, `poc status ${pagePath}`);

    const a = extract(prod.html);
    const b = extract(poc.html);
    const fields = [
      'title',
      'description',
      'canonical',
      'robots',
      'ogTitle',
      'ogImage',
      'twitterCard',
      'h1',
      'hasJsonLd',
      'hasTldr',
    ] as const;

    for (const field of fields) {
      const { classification, note } = classify(field, a[field], b[field]);
      if (classification === 'MATCH') {
        console.log(`  ${field}: MATCH`);
        continue;
      }
      console.log(
        `  ${field}: ${classification}${note ? ` (${note})` : ''}\n    PROD: ${a[field]}\n    POC:  ${b[field]}`
      );
      if (classification === 'REGRESSION') regressions += 1;
    }
  }

  if (networkFailures) {
    console.error(
      `\n${networkFailures} network/environment failure(s). Re-run with POC_MODE=dist for deterministic local gate, or increase META_DIFF_RETRIES.`
    );
    process.exit(2);
  }
  if (regressions) {
    console.error(`\n${regressions} REGRESSION difference(s)`);
    process.exit(1);
  }
  console.log('\nMeta-diff passed (MATCH + allowlisted EXPECTED only).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
