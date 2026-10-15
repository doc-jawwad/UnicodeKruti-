/**
 * Auto-detect direction regression tests.
 * Usage: npx tsx scripts/autodetect-regression.ts
 */
import { convertText, detectInputKind, detectLikelyKrutiDev } from '../src/lib/converter/engine';

let failed = 0;
function assert(ok: boolean, label: string, detail?: string) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${!ok && detail ? ` — ${detail}` : ''}`);
}

// Mirrors ConverterApp: decisive kind switches, ambiguous keeps current mode.
type Mode = 'uni-to-kd' | 'kd-to-uni';
function resolve(text: string, mode: Mode): Mode {
  const k = detectInputKind(text);
  return k === 'krutidev' ? 'kd-to-uni' : k === 'unicode' ? 'uni-to-kd' : mode;
}

assert(resolve('भारत, India!', 'kd-to-uni') === 'uni-to-kd', 'mixed Hindi-English → Unicode→KD');
assert(convertText('भारत, India!', 'uni-to-kd') === 'Hkkjr] India!', 'भारत, India! converts', convertText('भारत, India!', 'uni-to-kd'));
assert(!detectLikelyKrutiDev('Hello, world?'), 'English not KD');
assert(resolve('Hello, world?', 'uni-to-kd') === 'uni-to-kd', 'English keeps uni-to-kd');
assert(resolve('Hello, world?', 'kd-to-uni') === 'kd-to-uni', 'English keeps kd-to-uni (user choice)');
assert(resolve('नमस्ते भारत', 'uni-to-kd') === 'uni-to-kd', 'Hindi stays Unicode→KD');
assert(detectLikelyKrutiDev('ueLrs Hkkjr'), 'ueLrs Hkkjr is KD');
assert(detectLikelyKrutiDev('d`f"k'), 'd`f"k is KD');
assert(convertText('धर्म, कर्म', 'uni-to-kd') === convertText('धर्म', 'uni-to-kd') + '] ' + convertText('कर्म', 'uni-to-kd'), 'Remington comma kept');
const para = 'भारत एक देश है. This is India, a great country! हम सब यहाँ रहते हैं?';
assert(resolve(para, 'uni-to-kd') === 'uni-to-kd', 'mixed paragraph stable');
for (const s of ['Hello', 'Hello, wor', 'iPhone is good', 'The quick brown fox, jumps?']) {
  assert(resolve(s, 'uni-to-kd') === 'uni-to-kd' && resolve(s, 'kd-to-uni') === 'kd-to-uni', `English "${s}" never flips`);
}
// Progressive typing: Hindi-containing text never flips to KD at any prefix.
let ok = true;
for (let i = 1; i <= para.length; i++) if (resolve(para.slice(0, i), 'uni-to-kd') !== 'uni-to-kd') ok = false;
assert(ok, 'progressive typing: no oscillation');
for (const s of ['bookkeeper', 'bookkeeping services', 'JavaScriptHello', 'eCommerceApp', 'html{body}', 'bookkeeper JavaScript', 'Hokkaido', 'McDonaldsApp', 'node_modules {x}', 'Please email bookkeeping@example.com']) {
  assert(detectInputKind(s) === 'ambiguous', `English-like "${s}" → ambiguous`, detectInputKind(s));
  assert(resolve(s, 'uni-to-kd') === 'uni-to-kd' && resolve(s, 'kd-to-uni') === 'kd-to-uni', `"${s}" keeps selected mode`);
}
assert(detectInputKind('भारत, India!') === 'unicode', 'भारत, India! → unicode');
assert(detectInputKind('Hello, world?') === 'ambiguous', 'Hello, world? → ambiguous');
assert(detectInputKind('ueLrs Hkkjr') === 'krutidev', 'ueLrs Hkkjr → krutidev');
assert(detectInputKind('d`f"k') === 'krutidev', 'd`f"k → krutidev');
assert(detectInputKind('') === 'ambiguous' && detectInputKind('  ') === 'ambiguous', 'empty/whitespace ambiguous');

console.log(failed ? `${failed} failed` : 'All auto-detect tests passed.');
process.exit(failed ? 1 : 0);
