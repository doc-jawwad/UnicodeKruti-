/** Guard against hiding desktop navigation behind a tablet-width hamburger. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/app/theme.css', 'utf8');
assert(!css.includes('@media (max-width: 1280px) {'), 'No tablet-width hamburger rule');
const mobileBlock = css.indexOf('@media (max-width: 992px) {\n  .footer-grid');
assert(mobileBlock >= 0, 'Mobile menu breakpoint is <=992px');
assert(css.indexOf('.main-nav { display: none; }', mobileBlock) > mobileBlock, 'Hamburger switch remains in mobile rule');
assert(css.includes('grid-template-areas: "brand install search" "nav nav nav"'), 'Compact desktop has visible links row');
assert(css.includes('grid-area: nav;\n    display: flex;'), 'Compact desktop navigation remains visible');
assert(css.includes('.header-container > .nav-toggle { display: none; }'), 'Hamburger hidden on compact desktop');
console.log('PASS: desktop header links visible and mobile breakpoint guarded');
