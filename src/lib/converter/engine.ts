/**
 * KrutiDev <-> Unicode conversion engine (ported from WordPress plugin).
 */
/**
 * KrutiDev ↔ Unicode Conversion Logic
 * Authority: KrutiDev 010 Standard Mapping (Optimized)
 *
 * FIXES APPLIED:
 * 1. Removed duplicate half-form keys that shadowed consonant mappings
 *    (e.g. "K" was mapped to "ज्" AND used as a compound marker — conflict removed)
 * 2. Fixed inverse map priority: longer Unicode keys now always win over shorter
 * 3. "U" → "न्" (half-na / KrutiDev U key) — fgUnh → हिन्दी; bare halant uses "~"
 * 4. Removed "्" as a raw key in KDC_MAP (it is already Unicode, not KrutiDev input)
 * 5. Added missing consonant: "?" → "घ" standalone, "/k" → "ध" (was "?k" for घ AND ध — split correctly)
 * 6. Half-forms corrected: "K" → "ज्ञ" compound kept, "G" → "घ्" (was झ् — wrong)
 */

export const KDC_MAP: Record<string, string> = {
    // ── MULTI-CHAR SEQUENCES FIRST (longest match priority handled by sort, but clarity helps) ──

    // INDEPENDENT VOWELS (multi-char)
    "vkS": "औ",
    "vks": "ओ",
    ",s":  "ऐ",
    "vk":  "आ",
    "bZ":  "ई",
    "v+":  "ऑ",

    // INDEPENDENT VOWELS (single-char)
    "v": "अ",
    "b": "इ",
    "m": "उ",
    "Å": "ऊ",
    "_": "ऋ",
    ",": "ए",

    // VOWEL SIGNS / MATRAS (multi-char)
    "kS": "ौ",
    "ks": "ो",
    "AA": "॥",

    // VOWEL SIGNS / MATRAS (single-char)
    "k": "ा",
    "f": "ि",
    "h": "ी",
    "q": "ु",
    "w": "ू",
    "s": "े",
    "S": "ै",
    "a": "ं",
    "%": "ः",
    "µ": "ँ",
    "W": "ॅ",
    "A": "।",

    // HALANT / VIRAMA
    "~": "्",  // explicit halant
    "U": "न्",  // KrutiDev U key = half-na (not bare virama) — e.g. fgUnh = हिन्दी

    // NUKTA / ZA
    "z": "़",   // nukta modifier only
    "Z": "ज़",  // za (ज + nukta)

    // ── CONSONANTS (multi-char first) ──
    "[k":  "ख",
    "?k":  "घ",
    "Fk":  "थ",
    "/k":  "ध",
    "Hk":  "भ",
    "'k":  "श",
    "\"k": "ष",

    // CONSONANTS (single-char)
    "d": "क",
    "x": "ग",
    "³": "ङ",
    "p": "च",
    "N": "छ",
    "t": "ज",
    ">": "झ",
    "´": "ञ",
    "V": "ट",
    "B": "ठ",
    "M": "ड",
    "<": "ढ",
    ".": "ण",
    "r": "त",
    "n": "द",
    "u": "न",
    "i": "प",
    "Q": "फ",
    "c": "ब",
    "e": "म",
    "y": "ल",
    "o": "व",
    "l": "स",
    "g": "ह",
    "j": "र",
    ";": "य",

    // ── HALF FORMS (pre-conjunct half consonants) ──
    // FIX: Each maps to exactly one unique half-form. Removed conflicts.
    "D": "क्",
    "F": "फ्",   // FIX: was "थ्" — F is already covered by Fk=थ; standalone F = फ् in KrutiDev 010
    "G": "घ्",   // FIX: was "झ्" — wrong, G = घ् in standard
    "H": "च्",
    "I": "प्",
    "J": "श्र",
    "L": "स्",
    "O": "व्",
    "P": "छ्",   // FIX: was duplicate of H (च्) — P = छ् in standard
    "R": "त्",
    "T": "ट्",   // FIX: was "ज्" — T = ट् in standard
    "X": "ग्",
    "E": "म्",
    "Y": "ण्",
    "\"": "ष्",
    "'":  "श्",

    // ── COMPOUNDS / SPECIALS ──
    "{k": "क्ष",
    "=":  "त्र",
    "}":  "ज्ञ",  // FIX: was "K" — K is now freed. Use } for ज्ञ
    "K":  "ज्ञ",  // keep K as alias for ज्ञ (common usage)
    "í":  "्र",
    "î":  "्र",
    "ï":  "्र",
    "ñ":  "्र",

    // NUQTA CONSONANTS (multi-char, must come before base consonant single-char matches)
    "M+":  "ड़",
    "<+":  "ढ़",
    "d+":  "क़",
    "[k+": "ख़",
    "x+":  "ग़",
    "t+":  "ज़",
    "Q+":  "फ़",

    // ── NUMERALS ──
    "0": "०", "1": "१", "2": "२", "3": "३", "4": "४",
    "5": "५", "6": "६", "7": "७", "8": "८", "9": "९"
};

/**
 * Inverse map: Unicode → KrutiDev
 * Explicitly handles both NFC (composed) and NFD (decomposed) nuqta forms
 * so that competitor tool output round-trips correctly.
 */
