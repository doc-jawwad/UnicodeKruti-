/**
 * Basic PWA path regression for the Astro POC service worker.
 * Fails if generated SW still references Next asset paths.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

spawnSync(process.execPath, [path.join(__dirname, 'generate-sw.mjs')], {
  cwd: root,
  stdio: 'inherit',
});

const swPath = path.join(root, 'public/sw.js');
assert.ok(fs.existsSync(swPath), 'sw.js missing');
const sw = fs.readFileSync(swPath, 'utf8');

assert.ok(sw.includes('/_astro/'), 'SW must cache /_astro/');
assert.ok(!sw.includes('/_next/static'), 'SW must not precache /_next/static');
assert.ok(!sw.includes('/_next/image'), 'SW must not cache /_next/image');
assert.ok(!/precacheAndRoute\(\[\{url:"\/_next\//.test(sw), 'no Next Workbox precache');
assert.ok(sw.includes("CACHE_VERSION"), 'versioned cache');

console.log('PASS  PWA SW path regression (/_astro present, /_next absent)');
