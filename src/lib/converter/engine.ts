/**
 * KrutiDev <-> Unicode conversion (KrutiDev 010 / Remington).
 *
 * Authority:
 * - UPDES Convert_to_Krutidev_010 / classic array_one↔array_two
 * - SIL TECkit KrutiDev010.map -- REPH=Z(90), NUKTA=+(43), IKAR=f(102)
 * - LTRC kru2uni / classic Remington converters
 *
 * KD->Uni:
 *   preprocess -> longest-match map -> ikar (f) -> Z-reph -> trailing-reph fix -> NFC
 *
 * Uni->KD:
 *   NFC -> strip BOM/ZWJ/ZWNJ, NBSP->space -> reverse i-matra -> reverse reph
 *   -> longest-match UNI_ENCODE (canonical Remington; never half+vertbar)
 *
 * Policy:
 * - z = rakar; nukta = +
 * - Z = reph (never za-with-nukta); t+ = za-with-nukta
 * - ASCII 0-9 preserved; Devanagari ०-९ → Windows-glyph digits
 * - % = visarga (digit+% -> colon in preprocess)
 * - Remington punctuation on Uni→KD (comma→], ?→\, etc.); see UNI_ENCODE
 * - Preserve virama before space (सद् भाव); do not strip ् + space
 */

import { KDC_MAP } from './krutidev010-map';
import { UNI_ENCODE } from './uni-encode';

const DEV_CONS =
  '[\u0915\u0916\u0917\u0918\u0919\u091a\u091b\u091c\u091d\u091e\u091f\u0920\u0921\u0922\u0923\u0924\u0925\u0926\u0927\u0928\u092a\u092b\u092c\u092d\u092e\u092f\u0930\u0932\u0935\u0936\u0937\u0938\u0939\u0933\u0958\u0959\u095a\u095b\u095c\u095d\u095e\u095f]';
const DEV_POST =
  '[\u093e\u093f\u0940\u0941\u0942\u0943\u0944\u0947\u0948\u094b\u094c\u0901\u0902\u0903\u0945\u0949\u093c]*';
const NUKTA = '\u093c';
const VIRAMA = '\u094d';
const I_MATRA = '\u093f';
const REPH = '\u0930\u094d';
const ANUSVARA = '\u0902';
const VISARGA = '\u0903';

/**
 * Uni→KD map: Remington identities + ligature overrides; never invert
 * HCalso vertbar. Punctuation / digits / chandrabindu come from UNI_ENCODE
 * (UPDES Convert_to_Krutidev_010).
 */
function buildEncodeMap(): Record<string, string> {
  const map = { ...UNI_ENCODE };
  // Competitor inserts ASCII Z only during reph-move (unikruti.js). A glyph-map
  // र्→Z would turn leading-र् inputs (र्य/र्क/…) into Z;/Zd instead of j~;/j~d.
  delete map['\u0930\u094d'];
  // Ó is a decode alias for ्य; encoding it here steals ्+य from j~; (र्य).
  delete map['\u094d\u092f'];
  // Üz is a legacy decode alias for श्र्य; live competitor encodes ';Z or J~;.
  delete map['\u0936\u094d\u0930\u094d\u092f'];
  map['\u091c\u094d\u091e'] = 'K';
  map['\u0926\u094d\u0935'] = '}';
  map['\u0926\u094d\u092f'] = '|';
  map['\u0943'] = '`';
  // Longest-match कृ / दृ ligatures (competitor Uni→KD); do not change global ृ→`
  map['\u0915\u0943'] = '\u2014';
  map['\u0926\u0943'] = '\u2013';
  // Competitor Uni→KD: चै → pkS (च-specific; do not change global ै→S)
  map['\u091a\u0948'] = 'pkS';
  map['\u0923'] = '.k';
  map['\u094d\u0930'] = 'z';
  map['\u0917\u094d\u0930'] = 'xz';
  map['\u0915\u094d\u0930'] = '\u00d8';
  map['\u0915\u094d\u0924'] = '\u00e4';
  map['\u0924\u094d\u0924'] = '\u00d9k';
  map['\u092a\u094d\u0930'] = '\u00e7';
  map['\u092b\u094d\u0930'] = '\u00dd';
  map['\u0939\u094d\u0930'] = '\u00baz';
  map['\u092d\u094d\u0930'] = 'Hkz';
  // Competitor Uni→KD: त्र्य / त्र्या (not lossy «)
  map['\u0924\u094d\u0930\u094d\u092f'] = 'R;Z';
  map['\u0924\u094d\u0930\u094d\u092f\u093e'] = 'R;kZ';
  // Do NOT map श्र्य → Üz here. Competitor relocates र् then encodes श्+य+Z as ';Z.
  // Legacy Üz remains a KD→Uni decode alias in krutidev010-map.
  map['\u0901'] = '\u00a1';
  map['\u0915'] = 'd';
  map['\u092e'] = 'e';
  return map;
}

