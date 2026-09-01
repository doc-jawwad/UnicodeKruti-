/**
 * One-off audit runner for Converter Tools Audit plan.
 * Usage: node scripts/audit-converters.mjs
 */
import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enginePath = pathToFileURL(
  path.join(__dirname, '../src/lib/converter/engine.ts')
).href;

const { convertText, KrutiDevConverter } = await import(enginePath);

const PAGES = [
  {
    url: '/',
    mode: 'uni-to-kd',
    variant: '010',
    lockMode: false,
    sampleIn: 'नमस्ते भारत',
    sampleOutExpected: 'ueLrs Hkkjr',
  },
  {
    url: '/krutidev-to-unicode',
    mode: 'kd-to-uni',
    variant: '010',
    lockMode: false,
    sampleIn: 'ueLrs Hkkjr',
    sampleOutExpected: 'नमस्ते भारत',
  },
  {
    url: '/krutidev-010-to-unicode-converter',
    mode: 'kd-to-uni',
    variant: '010',
    lockMode: false,
    sampleIn: 'ueLrs Hkkjr',
    sampleOutExpected: 'नमस्ते भारत',
  },
  {
    url: '/krutidev-10-to-unicode-converter',
    mode: 'kd-to-uni',
    variant: '10',
    lockMode: false,
    sampleIn: 'ueLrs Hkkjr',
    sampleOutExpected: 'नमस्ते भारत',
  },
  {
    url: '/unicode-to-krutidev-10-converter',
    mode: 'uni-to-kd',
    variant: '10',
    lockMode: true,
    sampleIn: 'नमस्ते भारत',
    sampleOutExpected: 'ueLrs Hkkjr',
  },
];

const GOLDEN_KD_TO_UNI = [
  ['ueLrs Hkkjr', 'नमस्ते भारत'],
  ['jke', 'राम'],
  ['Hkkjrh;', 'भारतीय'],
  ['pkj', 'चार'],
  ['tkud', 'जानक'],
  ['fgUnh', 'हिन्दी'],
  ['fgUnh gS', 'हिन्दी है'],
];

function cp(s) {
  return [...s].map((c) => 'U+' + c.codePointAt(0).toString(16).toUpperCase()).join(' ');
}

console.log('=== SMOKE TEST: 5 page configs ===\n');
let smokePass = 0;
for (const p of PAGES) {
  const out = convertText(p.sampleIn, p.mode);
  const ok = out === p.sampleOutExpected;
  if (ok) smokePass++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${p.url}`);
  console.log(`  mode=${p.mode} variant=${p.variant} lock=${p.lockMode}`);
  console.log(`  in:  ${p.sampleIn}`);
  console.log(`  out: ${out}`);
  if (!ok) console.log(`  expected: ${p.sampleOutExpected}`);
  console.log('');
}
console.log(`Smoke: ${smokePass}/${PAGES.length} pages\n`);

console.log('=== ROUND-TRIP (no Hindi reading needed) ===\n');
const rtPairs = ['ueLrs Hkkjr', 'jke', 'Hkkjrh;', 'fgUnh'];
let rtPass = 0;
for (const kd of rtPairs) {
  const uni = convertText(kd, 'kd-to-uni');
  const back = convertText(uni, 'uni-to-kd');
  const ok = back === kd;
  if (ok) rtPass++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${kd} -> [unicode] -> ${back}`);
}
console.log(`Round-trip: ${rtPass}/${rtPairs.length}\n`);

console.log('=== GOLDEN KD→UNI (incl. fgUnh) ===\n');
let goldenPass = 0;
const mismatches = [];
for (const [kd, expected] of GOLDEN_KD_TO_UNI) {
  const got = convertText(kd, 'kd-to-uni');
  const ok = got === expected;
  if (ok) goldenPass++;
  else {
    mismatches.push({ kd, expected, got });
    console.log(`FAIL ${kd}`);
    console.log(`  got:      ${got}  (${cp(got)})`);
    console.log(`  expected: ${expected}  (${cp(expected)})`);
  }
}
console.log(`Golden: ${goldenPass}/${GOLDEN_KD_TO_UNI.length}`);
if (mismatches.length === 0) console.log('All golden pairs pass.');
console.log('\n=== END AUDIT ===');
