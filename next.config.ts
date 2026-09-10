import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';
import { nextConfigRedirects } from './src/lib/site-redirects';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  // Delay SW work so first visit doesn't contend with LCP
  register: true,
  cacheOnFrontEndNav: false,
  aggressiveFrontEndNavCaching: false,
  reloadOnOnline: true,
  // Do not fall back failed navigations to `/` — that soft-404s crawlers/clients
  // with homepage HTML under the requested URL.
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      // Critical tool pages (homepage, converters, font download)
      {
        urlPattern: ({ request, url }: { request: Request; url: URL }) => {
          if (request.destination !== 'document') return false;
          const path = url.pathname.replace(/\/$/, '') || '/';
          return (
            path === '/' ||
            path === '/krutidev-to-unicode-converter' ||
            path === '/krutidev-to-unicode' ||
            path === '/unicode-to-krutidev-10-converter' ||
            path === '/font-download'
          );
        },
        handler: 'NetworkFirst' as const,
        options: {
          cacheName: 'unicodekruti-pages',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 60 * 60 * 24 * 7,
          },
          networkTimeoutSeconds: 4,
        },
      },
      // Hashed Next chunks — CacheFirst is safe (filename changes on deploy).
      {
        urlPattern: /\/_next\/static\/.+\.js$/i,
        handler: 'CacheFirst' as const,
        options: {
          cacheName: 'unicodekruti-js',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      },
      // Hashed CSS
      {
        urlPattern: /\/_next\/static\/.+\.css$/i,
        handler: 'CacheFirst' as const,
        options: {
          cacheName: 'unicodekruti-css',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      },
      // Next font / media hashes under /_next/static/media
      {
        urlPattern: /\/_next\/static\/media\/.+/i,
        handler: 'CacheFirst' as const,
        options: {
          cacheName: 'unicodekruti-next-media',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      },
      // Optimized images
      {
        urlPattern: /\/_next\/image\?.+/i,
        handler: 'StaleWhileRevalidate' as const,
        options: {
          cacheName: 'unicodekruti-next-image',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
        },
      },
      // App icons / brand assets / OG
      {
        urlPattern: ({ url }: { url: URL }) =>
          url.pathname.startsWith('/icons/') ||
          url.pathname.startsWith('/images/') ||
          url.pathname.startsWith('/og/') ||
          url.pathname === '/manifest.json' ||
          url.pathname === '/logo.svg' ||
          url.pathname === '/favicon.ico' ||
          url.pathname === '/apple-touch-icon.png',
        handler: 'CacheFirst' as const,
        options: {
          cacheName: 'unicodekruti-assets',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      },
      // Downloadable KrutiDev TTFs
      {
        urlPattern: /\/fonts\/.+\.(?:ttf|otf)$/i,
        handler: 'CacheFirst' as const,
        options: {
          cacheName: 'unicodekruti-fonts',
          expiration: {
            maxEntries: 24,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      },
    ],
  },
});

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Dev webpack/HMR needs eval; keep production strict (no unsafe-eval).
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://c.clarity.ms https://*.clarity.ms https://c.bing.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://*.vercel-insights.com",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'credentialless',
  },
];

/** Content-hashed build assets — safe to cache forever in the browser. */
const CACHE_IMMUTABLE = 'public, max-age=31536000, immutable';

/**
 * Stable public brand/media assets (no content hash in URL).
 * Long browser TTL + SWR so repeat visits are instant; browsers may refresh in background.
 */
const CACHE_STATIC_ASSET =
  'public, max-age=31536000, stale-while-revalidate=86400';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  // Required to avoid /legacy → /legacy/ → /canonical chains. Next otherwise
  // unshifts a priority trailing-slash rule ahead of our redirects. Middleware
  // applies slash + legacy + www in one 308 (see src/middleware.ts).
  skipTrailingSlashRedirect: true,
  images: {
    // Keep logo / icon variants small; avoid 3840w srcset picks for 32–36px marks.
    imageSizes: [16, 32, 36, 48, 64, 96, 120, 128, 256],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Browser + CDN TTL for /_next/image responses (default is only 60s).
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {},
  transpilePackages: [],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/fonts/:file*',
        headers: [
          { key: 'Cache-Control', value: CACHE_IMMUTABLE },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: CACHE_IMMUTABLE },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: CACHE_STATIC_ASSET }],
      },
      {
        source: '/icons/:path*',
        headers: [{ key: 'Cache-Control', value: CACHE_STATIC_ASSET }],
      },
      {
        source: '/og/:path*',
        headers: [{ key: 'Cache-Control', value: CACHE_STATIC_ASSET }],
      },
      {
        source: '/logo.svg',
        headers: [{ key: 'Cache-Control', value: CACHE_STATIC_ASSET }],
      },
      {
        source: '/favicon.ico',
        headers: [{ key: 'Cache-Control', value: CACHE_STATIC_ASSET }],
      },
      {
        source: '/apple-touch-icon.png',
        headers: [{ key: 'Cache-Control', value: CACHE_STATIC_ASSET }],
      },
      {
        source: '/pdf.worker.min.mjs',
        headers: [{ key: 'Cache-Control', value: CACHE_STATIC_ASSET }],
      },
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
  async redirects() {
    return nextConfigRedirects();
  },
};

export default withPWA(nextConfig);
