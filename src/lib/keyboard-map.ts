/**
 * Kruti Dev 010 keyboard map — single source for the interactive keyboard,
 * the server-rendered key tables, the search box and the A4 PDF.
 *
 * Every entry is DECODER-DERIVED: it records what the converter engine
 * (`KrutiDevConverter` in ./converter/engine.ts) outputs for that stored
 * character. Nothing here has been confirmed by typing on a physical keyboard
 * in Word. `scripts/keyboard-map.test.ts` checks every entry against the engine.
 *
 * Shift+4 ($) and Shift+5 (%) are deliberately UNRESOLVED: our decoder and an
 * external reference table (LTRC) disagree, so no output is published for them.
 *
 * The converter engine itself is not modified by this file.
 */

export type KeyStatus = 'decoder-derived' | 'unresolved';

/**
 * plain             — one stored character, one result
 * before-consonant  — stored before the consonant it belongs to (f, chhoti i matra)
 * after-consonant   — added after a consonant (z, rakar)
 * after-letter      — stored after the letter it sits above (Z, reph)
 */
export type KeyBehavior = 'plain' | 'before-consonant' | 'after-consonant' | 'after-letter';

export type KeyLayerId = 'normal' | 'shift';

export type KeyLayer = {
  /** Physical key as printed for this layer — also the stored legacy character. */
  stored: string;
  /** Display label; dependent signs sit on a dotted circle (◌). */
  label: string;
  /** What the decoder outputs for `stored` (null while unresolved). */
  unicode: string | null;
  status: KeyStatus;
  behavior: KeyBehavior;
  /** Plain-English name shown in the detail panel. */
  name: string;
  /** Extra search words (Roman Hindi, common spellings). */
  roman: string;
  /** Short table annotation (e.g. "context key"). */
  tableNote?: string;
  /** Decoder probe when the key cannot be tested alone: `input` must decode to `expected`. */
  probe?: { input: string; expected: string };
  /** Where the key sits on the keyboard. */
  layer: KeyLayerId;
  /** Physical key on the base layer (e.g. "d" for "D"). */
  baseKey: string;
};

export type PhysicalKey = {
  /** Base-layer character, e.g. "d", "4", "[". Unique. */
  id: string;
  normal: KeyLayer;
  shift: KeyLayer;
};

export const DOTTED_CIRCLE = '◌';

export const MAPPING_META = {
  status: 'decoder-derived',
  physicalKeyboardTested: false,
  /** Generation date for the PDF/page build — not a review date. */
  generated: '2026-10-19',
  generatedLabel: '19 Oct 2026',
  source: 'KrutiDevConverter (src/lib/converter/engine.ts)',
  unresolved: ['$', '%'] as const,
} as const;

type Spec = {
  label: string;
  unicode: string | null;
  name: string;
  roman?: string;
  behavior?: KeyBehavior;
  tableNote?: string;
  probe?: { input: string; expected: string };
};

/* ------------------------------------------------------------------ */
/* Normal layer                                                        */
/* ------------------------------------------------------------------ */

