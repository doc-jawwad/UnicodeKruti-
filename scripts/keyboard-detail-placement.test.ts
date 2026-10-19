/** Regression: the selected-key details must be ABOVE the keyboard. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { keyboardLayoutMeta } from '../src/content/keyboard-layout';
import { KEYWORD_MAP } from '../src/content/keyword-map';

const source = fs.readFileSync('src/components/pages/keyboard-layout/KeyboardWidget.tsx', 'utf8');
const details = source.indexOf('className="kbd-detail"');
const keyboard = source.indexOf('className="kbd-scroll"');
const legend = source.indexOf('className="kbd-legend"');
assert(details !== -1 && keyboard !== -1 && legend !== -1, 'keyboard elements missing');
assert(details < keyboard && keyboard < legend, 'selected-key details must render before the keyboard grid');
assert(source.includes('Keyboard key label') && source.includes('Legacy stored character') && source.includes('Unicode Devanagari'), 'all three detail labels should remain');
assert(source.includes('aria-controls={panelId}'), 'keys must target detail region');
const row = KEYWORD_MAP.find((item) => item.path === '/krutidev-keyboard-layout');
assert.equal(row?.title, keyboardLayoutMeta.title, 'keyword-map meta title must match the published title');
assert.equal(keyboardLayoutMeta.title, "Kruti Dev Keyboard: Interactive Hindi Typing Chart & Free PDF", 'approved metadata title unchanged');
assert.equal(keyboardLayoutMeta.description, "Explore the Kruti Dev 010 keyboard layout with an interactive Hindi typing chart. Find Normal & Shift keys, search Hindi characters, and download a free A4 PDF.", 'approved metadata description unchanged');
assert.equal(keyboardLayoutMeta.h1, "Kruti Dev Keyboard Layout — Hindi Typing Chart & Free PDF", 'approved H1 unchanged');
console.log('PASS keyboard detail placement above grid and SEO metadata preserved');