const UNI_TO_KDC_MAP = buildEncodeMap();

const _kdcKeys = Object.keys(KDC_MAP).sort((a, b) => b.length - a.length);
const _kdcRegex = new RegExp(
  _kdcKeys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'g',
);

const _uniKeys = Object.keys(UNI_TO_KDC_MAP).sort((a, b) => b.length - a.length);
const _uniRegex = new RegExp(
  _uniKeys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
  'g',
);

// Do not treat र+्+् (competitor RZ; → तर््य) as a trailing reph to relocate.
const _rephTrailRe = new RegExp(
  `(${DEV_CONS}${NUKTA}?(?:${VIRAMA}${DEV_CONS}${NUKTA}?)*)(${DEV_POST})${REPH}(?!${DEV_CONS}|${VIRAMA})`,
  'g',
);
const _iMatraRevRe = new RegExp(
  `((?:${DEV_CONS}${NUKTA}?${VIRAMA})*${DEV_CONS}${NUKTA}?)${I_MATRA}`,
  'g',
);
/**
 * Competitor unikruti.js Uni→KD reph pass:
 *   mss += '  ';
 *   pohr = indexOf("र्");
 *   while (pohr > 0) { move र् past following cluster+matras to a trailing Z; pohr = indexOf("र्"); }
 *   mss = mss.substr(0, length-2);
 *
 * Critical quirk: if the first `र्` is at index 0, the loop never runs — so
 * leading-र् inputs (र्य/र्क/र्ग and phrases that start with them) keep
 * literal र+्+C → j~C instead of CZ. Embedded र् (कार्य, धर्म, तर्क) still
 * relocates. Competitor also relocates `र्` even when preceded by virama
 * (श्र्य → ';Z via श्+य+Z), unlike a (?<!virama) guard.
 */
const _rephLeadRevRe = new RegExp(
  `${REPH}(${DEV_CONS}${NUKTA}?(?:${VIRAMA}${DEV_CONS}${NUKTA}?)*)(${DEV_POST})`,
  'g',
);

function applyCompetitorRephLeadReverse(input: string): string {
  // Mirror while (pohr > 0): leading र् suppresses every reph move in the string.
  if (input.startsWith(REPH)) return input;
  // Insert ASCII Z directly (competitor), not a lingering Unicode र् for the glyph map.
  return input.replace(_rephLeadRevRe, '$1$2Z');
}

function encodeCanonicalChunk(input: string): string {
  const withIkar = input.replace(_iMatraRevRe, I_MATRA + '$1');
  const withReph = applyCompetitorRephLeadReverse(withIkar);
  return withReph.replace(_uniRegex, (match) => UNI_TO_KDC_MAP[match] ?? match);
}

function isDevPostMark(ch: string): boolean {
  const cp = ch.codePointAt(0) ?? 0;
  return (
    cp === 0x093c ||
    (cp >= 0x0900 && cp <= 0x0903) ||
    (cp >= 0x093e && cp <= 0x094c) ||
    cp === 0x0945 ||
    cp === 0x0949
  );
}

function isDevConsonantChar(ch: string): boolean {
  const cp = ch.codePointAt(0) ?? 0;
  return (
    (cp >= 0x0915 && cp <= 0x0939) ||
    (cp >= 0x0958 && cp <= 0x095f) ||
    cp === 0x0933
  );
}

/** Consume (C nukta? virama)* C nukta? starting at i. */
function consumeCluster(s: string, i: number): { cluster: string; next: number } {
  if (i >= s.length) return { cluster: '', next: i };
  let pos = i;
  const parts: string[] = [];

  while (pos < s.length && isDevConsonantChar(s[pos]!)) {
    parts.push(s[pos]!);
    pos++;
    if (pos < s.length && s[pos] === NUKTA) {
      parts.push(NUKTA);
      pos++;
    }
    if (pos < s.length && s[pos] === VIRAMA) {
      parts.push(VIRAMA);
      pos++;
      continue;
    }
    break;
  }

  if (parts.length === 0) {
    const cp = s.codePointAt(i)!;
    const ch = String.fromCodePoint(cp);
    return { cluster: ch, next: i + ch.length };
  }
  return { cluster: parts.join(''), next: pos };
}