const NORMAL: Record<string, Spec> = {
  '`': { label: '◌ृ', unicode: 'ृ', name: 'ri matra (vocalic r sign)', roman: 'ri ru matra ri-matra' },
  '1': { label: '1', unicode: '1', name: 'digit 1 (stays a Latin digit)', roman: 'one ek number' },
  '2': { label: '2', unicode: '2', name: 'digit 2 (stays a Latin digit)', roman: 'two do number' },
  '3': { label: '3', unicode: '3', name: 'digit 3 (stays a Latin digit)', roman: 'three teen number' },
  '4': { label: '4', unicode: '4', name: 'digit 4 (stays a Latin digit)', roman: 'four chaar number' },
  '5': { label: '5', unicode: '5', name: 'digit 5 (stays a Latin digit)', roman: 'five paanch number' },
  '6': { label: '6', unicode: '6', name: 'digit 6 (stays a Latin digit)', roman: 'six chhe number' },
  '7': { label: '7', unicode: '7', name: 'digit 7 (stays a Latin digit)', roman: 'seven saat number' },
  '8': { label: '8', unicode: '8', name: 'digit 8 (stays a Latin digit)', roman: 'eight aath number' },
  '9': { label: '9', unicode: '9', name: 'digit 9 (stays a Latin digit)', roman: 'nine nau number' },
  '0': { label: '0', unicode: '0', name: 'digit 0 (stays a Latin digit)', roman: 'zero shunya number' },
  '-': { label: '.', unicode: '.', name: 'full stop', roman: 'full stop period dot' },
  '=': { label: 'त्र', unicode: 'त्र', name: 'conjunct tra', roman: 'tra' },

  q: { label: '◌ु', unicode: 'ु', name: 'u matra (short u sign)', roman: 'u matra ukar' },
  w: { label: '◌ू', unicode: 'ू', name: 'uu matra (long u sign)', roman: 'oo uu matra ookar' },
  e: { label: 'म', unicode: 'म', name: 'letter ma', roman: 'ma' },
  r: { label: 'त', unicode: 'त', name: 'letter ta', roman: 'ta' },
  t: { label: 'ज', unicode: 'ज', name: 'letter ja', roman: 'ja' },
  y: { label: 'ल', unicode: 'ल', name: 'letter la', roman: 'la' },
  u: { label: 'न', unicode: 'न', name: 'letter na', roman: 'na' },
  i: { label: 'प', unicode: 'प', name: 'letter pa', roman: 'pa' },
  o: { label: 'व', unicode: 'व', name: 'letter va', roman: 'va wa' },
  p: { label: 'च', unicode: 'च', name: 'letter cha', roman: 'cha ca' },
  '[': { label: 'ख्', unicode: 'ख्', name: 'half letter kha', roman: 'kha half' },
  ']': { label: ',', unicode: ',', name: 'comma', roman: 'comma' },
  '\\': { label: '?', unicode: '?', name: 'question mark', roman: 'question mark prashn' },

  a: { label: '◌ं', unicode: 'ं', name: 'anusvara (dot above)', roman: 'anusvara bindu anuswar dot' },
  s: { label: '◌े', unicode: 'े', name: 'e matra', roman: 'e matra ekar' },
  d: { label: 'क', unicode: 'क', name: 'letter ka', roman: 'ka' },
  f: {
    label: '◌ि',
    unicode: 'ि',
    name: 'chhoti i matra (छोटी इ की मात्रा)',
    roman: 'chhoti chhoti-i choti i ikar matra short i',
    behavior: 'before-consonant',
    tableNote: 'context key',
    probe: { input: 'fd', expected: 'कि' },
  },
  g: { label: 'ह', unicode: 'ह', name: 'letter ha', roman: 'ha' },
  h: { label: '◌ी', unicode: 'ी', name: 'badi ii matra (long i sign)', roman: 'badi ii matra eekar long i' },
  j: { label: 'र', unicode: 'र', name: 'letter ra', roman: 'ra' },
  k: { label: '◌ा', unicode: 'ा', name: 'aa matra', roman: 'aa matra akar kaar' },
  l: { label: 'स', unicode: 'स', name: 'letter sa', roman: 'sa' },
  ';': { label: 'य', unicode: 'य', name: 'letter ya', roman: 'ya' },
  "'": { label: 'श्', unicode: 'श्', name: 'half letter sha', roman: 'sha half' },

  z: {
    label: '◌्र',
    unicode: '्र',
    name: 'rakar (्र)',
    roman: 'rakar ra-kar ra kar',
    behavior: 'after-consonant',
    probe: { input: 'dz', expected: 'क्र' },
  },
  x: { label: 'ग', unicode: 'ग', name: 'letter ga', roman: 'ga' },
  c: { label: 'ब', unicode: 'ब', name: 'letter ba', roman: 'ba' },
  v: { label: 'अ', unicode: 'अ', name: 'vowel a', roman: 'a' },
  b: { label: 'इ', unicode: 'इ', name: 'vowel i', roman: 'i' },
  n: { label: 'द', unicode: 'द', name: 'letter da', roman: 'da' },
  m: { label: 'उ', unicode: 'उ', name: 'vowel u', roman: 'u' },
  ',': { label: 'ए', unicode: 'ए', name: 'vowel e', roman: 'e' },
  '.': { label: 'ण्', unicode: 'ण्', name: 'half letter retroflex na', roman: 'na half nna' },
  '/': { label: 'ध्', unicode: 'ध्', name: 'half letter dha', roman: 'dha half' },
};

