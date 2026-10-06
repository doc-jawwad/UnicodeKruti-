/**
 * Side-by-side SEO comparison: production Vercel vs Astro Workers POC.
 *
 * Usage:
 *   POC_BASE_URL=https://unicodekruti-astro-poc.…workers.dev \
 *   PROD_BASE_URL=https://unicodekruti.com \
 *   npx tsx scripts/seo-compare.test.ts
 */
import assert from 'node:assert/strict';

const PROD = (process.env.PROD_BASE_URL || 'https://unicodekruti.com').replace(
  /\/$/,
  ''
);
const POC = (process.env.POC_BASE_URL || '').replace(/\/$/, '');

type DiffClass = 'EXPECTED' | 'BUG' | 'NEEDS DECISION' | 'MATCH';

type FieldDiff = {
  field: string;
  production: string;
  poc: string;
  classification: DiffClass;
  note?: string;
};

const PAGES = [
  '/',
  '/krutidev-to-unicode-converter/',
  '/about-us/',
] as const;

function text(html: string, re: RegExp): string {
  const m = html.match(re);
  return (m?.[1] || '').trim().replace(/\s+/g, ' ');
}

function extract(html: string) {
  return {
    title: text(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    description: text(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
    ) ||
      text(
        html,
        /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i
      ),
    canonical: text(
      html,
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i
    ) ||
      text(
        html,
        /<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i
      ),
    robots: text(
      html,
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i
    ),
    ogTitle: text(
      html,
      /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i
    ),
    ogImage: text(
      html,
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i
    ),
    twitterCard: text(
      html,
      /<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']*)["']/i
    ),
    h1: text(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, ''),
    hasJsonLd: /application\/ld\+json/i.test(html),
    jsonLdSnippet: text(
      html,
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
    ).slice(0, 200),
  };
}

function classify(
  field: string,
  a: string,
  b: string
): { classification: DiffClass; note?: string } {
  if (a === b) return { classification: 'MATCH' };
  if (field === 'canonical' && a.replace(/\/$/, '') === b.replace(/\/$/, '')) {
    return {
      classification: 'EXPECTED',
      note: 'Trailing-slash form differs only in string compare',
    };
  }
  if (field === 'robots') {
    const norm = (s: string) =>
      s
        .toLowerCase()
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean)
        .sort()
        .join(', ');
    if (norm(a) === norm(b) || (a.includes('index') && b.includes('index'))) {
      return { classification: 'EXPECTED', note: 'Robots tokens equivalent' };
    }
  }
  if (field === 'ogImage' && a.includes('/og/') && b.includes('/og/')) {
    return { classification: 'MATCH' };
  }
  if (field === 'jsonLdSnippet') {
    return {
      classification: 'NEEDS DECISION',
      note: 'Compare full JSON-LD offline; snippet-only check',
    };
  }
  return { classification: 'BUG' };
}

async function load(base: string, path: string) {
  const res = await fetch(`${base}${path}`, { redirect: 'follow' });
  const html = await res.text();
  return { status: res.status, finalUrl: res.url, html, meta: extract(html) };
}

async function main() {
  if (!POC) {
    console.error('Set POC_BASE_URL to the Workers preview URL');
    process.exit(1);
  }

  console.log(`PRODUCTION: ${PROD}`);
  console.log(`POC:        ${POC}\n`);

  const report: FieldDiff[] = [];
  let highBugs = 0;

  for (const path of PAGES) {
    console.log(`--- ${path} ---`);
    const prod = await load(PROD, path);
    const poc = await load(POC, path);

    assert.equal(prod.status, 200, `prod ${path}`);
    assert.equal(poc.status, 200, `poc ${path}`);

    const fields: Array<keyof ReturnType<typeof extract>> = [
      'title',
      'description',
      'canonical',
      'robots',
      'ogTitle',
      'ogImage',
      'twitterCard',
      'h1',
    ];

    for (const field of fields) {
      const a = String(prod.meta[field] ?? '');
      const b = String(poc.meta[field] ?? '');
      const { classification, note } = classify(field, a, b);
      if (classification !== 'MATCH') {
        report.push({
          field: `${path} ${field}`,
          production: a,
          poc: b,
          classification,
          note,
        });
        if (classification === 'BUG') highBugs += 1;
      }
      const mark =
        classification === 'MATCH'
          ? 'MATCH'
          : `${classification}${note ? ` (${note})` : ''}`;
      console.log(`  ${field}: ${mark}`);
    }

    if (!poc.meta.hasJsonLd) {
      report.push({
        field: `${path} jsonLd`,
        production: String(prod.meta.hasJsonLd),
        poc: 'missing',
        classification: 'BUG',
      });
      highBugs += 1;
      console.log('  jsonLd: BUG (missing)');
    } else {
      console.log('  jsonLd: present');
    }
  }

  console.log('\n=== DIFF REPORT ===');
  for (const d of report) {
    console.log(
      `[${d.classification}] ${d.field}\n  PROD: ${d.production}\n  POC:  ${d.poc}${d.note ? `\n  NOTE: ${d.note}` : ''}`
    );
  }

  if (highBugs > 0) {
    console.error(`\n${highBugs} BUG classification(s) — review before full rebuild`);
    process.exit(1);
  }
  console.log('\nNo BUG classifications. See EXPECTED / NEEDS DECISION above.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
