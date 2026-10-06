/**
 * Audit acceptance corpus — Unicode→KrutiDev accuracy fixes.
 * Usage: npx tsx scripts/audit-u2k-accuracy.ts
 */
import { convertText } from '../src/lib/converter/engine';

type Case = {
  id: string;
  input: string;
  expectedKd: string;
  roundTrip?: boolean;
  lossyNote?: string;
};

const CASES: Case[] = [
  { id: 'A01', input: 'धर्म, कर्म', expectedKd: '/keZ] deZ', roundTrip: true },
  {
    id: 'A02',
    input: 'प्रमाण-पत्र (मूल) संलग्न है?',
    expectedKd: 'çek.k&i= ¼ewy½ layXu gS\\',
    roundTrip: true,
  },
  { id: 'A03', input: 'दिनांक 15.10.2026', expectedKd: 'fnukad 15-10-2026', roundTrip: true },
  { id: 'A04', input: 'आँख', expectedKd: 'vk¡[k', roundTrip: true },
  { id: 'A05', input: 'उत्तर प्रदेश', expectedKd: "mÙkj çns'k", roundTrip: true },
  { id: 'A06', input: 'हाँ', expectedKd: 'gk¡', roundTrip: true },
  { id: 'A07', input: 'पाँच', expectedKd: 'ik¡p', roundTrip: true },
  { id: 'A08', input: '०१२३४५६७८९', expectedKd: 'åƒ„…†‡ˆ‰Š‹', roundTrip: true },
  { id: 'A09', input: 'प्र', expectedKd: 'ç', roundTrip: true },
  { id: 'A10', input: 'क्र', expectedKd: 'Ø', roundTrip: true },
  { id: 'A11', input: 'द्र', expectedKd: 'æ', roundTrip: true },
  { id: 'A12', input: 'ग्र', expectedKd: 'xz', roundTrip: true },
  { id: 'A13', input: 'फ्र', expectedKd: 'Ý', roundTrip: true },
  { id: 'A14', input: 'ह्र', expectedKd: 'ºz', roundTrip: true },
  { id: 'A15', input: 'ट्र', expectedKd: 'Vª', roundTrip: true },
  { id: 'A16', input: 'ड्र', expectedKd: 'Mª', roundTrip: true },
  { id: 'A17', input: 'ढ्र', expectedKd: '<ªª', roundTrip: true },
  { id: 'A18', input: 'छ्र', expectedKd: 'Nª', roundTrip: true },
  { id: 'A19', input: 'श्र', expectedKd: 'J', roundTrip: true },
  { id: 'A20', input: 'त्र', expectedKd: '=', roundTrip: true },
  { id: 'A21', input: 'भ्र', expectedKd: 'Hkz', roundTrip: true },
  { id: 'A22', input: 'म्र', expectedKd: 'ez', roundTrip: true },
  { id: 'A23', input: 'स्र', expectedKd: 'lz', roundTrip: true },
  { id: 'A24', input: 'व्र', expectedKd: 'oz', roundTrip: true },
  { id: 'A25', input: 'ध्र', expectedKd: '/kz', roundTrip: true },
  { id: 'A26', input: 'घ्र', expectedKd: '?kz', roundTrip: true },
  {
    id: 'A27',
    input: 'त्र्य',
    expectedKd: '«',
    roundTrip: false,
    lossyNote: 'official « decodes as त्र्',
  },
  { id: 'A28', input: 'श्र्य', expectedKd: 'Üz', roundTrip: true },
  { id: 'A29', input: 'र्क', expectedKd: 'dZ', roundTrip: true },
  { id: 'A30', input: '॥', expectedKd: 'AA', roundTrip: true },
  { id: 'A31', input: 'चै', expectedKd: 'pS', roundTrip: true },
  { id: 'A32', input: 'चौ', expectedKd: 'pkS', roundTrip: true },
  { id: 'A33', input: 'ध', expectedKd: '/k', roundTrip: true },
  { id: 'A34', input: 'सद् भाव', expectedKd: 'ln~ Hkko', roundTrip: true },
  { id: 'A35', input: ',', expectedKd: ']', roundTrip: true },
  { id: 'A36', input: '.', expectedKd: '-', roundTrip: true },
  { id: 'A37', input: '?', expectedKd: '\\', roundTrip: true },
  { id: 'A38', input: '-', expectedKd: '&', roundTrip: true },
  { id: 'A39', input: ';', expectedKd: '(', roundTrip: true },
  { id: 'A40', input: '(', expectedKd: '¼', roundTrip: true },
  { id: 'A41', input: ')', expectedKd: '½', roundTrip: true },
  { id: 'A42', input: '{', expectedKd: '¿', roundTrip: true },
  { id: 'A43', input: '}', expectedKd: 'À', roundTrip: true },
  { id: 'A44', input: '=', expectedKd: '¾', roundTrip: true },
  { id: 'A45', input: '/', expectedKd: '@', roundTrip: true },
  { id: 'A46', input: '+', expectedKd: '$', roundTrip: true },
  { id: 'A47', input: '_', expectedKd: '&', roundTrip: false, lossyNote: '_ and - both encode as &' },
  { id: 'A48', input: '!', expectedKd: '!', roundTrip: true },
  { id: 'A49', input: '123', expectedKd: '123', roundTrip: true },
];

const REV: [string, string, string][] = [
  ['pkS', 'चौ', 'pkS→चौ'],
  ['pS', 'चै', 'pS→चै'],
  ['\u00e8', 'ध्', 'è→ध्'],
  ['\u00e8k', 'ध', 'èk→ध'],
  ['ln~ Hkko', 'सद् भाव', 'halant+space'],
  ['/keZ] deZ', 'धर्म, कर्म', 'audit reverse'],
];

let failed = 0;
let passed = 0;

function assert(ok: boolean, label: string, detail?: string) {
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok && detail) console.log(`  ${detail}`);
}

console.log('=== Audit Uni→KD acceptance corpus ===\n');
for (const c of CASES) {
  const got = convertText(c.input, 'uni-to-kd');
  assert(
    got === c.expectedKd,
    `${c.id} ${c.input}`,
    `got ${JSON.stringify(got)} expected ${JSON.stringify(c.expectedKd)}`,
  );
  if (c.roundTrip !== false) {
    const back = convertText(got, 'kd-to-uni').normalize('NFC');
    assert(
      back === c.input.normalize('NFC'),
      `${c.id} RT`,
      `kd=${JSON.stringify(got)} back=${JSON.stringify(back)}${c.lossyNote ? ` (${c.lossyNote})` : ''}`,
    );
  } else if (c.lossyNote) {
    console.log(`INFO  ${c.id} lossy documented: ${c.lossyNote}`);
  }
}

console.log('\n=== Audit KD→Uni reverse fixes ===\n');
for (const [kd, uni, label] of REV) {
  const got = convertText(kd, 'kd-to-uni').normalize('NFC');
  assert(got === uni.normalize('NFC'), label, `got ${JSON.stringify(got)}`);
}

console.log(`\n${failed === 0 ? 'All audit checks passed.' : failed + ' failed.'} (${passed} passed)`);
process.exit(failed === 0 ? 0 : 1);
