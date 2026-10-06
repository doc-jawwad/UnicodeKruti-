/**
 * Canonical Unicode → KrutiDev 010 encode table.
 * Keys use escapes so combining marks are never JS identifiers.
 *
 * Uni→KD authority: UPDES / classic Convert_to_Krutidev_010 arrays
 * (Remington ligatures, Windows-glyph digits, ¡ chandrabindu, Remington punct).
 * Never invert half+vertbar (Dk/Ek). Canonical Uni→KD lives here — do not
 * invert KDC_MAP blindly for encode.
 */
import { DECODE_ONLY_KEYS, KDC_MAP, VERTBAR_FULL_KEYS } from './krutidev010-map';

/** ASCII that official Uni→KD leaves unchanged (not Remington glyph slots). */
const ASCII_PASSTHROUGH = [
  '!',
  ':',
  '"',
  "'",
  '[',
  ']',
  '*',
  '@',
  '&',
  '#',
  '%',
  '~',
  '<',
  '>',
  '|',
] as const;

export const UNI_ENCODE: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  const pairs: [string, string][] = [
    ['\u0905', 'v'],
    ['\u0906', 'vk'],
    ['\u0907', 'b'],
    ['\u0908', 'bZ'],
    ['\u0909', 'm'],
    ['\u090a', '\u00c5'],
    ['\u090b', '_'],
    ['\u090f', ','],
    ['\u0910', ',s'],
    ['\u0913', 'vks'],
    ['\u0914', 'vkS'],
    ['\u0911', 'v\u201a'],
    ['\u093e', 'k'],
    ['\u093f', 'f'],
    ['\u0940', 'h'],
    ['\u0941', 'q'],
    ['\u0942', 'w'],
    ['\u0943', '`'],
    ['\u0947', 's'],
    ['\u0948', 'S'],
    ['\u094b', 'ks'],
    ['\u094c', 'kS'],
    ['\u0902', 'a'],
    ['\u0901', '\u00a1'],
    ['\u0903', '%'],
    ['\u0945', 'W'],
    ['\u0949', '\u201a'],
    ['\u094d', '~'],
    ['\u093c', '+'],
    ['\u0915', 'd'],
    ['\u0916', '[k'],
    ['\u0917', 'x'],
    ['\u0918', '?k'],
    ['\u0919', '\u00b3'],
    ['\u091a', 'p'],
    ['\u091b', 'N'],
    ['\u091c', 't'],
    ['\u091d', '>'],
    ['\u091e', '\u00b4'],
    ['\u091f', 'V'],
    ['\u0920', 'B'],
    ['\u0921', 'M'],
    ['\u0922', '<'],
    ['\u0923', '.k'],
    ['\u0924', 'r'],
    ['\u0925', 'Fk'],
    ['\u0926', 'n'],
    ['\u0927', '/k'],
    ['\u0928', 'u'],
    ['\u092a', 'i'],
    ['\u092b', 'Q'],
    ['\u092c', 'c'],
    ['\u092d', 'Hk'],
    ['\u092e', 'e'],
    ['\u092f', ';'],
    ['\u0930', 'j'],
    ['\u0932', 'y'],
    ['\u0935', 'o'],
    ['\u0936', "'k"],
    ['\u0937', '"k'],
    ['\u0938', 'l'],
    ['\u0939', 'g'],
    ['\u0933', 'G'],
    ['\u0915\u094d', 'D'],
    ['\u0916\u094d', '['],
    ['\u0917\u094d', 'X'],
    ['\u0918\u094d', '?'],
    ['\u091a\u094d', 'P'],
    ['\u091c\u094d', 'T'],
    ['\u091d\u094d', '\u00f7'],
    ['\u0925\u094d', 'F'],
    ['\u0927\u094d', '/'],
    ['\u0928\u094d', 'U'],
    ['\u092a\u094d', 'I'],
    ['\u092b\u094d', '\u00b6'],
    ['\u092c\u094d', 'C'],
    ['\u092d\u094d', 'H'],
    ['\u092e\u094d', 'E'],
    ['\u092f\u094d', '\u00b8'],
    ['\u0932\u094d', 'Y'],
    ['\u0935\u094d', 'O'],
    ['\u0936\u094d', "'"],
    ['\u0937\u094d', '"'],
    ['\u0938\u094d', 'L'],
    ['\u0939\u094d', '\u00ba'],
    ['\u0923\u094d', '.'],
    ['\u0924\u094d', 'R'],
    ['\u0930\u094d', 'Z'],
    ['\u094d\u0930', 'z'],
    ['\u0958', 'd+'],
    ['\u0959', '[k+'],
    ['\u095A', 'x+'],
    ['\u095B', 't+'],
    ['\u095C', 'M+'],
    ['\u095D', '<+'],
    ['\u095E', 'Q+'],
    ['\u095F', ';+'],
    ['\u0915\u093C', 'd+'],
    ['\u0916\u093C', '[k+'],
    ['\u0917\u093C', 'x+'],
    ['\u091C\u093C', 't+'],
    ['\u0921\u093C', 'M+'],
    ['\u0922\u093C', '<+'],
    ['\u092B\u093C', 'Q+'],
    ['\u0915\u094d\u0937', '{k'],
    ['\u0915\u094d\u0937\u094d', '{'],
    ['\u0924\u094d\u0930', '='],
    ['\u0924\u094d\u0930\u094d', '\u00ab'],
    ['\u0924\u094d\u0930\u094d\u092f', '\u00ab'],
    ['\u091c\u094d\u091e', 'K'],
    ['\u0926\u094d\u0935', '}'],
    ['\u0926\u094d\u092f', '|'],
    ['\u0926\u094d\u0927', ')'],
    ['\u0936\u094d\u0930', 'J'],
    ['\u0936\u094d\u0930\u094d\u092f', '\u00dcz'],
    ['\u0930\u0941', '#'],
    ['\u0930\u0942', ':'],
    ['\u0915\u094d\u0930', '\u00d8'],
    ['\u0926\u094d\u0930', '\u00e6'],
    ['\u0926\u094d\u0926', '\u00ed'],
    ['\u0915\u094d\u0924', '\u00e4'],
    ['\u0915\u094d\u0915', '\u00f4'],
    ['\u0924\u094d\u0924', '\u00d9k'],
    ['\u0928\u094d\u0928', '\u00e9'],
    ['\u0939\u094d\u0928', '\u00e0'],
    ['\u0939\u094d\u092f', '\u00e1'],
    ['\u0939\u0943', '\u00e2'],
    ['\u0939\u094d\u092e', '\u00e3'],
    ['\u0917\u094d\u0930', 'xz'],
    ['\u092a\u094d\u0930', '\u00e7'],
    ['\u092b\u094d\u0930', '\u00dd'],
    ['\u0939\u094d\u0930', '\u00baz'],
    ['\u091f\u094d\u0930', 'V\u00aa'],
    ['\u0921\u094d\u0930', 'M\u00aa'],
    ['\u0922\u094d\u0930', '<\u00aa\u00aa'],
    ['\u091b\u094d\u0930', 'N\u00aa'],
    ['\u092c\u094d\u0930', 'cz'],
    ['\u092d\u094d\u0930', 'Hkz'],
    ['\u092e\u094d\u0930', 'ez'],
    ['\u0938\u094d\u0930', 'lz'],
    ['\u0935\u094d\u0930', 'oz'],
    ['\u0927\u094d\u0930', '/kz'],
    ['\u0918\u094d\u0930', '?kz'],
    ['\u091f\u094d\u091f', '\u00ea'],
    ['\u091f\u094d\u0920', '\u00eb'],
    ['\u0921\u094d\u0921', '\u00ec'],
    ['\u0921\u094d\u0922', '\u00ef'],
    ['\u0964', 'A'],
    ['\u0965', 'AA'],
    ['\u2018', '^'],
    ['\u2019', '*'],
    ['\u201c', '\u00de'],
    ['\u201d', '\u00df'],
    ['\u093d', '\u00b7'],
    ['\u0970', '\u0152'],
    // Devanagari digits → Windows Remington glyphs (ASCII 0-9 stay Latin)
    ['\u0966', '\u00e5'],
    ['\u0967', '\u0192'],
    ['\u0968', '\u201e'],
    ['\u0969', '\u2026'],
    ['\u096a', '\u2020'],
    ['\u096b', '\u2021'],
    ['\u096c', '\u02c6'],
    ['\u096d', '\u2030'],
    ['\u096e', '\u0160'],
    ['\u096f', '\u2039'],
    // Remington punctuation (UPDES Convert_to_Krutidev_010)
    [',', ']'],
    ['.', '-'],
    ['?', '\\'],
    ['-', '&'],
    [';', '('],
    ['(', '\u00bc'],
    [')', '\u00bd'],
    ['{', '\u00bf'],
    ['}', '\u00c0'],
    ['=', '\u00be'],
    ['/', '@'],
    ['+', '$'],
    ['_', '&'],
  ];
  for (const [uni, kd] of pairs) map[uni] = kd;

  Object.keys(KDC_MAP)
    .sort((a, b) => b.length - a.length)
    .forEach((key) => {
      if (DECODE_ONLY_KEYS.has(key) || VERTBAR_FULL_KEYS.has(key)) return;
      const val = KDC_MAP[key];
      if (!map[val]) map[val] = key;
    });

  Object.assign(map, {
    '\u0917\u094d\u0930': 'xz',
    '\u092a\u094d\u0930': '\u00e7',
    '\u0924\u094d\u0924': '\u00d9k',
    '\u0915': 'd',
    '\u092e': 'e',
    '\u0930\u094d': 'Z',
    '\u091c\u094d\u091e': 'K',
    '\u0926\u094d\u0935': '}',
    '\u0926\u094d\u092f': '|',
    '\u0933': 'G',
    '\u0901': '\u00a1',
    '\u092d\u094d\u0930': 'Hkz',
    '\u0924\u094d\u0930\u094d\u092f': '\u00ab',
    '\u0936\u094d\u0930\u094d\u092f': '\u00dcz',
    ',': ']',
    '.': '-',
    '?': '\\',
    '-': '&',
    ';': '(',
    '(': '\u00bc',
    ')': '\u00bd',
    '{': '\u00bf',
    '}': '\u00c0',
    '=': '\u00be',
    '/': '@',
    '+': '$',
    '_': '&',
  });

  // Never remap ASCII that official Uni→KD leaves unchanged.
  for (const ch of ASCII_PASSTHROUGH) delete map[ch];

  return Object.freeze(map);
})();

