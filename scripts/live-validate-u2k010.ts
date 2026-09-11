/**
 * 90-case Uni→KD Remington audit (Nirmala / forensic plan §7 + §13).
 * Usage: npx tsx scripts/live-validate-u2k010.ts
 */
import { convertText } from '../src/lib/converter/engine';

type Case = { id: string; input: string; expected: string; category: string };

const CASES: Case[] = [
  // Independent vowels (11)
  { id: 'V01', input: 'अ', expected: 'v', category: 'vowels' },
  { id: 'V02', input: 'आ', expected: 'vk', category: 'vowels' },
  { id: 'V03', input: 'इ', expected: 'b', category: 'vowels' },
  { id: 'V04', input: 'ई', expected: 'bZ', category: 'vowels' },
  { id: 'V05', input: 'उ', expected: 'm', category: 'vowels' },
  { id: 'V06', input: 'ऊ', expected: '\u00c5', category: 'vowels' },
  { id: 'V07', input: 'ऋ', expected: '_', category: 'vowels' },
  { id: 'V08', input: 'ए', expected: ',', category: 'vowels' },
  { id: 'V09', input: 'ऐ', expected: ',s', category: 'vowels' },
  { id: 'V10', input: 'ओ', expected: 'vks', category: 'vowels' },
  { id: 'V11', input: 'औ', expected: 'vkS', category: 'vowels' },

  // Consonants (35) — ण=.k (B03), ञ=´ canonical
  { id: 'C01', input: 'क', expected: 'd', category: 'characters' },
  { id: 'C02', input: 'ख', expected: '[k', category: 'characters' },
  { id: 'C03', input: 'ग', expected: 'x', category: 'characters' },
  { id: 'C04', input: 'घ', expected: '?k', category: 'characters' },
  { id: 'C05', input: 'ङ', expected: '\u00b3', category: 'characters' },
  { id: 'C06', input: 'च', expected: 'p', category: 'characters' },
  { id: 'C07', input: 'छ', expected: 'N', category: 'characters' },
  { id: 'C08', input: 'ज', expected: 't', category: 'characters' },
  { id: 'C09', input: 'झ', expected: '>', category: 'characters' },
  { id: 'C10', input: 'ञ', expected: '\u00b4', category: 'characters' },
  { id: 'C11', input: 'ट', expected: 'V', category: 'characters' },
  { id: 'C12', input: 'ठ', expected: 'B', category: 'characters' },
  { id: 'C13', input: 'ड', expected: 'M', category: 'characters' },
  { id: 'C14', input: 'ढ', expected: '<', category: 'characters' },
  { id: 'C15', input: 'ण', expected: '.k', category: 'characters' },
  { id: 'C16', input: 'त', expected: 'r', category: 'characters' },
  { id: 'C17', input: 'थ', expected: 'Fk', category: 'characters' },
  { id: 'C18', input: 'द', expected: 'n', category: 'characters' },
  { id: 'C19', input: 'ध', expected: '/k', category: 'characters' },
  { id: 'C20', input: 'न', expected: 'u', category: 'characters' },
  { id: 'C21', input: 'प', expected: 'i', category: 'characters' },
  { id: 'C22', input: 'फ', expected: 'Q', category: 'characters' },
  { id: 'C23', input: 'ब', expected: 'c', category: 'characters' },
  { id: 'C24', input: 'भ', expected: 'Hk', category: 'characters' },
  { id: 'C25', input: 'म', expected: 'e', category: 'characters' },
  { id: 'C26', input: 'य', expected: ';', category: 'characters' },
  { id: 'C27', input: 'र', expected: 'j', category: 'characters' },
  { id: 'C28', input: 'ल', expected: 'y', category: 'characters' },
  { id: 'C29', input: 'व', expected: 'o', category: 'characters' },
  { id: 'C30', input: 'श', expected: "'k", category: 'characters' },
  { id: 'C31', input: 'ष', expected: '"k', category: 'characters' },
  { id: 'C32', input: 'स', expected: 'l', category: 'characters' },
  { id: 'C33', input: 'ह', expected: 'g', category: 'characters' },
  { id: 'C34', input: 'ळ', expected: 'G', category: 'characters' },
  { id: 'C35', input: 'ण्', expected: '.', category: 'half_letters' },

  // Matras incl. ृ (B02)
  { id: 'M01', input: 'का', expected: 'dk', category: 'matras' },
  { id: 'M02', input: 'कि', expected: 'fd', category: 'matras' },
  { id: 'M03', input: 'की', expected: 'dh', category: 'matras' },
  { id: 'M04', input: 'कु', expected: 'dq', category: 'matras' },
  { id: 'M05', input: 'कू', expected: 'dw', category: 'matras' },
  { id: 'M06', input: 'कृ', expected: 'd`', category: 'matras' },
  { id: 'M07', input: 'के', expected: 'ds', category: 'matras' },
  { id: 'M08', input: 'कै', expected: 'dS', category: 'matras' },
  { id: 'M09', input: 'को', expected: 'dks', category: 'matras' },
  { id: 'M10', input: 'कौ', expected: 'dkS', category: 'matras' },
  { id: 'M11', input: 'कं', expected: 'da', category: 'anusvara' },
  { id: 'M12', input: 'कः', expected: 'd%', category: 'visarga' },

  // Pre-base ि clusters
  { id: 'P01', input: 'गि', expected: 'fx', category: 'prebase_matras' },
  { id: 'P02', input: 'प्रि', expected: 'fIj', category: 'prebase_matras' },
  { id: 'P03', input: 'क्रि', expected: 'f\u00d8', category: 'prebase_matras' },
  { id: 'P04', input: 'त्रि', expected: 'f=', category: 'prebase_matras' },
  { id: 'P05', input: 'स्त्रि', expected: 'fL=', category: 'prebase_matras' },

  // Reph → Z (B04)
  { id: 'R01', input: 'धर्म', expected: '/keZ', category: 'reph' },
  { id: 'R02', input: 'कार्य', expected: 'dk;Z', category: 'reph' },
  { id: 'R03', input: 'कार्यक्रम', expected: 'dk;Z\u00d8e', category: 'reph' },
  { id: 'R04', input: 'र्क', expected: 'dZ', category: 'reph' },

  // Ligatures (B01 / B06)
  { id: 'L01', input: 'क्ष', expected: '{k', category: 'conjuncts' },
  { id: 'L02', input: 'त्र', expected: '=', category: 'conjuncts' },
  { id: 'L03', input: 'ज्ञ', expected: 'K', category: 'conjuncts' },
  { id: 'L04', input: 'ज्ञान', expected: 'Kku', category: 'conjuncts' },
  { id: 'L05', input: 'श्र', expected: 'J', category: 'conjuncts' },
  { id: 'L06', input: 'द्व', expected: '}', category: 'conjuncts' },
  { id: 'L07', input: 'द्य', expected: '|', category: 'conjuncts' },
  { id: 'L08', input: 'क्र', expected: '\u00d8', category: 'conjuncts' },
  { id: 'L09', input: 'ग्र', expected: 'xz', category: 'conjuncts' },
  { id: 'L10', input: 'क्त', expected: '\u00e4', category: 'conjuncts' },

  // Nukta
  { id: 'N01', input: 'क़', expected: 'd+', category: 'nukta' },
  { id: 'N02', input: 'ख़', expected: '[k+', category: 'nukta' },
  { id: 'N03', input: 'ग़', expected: 'x+', category: 'nukta' },
  { id: 'N04', input: 'ज़', expected: 't+', category: 'nukta' },
  { id: 'N05', input: 'ड़', expected: 'M+', category: 'nukta' },
  { id: 'N06', input: 'ढ़', expected: '<+', category: 'nukta' },
  { id: 'N07', input: 'फ़', expected: 'Q+', category: 'nukta' },

  // Words / mixed / policy
  { id: 'W01', input: 'नमस्ते', expected: 'ueLrs', category: 'words' },
  { id: 'W02', input: 'भारत', expected: 'Hkkjr', category: 'words' },
  { id: 'W03', input: 'नमस्ते भारत', expected: 'ueLrs Hkkjr', category: 'words' },
  { id: 'W04', input: 'हिन्दी', expected: 'fgUnh', category: 'words' },
  { id: 'W05', input: 'कृषि', expected: 'd`f"k', category: 'words' },
  { id: 'W06', input: 'विभाग', expected: 'foHkkx', category: 'words' },
  { id: 'W07', input: 'प्रणाम', expected: 'Ij.kke', category: 'words' },
  { id: 'W08', input: 'क्षत्रिय', expected: '{kf=;', category: 'words' },
  { id: 'X01', input: 'Hello World', expected: 'Hello World', category: 'mixed' },
  { id: 'X02', input: 'भारत, India!', expected: 'Hkkjr, India!', category: 'mixed' },
  { id: 'D01', input: '०१२३', expected: '0123', category: 'numbers' },
  { id: 'D02', input: '123', expected: '123', category: 'numbers' },
  { id: 'U01', input: 'ॐ', expected: 'ॐ', category: 'unsupported' },
  { id: 'Q01', input: '।', expected: 'A', category: 'punctuation' },
  { id: 'Q02', input: '॥', expected: 'AA', category: 'punctuation' },
];

