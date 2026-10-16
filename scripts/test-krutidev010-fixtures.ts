/**
 * KrutiDev 010 fixture runner — code-point equality against SIL/LTRC goldens.
 * Usage: npx tsx scripts/test-krutidev010-fixtures.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { convertText } from '../src/lib/converter/engine';
import type { KrutiDev010Fixture } from './fixtures/krutidev010/types';

const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'krutidev010');

function cps(s: string): string {
  return [...s]
    .map((c) => 'U+' + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0'))
    .join(' ');
}

function loadFixtures(): KrutiDev010Fixture[] {
  const files = fs
    .readdirSync(FIXTURE_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort();
  const all: KrutiDev010Fixture[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(FIXTURE_DIR, file), 'utf8');
    const parsed = JSON.parse(raw) as KrutiDev010Fixture[];
    if (!Array.isArray(parsed)) {
      throw new Error(`Fixture ${file} must be a JSON array`);
    }
    all.push(...parsed);
  }
  return all;
}

/**
 * Existing Unicode-input round-trip goldens are NFC base+nukta, while the
 * competitor KD decoder copies precomposed nukta letters. Preserve exact
 * strict roundtrips for all OTHER cases; validate these three exact new bytes.
 */
const PRECOMPOSED_NUKTA_ROUNDTRIPS: Readonly<Record<string, string>> = {
  RT12: '\u0958', // क़ → d+ → क़
  RT13: '\u095e', // फ़ → Q+ → फ़
  RT14: '\u095b', // ज़ → t+ → ज़
};

let failed = 0;
const fixtures = loadFixtures();

console.log(`=== KrutiDev 010 fixtures (${fixtures.length} cases) ===\n`);

for (const fx of fixtures) {
  if (fx.category === 'round_trip') {
    const kd = convertText(fx.input, 'uni-to-kd');
    if (fx.lossy) {
      const ok = kd === fx.expected;
      if (!ok) failed++;
      console.log(
        `${ok ? 'PASS' : 'FAIL'}  ${fx.id} lossy Uni→KD ${JSON.stringify(fx.input)}`,
      );
      if (!ok) {
        console.log(`  got ${JSON.stringify(kd)} [${cps(kd)}] expected ${JSON.stringify(fx.expected)}`);
      }
      continue;
    }
    const back = convertText(kd, 'kd-to-uni');
    const expectedNuktaBytes = PRECOMPOSED_NUKTA_ROUNDTRIPS[fx.id];
    const ok = expectedNuktaBytes
      ? back === expectedNuktaBytes &&
        back.normalize('NFC') === fx.input.normalize('NFC')
      : back === fx.input.normalize('NFC');
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${fx.id} RT Uni ${fx.input}`);
    if (!ok) {
      console.log(`  kd=${JSON.stringify(kd)} back=${JSON.stringify(back)} [${cps(back)}]`);
    }
    continue;
  }

  const direction = fx.direction ?? 'kd-to-uni';
  const got = convertText(fx.input, direction);
  const expected = fx.expected.normalize('NFC');
  const actual = got.normalize('NFC');
  const ok = actual === expected;
  if (!ok) failed++;
  console.log(
    `${ok ? 'PASS' : 'FAIL'}  ${fx.id} [${fx.category}] ${JSON.stringify(fx.input)}`,
  );
  if (!ok) {
    console.log(`  got      ${JSON.stringify(actual)} [${cps(actual)}]`);
    console.log(`  expected ${JSON.stringify(expected)} [${cps(expected)}]`);
    if (fx.notes) console.log(`  notes: ${fx.notes}`);
  }
}

console.log(
  `\n${failed === 0 ? `All ${fixtures.length} fixtures passed.` : `${failed} of ${fixtures.length} fixture(s) failed.`}`,
);
process.exit(failed === 0 ? 0 : 1);
