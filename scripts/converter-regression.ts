/**
 * Golden-file regression tests for KrutiDev ↔ Unicode engine.
 * Usage: npx tsx scripts/converter-regression.ts
 */
import { convertText, KrutiDevConverter } from '../src/lib/converter/engine';

const KD_TO_UNI: [string, string][] = [
  ['ueLrs Hkkjr', 'नमस्ते भारत'],
  ['jke', 'राम'],
  ['Hkkjrh;', 'भारतीय'],
  ['pkj', 'चार'],
  ['tkud', 'जानक'],
  ['fgUnh', 'हिन्दी'],
  ['fgUnh gS', 'हिन्दी है'],
];

const ROUND_TRIP_KD = ['ueLrs Hkkjr', 'jke', 'Hkkjrh;', 'fgUnh'];

let failed = 0;

console.log('=== KD → Unicode golden tests ===\n');
for (const [kd, expected] of KD_TO_UNI) {
  const got = convertText(kd, 'kd-to-uni');
  const ok = got === expected;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${kd}`);
  if (!ok) console.log(`  got:      ${got}\n  expected: ${expected}`);
}

console.log('\n=== Round-trip KD → Unicode → KD ===\n');
for (const kd of ROUND_TRIP_KD) {
  const uni = convertText(kd, 'kd-to-uni');
  const back = convertText(uni, 'uni-to-kd');
  const ok = back === kd;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${kd} → ${back}`);
}

console.log('\n=== Unicode → KD golden (sample) ===\n');
const uniSample = 'नमस्ते भारत';
const kdSample = convertText(uniSample, 'uni-to-kd');
const okUni = kdSample === 'ueLrs Hkkjr';
if (!okUni) failed++;
console.log(`${okUni ? 'PASS' : 'FAIL'}  ${uniSample} → ${kdSample}`);

console.log(`\n${failed === 0 ? 'All tests passed.' : failed + ' test(s) failed.'}`);
process.exit(failed === 0 ? 0 : 1);
