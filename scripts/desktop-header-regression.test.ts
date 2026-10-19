/** Prevent hamburger-on-desktop and two-row header regressions. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/app/theme.css', 'utf8');
assert(!css.includes('@media (max-width: 1280px) {'), 'No 1280px mobile menu');
const mobile = css.indexOf('@media (max-width: 992px) {\n  .footer-grid');
assert(mobile >= 0 && css.indexOf('.main-nav { display: none; }', mobile) > mobile, 'Mobile menu applies at <=992px');
assert(css.includes('@media (min-width: 993px) {') && css.includes('.site-header .nav-toggle { display: none; }'), 'desktop hides hamburger');
assert(css.includes('.site-header .main-nav {\n    display: flex;'), 'desktop navigation visible');
assert(!css.includes('grid-template-areas: "brand install search" "nav nav nav"'), 'no two-row desktop header');
assert(css.includes('.site-header .main-nav ul li a.nav-keyboard-btn'), 'keyboard pill styled');
console.log('PASS: professional single-row desktop header, mobile-only hamburger');