/** Remington `f` sits before its consonant cluster. */
function applyIkar(s: string): string {
  const out: string[] = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i]!;
    if (ch === 'f' || ch === '\u00c7' || ch === '\u00af') {
      const { cluster, next } = consumeCluster(s, i + 1);
      out.push(cluster, ch === 'f' ? I_MATRA : I_MATRA + ANUSVARA);
      i = next;
      continue;
    }
    if (ch === '\u00c9') {
      const { cluster, next } = consumeCluster(s, i + 1);
      out.push('\u0930', VIRAMA, cluster, I_MATRA, ANUSVARA);
      i = next;
      continue;
    }
    out.push(ch);
    i++;
  }
  return out.join('');
}

/**
 * Z = reph. Insert ra+virama before the preceding akshara (skip trailing matras).
 * One code unit per array slot.
 */
function applyZReph(text: string): string {
  const out: string[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]!;
    if (ch !== 'Z') {
      out.push(ch);
      continue;
    }
    let end = out.length - 1;
    // Competitor: Z after whitespace still rephs the prior consonant (foHkkx Z → विभार्ग ).
    // Spaces stay in place; only the scan skips them.
    while (end >= 0 && out[end] === ' ') end--;
    while (end >= 0 && isDevPostMark(out[end]!)) end--;
    if (end < 0 || !isDevConsonantChar(out[end]!)) {
      // Competitor keeps a literal Z when it cannot attach as reph (Z; → Zय).
      out.push(ch);
      continue;
    }

    let start = end;
    while (start >= 1) {
      if (
        start >= 3 &&
        out[start - 1] === VIRAMA &&
        out[start - 2] === NUKTA &&
        isDevConsonantChar(out[start - 3]!)
      ) {
        start -= 3;
        continue;
      }
      if (start >= 2 && out[start - 1] === VIRAMA && isDevConsonantChar(out[start - 2]!)) {
        start -= 2;
        continue;
      }
      break;
    }
    out.splice(start, 0, '\u0930', VIRAMA);
  }
  return out.join('');
}

function preprocessKd(input: string): string {
  let t = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  t = t.replace(/ \xaa/g, '\xaa').replace(/ ~j/g, '~j').replace(/ z/g, 'z');
  t = t.replace(/Q\+Z/g, 'QZ+');
  t = t.replace(/sas/g, 'sa');
  t = t.replace(/aa/g, 'a');
  t = t.replace(/ZZ/g, 'Z');
  t = t.replace(/=kk/g, '=k');
  t = t.replace(/f=k/g, 'f=');
  // Contextual spaced % and Devanagari digit+visarga handling follows in cleanupUnicode.
  t = t.replace(/\u00b1/g, 'Za');
  t = t.replace(/\u00c6/g, REPH + 'f');
  t = t.replace(/\u00ca/g, 'hZ');
  return t;
}

function cleanupUnicode(t: string): string {
  t = t.replace(new RegExp(VIRAMA + 'Z', 'g'), 'Z');
  t = t.replace(new RegExp(VIRAMA + VIRAMA + '\u0930', 'g'), VIRAMA + '\u0930');
  // Keep र + ् + ् (competitor RZ; → तर््य). Collapse other doubled viramas.
  t = t.replace(new RegExp('(?<!\u0930)' + VIRAMA + VIRAMA, 'g'), VIRAMA);
  // Keep virama before space (सद् भाव); official maps "~ " ↔ "् ".
  // Preserve spaces before detached matras to match competitor clipboard output.
  // e.g. KD `fd k` -> Unicode `कि ा`, not `किा`. Do not erase user whitespace.
  // Competitor: spaced % → ASCII colon and drops the spaces (`d %` → क:).
  // Unspaced % stays visarga (`d%` → कः; `1%` → 1ः).
  // Only Devanagari digit+visarga is colon-normalized; ASCII digit+% stays as-is.
  t = t.replace(new RegExp(' +' + VISARGA, 'g'), ':');
  t = t.replace(new RegExp('([\\u0966-\\u096f])' + VISARGA, 'g'), '$1:');
  t = t.replace(/[\u200c\u200d]/g, '');
  return t;
}

/**
 * UKR-035B: the competitor's *copied* KD→Unicode bytes use precomposed
 * Devanagari nukta letters (U+0958–U+095F), not their canonical decomposition.
 * NFC DECOMPOSES these eight characters, so this must run after the final NFC.
 *
 * This is a clipboard-compatibility output form, not a new Unicode normalization.
 * Scope: only base+nukta sequences produced by the existing KD decoder.
 */
const _competitorNuktaByDecomposed: Readonly<Record<string, string>> = {
  '\u0915\u093c': '\u0958', // क़
  '\u0916\u093c': '\u0959', // ख़
  '\u0917\u093c': '\u095a', // ग़
  '\u091c\u093c': '\u095b', // ज़
  '\u0921\u093c': '\u095c', // ड़
  '\u0922\u093c': '\u095d', // ढ़
  '\u092b\u093c': '\u095e', // फ़
  '\u092f\u093c': '\u095f', // य़
};
const _decomposedNuktaRe = /[कखगजडढफय]\u093c/g;

