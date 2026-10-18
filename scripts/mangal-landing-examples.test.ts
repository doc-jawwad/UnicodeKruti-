/**
 * Targeted check: every worked example on /mangal-to-krutidev-converter
 * matches the real engine output (uni-to-kd, 010).
 * Usage: npx tsx scripts/mangal-landing-examples.test.ts
 */
import { convertText } from '../src/lib/converter/engine';

const cases: [string, string][] = [
  ['भारत', 'Hkkjr'],
  ['नमस्ते भारत', 'ueLrs Hkkjr'],
  ['किताब', 'fdrkc'],
  ['क्लिक', 'fDyd'],
  ['स्थिति', 'fLFkfr'],
  ['धर्म', '/keZ'],
  ['प्रकाश', 'çdk\'k'],
  ['पक्का', 'iôk'],
  ['ज्ञान', 'Kku'],
  ['\u091C\u093C\u0930\u0942\u0930\u0924', 't+:jr'],
  ['क्षत्रिय', '{kf=;'],
  ['12-10-2026', '12&10&2026'],
  ['https://example.com/a-b', 'https:@@example-com@a&b'],
  ['भारत, India! 12-10-2026', 'Hkkjr] India! 12&10&2026'],
];

let failed = 0;
for (const [input, expected] of cases) {
  const got = convertText(input, 'uni-to-kd');
  const ok = got === expected;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${JSON.stringify(input)} -> ${JSON.stringify(got)}${ok ? '' : ` (expected ${JSON.stringify(expected)})`}`);
}
console.log(failed ? `\n${failed} FAILED` : `\nAll ${cases.length} examples match.`);
process.exit(failed ? 1 : 0);