// Glyph byte identities that must never collide / mis-encode
const GLYPH_CHECKS: [string, string, string][] = [
  ['ज्ञ', 'K', 'B01 ज्ञ not द्व'],
  ['द्व', '}', 'B01 द्व glyph'],
  ['कृ', 'd`', 'B02 ृ → backtick'],
  ['ण', '.k', 'B03 full ण'],
  ['ण्', '.', 'B03 half ण्'],
  ['धर्म', '/keZ', 'B04 reph Z'],
  ['कार्य', 'dk;Z', 'B04 कार्य Z'],
];

let failed = 0;
let passed = 0;

console.log(`=== Live-validate Uni→KD (${CASES.length} cases) ===\n`);
for (const c of CASES) {
  const got = convertText(c.input, 'uni-to-kd');
  const ok = got === c.expected;
  if (ok) passed++;
  else failed++;
  if (!ok) {
    console.log(
      `FAIL  ${c.id} [${c.category}] input=${JSON.stringify(c.input)} got=${JSON.stringify(got)} expected=${JSON.stringify(c.expected)}`,
    );
  }
}

console.log(`\n=== Glyph identity checks (B01–B04 byte slots) ===\n`);
for (const [input, expected, label] of GLYPH_CHECKS) {
  const got = convertText(input, 'uni-to-kd');
  const ok = got === expected && !/[\u0900-\u097F]/.test(got);
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: ${JSON.stringify(got)}`);
  if (/[\u0900-\u097F]/.test(got)) {
    console.log(`  leftover Devanagari in output`);
  }
}

// Round-trip safety for KD→Uni reorder bugs
console.log(`\n=== KD→Uni reorder safety ===\n`);
for (const [kd, uni, label] of [
  ['/keZ', 'धर्म', 'धर्म not र्धम'],
  ['fgUnh', 'हिन्दी', 'हिन्दी not हन्दिी'],
  ['dk;Z', 'कार्य', 'कार्य'],
  ['Kku', 'ज्ञान', 'ज्ञान'],
] as const) {
  const got = convertText(kd, 'kd-to-uni');
  const ok = got.normalize('NFC') === uni.normalize('NFC');
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}: ${JSON.stringify(got)}`);
}

console.log(
  `\n${failed === 0 ? 'All live-validate checks passed.' : failed + ' failed.'} (${passed} passed, ${CASES.length} corpus cases)`,
);
process.exit(failed === 0 ? 0 : 1);