function competitorNuktaClipboardForm(nfcOutput: string): string {
  return nfcOutput.replace(
    _decomposedNuktaRe,
    (pair) => _competitorNuktaByDecomposed[pair] ?? pair,
  );
}

export const KrutiDevConverter = {
  toUnicode(input: string): string {
    if (!input) return '';

    let text = preprocessKd(input.normalize('NFC'));
    text = text.replace(_kdcRegex, (match) => KDC_MAP[match] ?? match);
    text = applyIkar(text);
    text = cleanupUnicode(text);
    text = applyZReph(text);
    text = text.replace(_rephTrailRe, REPH + '$1$2');
    return competitorNuktaClipboardForm(cleanupUnicode(text).normalize('NFC'));
  },

  toKrutiDev(text: string): string {
    if (!text) return '';

    const input = text
      .normalize('NFC')
      .replace(/\uFEFF/g, '')
      .replace(/\u00A0/g, ' ')
      .replace(/[\u200c\u200d]/g, '');
    // UKR-035: competitor leading-र् quirk (unikruti.js while pohr > 0), not
    // whitespace-token overrides — those mis-encode `कार्य र्य` / `र्य,`.
    return encodeCanonicalChunk(input);
  },

  isValidUnicodeOutput(output: string): boolean {
    if (!output || output.trim() === '') return false;
    const devanagari = (output.match(/[\u0900-\u097F]/g) || []).length;
    const total = output.replace(/\s/g, '').length;
    return total === 0 || devanagari / total >= 0.5;
  },
};

export type ConverterMode = 'uni-to-kd' | 'kd-to-uni';
export type ConverterVariant = '010' | '10';
export type UpdeshDirection = 'unicode-to-updesh' | 'updesh-to-unicode';

export function convertText(text: string, mode: ConverterMode): string {
  if (mode === 'kd-to-uni') return KrutiDevConverter.toUnicode(text);
  return KrutiDevConverter.toKrutiDev(text);
}

/** Updesh === KrutiDev 010. */
export function convertUpdesh(input: string, direction: UpdeshDirection): string {
  if (!input) return '';
  if (direction === 'unicode-to-updesh') {
    return KrutiDevConverter.toKrutiDev(input);
  }
  return KrutiDevConverter.toUnicode(input);
}

export function countWords(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

export function countChars(text: string): number {
  return text.length;
}

export type DetectedInput = 'unicode' | 'krutidev' | 'ambiguous';

/**
 * KD-only glyph signatures. Backtick/quote are deliberately excluded: they are
 * ordinary English punctuation (`code`, don`t), so they never decide direction.
 */
const KD_STRONG_RE = /[\u00A1-\u00BF\u0152\u0153\u02C6\u02DC\u2020\u2021\u2122]|kk/;

/**
 * Classify pasted/typed text. Any Devanagari means Unicode; Latin-only text is
 * KrutiDev only with real KD signatures, otherwise ambiguous (keep user's mode).
 */
export function detectInputKind(text: string): DetectedInput {
  if (!text.trim()) return 'ambiguous';
  if (/[ऀ-ॿ]/.test(text)) return 'unicode';
  if (!KD_STRONG_RE.test(text)) return 'ambiguous';
  const uni = KrutiDevConverter.toUnicode(text);
  if (!KrutiDevConverter.isValidUnicodeOutput(uni)) return 'ambiguous';
  // English decodes to "valid-looking" Devanagari that is orthographically impossible.
  return uni.split(/\s+/).every(isWellFormedDevanagariWord) ? 'krutidev' : 'ambiguous';
}

const MALFORMED_WORD_RE = new RegExp(
  [
    '^[\u0900-\u0903\u093A-\u094D]', // starts with sign/matra/virama
    '[\u093E-\u094C][\u093E-\u094D]', // matra followed by matra/virama
    '[\u0904-\u0914][\u0900-\u0903\u093A-\u094D]', // independent vowel + sign
    '[\u0904-\u0914]{2}', // two independent vowels in a row
    '\u094D[\u093E-\u094C]', // virama then matra
    '\u094D\u094D', // double virama
    '[\u0915-\u0939]\u0964[\u0915-\u0939]', // danda inside a word
  ].join('|')
);

function isWellFormedDevanagariWord(word: string): boolean {
  return !MALFORMED_WORD_RE.test(word);
}

export function detectLikelyKrutiDev(text: string): boolean {
  return detectInputKind(text) === 'krutidev';
}