/* ------------------------------------------------------------------ */
/* Shift layer                                                         */
/* ------------------------------------------------------------------ */

const SHIFT: Record<string, Spec> = {
  '~': { label: '◌्', unicode: '्', name: 'halant (virama)', roman: 'halant virama hasant' },
  '!': { label: '!', unicode: '!', name: 'exclamation mark (passes through unchanged)', roman: 'exclamation' },
  '@': { label: '/', unicode: '/', name: 'slash', roman: 'slash' },
  '#': { label: 'रु', unicode: 'रु', name: 'ru (ra with u sign)', roman: 'ru' },
  $: {
    label: '—',
    unicode: null,
    name: 'unresolved — our decoder table and an external reference table (LTRC) do not agree yet',
    roman: 'dollar unresolved',
  },
  '%': {
    label: '—',
    unicode: null,
    name: 'unresolved — our decoder table and an external reference table (LTRC) do not agree yet',
    roman: 'percent unresolved',
  },
  '^': { label: '‘', unicode: '‘', name: 'left single quotation mark', roman: 'quote single' },
  '&': { label: '-', unicode: '-', name: 'hyphen', roman: 'hyphen dash minus' },
  '*': { label: '’', unicode: '’', name: 'right single quotation mark', roman: 'quote single apostrophe' },
  '(': { label: ';', unicode: ';', name: 'semicolon', roman: 'semicolon' },
  ')': { label: 'द्ध', unicode: 'द्ध', name: 'conjunct ddha', roman: 'ddha dhdha' },
  _: { label: 'ऋ', unicode: 'ऋ', name: 'vowel ri', roman: 'ri ru' },
  '+': { label: '◌़', unicode: '़', name: 'nukta (dot below)', roman: 'nukta nuqta dot below' },

  Q: { label: 'फ', unicode: 'फ', name: 'letter pha', roman: 'pha fa' },
  W: { label: '◌ॅ', unicode: 'ॅ', name: 'candra e matra', roman: 'chandra candra e matra' },
  E: { label: 'म्', unicode: 'म्', name: 'half letter ma', roman: 'ma half' },
  R: { label: 'त्', unicode: 'त्', name: 'half letter ta', roman: 'ta half' },
  T: { label: 'ज्', unicode: 'ज्', name: 'half letter ja', roman: 'ja half' },
  Y: { label: 'ल्', unicode: 'ल्', name: 'half letter la', roman: 'la half' },
  U: { label: 'न्', unicode: 'न्', name: 'half letter na', roman: 'na half' },
  I: { label: 'प्', unicode: 'प्', name: 'half letter pa', roman: 'pa half' },
  O: { label: 'व्', unicode: 'व्', name: 'half letter va', roman: 'va wa half' },
  P: { label: 'च्', unicode: 'च्', name: 'half letter cha', roman: 'cha half' },
  '{': { label: 'क्ष्', unicode: 'क्ष्', name: 'half conjunct ksha (add k for full क्ष)', roman: 'ksha half' },
  '}': { label: 'द्व', unicode: 'द्व', name: 'conjunct dva', roman: 'dva dwa' },
  '|': { label: 'द्य', unicode: 'द्य', name: 'conjunct dya', roman: 'dya' },

  A: { label: '।', unicode: '।', name: 'danda (purna viram)', roman: 'danda purn viram full stop' },
  S: { label: '◌ै', unicode: 'ै', name: 'ai matra', roman: 'ai matra aikar' },
  D: { label: 'क्', unicode: 'क्', name: 'half letter ka', roman: 'ka half' },
  F: { label: 'थ्', unicode: 'थ्', name: 'half letter tha', roman: 'tha half' },
  G: { label: 'ळ', unicode: 'ळ', name: 'letter lla', roman: 'lla la' },
  H: { label: 'भ्', unicode: 'भ्', name: 'half letter bha (add k for full भ)', roman: 'bha half' },
  J: { label: 'श्र', unicode: 'श्र', name: 'conjunct shra', roman: 'shra' },
  K: { label: 'ज्ञ', unicode: 'ज्ञ', name: 'conjunct gya (jnya)', roman: 'gya gyan jnya' },
  L: { label: 'स्', unicode: 'स्', name: 'half letter sa', roman: 'sa half' },
  ':': { label: 'रू', unicode: 'रू', name: 'ruu (ra with long u sign)', roman: 'ruu roo' },
  '"': { label: 'ष्', unicode: 'ष्', name: 'half letter ssa', roman: 'ssa sha half' },

  Z: {
    label: 'र्',
    unicode: 'र्',
    name: 'reph (रेफ)',
    roman: 'reph ref repha',
    behavior: 'after-letter',
    probe: { input: 'dZ', expected: 'र्क' },
  },
  X: { label: 'ग्', unicode: 'ग्', name: 'half letter ga', roman: 'ga half' },
  C: { label: 'ब्', unicode: 'ब्', name: 'half letter ba', roman: 'ba half' },
  V: { label: 'ट', unicode: 'ट', name: 'letter tta', roman: 'tta ta' },
  B: { label: 'ठ', unicode: 'ठ', name: 'letter ttha', roman: 'ttha tha' },
  N: { label: 'छ', unicode: 'छ', name: 'letter chha', roman: 'chha' },
  M: { label: 'ड', unicode: 'ड', name: 'letter dda', roman: 'dda da' },
  '<': { label: 'ढ', unicode: 'ढ', name: 'letter ddha', roman: 'ddha dha' },
  '>': { label: 'झ', unicode: 'झ', name: 'letter jha', roman: 'jha' },
  '?': { label: 'घ्', unicode: 'घ्', name: 'half letter gha', roman: 'gha half' },
};

