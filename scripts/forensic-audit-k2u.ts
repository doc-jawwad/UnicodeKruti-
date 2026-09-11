/**
 * Forensic differential audit: our K2U engine vs classic Remington/LTRC-style mapping.
 * Read-only — does not modify the conversion engine.
 * Usage: npx tsx scripts/forensic-audit-k2u.ts
 */
import { convertText, KrutiDevConverter } from '../src/lib/converter/engine';

// ── Classic Remington KD→Uni (ported from LTRC/kru2uni + popular array_one/array_two) ──
// This is the widely-deployed Remington KrutiDev 010 web-converter algorithm.
function classicToUnicode(input: string): string {
  let t = input;
  const pairs: [string, string][] = [
    ['ñ', '॰'],
    ['Q+Z', 'QZ+'],
    ['sas', 'sa'],
    ['aa', 'a'],
    [')Z', 'र्द्ध'],
    ['ZZ', 'Z'],
    ['‘', '"'],
    ['’', '"'],
    ['“', "'"],
    ['”', "'"],
    ['å', '०'],
    ['ƒ', '१'],
    ['„', '२'],
    ['…', '३'],
    ['†', '४'],
    ['‡', '५'],
    ['ˆ', '६'],
    ['‰', '७'],
    ['Š', '८'],
    ['‹', '९'],
    ['¶+', 'फ़्'],
    ['d+', 'क़'],
    ['[+k', 'ख़'],
    ['[+', 'ख़्'],
    ['x+', 'ग़'],
    ['T+', 'ज़्'],
    ['t+', 'ज़'],
    ['M+', 'ड़'],
    ['<+', 'ढ़'],
    ['Q+', 'फ़'],
    [';+', 'य़'],
    ['j+', 'ऱ'],
    ['u+', 'ऩ'],
    ['Ùk', 'त्त'],
    ['Ù', 'त्त्'],
    ['ä', 'क्त'],
    ['–', 'दृ'],
    ['—', 'कृ'],
    ['é', 'न्न'],
    ['™', 'न्न्'],
    ['=kk', '=k'],
    ['f=k', 'f='],
    ['à', 'ह्न'],
    ['á', 'ह्य'],
    ['â', 'हृ'],
    ['ã', 'ह्म'],
    ['ºz', 'ह्र'],
    ['º', 'ह्'],
    ['í', 'द्द'],
    ['{k', 'क्ष'],
    ['{', 'क्ष्'],
    ['=', 'त्र'],
    ['«', 'त्र्'],
    ['Nî', 'छ्य'],
    ['Vî', 'ट्य'],
    ['Bî', 'ठ्य'],
    ['Mî', 'ड्य'],
    ['<î', 'ढ्य'],
    ['|', 'द्य'],
    ['K', 'ज्ञ'],
    ['}', 'द्व'],
    ['J', 'श्र'],
    ['Vª', 'ट्र'],
    ['Mª', 'ड्र'],
    ['<ªª', 'ढ्र'],
    ['Nª', 'छ्र'],
    ['Ø', 'क्र'],
    ['Ý', 'फ्र'],
    ['nzZ', 'र्द्र'],
    ['æ', 'द्र'],
    ['ç', 'प्र'],
    ['Á', 'प्र'],
    ['xz', 'ग्र'],
    ['#', 'रु'],
    [':', 'रू'],
    ['v‚', 'ऑ'],
    ['vks', 'ओ'],
    ['vkS', 'औ'],
    ['vk', 'आ'],
    ['v', 'अ'],
    ['b±', 'ईं'],
    ['Ã', 'ई'],
    ['bZ', 'ई'],
    ['b', 'इ'],
    ['m', 'उ'],
    ['Å', 'ऊ'],
    [',s', 'ऐ'],
    [',', 'ए'],
    ['_', 'ऋ'],
    ['ô', 'क्क'],
    ['d', 'क'],
    ['Dk', 'क'],
    ['D', 'क्'],
    ['[k', 'ख'],
    ['[', 'ख्'],
    ['x', 'ग'],
    ['Xk', 'ग'],
    ['X', 'ग्'],
    ['Ä', 'घ'],
    ['?k', 'घ'],
    ['?', 'घ्'],
    ['³', 'ङ'],
    ['pkS', 'चै'],
    ['p', 'च'],
    ['Pk', 'च'],
    ['P', 'च्'],
    ['N', 'छ'],
    ['t', 'ज'],
    ['Tk', 'ज'],
    ['T', 'ज्'],
    ['>', 'झ'],
    ['÷', 'झ्'],
    ['¥', 'ञ'],
    ['ê', 'ट्ट'],
    ['ë', 'ट्ठ'],
    ['V', 'ट'],
    ['B', 'ठ'],
    ['ì', 'ड्ड'],
    ['ï', 'ड्ढ'],
    ['M+', 'ड़'],
    ['<+', 'ढ़'],
    ['M', 'ड'],
    ['<', 'ढ'],
    ['.k', 'ण'],
    ['.', 'ण्'],
    ['r', 'त'],
    ['Rk', 'त'],
    ['R', 'त्'],
    ['Fk', 'थ'],
    ['F', 'थ्'],
    [')', 'द्ध'],
    ['n', 'द'],
    ['/k', 'ध'],
    ['/', 'ध्'],
    ['Ë', 'ध्'],
    ['è', 'ध'],
    ['u', 'न'],
    ['Uk', 'न'],
    ['U', 'न्'],
    ['i', 'प'],
    ['Ik', 'प'],
    ['I', 'प्'],
    ['Q', 'फ'],
    ['¶', 'फ्'],
    ['c', 'ब'],
    ['Ck', 'ब'],
    ['C', 'ब्'],
    ['Hk', 'भ'],
    ['H', 'भ्'],
    ['e', 'म'],
    ['Ek', 'म'],
    ['E', 'म्'],
    [';', 'य'],
    ['¸', 'य्'],
    ['j', 'र'],
    ['y', 'ल'],
    ['Yk', 'ल'],
    ['Y', 'ल्'],
    ['G', 'ळ'],
    ['o', 'व'],
    ['Ok', 'व'],
    ['O', 'व्'],
    ["'k", 'श'],
    ["'", 'श्'],
    ['"k', 'ष'],
    ['"', 'ष्'],
    ['l', 'स'],
    ['Lk', 'स'],
    ['L', 'स्'],
    ['g', 'ह'],
    ['È', 'ीं'],
    ['saz', '्रें'],
    ['z', '्र'],
    ['Ì', 'द्द'],
    ['Í', 'ट्ट'],
    ['Î', 'ट्ठ'],
    ['Ï', 'ड्ड'],
    ['Ñ', 'कृ'],
    ['Ò', 'भ'],
    ['Ó', '्य'],
    ['Ô', 'ड्ढ'],
    ['Ö', 'झ्'],
    ['Ø', 'क्र'],
    ['Ù', 'त्त्'],
    ['Ük', 'श'],
    ['Ü', 'श्'],
    ['‚', 'ॉ'],
    ['kas', 'ों'],
    ['ks', 'ो'],
    ['kS', 'ौ'],
    ['¡k', 'ाँ'],
    ['ak', 'kं'],
    ['k', 'ा'],
    ['ah', 'ीं'],
    ['h', 'ी'],
    ['aq', 'ुं'],
    ['q', 'ु'],
    ['aw', 'ूं'],
    ['¡w', 'ूँ'],
    ['w', 'ू'],
    ['`', 'ृ'],
    ['as', 'ें'],
    ['±s', 's±'],
    ['s', 'े'],
    ['aS', 'ैं'],
    ['S', 'ै'],
    ['aª', '्रं'],
    ['ª', '्र'],
    ['fa', 'ंf'],
    ['a', 'ं'],
    ['¡', 'ँ'],
    ['%', ':'],
    ['W', 'ॅ'],
    ['•', 'ऽ'],
    ['·', 'ऽ'],
    ['∙', 'ऽ'],
    ['~j', '्र'],
    ['~', '्'],
    ['\\', '?'],
    ['+', '़'],
    ['^', '‘'],
    ['*', '’'],
    ['Þ', '“'],
    ['ß', '”'],
    ['(', ';'],
    ['¼', '('],
    ['½', ')'],
    ['¿', '{'],
    ['À', '}'],
    ['¾', '='],
    ['A', '।'],
    ['-', '.'],
    ['&', '-'],
    ['Œ', '॰'],
    [']', ','],
    ['~ ', '् '],
    ['@', '/'],
    ['®', 'ैं'],
  ];

  t = t.replace(/ \xaa/g, '\xaa').replace(/ ~j/g, '~j').replace(/ z/g, 'z');

  for (const [a, b] of pairs) t = t.split(a).join(b);

  t = t.split('±').join('Zं');
  t = t.split('Æ').join('र्f');

  // f + char → char + ि
  let m = t.match(/f(.)/);
  while (m) {
    t = t.split('f' + m[1]).join(m[1] + 'ि');
    m = t.match(/f(.)/);
  }

  t = t.split('Ç').join('fa').split('¯').join('fa').split('É').join('र्fa');

  m = t.match(/fa(.)/);
  while (m) {
    t = t.split('fa' + m[1]).join(m[1] + 'िं');
    m = t.match(/fa(.)/);
  }

  t = t.split('Ê').join('ीZ');

  m = t.match(/ि्(.)/);
  while (m) {
    t = t.split('ि्' + m[1]).join('्' + m[1] + 'ि');
    m = t.match(/ि्(.)/);
  }

  t = t.split('्Z').join('Z');

  // reph via Z
  const vowels =
    'अआइईउऊएऐओऔािीुूृेैोौंःँॅ';
  m = t.match(/(.)Z/);
  while (m) {
    const idx = t.indexOf(m[1] + 'Z');
    let i = idx;
    while (i >= 0 && vowels.includes(t[i])) i--;
    const misplaced = t.slice(i, idx + 1);
    t = t.split(misplaced + 'Z').join('र्' + misplaced);
    m = t.match(/(.)Z/);
  }

  for (const matra of 'ािीुूृेैोौंःँॅ') {
    t = t.split(' ' + matra).join(matra);
    t = t.split(',' + matra).join(matra + ',');
    t = t.split('्' + matra).join(matra);
  }

  t = t.split('््र').join('्र').split('्र्').join('र्').split('््').join('्');
  t = t.split('् ').join(' ');

  return t;
}

