import type { NextConfig } from 'next';

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
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
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://scripts.clarity.ms",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://c.clarity.ms https://*.clarity.ms",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://*.vercel-insights.com",
      "worker-src 'self' blob:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/krutidev-to-unicode-converter',
        destination: '/krutidev-to-unicode',
        permanent: true,
      },
      {
        source: '/krutidev-to-unicode-converter/',
        destination: '/krutidev-to-unicode',
        permanent: true,
      },
      {
        source: '/krutidev-010-to-unicode',
        destination: '/krutidev-010-to-unicode-converter',
        permanent: true,
      },
      {
        source: '/terms-and-conditions',
        destination: '/terms-conditions',
        permanent: true,
      },
      {
        source: '/terms-and-conditions/',
        destination: '/terms-conditions',
        permanent: true,
      },
      {
        source: '/font-download',
        destination: '/fonts/KrutiDev010.ttf',
        permanent: false,
      },
      {
        source: '/font-download/',
        destination: '/fonts/KrutiDev010.ttf',
        permanent: false,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
