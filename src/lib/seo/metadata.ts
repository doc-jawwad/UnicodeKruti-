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



/** Public indexable routes — path keys match buildPageMetadata `path` (no trailing slash). */

export const PUBLIC_CANONICAL_PATHS = {

  home: '/',

  k2u: '/krutidev-to-unicode-converter',

  k10: '/krutidev-10-to-unicode-converter',

  k010: '/krutidev-010-to-unicode-converter',

  u2k10: '/unicode-to-krutidev-10-converter',

  fontDownload: '/font-download',

  aboutUs: '/about-us',

  privacyPolicy: '/privacy-policy',

  contactUs: '/contact-us',

  sitemap: '/sitemap',

} as const;



/** Map page path → /public/og/*.png (or dynamic /og/[slug] fallback). */

export const OG_IMAGE_BY_PATH: Record<string, { file: string; alt: string }> = {

  '/': {

    file: 'homepage.png',

    alt: 'UnicodeKruti — Free Unicode to KrutiDev Converter',

  },

  '/krutidev-to-unicode-converter': {

    file: 'krutidev-to-unicode.png',

    alt: 'UnicodeKruti — Free KrutiDev to Unicode Converter',

  },

  '/krutidev-010-to-unicode-converter': {

    file: 'krutidev-to-unicode.png',

    alt: 'UnicodeKruti — KrutiDev 010 to Unicode Converter',

  },

  '/krutidev-10-to-unicode-converter': {

    file: 'krutidev-to-unicode.png',

    alt: 'UnicodeKruti — KrutiDev 10 to Unicode Converter',

  },

  '/unicode-to-krutidev-10-converter': {

    file: 'unicode-to-krutidev-10.png',

    alt: 'UnicodeKruti — Unicode to KrutiDev 10 Converter',

  },

  '/font-download': {

    file: 'font-download.png',

    alt: 'UnicodeKruti — Free KrutiDev Font Download',

  },

  '/about-us': {

    file: 'about-us.png',

    alt: 'UnicodeKruti — About Us',

  },

};



const DEFAULT_OG = {

  file: 'homepage.png',

  alt: `${SITE_NAME} — Unicode ↔ KrutiDev tools`,

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



  const languages: Record<string, string> = {

    'en-IN': canonical,

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

          width: 1200,

          height: 630,

          alt: og.alt,

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


