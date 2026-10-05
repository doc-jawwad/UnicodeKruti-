/**
 * Smoke test: GA4 gtag stub must push the Arguments object (not a rest-params Array).
 * Usage: npx tsx scripts/gtag-stub-smoke.test.ts
 */
import fs from 'node:fs';
import path from 'node:path';

let failed = 0;
let passed = 0;

function assert(ok: boolean, label: string, detail?: string) {
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok && detail) console.log(`  ${detail}`);
}

console.log('=== gtag stub Arguments-object smoke ===\n');

const analyticsPath = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'seo',
  'Analytics.tsx',
);
const src = fs.readFileSync(analyticsPath, 'utf8');

// Isolate the gtag bootstrap block (between dataLayer init and gtag('js')).
const bootMatch = src.match(
  /g\.dataLayer\s*=\s*g\.dataLayer\s*\|\|\s*\[\];([\s\S]*?)g\.gtag\(\s*['"]js['"]/,
);
assert(!!bootMatch, 'Analytics.tsx contains gtag dataLayer bootstrap block');

const boot = bootMatch?.[1] ?? '';

assert(
  /dataLayer!\.push\(\s*arguments\s*\)/.test(boot) ||
    /dataLayer\.push\(\s*arguments\s*\)/.test(boot),
  'gtag stub pushes `arguments` (Arguments object)',
);

assert(
  !/function\s+gtag\s*\(\s*\.\.\./.test(boot) &&
    !/function\s*\(\s*\.\.\.\s*args/.test(boot),
  'gtag stub does not use rest-params signature',
);

assert(
  !/dataLayer!\.push\(\s*args\s*\)/.test(boot) &&
    !/dataLayer\.push\(\s*args\s*\)/.test(boot) &&
    !/dataLayer!\.push\(\s*\[\s*\.\.\./.test(boot),
  'gtag stub does not push a rest-params Array',
);

// Runtime shape: Arguments is array-like but not Array; gtag.js relies on that.
{
  const dataLayer: unknown[] = [];
  type GtagFn = (...args: unknown[]) => void;
  const gtagCorrect = function () {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  } as GtagFn;
  const gtagBroken = function (...args: unknown[]) {
    dataLayer.push(args);
  };

  gtagCorrect('config', 'G-YVDR26LEM8');
  const correctEntry = dataLayer[0];
  assert(
    correctEntry != null &&
      typeof correctEntry === 'object' &&
      !Array.isArray(correctEntry) &&
      (correctEntry as IArguments).length === 2 &&
      (correctEntry as IArguments)[0] === 'config',
    'Arguments-object push is not an Array (gtag.js-compatible)',
  );

  dataLayer.length = 0;
  gtagBroken('config', 'G-YVDR26LEM8');
  const brokenEntry = dataLayer[0];
  assert(
    Array.isArray(brokenEntry),
    'rest-params push produces an Array (the production bug shape)',
  );
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
