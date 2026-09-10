import { absoluteUrl } from '@/lib/seo/metadata';

export type WebAppSchemaInput = {
  name: string;
  /** Site path (e.g. `/` or `/krutidev-to-unicode`). Canonical URL uses trailing slash. */
  path: string;
  description: string;
  featureList?: string[];
  /** BCP 47 or ISO 639-1 — converter tools default to Hindi content. */
  inLanguage?: string;
};

const DEFAULT_FEATURE_LIST = [
  'Real-time conversion',
  'Browser-only processing — no server upload',
  'No signup required',
  'No character limit',
];

/** WebApplication author — shared across all converter tools. */
export const WEB_APPLICATION_AUTHOR = {
  '@type': 'Person' as const,
  name: 'Akshay Verma',
  jobTitle: 'Software Developer and Hindi Typing Expert',
  url: 'https://unicodekruti.com/about-us/',
};

/**
 * Standalone WebApplication JSON-LD node (Schema.org).
 * Used inside @graph via buildConverterSchema and for typed reuse across converter pages.
 */
export function generateWebAppSchema({
  name,
  path,
  description,
  featureList = DEFAULT_FEATURE_LIST,
  inLanguage = 'hi',
}: WebAppSchemaInput) {
  return {
    '@type': 'WebApplication' as const,
    name,
    url: absoluteUrl(path),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web, Android, iOS',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description,
    featureList,
    inLanguage,
    author: WEB_APPLICATION_AUTHOR,
  };
}

/** Per-converter WebApplication copy — keyed by route path (no trailing slash). */
export const CONVERTER_WEB_APP_BY_PATH: Record<
  string,
  Omit<WebAppSchemaInput, 'path'>
> = {
  '/': {
    name: 'Unicode to KrutiDev Converter',
    description:
      'Free browser-based tool that converts Unicode Devanagari Hindi (Mangal, Kokila, Nirmala UI) to KrutiDev 010 encoding. No signup, no install, no character limit.',
    featureList: [
      'Real-time conversion',
      'No server upload',
      'CPCT exam ready',
      'Supports Mangal, Kokila, Nirmala UI',
    ],
  },
  '/krutidev-to-unicode-converter': {
    name: 'KrutiDev to Unicode Converter',
    description:
      'Free browser-based tool that converts KrutiDev 010 and KrutiDev 10 encoded Hindi text to Unicode Devanagari. Paste KrutiDev, get readable Hindi for Gmail, WhatsApp, and government portals. No signup, no server upload.',
    featureList: [
      'Real-time KrutiDev to Unicode conversion',
      'No server upload',
      'CPCT and UP court verified mapping',
      'Mangal-compatible Unicode output',
    ],
  },
  '/krutidev-10-to-unicode-converter': {
    name: 'KrutiDev 10 to Unicode Converter',
    description:
      'Free online tool that converts KrutiDev 10 (Kurtidev10) encoded Hindi to Unicode Devanagari. Same mapping as KrutiDev 010. Browser-only — text never leaves your device.',
    featureList: [
      'Real-time KrutiDev 10 to Unicode conversion',
      'No server upload',
      'Kurtidev10 / K10 alias support',
      'Works on mobile and desktop browsers',
    ],
  },
  '/krutidev-010-to-unicode-converter': {
    name: 'KrutiDev 010 to Unicode Converter',
    description:
      "Free browser tool that converts India's official KrutiDev 010 government Hindi encoding to Unicode Devanagari. For CPCT, UPSSSC, court records, and Digital India portals. No signup, no install.",
    featureList: [
      'Real-time KrutiDev 010 to Unicode conversion',
      'No server upload',
      'Government exam standard (010)',
      'Portal and WhatsApp ready output',
    ],
  },
  '/unicode-to-krutidev-10-converter': {
    name: 'Unicode to KrutiDev 10 Converter',
    description:
      'Free browser-based tool that converts Unicode or Mangal Hindi text to KrutiDev 10 encoding for CPCT exams, DTP workflows, and legacy MS Word documents. No signup, no character limit.',
    featureList: [
      'Real-time Unicode to KrutiDev 10 conversion',
      'No server upload',
      'CPCT and DTP exam ready',
      'Supports Mangal, Nirmala UI, Kokila',
    ],
  },
  '/nirmala-ui-to-krutidev-converter': {
    name: 'Nirmala UI to KrutiDev Converter',
    description:
      'Free browser-based tool that converts Nirmala UI, Mangal, Kokila, and all Unicode Devanagari Hindi to KrutiDev 010 encoding. No signup, no install, no character limit.',
    featureList: [
      'Real-time Nirmala UI to KrutiDev conversion',
      'No server upload — browser-only processing',
      'CPCT and UPSSSC exam ready output',
      'Supports Nirmala UI, Mangal, Kokila, Arial Unicode',
    ],
  },
};

export function getConverterWebAppConfig(path: string) {
  const bare = path.replace(/\/+$/, '') || '/';
  return CONVERTER_WEB_APP_BY_PATH[bare];
}
