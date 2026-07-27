import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function absoluteUrl(path = '/') {
  if (!path.startsWith('/')) return `${SITE_URL}/${path}`;
  // Homepage canonical uses trailing slash; all other paths do not.
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.replace(/\/$/, '')}`;
}

/** Map page path → /public/og/*.png (or dynamic /og/[slug] fallback). */
export const OG_IMAGE_BY_PATH: Record<string, { file: string; alt: string }> = {
  '/': {
    file: 'homepage.png',
    alt: 'UnicodeKruti — Free Unicode to KrutiDev Converter',
  },
  '/krutidev-to-unicode': {
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
  const url = absoluteUrl(path);
  const ogTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const og = OG_IMAGE_BY_PATH[path] || DEFAULT_OG;
  const ogImageUrl = absoluteUrl(`/og/${og.file}`);

  const languages: Record<string, string> = {
    'en-IN': url,
  };
  if (hreflangHi) {
    languages.hi = url;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
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
