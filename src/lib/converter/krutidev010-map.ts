/**
 * KrutiDev 010 / Remington glyph identities (KD -> Unicode).
 *
 * Authority:
 * - SIL TECkit KrutiDev010.map (REPH=Z/90, NUKTA=+/43, IKAR=f/102)
 * - LTRC kru2uni / classic array_one <-> array_two converters
 *
 * Intentionally NOT in this table:
 * - `f` (ikar) -- linear cluster move in the engine
 * - `Z` (reph marker) -- linear reph pass in the engine
 * - ASCII 0-9 -- preserved as Latin digits; Windows-glyph digits are mapped
 *
 * Canonical Uni->KD lives in uni-encode.ts (never invert this table blindly).
 * Values use \\u escapes so the file stays ASCII and encoding-safe.
 */

export const KDC_MAP: Record<string, string> = {
  vkS: '\u0914',
  vks: '\u0913',
  ',s': '\u0910',
  vk: '\u0906',
  bZ: '\u0908',
  'b\u00B1': '\u0908\u0902',
  '\u00C3': '\u0908',
  'v\u201A': '\u0911',
  v: '\u0905',
  b: '\u0907',
  m: '\u0909',
  '\u00C5': '\u090A',
  _: '\u090B',
  ',': '\u090F',

  kas: '\u094B\u0902',
  kS: '\u094C',
  ks: '\u094B',
  pkS: '\u091A\u0948',
  AA: '\u0965',
  '\u00A1k': '\u093E\u0901',
  '\u00A1w': '\u0942\u0901',
  ak: '\u093E\u0902',
  ah: '\u0940\u0902',
  aq: '\u0941\u0902',
  aw: '\u0942\u0902',
  as: '\u0947\u0902',
  aS: '\u0948\u0902',
  'a\u00AA': '\u094D\u0930\u0902',
  saz: '\u094D\u0930\u0947\u0902',
  k: '\u093E',
  h: '\u0940',
  q: '\u0941',
  w: '\u0942',
  '`': '\u0943',
  s: '\u0947',
  S: '\u0948',
  a: '\u0902',
  '%': '\u0903',
  '\u00B5': '\u0901',
  '\u00A1': '\u0901',
  W: '\u0945',
  A: '\u0964',
  '\u201A': '\u0949',
  '\u00C8': '\u0940\u0902',
  '\u00AE': '\u0948\u0902',

  '~': '\u094D',

  Dk: '\u0915',
  Xk: '\u0917',
  Pk: '\u091A',
  Tk: '\u091C',
  Rk: '\u0924',
  Uk: '\u0928',
  Ik: '\u092A',
  Ck: '\u092C',
  Hk: '\u092D',
  Ek: '\u092E',
  Yk: '\u0932',
  Ok: '\u0935',
  Lk: '\u0938',
  '[k': '\u0916',
  '?k': '\u0918',
  Fk: '\u0925',
  '/k': '\u0927',
  '.k': '\u0923',
  "'k": '\u0936',
  '"k': '\u0937',
  '\u00DCk': '\u0936',

  '[k+': '\u0916\u093C',
  '[+': '\u0916\u093C\u094D',
  'M+': '\u0921\u093C',
  '<+': '\u0922\u093C',
  'd+': '\u0915\u093C',
  'x+': '\u0917\u093C',
  't+': '\u091C\u093C',
  'T+': '\u091C\u093C\u094D',
  'Q+': '\u092B\u093C',
  '\u00B6+': '\u092B\u093C\u094D',
  ';+': '\u092F\u093C',
  'j+': '\u0931',
  'u+': '\u0929',

  d: '\u0915',
  x: '\u0917',
  '\u00B3': '\u0919',
  p: '\u091A',
  N: '\u091B',
  t: '\u091C',
  '>': '\u091D',
  '\u00B4': '\u091E',
  '\u00A5': '\u091E',
  V: '\u091F',
  B: '\u0920',
  M: '\u0921',
  '<': '\u0922',
  r: '\u0924',
  n: '\u0926',
  u: '\u0928',
  i: '\u092A',
  Q: '\u092B',
  c: '\u092C',
  e: '\u092E',
  y: '\u0932',
  G: '\u0933',
  o: '\u0935',
  l: '\u0938',
  g: '\u0939',
  j: '\u0930',
  ';': '\u092F',
  '\u00C4': '\u0918',
  '\u00E8': '\u0927',
  '\u00D2': '\u092D',

  D: '\u0915\u094D',
  '[': '\u0916\u094D',
  X: '\u0917\u094D',
  '?': '\u0918\u094D',
  P: '\u091A\u094D',
  T: '\u091C\u094D',
  '\u00F7': '\u091D\u094D',
  '\u00D6': '\u091D\u094D',
  F: '\u0925\u094D',
  '/': '\u0927\u094D',
  '\u00CB': '\u0927\u094D',
  U: '\u0928\u094D',
  I: '\u092A\u094D',
  '\u00B6': '\u092B\u094D',
  C: '\u092C\u094D',
  H: '\u092D\u094D',
  E: '\u092E\u094D',
  '\u00B8': '\u092F\u094D',
  Y: '\u0932\u094D',
  O: '\u0935\u094D',
  "'": '\u0936\u094D',
  '"': '\u0937\u094D',
  '\u00DC': '\u0936\u094D',
  L: '\u0938\u094D',
  '\u00BA': '\u0939\u094D',
  '.': '\u0923\u094D',
  R: '\u0924\u094D',

  '{k': '\u0915\u094D\u0937',
  '{': '\u0915\u094D\u0937\u094D',
  '=': '\u0924\u094D\u0930',
  '\u00AB': '\u0924\u094D\u0930\u094D',
  K: '\u091C\u094D\u091E',
  '}': '\u0926\u094D\u0935',
  '|': '\u0926\u094D\u092F',
  ')': '\u0926\u094D\u0927',
  J: '\u0936\u094D\u0930',
  '#': '\u0930\u0941',
  ':': '\u0930\u0942',
  '\u00D8': '\u0915\u094D\u0930',
  '\u00E6': '\u0926\u094D\u0930',
  '\u00E7': '\u092A\u094D\u0930',
  '\u00C1': '\u092A\u094D\u0930',
  '\u00E0': '\u0939\u094D\u0928',
  '\u00E1': '\u0939\u094D\u092F',
  '\u00E2': '\u0939\u0943',
  '\u00E3': '\u0939\u094D\u092E',
  '\u00BAz': '\u0939\u094D\u0930',
  '\u00ED': '\u0926\u094D\u0926',
  '\u00CC': '\u0926\u094D\u0926',
  '\u00F4': '\u0915\u094D\u0915',
  '\u00E4': '\u0915\u094D\u0924',
  '\u00E9': '\u0928\u094D\u0928',
  '\u00D9k': '\u0924\u094D\u0924',
  '\u00D9': '\u0924\u094D\u0924\u094D',
  '\u2014': '\u0915\u0943',
  '\u2013': '\u0926\u0943',
  '\u00D1': '\u0915\u0943',
  '\u2122': '\u0928\u094D\u0928\u094D',
  xz: '\u0917\u094D\u0930',
  nzZ: '\u0930\u094D\u0926\u094D\u0930',
  'V\u00AA': '\u091F\u094D\u0930',
  'M\u00AA': '\u0921\u094D\u0930',
  'N\u00AA': '\u091B\u094D\u0930',
  '\u00DD': '\u092B\u094D\u0930',
  '\u00EA': '\u091F\u094D\u091F',
  '\u00EB': '\u091F\u094D\u0920',
  '\u00EC': '\u0921\u094D\u0921',
  '\u00EF': '\u0921\u094D\u0922',
  '\u00CD': '\u091F\u094D\u091F',
  '\u00CE': '\u091F\u094D\u0920',
  '\u00CF': '\u0921\u094D\u0921',
  '\u00D4': '\u0921\u094D\u0922',
  '\u00D3': '\u094D\u092F',
  'N\u00EE': '\u091B\u094D\u092F',
  'V\u00EE': '\u091F\u094D\u092F',
  'B\u00EE': '\u0920\u094D\u092F',
  'M\u00EE': '\u0921\u094D\u092F',
  '<\u00EE': '\u0922\u094D\u092F',
  '<\u00AA\u00AA': '\u0922\u094D\u0930',
  '\u00EE': '\u094D\u092F',

  z: '\u094D\u0930',
  '\u00AA': '\u094D\u0930',
  '~j': '\u094D\u0930',

  ']': ',',
  '\\': '?',
  '(': ';',
  '\u00BC': '(',
  '\u00BD': ')',
  '\u00BF': '{',
  '\u00C0': '}',
  '\u00BE': '=',
  '-': '.',
  '&': '-',
  '^': '\u2018',
  '*': '\u2019',
  '\u00DE': '\u201C',
  '\u00DF': '\u201D',
  '\u0152': '\u0970',
  '\u00F1': '\u0970',
  '@': '/',
  '\u2022': '\u093D',
  '\u00B7': '\u093D',
  '\u2219': '\u093D',

  '+': '\u093C',

  '\u00E5': '\u0966',
  '\u0192': '\u0967',
  '\u201E': '\u0968',
  '\u2026': '\u0969',
  '\u2020': '\u096A',
  '\u2021': '\u096B',
  '\u02C6': '\u096C',
  '\u2030': '\u096D',
  '\u0160': '\u096E',
  '\u2039': '\u096F',
};

