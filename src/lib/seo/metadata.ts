import type { Metadata } from 'next';

import { getCanonicalUrl } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

export { getCanonicalUrl };

/** Alias used by JSON-LD, sitemap, and OG asset URLs — same rules as getCanonicalUrl. */
export const absoluteUrl = getCanonicalUrl;

/** Utility / legal pages that should not compete for crawl budget. */
export const NOINDEX_ROBOTS: Metadata['robots'] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

/**
 * Canonical path keys for buildPageMetadata `path` (no trailing slash; getCanonicalUrl adds `/`).
 * Includes some noindex utility paths (privacy, HTML sitemap) used only for self-canonicals.
 * XML sitemap indexables live in `SITEMAP_ROUTES` (`src/lib/site.ts`).
 */
export const PUBLIC_CANONICAL_PATHS = {
  home: '/',
  k2u: '/krutidev-to-unicode-converter',
  k10: '/krutidev-10-to-unicode-converter',
  k010: '/krutidev-010-to-unicode-converter',
  u2k10: '/unicode-to-krutidev-10-converter',
  fontDownload: '/font-download',
  updeshConverter: '/updesh-converter',
  aboutUs: '/about-us',
  privacyPolicy: '/privacy-policy',
  contactUs: '/contact-us',
  sitemap: '/sitemap',
} as const;

type OgImage = {
  file: string;
  alt: string;
  width: number;
  height: number;
};

/** Map page path → /public/og/* featured / Open Graph image. */
export const OG_IMAGE_BY_PATH: Record<string, OgImage> = {
  '/': {
    file: 'unicode-to-krutidev.webp',
    alt: 'UnicodeKruti — Free Unicode to KrutiDev Converter',
    width: 1672,
    height: 941,
  },
  '/krutidev-to-unicode-converter': {
    file: 'krutidev-to-unicode.webp',
    alt: 'UnicodeKruti — Free KrutiDev to Unicode Converter',
    width: 1672,
    height: 941,
  },
  '/krutidev-010-to-unicode-converter': {
    file: 'krutidev-010-to-unicode.webp',
    alt: 'UnicodeKruti — KrutiDev 010 to Unicode Converter',
    width: 1672,
    height: 941,
  },
  '/krutidev-10-to-unicode-converter': {
    file: 'krutidev-10-to-unicode.webp',
    alt: 'UnicodeKruti — KrutiDev 10 to Unicode Converter',
    width: 1672,
    height: 941,
  },
  '/unicode-to-krutidev-10-converter': {
    file: 'unicode-to-krutidev-10.webp',
    alt: 'UnicodeKruti — Unicode to KrutiDev 10 Converter',
    width: 1672,
    height: 941,
  },
  '/font-download': {
    file: 'font-download.png',
    alt: 'UnicodeKruti — Free KrutiDev Font Download',
    width: 1200,
    height: 630,
  },
  '/updesh-converter': {
    file: 'updesh-converter.webp',
    alt: 'UnicodeKruti — Free Updesh Font Converter',
    width: 1672,
    height: 941,
  },
  '/about-us': {
    file: 'about-us.png',
    alt: 'UnicodeKruti — About Us',
    width: 1200,
    height: 630,
  },
};

const DEFAULT_OG: OgImage = {
  file: 'unicode-to-krutidev.webp',
  alt: `${SITE_NAME} — Unicode ↔ KrutiDev tools`,
  width: 1672,
  height: 941,
};

export function buildPageMetadata({
  title,
  description,
  path,
  hreflangHi = false,
}: {
  title: string;
  description: string;
  path: string;
  /** Set true only when the page has substantial Hindi content (not just 3 FAQs). */
  hreflangHi?: boolean;
}): Metadata {
  const canonical = getCanonicalUrl(path);
  const ogTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const og = OG_IMAGE_BY_PATH[path.replace(/\/+$/, '') || '/'] || DEFAULT_OG;
  const ogImageUrl = getCanonicalUrl(`/og/${og.file}`);

  // Self-referencing hreflang: bilingual pages share one URL (no separate /hi route).
  const languages: Record<string, string> = {
    'en-IN': canonical,
    'x-default': canonical,
  };
  if (hreflangHi) {
    languages.hi = canonical;
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: ogImageUrl,
          width: og.width,
          height: og.height,
          alt: og.alt,
          type: og.file.endsWith('.webp') ? 'image/webp' : 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      site: '@UnicodeKruti',
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  };
}
