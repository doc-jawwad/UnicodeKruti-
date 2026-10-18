/**
 * Keyboard map checks: every entry in src/lib/keyboard-map.ts must match what the
 * converter engine decodes. Usage: npx tsx scripts/keyboard-map.test.ts
 */
import { convertText } from '../src/lib/converter/engine';
import {
  ALL_KEYS,
  ALL_LAYERS,
  CONJUNCT_TABLE_ROWS,
  KEYBOARD_ROWS,
  NORMAL_TABLE_ROWS,
  PUNCTUATION_TABLE_ROWS,
  SHIFT_TABLE_ROWS,
  TYPING_EXAMPLES,
  plainLabel,
  searchKeys,
} from '../src/lib/keyboard-map';

let failed = 0;
let passed = 0;
function check(name: string, ok: boolean, detail = '') {
  if (ok) passed++;
  else {
    failed++;
    console.error(`FAIL ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

// 1. Every resolved layer decodes exactly as recorded
for (const l of ALL_LAYERS) {
  if (l.unicode === null) continue;
  const input = l.probe?.input ?? l.stored;
  const expected = l.probe?.expected ?? l.unicode;
  const got = convertText(input, 'kd-to-uni');
  check(`decode ${JSON.stringify(input)}`, got === expected, `got ${JSON.stringify(got)} want ${JSON.stringify(expected)}`);
  // label matches output (label only adds the dotted circle)
  if (!l.probe) check(`label ${l.stored}`, plainLabel(l.label) === l.unicode, `${l.label} vs ${l.unicode}`);
}

// 2. Unresolved keys: exactly Shift+4 ($) and Shift+5 (%), no output published anywhere
const unresolved = ALL_LAYERS.filter((l) => l.status === 'unresolved').map((l) => l.stored).sort();
check('unresolved set', unresolved.join('') === '$%', unresolved.join(''));
for (const l of ALL_LAYERS.filter((x) => x.status === 'unresolved')) {
  check(`unresolved ${l.stored} has no unicode`, l.unicode === null);
}
const tableLayers = [
  ...NORMAL_TABLE_ROWS.flatMap((r) => r.keys),
  ...SHIFT_TABLE_ROWS.flatMap((r) => r.keys),
  ...CONJUNCT_TABLE_ROWS.flatMap((r) => r.keys),
  ...PUNCTUATION_TABLE_ROWS.map((r) => r.layer),
];
check('tables omit $ and %', !tableLayers.some((l) => l.stored === '$' || l.stored === '%'));
check('punctuation keyText omits Shift + 4 / 5', !PUNCTUATION_TABLE_ROWS.some((r) => /Shift \+ [45]/.test(r.keyText)));

// 3. Structure
check('stored chars unique', new Set(ALL_LAYERS.map((l) => l.stored)).size === ALL_LAYERS.length);
check('key count', ALL_KEYS.length === 47, String(ALL_KEYS.length));
check('row sizes', KEYBOARD_ROWS.map((r) => r.length).join(',') === '13,13,11,10');
check('f is before-consonant', ALL_LAYERS.find((l) => l.stored === 'f')!.behavior === 'before-consonant');
check('Z is after-letter', ALL_LAYERS.find((l) => l.stored === 'Z')!.behavior === 'after-letter');
check('/ is half dha', ALL_LAYERS.find((l) => l.stored === '/')!.unicode === 'ध्');
check('/k is dha', convertText('/k', 'kd-to-uni') === 'ध');

// 4. Chart output text agrees with entries
for (const row of CONJUNCT_TABLE_ROWS) {
  if (row.outputText && row.keys.length === 1 && !row.keys[0].probe) {
    check(`conjunct output ${row.keysText}`, row.outputText.includes(row.keys[0].unicode!));
  }
}

// 5. Worked examples
for (const ex of TYPING_EXAMPLES) {
  const got = convertText(ex.stored, 'kd-to-uni');
  check(`example ${ex.stored}`, got === ex.word, `got ${got}`);
}

check('example prakash', convertText("çdk'k", 'kd-to-uni') === 'प्रकाश');

// 6. Search
const s = (q: string) => searchKeys(q).map((h) => h.layer.stored);
check('search क → d', s('क')[0] === 'd', s('क').join(''));
check('search d → d first', s('d')[0] === 'd', s('d').join(''));
check('search D → D first', s('D')[0] === 'D', s('D').join(''));
check('search / → /', s('/')[0] === '/', s('/').join(''));
check('search shift d → D', s('shift d')[0] === 'D', s('shift d').join(''));
check('search Shift+D → D', s('Shift+D')[0] === 'D', s('Shift+D').join(''));
check('search ka → d and D only', s('ka').join('') === 'dD', s('ka').join(''));
check('search chhoti i matra → f', s('chhoti i matra')[0] === 'f', s('chhoti i matra').join(''));
check('search reph → Z', s('reph')[0] === 'Z', s('reph').join(''));
check('search halant → ~', s('halant')[0] === '~', s('halant').join(''));
check('search ि → f', s('ि')[0] === 'f', s('ि').join(''));
check('search क्ष → {', s('क्ष').includes('{'), s('क्ष').join(''));
check('search empty', s('   ').length === 0);
check('search $ → unresolved only', s('$').every((c) => c === '$' || c === '4'), s('$').join(''));

console.log(`keyboard-map: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
