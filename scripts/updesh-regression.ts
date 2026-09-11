/**
 * Updesh golden runner — Updesh ≡ KrutiDev 010 (shared convertUpdesh).
 * Usage: npx tsx scripts/updesh-regression.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  convertUpdesh,
  type UpdeshDirection,
} from '../src/lib/converter/engine';
import { silIdentityErrors } from '../src/lib/converter/krutidev010-map';

type Case = {
  id: string;
  input: string;
  expected: string;
  category: string;
  source?: string;
  notes?: string;
  direction?: UpdeshDirection;
};

const ROOT = path.join(__dirname, '..', 'tests', 'updesh');
const DEVANAGARI_RE = /[\u0900-\u097F]/;

let failed = 0;
let passed = 0;

function assert(ok: boolean, label: string, detail?: string) {
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok && detail) console.log(`  ${detail}`);
}

function loadJsonFiles(dir: string): { file: string; data: Case[] }[] {
  const out: { file: string; data: Case[] }[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...loadJsonFiles(p));
    else if (ent.name.endsWith('.json')) {
      const data = JSON.parse(fs.readFileSync(p, 'utf8')) as Case[];
      out.push({ file: p, data });
    }
  }
  return out;
}

console.log('=== Updesh SIL identity freeze ===\n');
{
  const idErrs = silIdentityErrors().filter(
    (e) => !e.includes('\u00D9k') && !e.includes('Ùk'),
  );
  assert(idErrs.length === 0, 'SIL identities', idErrs.join('; '));
}
assert(convertUpdesh('\u0915', 'unicode-to-updesh') === 'd', 'encode KA is d');
assert(convertUpdesh('\u092e', 'unicode-to-updesh') === 'e', 'encode MA is e');
assert(convertUpdesh('\u0930\u094d', 'unicode-to-updesh') === 'Z', 'encode reph is Z');
assert(convertUpdesh('\u0943', 'unicode-to-updesh') === '`', 'encode vocalic R is backtick');
assert(
  convertUpdesh('Hello, world?', 'unicode-to-updesh') === 'Hello, world?',
  'ASCII punct preserved (mixed English product policy)',
);

console.log('\n=== Updesh golden corpus (convertUpdesh) ===\n');

for (const { file, data } of loadJsonFiles(ROOT)) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  for (const c of data) {
    const dir: UpdeshDirection = c.direction ?? 'updesh-to-unicode';
    const got = convertUpdesh(c.input, dir).normalize('NFC');
    const expected = (c.expected ?? '').normalize('NFC');
    assert(
      got === expected,
      `${c.id} [${c.category}] ${rel}`,
      `dir=${dir} input ${JSON.stringify(c.input)} got ${JSON.stringify(got)} expected ${JSON.stringify(c.expected)}${c.notes ? ` notes=${c.notes}` : ''}`,
    );
    if (dir === 'unicode-to-updesh' && got) {
      assert(
        !DEVANAGARI_RE.test(got),
        `${c.id} no Devanagari leftover`,
        `got ${JSON.stringify(got)}`,
      );
    }
  }
}

console.log('\n=== Updesh Uni→KD→Uni round-trip ===\n');
const rtUnis = [
  'नमस्ते भारत',
  'हिन्दी',
  'धर्म',
  'कार्य',
  'कृषि',
  'विभाग',
  'क्षत्रिय',
  'क्र',
];
for (const uni of rtUnis) {
  const kd = convertUpdesh(uni, 'unicode-to-updesh');
  const back = convertUpdesh(kd, 'updesh-to-unicode');
  assert(
    back === uni.normalize('NFC'),
    `RT ${uni}`,
    `kd=${JSON.stringify(kd)} back=${JSON.stringify(back)}`,
  );
}

console.log('\n=== Differential vs DesiUtils NFC (strip ZWJ) ===\n');
const desi: [string, string][] = [
  ['ueLrs Hkkjr', 'नमस्ते भारत'],
  ['fgUnh', 'हिन्दी'],
  ['/keZ', 'धर्म'],
  ['dk;Z', 'कार्य'],
  ['foHkkx', 'विभाग'],
  ['{kf=;', 'क्षत्रिय'],
  ['d`f"k', 'कृषि'],
  ['Ijns\'k', 'प्रदेश'],
  ['123', '123'],
  ['dz', 'क्र'],
  ['d+', 'क़'],
  ['Q+', 'फ़'],
  ['t+', 'ज़'],
  ['A', '।'],
  ['AA', '॥'],
];
for (const [kd, expect] of desi) {
  const got = convertUpdesh(kd, 'updesh-to-unicode')
    .replace(/[\u200c\u200d]/g, '')
    .normalize('NFC');
  const exp = expect.replace(/[\u200c\u200d]/g, '').normalize('NFC');
  assert(got === exp, `diff ${JSON.stringify(kd)}`, `got ${JSON.stringify(got)} expected ${JSON.stringify(exp)}`);
}

console.log('\n=== Performance ===\n');
const chunk = 'ueLrs Hkkjr d`f"k foHkkx ljdkj ';
const text = chunk.repeat(Math.ceil(50000 / chunk.length)).slice(0, 50000);
const t0 = performance.now();
const out = convertUpdesh(text, 'updesh-to-unicode');
const t1 = performance.now();
const ms = t1 - t0;
assert(ms < 50, `50k chars in ${ms.toFixed(2)}ms (gate 50ms)`, `out=${out.length}`);

console.log(`\n${failed === 0 ? 'All Updesh tests passed.' : failed + ' test(s) failed.'} (${passed} passed)`);
process.exit(failed === 0 ? 0 : 1);