function cps(s: string): string {
  return [...s].map((c) => 'U+' + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')).join(' ');
}

function diffChars(a: string, b: string): string {
  const max = Math.max(a.length, b.length);
  const parts: string[] = [];
  for (let i = 0; i < max; i++) {
    if (a[i] !== b[i]) {
      parts.push(
        `@${i}: ours=${a[i] ? JSON.stringify(a[i]) + '(' + cps(a[i]) + ')' : '∅'} ref=${b[i] ? JSON.stringify(b[i]) + '(' + cps(b[i]) + ')' : '∅'}`,
      );
      if (parts.length >= 8) break;
    }
  }
  return parts.join('; ') || '(equal lengths, no char scan)';
}

type Case = { id: string; cat: string; kd: string; note?: string; expectedUni?: string };

const cases: Case[] = [
  // A. Basics
  { id: 'A01', cat: 'basic', kd: 'v', expectedUni: 'अ' },
  { id: 'A02', cat: 'basic', kd: 'vk', expectedUni: 'आ' },
  { id: 'A03', cat: 'basic', kd: 'b', expectedUni: 'इ' },
  { id: 'A04', cat: 'basic', kd: 'bZ', expectedUni: 'ई' },
  { id: 'A05', cat: 'basic', kd: 'm', expectedUni: 'उ' },
  { id: 'A06', cat: 'basic', kd: 'Å', expectedUni: 'ऊ' },
  { id: 'A07', cat: 'basic', kd: '_', expectedUni: 'ऋ' },
  { id: 'A08', cat: 'basic', kd: ',', expectedUni: 'ए' },
  { id: 'A09', cat: 'basic', kd: ',s', expectedUni: 'ऐ' },
  { id: 'A10', cat: 'basic', kd: 'vks', expectedUni: 'ओ' },
  { id: 'A11', cat: 'basic', kd: 'vkS', expectedUni: 'औ' },
  { id: 'A12', cat: 'basic', kd: 'd', expectedUni: 'क' },
  { id: 'A13', cat: 'basic', kd: '[k', expectedUni: 'ख' },
  { id: 'A14', cat: 'basic', kd: 'x', expectedUni: 'ग' },
  { id: 'A15', cat: 'basic', kd: '?k', expectedUni: 'घ' },
  { id: 'A16', cat: 'basic', kd: 'jke', expectedUni: 'राम' },
  { id: 'A17', cat: 'basic', kd: 'ueLrs', expectedUni: 'नमस्ते' },
  { id: 'A18', cat: 'basic', kd: 'ue%', note: 'visarga vs colon' },

  // B. Matras
  { id: 'B01', cat: 'matra', kd: 'dk', expectedUni: 'का' },
  { id: 'B02', cat: 'matra', kd: 'fd', expectedUni: 'कि' },
  { id: 'B03', cat: 'matra', kd: 'dh', expectedUni: 'की' },
  { id: 'B04', cat: 'matra', kd: 'dq', expectedUni: 'कु' },
  { id: 'B05', cat: 'matra', kd: 'dw', expectedUni: 'कू' },
  { id: 'B06', cat: 'matra', kd: 'd`', expectedUni: 'कृ' },
  { id: 'B07', cat: 'matra', kd: 'ds', expectedUni: 'के' },
  { id: 'B08', cat: 'matra', kd: 'dS', expectedUni: 'कै' },
  { id: 'B09', cat: 'matra', kd: 'dks', expectedUni: 'को' },
  { id: 'B10', cat: 'matra', kd: 'dkS', expectedUni: 'कौ' },
  { id: 'B11', cat: 'matra', kd: 'da', expectedUni: 'कं' },
  { id: 'B12', cat: 'matra', kd: 'd¡', expectedUni: 'कँ' },
  { id: 'B13', cat: 'matra', kd: 'd%', note: 'visarga/colon after consonant' },
  { id: 'B14', cat: 'matra', kd: 'fgUnh', expectedUni: 'हिन्दी' },

  // C. Reph — CRITICAL Z cases
  { id: 'C01', cat: 'reph', kd: 'keZ', note: 'धर्म via Z reph — SIL/LTRC', expectedUni: 'धर्म' },
  { id: 'C02', cat: 'reph', kd: '/keZ', note: 'धर्म variant' },
  { id: 'C03', cat: 'reph', kd: 'dk;Z', note: 'कार्य', expectedUni: 'कार्य' },
  { id: 'C04', cat: 'reph', kd: 'foHkkxZ', note: 'reph after matras' },
  { id: 'C05', cat: 'reph', kd: 'ljdkj', expectedUni: 'सरकार' },
  { id: 'C06', cat: 'reph', kd: 'j~', note: 'explicit र+halant' },
  { id: 'C07', cat: 'reph', kd: 'nzZ', note: 'र्द्र compound' },
  { id: 'C08', cat: 'reph', kd: 'Z', note: 'bare Z' },

  // D. Half letters — contested mappings
  { id: 'D01', cat: 'half', kd: 'D', note: 'क्' },
  { id: 'D02', cat: 'half', kd: 'F', note: 'थ् (classic) vs फ् (ours)' },
  { id: 'D03', cat: 'half', kd: 'G', note: 'ळ (classic) vs घ् (ours)' },
  { id: 'D04', cat: 'half', kd: 'T', note: 'ज् (classic) vs ट् (ours)' },
  { id: 'D05', cat: 'half', kd: 'P', note: 'च् (classic) vs छ् (ours)' },
  { id: 'D06', cat: 'half', kd: 'H', note: 'भ् (classic) — ours च्?' },
  { id: 'D07', cat: 'half', kd: '[', note: 'ख्' },
  { id: 'D08', cat: 'half', kd: '?', note: 'घ्' },
  { id: 'D09', cat: 'half', kd: 'R', note: 'त्' },
  { id: 'D10', cat: 'half', kd: 'U', note: 'न्' },
  { id: 'D11', cat: 'half', kd: 'I', note: 'प्' },
  { id: 'D12', cat: 'half', kd: 'L', note: 'स्' },
  { id: 'D13', cat: 'half', kd: 'O', note: 'व्' },
  { id: 'D14', cat: 'half', kd: 'E', note: 'म्' },
  { id: 'D15', cat: 'half', kd: 'X', note: 'ग्' },
  { id: 'D16', cat: 'half', kd: 'Y', note: 'ल् (classic) vs ण् (ours)' },
  { id: 'D17', cat: 'half', kd: '.', note: 'ण्' },
  { id: 'D18', cat: 'half', kd: '"', note: 'ष्' },
  { id: 'D19', cat: 'half', kd: "'", note: 'श्' },
  { id: 'D20', cat: 'half', kd: '/', note: 'ध्' },

  // E. Conjuncts / compounds
  { id: 'E01', cat: 'conjunct', kd: '{k', expectedUni: 'क्ष' },
  { id: 'E02', cat: 'conjunct', kd: '=', expectedUni: 'त्र' },
  { id: 'E03', cat: 'conjunct', kd: 'K', expectedUni: 'ज्ञ' },
  { id: 'E04', cat: 'conjunct', kd: '}', note: 'द्व (classic) vs ज्ञ (ours)' },
  { id: 'E05', cat: 'conjunct', kd: 'J', expectedUni: 'श्र' },
  { id: 'E06', cat: 'conjunct', kd: 'Dj', expectedUni: 'क्र' },
  { id: 'E07', cat: 'conjunct', kd: 'Dr', expectedUni: 'क्त' },
  { id: 'E08', cat: 'conjunct', kd: '|', note: 'द्य' },
  { id: 'E09', cat: 'conjunct', kd: ')', note: 'द्ध' },
  { id: 'E10', cat: 'conjunct', kd: 'æ', note: 'द्र' },
  { id: 'E11', cat: 'conjunct', kd: 'ç', note: 'प्र' },
  { id: 'E12', cat: 'conjunct', kd: 'xz', note: 'ग्र via rakar z' },
  { id: 'E13', cat: 'conjunct', kd: '#', note: 'रु' },
  { id: 'E14', cat: 'conjunct', kd: ':', note: 'रू' },
  { id: 'E15', cat: 'conjunct', kd: '{kf=;', expectedUni: 'क्षत्रिय' },
  { id: 'E16', cat: 'conjunct', kd: 'Kku', expectedUni: 'ज्ञान' },
  { id: 'E17', cat: 'conjunct', kd: 'Je', expectedUni: 'श्रम' },
  { id: 'E18', cat: 'conjunct', kd: 'Ij', expectedUni: 'प्र' },

  // F. Rakar z (lowercase)
  { id: 'F01', cat: 'rakar', kd: 'dz', note: 'क्र via z rakar' },
  { id: 'F02', cat: 'rakar', kd: 'iz', note: 'प्र' },
  { id: 'F03', cat: 'rakar', kd: 'cz', note: 'ब्र' },
  { id: 'F04', cat: 'rakar', kd: 'gz', note: 'ह्र' },
  { id: 'F05', cat: 'rakar', kd: 'z', note: 'bare z → ्र classic, ़ ours' },

  // G. Nukta
  { id: 'G01', cat: 'nukta', kd: 'd+', expectedUni: 'क़' },
  { id: 'G02', cat: 'nukta', kd: 't+', expectedUni: 'ज़' },
  { id: 'G03', cat: 'nukta', kd: 'Q+', expectedUni: 'फ़' },
  { id: 'G04', cat: 'nukta', kd: 'M+', expectedUni: 'ड़' },
  { id: 'G05', cat: 'nukta', kd: '<+', expectedUni: 'ढ़' },
  { id: 'G06', cat: 'nukta', kd: 'fd+', note: 'क़ि — nukta + i-matra reorder' },
  { id: 'G07', cat: 'nukta', kd: 'Z', note: 'ours maps Z to ज़; classic reph' },

  // H. Words / sentences
  { id: 'H01', cat: 'word', kd: 'd`f"k', expectedUni: 'कृषि' },
  { id: 'H02', cat: 'word', kd: "Ijns'k", expectedUni: 'प्रदेश' },
  { id: 'H03', cat: 'word', kd: 'mRrj', expectedUni: 'उत्तर' },
  { id: 'H04', cat: 'word', kd: 'Hkkjr', expectedUni: 'भारत' },
  { id: 'H05', cat: 'word', kd: 'ljdkj', expectedUni: 'सरकार' },
  { id: 'H06', cat: 'word', kd: 'foHkkx', expectedUni: 'विभाग' },
  { id: 'H07', cat: 'word', kd: 'dk;ZØe', note: 'कार्यक्रम with Z reph' },
  { id: 'H08', cat: 'word', kd: 'v/;kid', note: 'अध्यापक' },
  { id: 'H09', cat: 'sentence', kd: 'ueLrs Hkkjr', expectedUni: 'नमस्ते भारत' },
  {
    id: 'H10',
    cat: 'sentence',
    kd: "mRrj Ijns'k ljdkj d`f\"k foHkkx",
    expectedUni: 'उत्तर प्रदेश सरकार कृषि विभाग',
  },
  {
    id: 'H11',
    cat: 'sentence',
    kd: 'esjk uke jke gSA',
    note: 'मेरा नाम राम है।',
  },
  {
    id: 'H12',
    cat: 'paragraph',
    kd: 'ueLrs HkkjrA\nfgUnh Hkk"kk gSA\n\ndk;ZØe py jgk gSA',
  },

  // I. Numbers
  { id: 'I01', cat: 'number', kd: '0123456789', note: 'ASCII digits → Devanagari ours; classic leaves Latin' },
  { id: 'I02', cat: 'number', kd: '2024', note: 'year' },
  { id: 'I03', cat: 'number', kd: 'åƒ„…', note: 'Windows-glyph Devanagari digits' },

  // J. Punctuation
  { id: 'J01', cat: 'punct', kd: 'A', expectedUni: '।' },
  { id: 'J02', cat: 'punct', kd: 'AA', note: '॥ ours vs ।। classic' },
  { id: 'J03', cat: 'punct', kd: '-', note: '. classic vs - ours' },
  { id: 'J04', cat: 'punct', kd: '&', note: '- classic' },
  { id: 'J05', cat: 'punct', kd: ']', note: ', classic' },
  { id: 'J06', cat: 'punct', kd: '\\', note: '? classic' },
  { id: 'J07', cat: 'punct', kd: '(', note: '; classic' },
  { id: 'J08', cat: 'punct', kd: '%', note: ': classic vs ः ours' },

  // K. Mixed
  { id: 'K01', cat: 'mixed', kd: 'Hello ueLrs', note: 'English+Hindi' },
  { id: 'K02', cat: 'mixed', kd: 'jke 123', note: 'Hindi+digits' },
  { id: 'K03', cat: 'mixed', kd: 'www.test.com', note: 'URL may corrupt in classic' },

  // L. Edge
  { id: 'L01', cat: 'edge', kd: '' },
  { id: 'L02', cat: 'edge', kd: '   ' },
  { id: 'L03', cat: 'edge', kd: '  jke  ' },
  { id: 'L04', cat: 'edge', kd: 'jke\tjke\njke' },
  { id: 'L05', cat: 'edge', kd: 'jke    jke' },
];

// Expand expected-uni cases into Uni→KD→Uni round trips
const roundTripUnis = [
  'नमस्ते भारत',
  'राम',
  'हिन्दी',
  'कृषि',
  'प्रदेश',
  'क्षत्रिय',
  'ज्ञान',
  'श्रम',
  'उत्तर',
  'हाँ',
  'नमः',
  'क़',
  'फ़',
  'ज़',
  'धर्म',
  'कार्य',
  'द्वारा',
  'ळ',
  'रुपये',
  'रू',
  'क्र',
  'ग्राम',
];

type Row = {
  id: string;
  cat: string;
  kd: string;
  ours: string;
  classic: string;
  match: boolean;
  expectedOk?: boolean;
  note?: string;
};

const rows: Row[] = [];

for (const c of cases) {
  const ours = convertText(c.kd, 'kd-to-uni');
  const classic = classicToUnicode(c.kd);
  const match = ours === classic;
  let expectedOk: boolean | undefined;
  if (c.expectedUni !== undefined) expectedOk = ours === c.expectedUni;
  rows.push({
    id: c.id,
    cat: c.cat,
    kd: c.kd,
    ours,
    classic,
    match,
    expectedOk,
    note: c.note,
  });
}

const mismatches = rows.filter((r) => !r.match);
const expectedFails = rows.filter((r) => r.expectedOk === false);

console.log('=== FORENSIC AUDIT: Ours vs Classic Remington/LTRC ===\n');
console.log(`Total cases: ${rows.length}`);
console.log(`Match classic: ${rows.length - mismatches.length}`);
console.log(`Mismatch classic: ${mismatches.length}`);
console.log(`Known-expected fails (ours≠expectedUni): ${expectedFails.length}\n`);

const byCat = new Map<string, { total: number; mismatch: number }>();
for (const r of rows) {
  const e = byCat.get(r.cat) || { total: 0, mismatch: 0 };
  e.total++;
  if (!r.match) e.mismatch++;
  byCat.set(r.cat, e);
}
console.log('By category (mismatches/total):');
for (const [cat, e] of [...byCat.entries()].sort()) {
  console.log(`  ${cat}: ${e.mismatch}/${e.total}`);
}

console.log('\n=== MISMATCH DETAIL ===\n');
for (const r of mismatches) {
  console.log(`${r.id} [${r.cat}] KD=${JSON.stringify(r.kd)}`);
  console.log(`  ours:    ${JSON.stringify(r.ours)}  [${cps(r.ours)}]`);
  console.log(`  classic: ${JSON.stringify(r.classic)}  [${cps(r.classic)}]`);
  if (r.note) console.log(`  note: ${r.note}`);
  console.log(`  diff: ${diffChars(r.ours, r.classic)}`);
  console.log('');
}

console.log('=== EXPECTED-UNI FAILURES (ours) ===\n');
for (const r of expectedFails) {
  const c = cases.find((x) => x.id === r.id)!;
  console.log(`${r.id} expected ${JSON.stringify(c.expectedUni)} got ${JSON.stringify(r.ours)}`);
}

console.log('\n=== ROUND-TRIP Uni→KD→Uni (ours) ===\n');
let rtFail = 0;
for (const uni of roundTripUnis) {
  const kd = convertText(uni, 'uni-to-kd');
  const back = convertText(kd, 'kd-to-uni');
  const ok = back === uni.normalize('NFC');
  if (!ok) rtFail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${uni} → ${JSON.stringify(kd)} → ${back}`);
}

console.log('\n=== SIL-CRITICAL SPOT CHECKS ===\n');
const silCritical: [string, string, string][] = [
  ['Z=reph', 'keZ', 'धर्म'],
  ['Z=reph2', 'dk;Z', 'कार्य'],
  ['z=rakar', 'dz', 'क्र'],
  ['}=द्व', '}', 'द्व'],
  ['F=थ्', 'F', 'थ्'],
  ['G=ळ', 'G', 'ळ'],
  ['T=ज्', 'T', 'ज्'],
  ['P=च्', 'P', 'च्'],
  ['Y=ल्', 'Y', 'ल्'],
  ['H=भ्', 'H', 'भ्'],
  ['%=:', '%', ':'],
  ['#=रु', '#', 'रु'],
  [':=रू', ':', 'रू'],
  ['-=.', '-', '.'],
];
for (const [label, kd, expect] of silCritical) {
  const ours = convertText(kd, 'kd-to-uni');
  const classic = classicToUnicode(kd);
  console.log(
    `${label}: KD ${JSON.stringify(kd)} → ours=${JSON.stringify(ours)} classic=${JSON.stringify(classic)} expect≈${JSON.stringify(expect)} oursOK=${ours === expect} classicOK=${classic === expect}`,
  );
}

console.log('\n=== PERFORMANCE ===\n');
const chunk = 'ueLrs Hkkjr d`f"k foHkkx ljdkj ';
for (const n of [10, 100, 1000, 10000, 50000]) {
  const text = chunk.repeat(Math.ceil(n / chunk.length)).slice(0, n);
  const t0 = performance.now();
  const out = convertText(text, 'kd-to-uni');
  const t1 = performance.now();
  console.log(`${n} chars → ${out.length} out in ${(t1 - t0).toFixed(2)}ms`);
}

console.log('\n=== NUKTA + I-MATRA REORDER ===\n');
for (const kd of ['fd+', 'fQ+', 'ft+', 'fM+']) {
  const ours = convertText(kd, 'kd-to-uni');
  console.log(`${kd} → ${JSON.stringify(ours)} [${cps(ours)}]`);
}

console.log(`\nSummary: classic_mismatch=${mismatches.length}/${rows.length} rt_fail=${rtFail}/${roundTripUnis.length}`);

// SIL-intentional differences vs classic LTRC — documented, not defects.
const WONTFIX = new Set([
  'A18', // % → visarga (SIL); classic always colon
  'B13',
  'J02', // AA → ॥ (SIL); classic ।।
  'J08',
  'C08', // lone Z has nothing to attach to
  'G07',
  'G06', // nukta before i-matra (SIL/Unicode); classic leaves कि़
]);

const unexplained = mismatches.filter((r) => !WONTFIX.has(r.id));
if (unexplained.length) {
  console.log('\n=== UNEXPLAINED CLASSIC MISMATCHES (not in WONTFIX) ===\n');
  for (const r of unexplained) {
    console.log(`${r.id} [${r.cat}] KD=${JSON.stringify(r.kd)}`);
  }
}

const silCriticalFail = silCritical.filter(([, kd, expect]) => convertText(kd, 'kd-to-uni') !== expect);
// keZ without / is not धर्म
const silGate = silCriticalFail.filter(([label]) => label !== 'Z=reph' && label !== '%=:');

if (unexplained.length || rtFail || silGate.length) {
  console.log(
    `\nForensic gate FAILED unexplained=${unexplained.length} rt_fail=${rtFail} sil_gate=${silGate.length}`,
  );
  process.exit(1);
}

console.log('\nForensic gate passed (remaining classic diffs are WONTFIX / SIL policy).');
process.exit(0);
