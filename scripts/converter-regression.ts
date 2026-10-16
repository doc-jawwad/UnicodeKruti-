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
  ['\u2014', 'कृ'],
  ['\u2013', 'दृ'],
  ["\u2013';", 'दृश्य'],
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

console.log('\n=== Competitor Uni→KD corpus (krutidevunicodeconverter.com) ===\n');
{
  type CorpusCase = {
    id: string;
    unicode?: string;
    competitorKrutiDev?: string;
    competitorUnicode?: string;
    kd?: string;
    /** Expected KD→Uni of competitorKrutiDev when round-trip is not identity. */
    kdToUni?: string;
    /**
     * When unicode+competitorKrutiDev are set:
     * - true (default if omitted): assert Uni→KD→Uni === unicode
     * - false: forward-only (optionally assert kdToUni of encoded form)
     */
    roundTrip?: boolean;
    skip?: boolean;
    notes?: string;
  };
  const refDir = path.join(__dirname, '..', 'tests', 'competitor-reference');
  const corpusFiles = [
    'uni-to-kd-kr-cluster.json',
    'uni-to-kd-dr-cluster.json',
    'uni-to-kd-trya-cluster.json',
    'uni-to-kd-chai-cluster.json',
  ];
  for (const name of corpusFiles) {
    const corpus = JSON.parse(fs.readFileSync(path.join(refDir, name), 'utf8')) as {
      cases: CorpusCase[];
    };
    for (const c of corpus.cases) {
      if (c.skip === true || c.notes?.includes('OUT OF SCOPE')) continue;
      if (c.unicode && c.competitorKrutiDev) {
        const got = convertText(c.unicode, 'uni-to-kd');
        assert(
          got === c.competitorKrutiDev,
          `competitor ${c.id} ${c.unicode}`,
          `got ${JSON.stringify(got)} expected ${JSON.stringify(c.competitorKrutiDev)}`,
        );
        const back = convertText(got, 'kd-to-uni');
        if (c.roundTrip === false) {
          if (c.kdToUni != null) {
            assert(
              back === c.kdToUni,
              `competitor ${c.id} lossy KD→Uni`,
              `got ${JSON.stringify(back)} expected ${JSON.stringify(c.kdToUni)}`,
            );
          }
        } else {
          assert(
            back === c.unicode,
            `competitor ${c.id} round-trip`,
            `got ${JSON.stringify(back)}`,
          );
        }
      } else if (c.kd && c.competitorUnicode) {
        const got = convertText(c.kd, 'kd-to-uni');
        assert(
          got === c.competitorUnicode,
          `competitor ${c.id} KD ${JSON.stringify(c.kd)}`,
          `got ${JSON.stringify(got)} expected ${JSON.stringify(c.competitorUnicode)}`,
        );
      }
    }
  }
  // Legacy ASCII forms still decode
  assert(convertText('d`', 'kd-to-uni') === 'कृ', 'legacy d` → कृ');
  assert(convertText('d`f"k', 'kd-to-uni') === 'कृषि', 'legacy d`f"k → कृषि');
  assert(convertText('n`', 'kd-to-uni') === 'दृ', 'legacy n` → दृ');
  assert(convertText("n`';", 'kd-to-uni') === 'दृश्य', "legacy n`'; → दृश्य");
  assert(convertText('R;Z', 'kd-to-uni') === 'त्र्य', 'R;Z → त्र्य');
  assert(convertText('\u00ab', 'kd-to-uni') === 'त्र्', '« → त्र्');
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

console.log('\n=== Devanagari digits Uni→KD (Windows glyphs) ===\n');
{
  const kd = convertText('१२३', 'uni-to-kd');
  const back = convertText(kd, 'kd-to-uni');
  assert(kd === '\u0192\u201e\u2026', '१२३ → ƒ„…');
  assert(back === '१२३', 'ƒ„… → १२३ round-trip');
  assert(convertText('2026', 'uni-to-kd') === '2026', 'ASCII digits preserved');
}

console.log('\n=== Encode policy freeze (UPDES Remington) ===\n');
{
  const cases: [string, string, string][] = [
    ['ज्ञ', 'K', 'B01 ज्ञ not द्व'],
    ['द्व', '}', 'B01 द्व glyph'],
    ['ज्ञान', 'Kku', 'ज्ञान'],
    ['कृ', '\u2014', 'B02 कृ ligature —'],
    ['कृषि', '\u2014f"k', 'कृषि'],
    ['दृ', '\u2013', 'UKR-021 दृ ligature –'],
    ['दृश्य', "\u2013';", 'UKR-021 दृश्य'],
    ['त्र्य', 'R;Z', 'UKR-022 त्र्य'],
    ['त्र्या', 'R;kZ', 'UKR-022 त्र्या'],
    ['त्र्', '\u00ab', 'त्र् still «'],
    ['गृह', 'x`g', 'गृह consonant+`'],
    ['हृदय', 'ân;', 'हृ â ligature'],
    ['वृक्ष', 'o`{k', 'वृक्ष consonant+`'],
    ['ण', '.k', 'B03 full ण'],
    ['ण्', '.', 'B03 half ण्'],
    ['धर्म', '/keZ', 'B04 reph Z'],
    ['कार्य', 'dk;Z', 'B04 कार्य'],
    ['नमस्ते भारत', 'ueLrs Hkkjr', 'HCalso not vertbar'],
    ['ग्र', 'xz', 'ग्र rakar'],
    ['क्र', '\u00d8', 'क्र ligature'],
    ['प्र', '\u00e7', 'प्र ligature ç'],
    ['ॐ', 'ॐ', 'unsupported passthrough'],
    ['Hello, world?', 'Hello] world\\', 'Remington punct'],
    ['भारत, India!', 'Hkkjr] India!', 'mixed English Remington comma'],
    ['उत्तर', 'm\u00d9kj', 'त्त ligature Ùk'],
    ['हाँ', 'gk\u00a1', 'chandrabindu ¡'],
    ['आँख', 'vk\u00a1[k', 'आँख'],
    ['धर्म, कर्म', '/keZ] deZ', 'audit punct'],
    ['॥', 'AA', 'double danda'],
    ['चै', 'pkS', 'चै = pkS (competitor; collapses with चौ)'],
    ['चौ', 'pkS', 'चौ = pkS'],
    ['चैत्र', 'pkS=', 'चैत्र'],
    ['चैन', 'pkSu', 'चैन'],
    ['चैनल', 'pkSuy', 'चैनल'],
    ['चैट', 'pkSV', 'चैट'],
    ['चैम्पियन', 'pkSfEi;u', 'चैम्पियन'],
    ['चौक', 'pkSd', 'चौक'],
    ['चौथा', 'pkSFkk', 'चौथा'],
    ['कै', 'dS', 'कै stays dS (not collapsed)'],
    ['कौ', 'dkS', 'कौ stays dkS'],
    ['र्क', 'j~d', 'UKR-035 standalone र्क'],
    ['र्ग', 'j~x', 'UKR-035 standalone र्ग'],
    ['र्य', 'j~;', 'UKR-035 standalone र्य'],
    ['श्र्य', "';Z", 'UKR-035 standalone श्र्य (competitor; possibly lossy)'],
    ['र्य र्क र्ग', 'j~; j~d j~x', 'UKR-035 three standalone tokens in one field (local scope regression; competitor phrase unverified)'],
    ['कार्य र्य', 'dk;Z j~;', 'UKR-035 embedded कार्य reph remains dk;Z'],
    ['त्र्य र्क', 'R;Z j~d', 'UKR-035 preserve prior त्र्य while encoding standalone र्क'],
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
  // Competitor: pkS → चै; चौ→pkS→चै is lossy (no artificial round-trip).
  assert(convertText('pkS', 'kd-to-uni') === 'चै', 'pkS → चै (competitor)');
  assert(convertText('pS', 'kd-to-uni') === 'चै', 'pS → चै (legacy alias)');
  assert(convertText('चौ', 'uni-to-kd') === 'pkS', 'चौ → pkS');
  assert(convertText(convertText('चौ', 'uni-to-kd'), 'kd-to-uni') === 'चै', 'चौ round-trip is lossy → चै');
  assert(convertText(convertText('चै', 'uni-to-kd'), 'kd-to-uni') === 'चै', 'चै ↔ pkS round-trips');
  assert(convertText('\u00e8', 'kd-to-uni') === 'ध्', 'è → ध्');
  assert(convertText('\u00e8k', 'kd-to-uni') === 'ध', 'èk → ध');
  assert(convertText('ln~ Hkko', 'kd-to-uni') === 'सद् भाव', 'halant before space');
  assert(convertText('सद् भाव', 'uni-to-kd') === 'ln~ Hkko', 'सद् भाव encode');
}

console.log('\n=== detectLikelyKrutiDev ===\n');
assert(detectLikelyKrutiDev('नमस्ते भारत') === false, 'Unicode Hindi → not KD');
assert(detectLikelyKrutiDev('कृषि विभाग') === false, 'Unicode कृषि → not KD');
assert(detectLikelyKrutiDev('ueLrs Hkkjr') === true, 'Remington KD → KD');
assert(detectLikelyKrutiDev('d`f"k') === false, 'd`f"k → ambiguous (backtick is English punctuation; user mode kept)');
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