export function silIdentityErrors(): string[] {
  const errors: string[] = [];
  if (Object.prototype.hasOwnProperty.call(KDC_MAP, 'f')) {
    errors.push('f (ikar) must not be in KDC_MAP');
  }
  if (Object.prototype.hasOwnProperty.call(KDC_MAP, 'Z')) {
    errors.push('Z (reph) must not be in KDC_MAP');
  }
  const expect: Record<string, string> = {
    z: '\u094d\u0930',
    '`': '\u0943',
    H: '\u092d\u094d',
    P: '\u091a\u094d',
    F: '\u0925\u094d',
    G: '\u0933',
    T: '\u091c\u094d',
    Y: '\u0932\u094d',
    't+': '\u091c\u093c',
    '+': '\u093c',
    '%': '\u0903',
    '#': '\u0930\u0941',
    ':': '\u0930\u0942',
    d: '\u0915',
    e: '\u092e',
    u: '\u0928',
    K: '\u091c\u094d\u091e',
    '}': '\u0926\u094d\u0935',
    '.k': '\u0923',
    '.': '\u0923\u094d',
  };
  for (const [k, v] of Object.entries(expect)) {
    if (KDC_MAP[k] !== v) {
      errors.push(`${JSON.stringify(k)} must be ${v}, got ${JSON.stringify(KDC_MAP[k])}`);
    }
  }
  for (const d of '0123456789') {
    if (Object.prototype.hasOwnProperty.call(KDC_MAP, d)) {
      errors.push(`ASCII digit ${d} must not be in KDC_MAP (SIL preserves Latin digits)`);
    }
  }
  for (const k of VERTBAR_FULL_KEYS) {
    if (!DECODE_ONLY_KEYS.has(k)) {
      errors.push(`${k} must be decode-only (encode uses the lowercase full letter)`);
    }
  }
  if (!DECODE_ONLY_KEYS.has('~j')) {
    errors.push('~j must be decode-only (canonical reph encode is Z)');
  }
  if (DECODE_ONLY_KEYS.has('xz')) {
    errors.push('xz must encode \u0917\u094d\u0930 (Xz is not the canonical Remington form)');
  }
  if (DECODE_ONLY_KEYS.has('\u00D9k')) {
    errors.push('\u00D9k must encode \u0924\u094d\u0924 (not decode-only)');
  }
  if (DECODE_ONLY_KEYS.has('Hk')) {
    errors.push('Hk must encode \u092d (decode-only alias is \u00D2)');
  }
  for (const k of ['[k', '?k', 'Fk', '/k', '.k', "'k", '"k']) {
    if (DECODE_ONLY_KEYS.has(k)) {
      errors.push(`${k} is HConly full form and must remain encode-capable`);
    }
  }
  return errors;
}