/** Canonical Uni→KD identities the encode table must not regress. */
export function uniEncodeIdentityErrors(): string[] {
  const errors: string[] = [];
  const expect: Record<string, string> = {
    '\u0915': 'd',
    '\u092e': 'e',
    '\u0930\u094d': 'Z',
    '\u094d\u0930': 'z',
    '\u091c\u094d\u091e': 'K',
    '\u0926\u094d\u0935': '}',
    '\u0926\u094d\u092f': '|',
    '\u0933': 'G',
    '\u0917\u094d\u0930': 'xz',
    '\u092a\u094d\u0930': '\u00e7',
    '\u092c\u094d\u0930': 'cz',
    '\u092d\u094d\u0930': 'Hkz',
    '\u0923': '.k',
    '\u0943': '`',
    '\u0924\u094d\u0924': '\u00d9k',
    '\u0901': '\u00a1',
    '\u0966': '\u00e5',
    ',': ']',
    '.': '-',
    '?': '\\',
    '-': '&',
    '(': '\u00bc',
    ')': '\u00bd',
  };
  for (const [uni, kd] of Object.entries(expect)) {
    if (UNI_ENCODE[uni] !== kd) {
      errors.push(
        `${JSON.stringify(uni)} must encode as ${JSON.stringify(kd)}, got ${JSON.stringify(UNI_ENCODE[uni])}`,
      );
    }
  }
  if (UNI_ENCODE['\u0915'] === 'Dk' || UNI_ENCODE['\u092e'] === 'Ek') {
    errors.push('full consonants must not encode as half+vertbar');
  }
  if (UNI_ENCODE['\u091c\u094d\u091e'] === '}') {
    errors.push('ज्ञ must not encode as the द्व glyph }');
  }
  for (const ch of ASCII_PASSTHROUGH) {
    if (Object.prototype.hasOwnProperty.call(UNI_ENCODE, ch)) {
      errors.push(
        `ASCII ${JSON.stringify(ch)} must pass through (official Uni→KD does not remap)`,
      );
    }
  }
  return errors;
}