/* ------------------------------------------------------------------ */
/* Physical keyboard (US QWERTY, Remington-style Kruti Dev layout)     */
/* ------------------------------------------------------------------ */

/** [base, shifted] per physical key, grouped by keyboard row. */
const ROW_PAIRS: [string, string][][] = [
  [['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=', '+']],
  [['q', 'Q'], ['w', 'W'], ['e', 'E'], ['r', 'R'], ['t', 'T'], ['y', 'Y'], ['u', 'U'], ['i', 'I'], ['o', 'O'], ['p', 'P'], ['[', '{'], [']', '}'], ['\\', '|']],
  [['a', 'A'], ['s', 'S'], ['d', 'D'], ['f', 'F'], ['g', 'G'], ['h', 'H'], ['j', 'J'], ['k', 'K'], ['l', 'L'], [';', ':'], ["'", '"']],
  [['z', 'Z'], ['x', 'X'], ['c', 'C'], ['v', 'V'], ['b', 'B'], ['n', 'N'], ['m', 'M'], [',', '<'], ['.', '>'], ['/', '?']],
];

function toLayer(layer: KeyLayerId, stored: string, baseKey: string, spec: Spec): KeyLayer {
  return {
    stored,
    label: spec.label,
    unicode: spec.unicode,
    status: spec.unicode === null ? 'unresolved' : 'decoder-derived',
    behavior: spec.behavior ?? 'plain',
    name: spec.name,
    roman: spec.roman ?? '',
    tableNote: spec.tableNote,
    probe: spec.probe,
    layer,
    baseKey,
  };
}

export const KEYBOARD_ROWS: PhysicalKey[][] = ROW_PAIRS.map((row) =>
  row.map(([base, shifted]) => {
    const n = NORMAL[base];
    const s = SHIFT[shifted];
    if (!n || !s) throw new Error(`keyboard-map: missing spec for ${base} / ${shifted}`);
    return {
      id: base,
      normal: toLayer('normal', base, base, n),
      shift: toLayer('shift', shifted, base, s),
    };
  })
);

export const ALL_KEYS: PhysicalKey[] = KEYBOARD_ROWS.flat();

/** All layer entries (normal + shift) in keyboard order. */
export const ALL_LAYERS: KeyLayer[] = ALL_KEYS.flatMap((k) => [k.normal, k.shift]);

const LAYER_BY_STORED = new Map<string, KeyLayer>(ALL_LAYERS.map((l) => [l.stored, l]));

/** Look up a layer by its stored character ("d", "D", "/", "?"). */
export function layerByStored(stored: string): KeyLayer {
  const layer = LAYER_BY_STORED.get(stored);
  if (!layer) throw new Error(`keyboard-map: unknown stored character ${JSON.stringify(stored)}`);
  return layer;
}

export function layerOf(key: PhysicalKey, shift: boolean): KeyLayer {
  return shift ? key.shift : key.normal;
}