/** HCalso half+vertbar only. HConly ([k ?k Fk /k .k 'k "k) and Hk stay encode-capable. */
export const VERTBAR_FULL_KEYS = new Set([
  'Dk',
  'Xk',
  'Pk',
  'Tk',
  'Rk',
  'Uk',
  'Ik',
  'Ck',
  'Ek',
  'Yk',
  'Ok',
  'Lk',
]);

/** Accepted on KD->Uni; never chosen as canonical Uni->KD. */
export const DECODE_ONLY_KEYS = new Set([
  '\u2014',
  '\u2013',
  '\u00E7',
  '\u00C1',
  '\u00D9',
  '\u00A1',
  '\u00AA',
  '~j',
  '\u00F1',
  '\u00D1',
  '\u00C4',
  '\u00E8',
  '\u00CB',
  '\u00A5',
  '\u00D2',
  '\u00DC',
  '\u00DCk',
  '\u00CC',
  '\u00CD',
  '\u00CE',
  '\u00CF',
  '\u00D4',
  '\u00D6',
  'N\u00EE',
  'V\u00EE',
  'B\u00EE',
  'M\u00EE',
  '<\u00EE',
  'nzZ',
  '\u00BAz',
  'saz',
  'pkS',
  'b\u00B1',
  '\u00C3',
  '\u00C8',
  '\u00AE',
  'kas',
  '\u00A1k',
  '\u00A1w',
  'ak',
  'ah',
  'aq',
  'aw',
  'as',
  'aS',
  'a\u00AA',
  '\u2022',
  '\u2219',
  ...VERTBAR_FULL_KEYS,
]);
