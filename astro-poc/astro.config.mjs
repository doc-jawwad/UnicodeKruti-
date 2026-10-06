// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const shim = (name) => path.resolve(__dirname, 'src/shims', name);

/**
 * Astro SSG POC — trailingSlash matches production Next trailingSlash: true.
 * Vite aliases reuse parent `src/` with Next shims for converter islands.
 */
export default defineConfig({
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(repoRoot, 'src'),
        'next/link': shim('next-link.tsx'),
        'next/navigation': shim('next-navigation.ts'),
        'next/dynamic': shim('next-dynamic.tsx'),
        'next/image': shim('next-image.tsx'),
        'next/script': shim('next-script.tsx'),
      },
    },
    define: {
      'process.env.NEXT_PUBLIC_GA_ID': JSON.stringify(
        process.env.NEXT_PUBLIC_GA_ID || 'G-YVDR26LEM8'
      ),
      'process.env.NEXT_PUBLIC_CLARITY_ID': JSON.stringify(
        process.env.NEXT_PUBLIC_CLARITY_ID || 'xjq5psm0fo'
      ),
      'process.env.NEXT_PUBLIC_SITE_URL': JSON.stringify(
        process.env.NEXT_PUBLIC_SITE_URL || 'https://unicodekruti.com'
      ),
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'production'
      ),
    },
    ssr: {
      noExternal: ['parse5'],
    },
  },
});
