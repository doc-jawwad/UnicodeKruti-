import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PWA_NOTICE_COOLDOWN_MS, shouldSuppressPwaNotice } from '../src/lib/pwa/install-notice';

assert.equal(PWA_NOTICE_COOLDOWN_MS, 14 * 86400000);
const now = Date.now();
assert.equal(shouldSuppressPwaNotice(null, now), false);
assert.equal(shouldSuppressPwaNotice(NaN, now), false);
assert.equal(shouldSuppressPwaNotice(0, now), false);
assert.equal(shouldSuppressPwaNotice(now + 1000, now), false);
assert.equal(shouldSuppressPwaNotice(now - 5000, now), true);
assert.equal(shouldSuppressPwaNotice(now - PWA_NOTICE_COOLDOWN_MS, now), false);
assert.equal(shouldSuppressPwaNotice(now - PWA_NOTICE_COOLDOWN_MS + 1, now), true);

const component = readFileSync('src/components/layout/PwaInstallButton.tsx', 'utf8');
assert(component.includes("window.addEventListener('unicodekruti:conversion-complete'"));
assert(component.includes("window.addEventListener('beforeinstallprompt'"));
assert(component.includes("window.addEventListener('appinstalled'"));
assert(component.includes("document.addEventListener('focusin', onFocusIn)"));
assert(component.includes("createPortal(overlays, document.body)"));
assert(component.includes("footerShortcutVisible()"));
assert(component.includes("sessionStorage.setItem(SEEN, '1')"));
assert(!component.includes('setShowIosBanner(true)'));

const track = readFileSync('src/lib/analytics/track.ts', 'utf8');
assert(track.includes("window.dispatchEvent(new Event('unicodekruti:conversion-complete'))"));
const typeDef = readFileSync('src/lib/analytics/types.ts', 'utf8');
for (const name of ['pwa_notice_shown', 'pwa_notice_dismissed', 'pwa_install_clicked', 'pwa_install_confirmed']) {
  assert(typeDef.includes(name), name + ' event defined');
}
const layout = readFileSync('src/app/layout.tsx', 'utf8');
assert(layout.includes("import './pwa-notice.css';"));
console.log('PASS: PWA cooldown, genuine conversion trigger, safe display and analytics');