/** Human label for the key chord: "d" or "Shift + d". */
export function chordLabel(layer: KeyLayer): string {
  return layer.layer === 'shift' ? `Shift + ${layer.baseKey}` : layer.baseKey;
}

/** Strip the dotted circle used to display dependent signs. */
export function plainLabel(label: string): string {
  return label.split(DOTTED_CIRCLE).join('');
}

/** "U+0915 U+094D" style code point list. */
export function codePoints(text: string): string {
  return Array.from(text)
    .map((c) => `U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`)
    .join(' ');
}

/* ------------------------------------------------------------------ */
/* Server-rendered tables (labels come from the entries above)         */
/* ------------------------------------------------------------------ */

function ids(stored: string): KeyLayer[] {
  return Array.from(stored).map(layerByStored);
}

/** Normal layer: one row of the table per keyboard row. */
export const NORMAL_TABLE_ROWS: { row: string; keys: KeyLayer[] }[] = [
  { row: 'Top row', keys: ids('qwertyuiop') },
  { row: 'Home row', keys: ids('asdfghjkl;') },
  { row: 'Bottom row', keys: ids('zxcvbnm,./') },
];

/** Shift layer: half letters, then the other Shift keys. */
export const SHIFT_TABLE_ROWS: { group: string; keys: KeyLayer[] }[] = [
  { group: 'Half letters', keys: ids('DXPTICHERFUYOL') },
  { group: 'Other Shift keys', keys: ids('NMVBQGSWA') },
];

export type ChartRow = {
  /** Key cell text exactly as printed in the chart. */
  keysText: string;
  keys: KeyLayer[];
  /** Overrides the output derived from `keys` (used where the chart prints a name). */
  outputText?: string;
  how: string;
};

/** Matras, conjuncts and reph table. */
export const CONJUNCT_TABLE_ROWS: ChartRow[] = [
  { keysText: 'f', keys: ids('f'), how: 'Typed before the consonant' },
  { keysText: 'z', keys: ids('z'), outputText: '◌्र (rakar)', how: 'Typed after the consonant' },
  { keysText: 'Z (Shift + z)', keys: ids('Z'), outputText: 'reph (रेफ)', how: 'Typed after the letter it sits above' },
  { keysText: '~ (Shift + `)', keys: ids('~'), outputText: '् (halant)', how: 'Removes the inherent vowel' },
  { keysText: '+ (Shift + =)', keys: ids('+'), outputText: '़ (nukta)', how: 'Marks letters such as क़' },
  { keysText: 'K · J · =', keys: ids('KJ='), how: 'One key each' },
  { keysText: '{ (Shift + [)', keys: ids('{'), outputText: 'क्ष् (half)', how: 'Add k for full क्ष' },
  { keysText: '[ · \' · " (Shift + \')', keys: ids('[\'"'), how: 'Half forms' },
  { keysText: '? (Shift + /)', keys: ids('?'), how: 'Half form' },
  { keysText: '# · : (Shift + ;)', keys: ids('#:'), how: 'One key each' },
  { keysText: ') (Shift + 0) · } (Shift + ]) · | (Shift + \\)', keys: ids(')}|'), how: 'One key each' },
  { keysText: '< (Shift + ,) · > (Shift + .)', keys: ids('<>'), how: 'Letter keys' },
  { keysText: '_ (Shift + -)', keys: ids('_'), how: 'Letter' },
];

export type PunctuationRow = { keyText: string; layer: KeyLayer };

/** Number-row and punctuation table. Shift+4 and Shift+5 are intentionally absent. */
export const PUNCTUATION_TABLE_ROWS: PunctuationRow[] = [
  { keyText: '-', layer: layerByStored('-') },
  { keyText: ']', layer: layerByStored(']') },
  { keyText: '\\', layer: layerByStored('\\') },
  { keyText: 'Shift + 2 (@)', layer: layerByStored('@') },
  { keyText: 'Shift + 6 (^)', layer: layerByStored('^') },
  { keyText: 'Shift + 7 (&)', layer: layerByStored('&') },
  { keyText: 'Shift + 8 (*)', layer: layerByStored('*') },
  { keyText: 'Shift + 9 (()', layer: layerByStored('(') },
];

