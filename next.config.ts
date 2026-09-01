import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';
import { nextConfigRedirects } from './src/lib/site-redirects';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  fallbacks: {
    document: '/',
  },
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
          networkTimeoutSeconds: 8,
        },
      },
      // Conversion JS logic + Next static chunks
      {
        urlPattern: /\/_next\/static\/.+\.js$/i,
        handler: 'CacheFirst' as const,
        options: {
          cacheName: 'unicodekruti-js',
          expiration: {
            maxEntries: 64,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
        },
      },
      // CSS
      {
        urlPattern: /\/_next\/static\/.+\.css$/i,
        handler: 'StaleWhileRevalidate' as const,
        options: {
          cacheName: 'unicodekruti-css',
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
        },
      },
      // App icons / brand assets
      {
        urlPattern: ({ url }: { url: URL }) =>
          url.pathname.startsWith('/icons/') ||
          url.pathname === '/manifest.json' ||
          url.pathname === '/logo.svg' ||
          url.pathname.startsWith('/images/'),
        handler: 'CacheFirst' as const,
        options: {
          cacheName: 'unicodekruti-assets',
          expiration: {
            maxEntries: 48,
            maxAgeSeconds: 60 * 60 * 24 * 30,
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
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms",
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

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  images: {
    // Keep logo / icon variants small; avoid 3840w srcset picks for 32–36px marks.
    imageSizes: [16, 32, 36, 48, 64, 96, 120, 128, 256],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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
          { key: 'Cache-Control', value: 'public, max-age=86400' },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
      {
        source: '/fonts/:file*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          { key: 'X-Robots-Tag', value: 'noindex' },
        ],
      },
    ];
  },
  async redirects() {
    return nextConfigRedirects();
  },
};

export default withPWA(nextConfig);
