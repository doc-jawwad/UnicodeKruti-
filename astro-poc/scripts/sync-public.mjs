/**
 * Copy production public assets needed by the Astro POC into astro-poc/public.
 * Does not modify the parent public/ tree.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pocRoot = path.resolve(__dirname, '..');
const srcPublic = path.resolve(pocRoot, '../public');
const destPublic = path.resolve(pocRoot, 'public');

const COPY_DIRS = ['fonts', 'icons', 'images', 'og'];
const COPY_FILES = [
  'favicon.ico',
  'apple-touch-icon.png',
  'logo.svg',
  'manifest.json',
  'pdf.worker.min.mjs',
  'llms.txt',
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyRecursive(from, to) {
  const stat = fs.statSync(from);
  if (stat.isDirectory()) {
    ensureDir(to);
    for (const name of fs.readdirSync(from)) {
      copyRecursive(path.join(from, name), path.join(to, name));
    }
    return;
  }
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
}

ensureDir(destPublic);

for (const dir of COPY_DIRS) {
  const from = path.join(srcPublic, dir);
  if (!fs.existsSync(from)) {
    console.warn(`[sync-public] skip missing dir: ${dir}`);
    continue;
  }
  copyRecursive(from, path.join(destPublic, dir));
  console.log(`[sync-public] copied ${dir}/`);
}

for (const file of COPY_FILES) {
  const from = path.join(srcPublic, file);
  if (!fs.existsSync(from)) {
    console.warn(`[sync-public] skip missing file: ${file}`);
    continue;
  }
  copyRecursive(from, path.join(destPublic, file));
  console.log(`[sync-public] copied ${file}`);
}

// Security / cache headers for Cloudflare Workers static assets
const headers = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  X-Robots-Tag: noindex

/_astro/*
  Cache-Control: public, max-age=31536000, immutable
`;

fs.writeFileSync(path.join(destPublic, '_headers'), headers);
console.log('[sync-public] wrote _headers');
console.log('[sync-public] done');
