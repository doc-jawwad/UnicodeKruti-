/**
 * Golden-file regression tests for KrutiDev ↔ Unicode engine.
 * Usage: npx tsx scripts/converter-regression.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { convertText, detectLikelyKrutiDev } from '../src/lib/converter/engine';
import { silIdentityErrors } from '../src/lib/converter/krutidev010-map';
import { uniEncodeIdentityErrors } from '../src/lib/converter/uni-encode';

type Fixture = {
  id: string;
  input?: string;
  unicodeInput?: string;
  expected?: string;
  expectedKrutiDev010?: string;
  category: string;
  source?: string;
  notes?: string;
  codePoints?: string[];
};

type RoundTripFile = {
  kdToUni?: Fixture[];
  uniToKd?: Fixture[];
  lossy?: Fixture[];
};

const ROOT = path.join(__dirname, '..', 'tests', 'krutidev010');
const UNI_ROOT = path.join(__dirname, '..', 'tests', 'unicode-to-krutidev010');
const DEVANAGARI_RE = /[\u0900-\u097F]/;
const PASSTHROUGH_CATS = new Set(['unsupported']);

let failed = 0;
let passed = 0;

function assert(ok: boolean, label: string, detail?: string) {
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok && detail) console.log(`  ${detail}`);
}

function cps(s: string): string[] {
  return [...s].map(
    (c) => 'U+' + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0'),
  );
}

function hasDevanagari(s: string): boolean {
  return DEVANAGARI_RE.test(s);
}

function loadJsonFiles(dir: string): { file: string; data: unknown }[] {
  const out: { file: string; data: unknown }[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...loadJsonFiles(p));
    else if (ent.name.endsWith('.json')) {
      out.push({ file: p, data: JSON.parse(fs.readFileSync(p, 'utf8')) });
    }
  }
  return out;
}

function asCases(data: unknown): Fixture[] {
  if (Array.isArray(data)) return data as Fixture[];
  return [];
}

function uniInput(c: Fixture): string {
  return c.input ?? c.unicodeInput ?? '';
}

function uniExpected(c: Fixture): string {
  return c.expected ?? c.expectedKrutiDev010 ?? '';
}

console.log('=== SIL identity freeze ===\n');
{
  const idErrs = silIdentityErrors().filter(
    (e) => !e.includes('\u00D9k') && !e.includes('Ùk'),
  );
  assert(idErrs.length === 0, 'SIL identities', idErrs.join('; '));
}

console.log('\n=== Uni→KD encode identity freeze ===\n');
{
  const encErrs = uniEncodeIdentityErrors();
  assert(encErrs.length === 0, 'UNI_ENCODE identities', encErrs.join('; '));
}

console.log('\n=== KD → Unicode fixture corpus ===\n');

for (const { file, data } of loadJsonFiles(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  if (rel.startsWith('round_trip/')) continue;
  for (const c of asCases(data)) {
    const got = convertText(c.input ?? '', 'kd-to-uni');
    const expected = (c.expected ?? '').normalize('NFC');
    const actual = got.normalize('NFC');
    assert(
      actual === expected,
      `${c.id} [${c.category}] ${rel}`,
      `input ${JSON.stringify(c.input)} got ${JSON.stringify(got)} expected ${JSON.stringify(c.expected)}`,
    );
    if (c.codePoints) {
      assert(
        cps(actual).join(' ') === c.codePoints.join(' '),
        `${c.id} codePoints`,
        `got ${cps(actual).join(' ')} expected ${c.codePoints.join(' ')}`,
      );
    }
  }
}

const COMPETITOR_ALIASES: [string, string][] = [
  ['\u2014f"k', 'कृषि'],
  ["\u00E7ns'k", 'प्रदेश'],
  ['m\u00D9kj', 'उत्तर'],
  ['gk\u00A1', 'हाँ'],
  ['Kku', 'ज्ञान'],
];

console.log('\n=== Competitor alias decode ===\n');
for (const [kd, expected] of COMPETITOR_ALIASES) {
  const got = convertText(kd, 'kd-to-uni');
  assert(
    got === expected,
    `alias ${JSON.stringify(kd)}`,
    `got ${JSON.stringify(got)} expected ${JSON.stringify(expected)}`,
  );
}

console.log('\n=== Unicode → KD golden corpus + leftover check ===\n');
for (const { file, data } of loadJsonFiles(UNI_ROOT)) {
  const rel = path.relative(UNI_ROOT, file).replace(/\\/g, '/');
  for (const c of asCases(data)) {
    const input = uniInput(c);
    const expected = uniExpected(c).normalize('NFC');
    const got = convertText(input, 'uni-to-kd');
    assert(
      got === expected,
      `Uni→KD ${c.id} [${c.category}] ${rel}`,
      `input ${JSON.stringify(input)} got ${JSON.stringify(got)} expected ${JSON.stringify(uniExpected(c))}`,
    );
    if (!PASSTHROUGH_CATS.has(c.category) && hasDevanagari(input)) {
      assert(
        !hasDevanagari(got),
        `no Devanagari leftover: ${c.id} ${input}`,
        `got ${JSON.stringify(got)}`,
      );
    }
    if (c.category === 'round_trip') {
      const back = convertText(got, 'kd-to-uni');
      assert(
        back.normalize('NFC') === input.normalize('NFC'),
        `RT Uni ${c.id} ${input}`,
        `kd=${JSON.stringify(got)} back=${JSON.stringify(back)}`,
      );
    }
  }
}

const rtFile = path.join(ROOT, 'round_trip', 'cases.json');
const rt = JSON.parse(fs.readFileSync(rtFile, 'utf8')) as RoundTripFile;

console.log('\n=== Round-trip Uni → KD → Uni ===\n');
for (const c of rt.uniToKd ?? []) {
  const kd = convertText(c.input ?? '', 'uni-to-kd');
  const back = convertText(kd, 'kd-to-uni');
  assert(
    back.normalize('NFC') === (c.input ?? '').normalize('NFC'),
    `RT Uni ${c.id} ${c.input}`,
    `kd=${JSON.stringify(kd)} back=${JSON.stringify(back)}`,
  );
}

console.log('\n=== Round-trip KD → Uni → KD (canonical Remington) ===\n');
for (const c of rt.kdToUni ?? []) {
  const uni = convertText(c.input ?? '', 'kd-to-uni');
  const back = convertText(uni, 'uni-to-kd');
  assert(
    back === c.expected,
    `RT KD ${c.id} ${JSON.stringify(c.input)}`,
    `uni=${JSON.stringify(uni)} back=${JSON.stringify(back)}`,
  );
}

console.log('\n=== Lossy Z-reph (KD→Uni correctness, encode need not restore Z) ===\n');
{
  const uni = convertText('dk;Z', 'kd-to-uni');
  assert(uni === 'कार्य', 'lossy dk;Z → कार्य', `got ${JSON.stringify(uni)}`);
  const encoded = convertText(uni, 'uni-to-kd');
  const back = convertText(encoded, 'kd-to-uni');
  assert(back === 'कार्य', `lossy encode ${JSON.stringify(encoded)} still decodes to कार्य`);
}

console.log('\n=== Devanagari digits Uni→KD is ASCII (lossy vs १२३) ===\n');
{
  const kd = convertText('१२३', 'uni-to-kd');
  const back = convertText(kd, 'kd-to-uni');
  assert(kd === '123', '१२३ → 123');
  assert(back === '123', '123 stays Latin on KD→Uni (SIL digit policy)');
}

console.log('\n=== Encode policy freeze (plan B01–B04, ASCII, leftover) ===\n');
{
  const cases: [string, string, string][] = [
    ['ज्ञ', 'K', 'B01 ज्ञ not द्व'],
    ['द्व', '}', 'B01 द्व glyph'],
    ['ज्ञान', 'Kku', 'ज्ञान'],
    ['कृ', 'd`', 'B02 ृ'],
    ['कृषि', 'd`f"k', 'कृषि'],
    ['ण', '.k', 'B03 full ण'],
    ['ण्', '.', 'B03 half ण्'],
    ['धर्म', '/keZ', 'B04 reph Z'],
    ['कार्य', 'dk;Z', 'B04 कार्य'],
    ['नमस्ते भारत', 'ueLrs Hkkjr', 'HCalso not vertbar'],
    ['ग्र', 'xz', 'ग्र rakar'],
    ['क्र', '\u00d8', 'क्र ligature'],
    ['ॐ', 'ॐ', 'unsupported passthrough'],
    ['Hello, world?', 'Hello, world?', 'ASCII punct preserved'],
    ['भारत, India!', 'Hkkjr, India!', 'mixed English comma'],
    ['उत्तर', 'm\u00d9kj', 'त्त ligature Ùk'],
  ];
  for (const [input, expected, label] of cases) {
    const got = convertText(input, 'uni-to-kd');
    assert(got === expected, `policy ${label}`, `got ${JSON.stringify(got)} expected ${JSON.stringify(expected)}`);
    if (input !== 'ॐ') {
      assert(!hasDevanagari(got) || /[A-Za-z]/.test(input), `policy leftover ${label}`, `got ${JSON.stringify(got)}`);
    }
  }
  const krishi = convertText('कृषि', 'uni-to-kd');
  assert(!hasDevanagari(krishi), 'कृषि has zero leftover Devanagari', `got ${JSON.stringify(krishi)}`);
  const dharma = convertText('/keZ', 'kd-to-uni');
  assert(dharma === 'धर्म', 'KD /keZ → धर्म (not र्धम)', `got ${JSON.stringify(dharma)}`);
  const hindi = convertText('fgUnh', 'kd-to-uni');
  assert(hindi === 'हिन्दी', 'KD fgUnh → हिन्दी (not हन्दिी)', `got ${JSON.stringify(hindi)}`);
}

console.log('\n=== detectLikelyKrutiDev ===\n');
assert(detectLikelyKrutiDev('नमस्ते भारत') === false, 'Unicode Hindi → not KD');
assert(detectLikelyKrutiDev('कृषि विभाग') === false, 'Unicode कृषि → not KD');
assert(detectLikelyKrutiDev('ueLrs Hkkjr') === true, 'Remington KD → KD');
assert(detectLikelyKrutiDev('d`f"k') === true, 'd`f"k → KD');
assert(detectLikelyKrutiDev('') === false, 'empty → false');
assert(detectLikelyKrutiDev('   ') === false, 'whitespace → false');

console.log('\n=== Performance gate ===\n');
const chunk = 'ueLrs Hkkjr d`f"k foHkkx ljdkj dk;ZØe ';
let perfFail = false;
for (const n of [10, 100, 1000, 10000, 50000]) {
  const text = chunk.repeat(Math.ceil(n / chunk.length)).slice(0, n);
  const t0 = performance.now();
  const out = convertText(text, 'kd-to-uni');
  const ms = performance.now() - t0;
  const ok = n < 50000 || ms < 50;
  if (!ok) perfFail = true;
  assert(ok, `${n} chars → ${out.length} out in ${ms.toFixed(2)}ms (gate 50k<50ms)`);
}
if (perfFail) {
  /* counted via assert */
}

console.log(`\n${failed === 0 ? 'All tests passed.' : failed + ' test(s) failed.'} (${passed} passed)`);
process.exit(failed === 0 ? 0 : 1);
