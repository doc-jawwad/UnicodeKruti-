import { buildConverterSchema } from '@/components/seo/schema';
import {
  nirmalaUiAlternateNames,
  nirmalaUiAppDescription,
  nirmalaUiFaqs,
  nirmalaUiFaqsHindi,
  nirmalaUiFeatureList,
  nirmalaUiHowToDescription,
  nirmalaUiHowToSteps,
  nirmalaUiMeta,
  nirmalaUiToc,
  nirmalaUiWebPageDescription,
} from '@/content/nirmala-ui';
import { schemaBreadcrumbs } from '@/lib/seo/breadcrumbs';

const NIRMALA_CRUMB = 'Nirmala UI to KrutiDev Converter';

/** Unified @graph schema for /nirmala-ui-to-krutidev-converter — same builder as other converters. */
export const nirmalaUiJsonLdSchemas = buildConverterSchema({
  path: nirmalaUiMeta.path,
  pageName: nirmalaUiMeta.title,
  pageDescription: nirmalaUiWebPageDescription,
  appName: 'Nirmala UI to KrutiDev Converter',
  appDescription: nirmalaUiAppDescription,
  howToName: 'How to Convert Nirmala UI to KrutiDev 010',
  howToDescription: nirmalaUiHowToDescription,
  toc: nirmalaUiToc,
  faqs: nirmalaUiFaqs,
  faqsHindi: nirmalaUiFaqsHindi,
  howToSteps: nirmalaUiHowToSteps,
  howToTotalTime: 'PT10S',
  alternateNames: [...nirmalaUiAlternateNames],
  featureList: [...nirmalaUiFeatureList],
  datePublished: nirmalaUiMeta.datePublished,
  dateModified: nirmalaUiMeta.dateModified,
  breadcrumbs: schemaBreadcrumbs(NIRMALA_CRUMB, nirmalaUiMeta.path),
  speakableCssSelectors: ['#tldr-block', 'h1'],
});