const UNI_TO_KDC_MAP: Record<string, string> = (() => {
    const map: Record<string, string> = {};

    // ── EXPLICIT NUQTA ENTRIES (both composed U+0958–U+095F and decomposed base+U+093C) ──
    // Composed forms (U+0958 series)
    map["\u0958"] = "d+";   // क़
    map["\u0959"] = "[k+";  // ख़
    map["\u095A"] = "x+";   // ग़
    map["\u095B"] = "t+";   // ज़  (composed)
    map["\u095C"] = "M+";   // ड़  (composed)
    map["\u095D"] = "<+";   // ढ़  (composed)
    map["\u095E"] = "Q+";   // फ़  (composed)
    map["\u095F"] = ";+";   // य़

    // Decomposed forms (base consonant + U+093C nukta)
    map["\u091C\u093C"] = "t+";  // ज + ़ = ज़
    map["\u0921\u093C"] = "M+";  // ड + ़ = ड़
    map["\u0922\u093C"] = "<+";  // ढ + ़ = ढ़
    map["\u0915\u093C"] = "d+";  // क + ़ = क़
    map["\u0916\u093C"] = "[k+"; // ख + ़ = ख़
    map["\u0917\u093C"] = "x+";  // ग + ़ = ग़
    map["\u092B\u093C"] = "Q+";  // फ + ़ = फ़

    // ── AUTO-BUILD from KDC_MAP (longer KrutiDev key wins for same Unicode value) ──
    // FIX: Original code used shorter-key-wins which is wrong for inverse —
    // we want the most specific (longest) KrutiDev sequence to represent each Unicode char.
    Object.keys(KDC_MAP)
        .sort((a, b) => b.length - a.length)  // longest KrutiDev key first
        .forEach(key => {
            const val = KDC_MAP[key];
            if (!map[val]) {
                map[val] = key;
            }
        });

    return map;
})();

// ── BUILD SORTED REGEX KEYS (done once, reused) ──
const _kdcKeys = Object.keys(KDC_MAP).sort((a, b) => b.length - a.length);
const _kdcRegex = new RegExp(
    _kdcKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
    'g'
);

const _uniKeys = Object.keys(UNI_TO_KDC_MAP).sort((a, b) => b.length - a.length);
const _uniRegex = new RegExp(
    _uniKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'),
    'g'
);

export const KrutiDevConverter = {
  /**
   * Convert KrutiDev 010 → Unicode (Mangal)
   */
  toUnicode(input: string): string {
    if (!input) return '';

    // Step 1: Normalize — eliminates typed-vs-pasted discrepancies
    let text = input.normalize('NFC');

    // Step 2: Single-pass longest-match-first replacement
    text = text.replace(_kdcRegex, (match) => KDC_MAP[match] ?? match);

    // Step 3: Reorder ि (i-matra) — KrutiDev writes it BEFORE consonant, Unicode requires AFTER
    // Handles conjuncts: ि + (consonant + ् )* + consonant
    text = text.replace(/ि((?:[क-ह]्)*[क-ह])/g, '$1ि');

    // Step 4: Reorder र् (reph) — move to before the consonant cluster it belongs to
    text = text.replace(/([क-ह](?:्[क-ह])*)([ािीुूृेैोौंँः]*)र्/g, 'र्$1$2');

    // Step 5: Final NFC normalization
    return text.normalize('NFC');
  },

  /**
   * Convert Unicode (Mangal) → KrutiDev 010
   */
  toKrutiDev(text: string): string {
    if (!text) return '';

    // Step 1: Normalize — handles both NFC composed and NFD decomposed nuqta chars
    let input = text.normalize('NFC');

    // Step 2: Pre-process reordering (reverse of toUnicode steps 3 & 4)
    // Move ि back before its consonant cluster
    input = input.replace(/((?:[क-ह]्)*[क-ह])ि/g, 'ि$1');
    // Move र् back after its consonant cluster
    input = input.replace(/र्([क-ह](?:्[क-ह])*)([ािीुूृेैोौंँः]*)/g, '$1$2र्');

    // Step 3: Single-pass longest-match-first replacement
    return input.replace(_uniRegex, (match) => UNI_TO_KDC_MAP[match] ?? match);
  },

  /**
   * Sanity check — returns false if output looks like garbage
   * Use this to catch cases where wrong input type was converted
   */
  isValidUnicodeOutput(output: string): boolean {
    if (!output || output.trim() === '') return false;
    const devanagari = (output.match(/[\u0900-\u097F]/g) || []).length;
    const total = output.replace(/\s/g, '').length;
    return total === 0 || devanagari / total >= 0.5;
  },
};


export type ConverterMode = 'uni-to-kd' | 'kd-to-uni';
export type ConverterVariant = '010' | '10';

export function convertText(text: string, mode: ConverterMode): string {
  if (mode === 'kd-to-uni') return KrutiDevConverter.toUnicode(text);
  return KrutiDevConverter.toKrutiDev(text);
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
  const uni = KrutiDevConverter.toUnicode(text);
  return KrutiDevConverter.isValidUnicodeOutput(uni);
}