/** Hindi word ↔ stored sequence, each checked against the decoder in the test script. */
export const TYPING_EXAMPLES: { word: string; stored: string; why: string }[] = [
  { word: 'भारत', stored: 'Hkkjr', why: 'भ needs H and k' },
  { word: 'किताब', stored: 'fdrkc', why: 'f comes first' },
  { word: 'धर्म', stored: '/keZ', why: 'Z comes after म' },
  { word: 'ज्ञान', stored: 'Kku', why: 'K is one key' },
  { word: 'क्षत्रिय', stored: '{kf=;', why: 'क्ष, then ि before त्र' },
];

/** Compact display of one layer for table cells: "d क". */
export function chartCell(layer: KeyLayer): string {
  const note = layer.tableNote ? ` (${layer.tableNote})` : '';
  return `${layer.stored} ${layer.label}${note}`;
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

export type SearchHit = { layer: KeyLayer; score: number };

const DEVANAGARI_RE = /[ऀ-ॿ]/;

function normalizeQuery(q: string): string {
  return q.normalize('NFC').trim();
}

/**
 * Find keys by Hindi character (क, ि, क्ष), by Latin key ("d", "Shift+D", "/"),
 * or by Roman Hindi / English words ("ka", "chhoti i matra", "reph", "halant").
 */
export function searchKeys(rawQuery: string, limit = 12): SearchHit[] {
  const query = normalizeQuery(rawQuery);
  if (!query) return [];

  const hits = new Map<string, number>();
  const bump = (layer: KeyLayer, score: number) => {
    const prev = hits.get(layer.stored) ?? 0;
    if (score > prev) hits.set(layer.stored, score);
  };

  if (DEVANAGARI_RE.test(query)) {
    const plainQuery = plainLabel(query);
    for (const layer of ALL_LAYERS) {
      if (layer.unicode === null) continue;
      if (layer.unicode === plainQuery) bump(layer, 100);
      else if (layer.unicode.includes(plainQuery)) bump(layer, 60);
      else if (Array.from(plainQuery).length > 1 && plainQuery.includes(layer.unicode)) bump(layer, 40);
    }
    // Multi-character input like "कि": fall back to each character
    if (hits.size === 0) {
      for (const ch of Array.from(plainQuery)) {
        for (const layer of ALL_LAYERS) {
          if (layer.unicode && layer.unicode.includes(ch)) bump(layer, 20);
        }
      }
    }
  } else {
    // "Shift + d", "shift+D", "shift d"
    const chord = query.match(/^shift\s*\+?\s*(.+)$/i);
    if (chord) {
      const target = chord[1];
      for (const key of ALL_KEYS) {
        if (key.normal.stored === target.toLowerCase() || key.shift.stored === target) bump(key.shift, 100);
      }
    }

    // Single Latin character: exact stored match, then the same key on the other layer
    if (Array.from(query).length === 1) {
      const exact = LAYER_BY_STORED.get(query);
      if (exact) {
        bump(exact, 100);
        const key = ALL_KEYS.find((k) => k.id === exact.baseKey)!;
        bump(exact.layer === 'normal' ? key.shift : key.normal, 50);
      }
    }

    // Roman Hindi / English words: whole-word or word-prefix matches only (no loose substrings)
    const lower = query.toLowerCase();
    if (lower.length >= 2) {
      const words = lower.split(/[^a-z0-9]+/).filter(Boolean);
      for (const layer of ALL_LAYERS) {
        const hay = `${layer.name} ${layer.roman}`.toLowerCase();
        const hayWords = hay.split(/[^a-z0-9]+/).filter(Boolean);
        if (words.length === 1 && hayWords.includes(words[0])) {
          bump(layer, 90);
        } else if (words.length > 1 && hay.includes(lower)) {
          bump(layer, 85);
        } else if (
          words.length > 0 &&
          words.every((w) => hayWords.includes(w) || (w.length >= 3 && hayWords.some((h) => h.startsWith(w))))
        ) {
          bump(layer, words.length > 1 ? 70 : 55);
        }
      }
    }
  }

  const order = new Map(ALL_LAYERS.map((l, i) => [l.stored, i]));
  return Array.from(hits.entries())
    .map(([stored, score]) => ({ layer: LAYER_BY_STORED.get(stored)!, score }))
    .sort((a, b) => b.score - a.score || order.get(a.layer.stored)! - order.get(b.layer.stored)!)
    .slice(0, limit);
}
