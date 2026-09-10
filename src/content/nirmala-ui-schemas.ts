import { buildConverterSchema } from '@/components/seo/schema';
import {
  nirmalaUiAlternateNames,
  nirmalaUiAppDescription,
  nirmalaUiFaqs,
  nirmalaUiFaqsHindi,
  nirmalaUiHowToDescription,
  nirmalaUiHowToSteps,
  nirmalaUiMeta,
  nirmalaUiToc,
  nirmalaUiWebPageDescription,
} from '@/content/nirmala-ui';
import { absoluteUrl } from '@/lib/seo/metadata';
import { schemaBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { SITE_URL } from '@/lib/site';

const NIRMALA_CRUMB = 'Nirmala UI to KrutiDev Converter';
const PERSON_ID = `${SITE_URL}/#akshay-verma`;
const ORG_ID = `${SITE_URL}/#organization`;
const PAGE_URL = absoluteUrl(nirmalaUiMeta.path);

const NIRMALA_FEATURE_LIST = [
  'Real-time Nirmala UI to KrutiDev 010 conversion',
  'Works for Mangal, Kokila, and all Unicode Devanagari',
  'Browser-only — no server upload',
  'CPCT and UPSSSC exam ready',
  'No signup, no character limit',
];

/**
 * Full converter @graph for /nirmala-ui-to-krutidev-converter:
 * Organization, WebSite, Person, WebPage (+ Speakable),
 * WebApplication + SoftwareApplication, BreadcrumbList,
 * ItemList (TOC), HowTo, FAQPage (en + hi), TechArticle.
 */
const baseSchema = buildConverterSchema({
  path: nirmalaUiMeta.path,
  pageName: nirmalaUiMeta.title,
  pageDescription: nirmalaUiWebPageDescription,
  appName: 'Nirmala UI to KrutiDev Converter',
  appDescription: nirmalaUiAppDescription,
  howToName: 'How to Convert Nirmala UI to KrutiDev in 3 Steps',
  howToDescription: nirmalaUiHowToDescription,
  toc: nirmalaUiToc,
  faqs: nirmalaUiFaqs,
  faqsHindi: nirmalaUiFaqsHindi,
  howToSteps: nirmalaUiHowToSteps,
  howToTotalTime: 'PT10S',
  alternateNames: [...nirmalaUiAlternateNames],
  datePublished: nirmalaUiMeta.datePublished,
  dateModified: nirmalaUiMeta.dateModified,
  featureList: NIRMALA_FEATURE_LIST,
  breadcrumbs: schemaBreadcrumbs(NIRMALA_CRUMB, nirmalaUiMeta.path),
  speakableCssSelectors: ['#tldr-block', 'h1', '#what-is-nirmala'],
});

const graph = [...(baseSchema['@graph'] as Record<string, unknown>[])];

const webPage = graph.find((node) => node['@type'] === 'WebPage');
if (webPage) {
  webPage.inLanguage = ['en-IN', 'hi-IN'];
  const hasPart = Array.isArray(webPage.hasPart)
    ? ([...webPage.hasPart] as { '@id': string }[])
    : [];
  hasPart.push({ '@id': `${PAGE_URL}#article` });
  webPage.hasPart = hasPart;
}

const webApp = graph.find((node) => node['@type'] === 'WebApplication');
if (webApp) {
  webApp['@type'] = ['WebApplication', 'SoftwareApplication'];
  webApp.applicationSubCategory = 'Font Converter';
  webApp.countriesSupported = 'IN';
  webApp.keywords =
    'nirmala ui to krutidev, mangal to krutidev, kokila to krutidev, unicode to krutidev 010';
}

const howTo = graph.find((node) => node['@type'] === 'HowTo');
if (howTo) {
  howTo.estimatedCost = {
    '@type': 'MonetaryAmount',
    currency: 'INR',
    value: '0',
  };
  howTo.supply = [
    {
      '@type': 'HowToSupply',
      name: 'Unicode Hindi text (Nirmala UI, Mangal, Kokila, or other Devanagari Unicode)',
    },
  ];
  howTo.inLanguage = 'en-IN';
}

graph.push({
  '@type': 'TechArticle',
  '@id': `${PAGE_URL}#article`,
  url: PAGE_URL,
  headline: 'Nirmala UI to KrutiDev Converter — Free Online Tool',
  description: nirmalaUiWebPageDescription,
  inLanguage: ['en-IN', 'hi-IN'],
  isPartOf: { '@id': `${PAGE_URL}#webpage` },
  mainEntityOfPage: { '@id': `${PAGE_URL}#webpage` },
  about: { '@id': `${PAGE_URL}#webapp` },
  author: { '@id': PERSON_ID },
  reviewer: { '@id': PERSON_ID },
  publisher: { '@id': ORG_ID },
  datePublished: nirmalaUiMeta.datePublished,
  dateModified: nirmalaUiMeta.dateModified,
  keywords: [
    'nirmala ui to krutidev converter',
    'nirmala ui to krutidev 010',
    'mangal to krutidev',
    'kokila to krutidev',
  ],
});

export const nirmalaUiJsonLdSchemas = {
  '@context': 'https://schema.org',
  '@graph': graph,
};
