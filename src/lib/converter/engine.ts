/**
 * KrutiDev <-> Unicode conversion (KrutiDev 010 / Remington).
 *
 * Authority:
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
 * - ASCII 0-9 preserved; Windows-glyph digits mapped
 * - % = visarga (digit+% -> colon in preprocess)
 * - ASCII punct preserved on Uni->KD (mixed English product policy, plan §6)
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
 * Last-word Uni->KD map (forensic plan section 6):
 * Remington identities + ligature overrides; never invert HCalso vertbar.
 * Product policy: ASCII punct stays ASCII in mixed English.
 * Remington punct slots remain decode-only via KDC_MAP.
 */
function buildEncodeMap(): Record<string, string> {
  const map = { ...UNI_ENCODE };
  map['\u091c\u094d\u091e'] = 'K';
  map['\u0926\u094d\u0935'] = '}';
  map['\u0926\u094d\u092f'] = '|';
  map['\u0943'] = '`';
  map['\u0923'] = '.k';
  map['\u0930\u094d'] = 'Z';
  map['\u094d\u0930'] = 'z';
  map['\u0917\u094d\u0930'] = 'xz';
  map['\u0915\u094d\u0930'] = '\u00d8';
  map['\u0915\u094d\u0924'] = '\u00e4';
  map['\u0924\u094d\u0924'] = '\u00d9k';
  map['\u092a\u094d\u0930'] = 'Ij';
  map['\u0915'] = 'd';
  map['\u092e'] = 'e';
  for (const ch of ['.', ',', '?', '-', '/', ';', '(', ')', '[', ']', '{', '}', '=', '!']) {
    delete map[ch];
  }
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

const _rephTrailRe = new RegExp(
  `(${DEV_CONS}${NUKTA}?(?:${VIRAMA}${DEV_CONS}${NUKTA}?)*)(${DEV_POST})${REPH}(?!${DEV_CONS})`,
  'g',
);
const _iMatraRevRe = new RegExp(
  `((?:${DEV_CONS}${NUKTA}?${VIRAMA})*${DEV_CONS}${NUKTA}?)${I_MATRA}`,
  'g',
);
const _rephLeadRevRe = new RegExp(
  `${REPH}(${DEV_CONS}${NUKTA}?(?:${VIRAMA}${DEV_CONS}${NUKTA}?)*)(${DEV_POST})`,
  'g',
);

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
    while (end >= 0 && isDevPostMark(out[end]!)) end--;
    if (end < 0 || !isDevConsonantChar(out[end]!)) continue;

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
  // digit+% -> colon is applied AFTER map (visarga), in cleanupUnicode.
  t = t.replace(/\u00b1/g, 'Za');
  t = t.replace(/\u00c6/g, REPH + 'f');
  t = t.replace(/\u00ca/g, 'hZ');
  return t;
}

function cleanupUnicode(t: string): string {
  t = t.replace(new RegExp(VIRAMA + 'Z', 'g'), 'Z');
  t = t.replace(new RegExp(VIRAMA + VIRAMA + '\u0930', 'g'), VIRAMA + '\u0930');
  t = t.replace(new RegExp(VIRAMA + VIRAMA, 'g'), VIRAMA);
  t = t.replace(new RegExp(VIRAMA + ' ', 'g'), ' ');
  t = t.replace(/ ([\u093e-\u094c\u0901-\u0903\u0945\u0949])/g, '$1');
  t = t.replace(new RegExp('([\\u0966-\\u096f\\d])' + VISARGA, 'g'), '$1:');
  t = t.replace(/[\u200c\u200d]/g, '');
  return t;
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
    return cleanupUnicode(text).normalize('NFC');
  },

  toKrutiDev(text: string): string {
    if (!text) return '';

    let input = text
      .normalize('NFC')
      .replace(/\uFEFF/g, '')
      .replace(/\u00A0/g, ' ')
      .replace(/[\u200c\u200d]/g, '');
    input = input.replace(_iMatraRevRe, I_MATRA + '$1');
    input = input.replace(_rephLeadRevRe, '$1$2' + REPH);
    return input.replace(_uniRegex, (match) => UNI_TO_KDC_MAP[match] ?? match);
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

export function detectLikelyKrutiDev(text: string): boolean {
  if (!text.trim()) return false;
  const compact = text.replace(/\s+/g, '');
  if (compact.length > 0) {
    const dev = (text.match(/[\u0900-\u097F]/g) || []).length;
    if (dev / compact.length >= 0.4) return false;
  }
  const uni = KrutiDevConverter.toUnicode(text);
  return KrutiDevConverter.isValidUnicodeOutput(uni);
}
