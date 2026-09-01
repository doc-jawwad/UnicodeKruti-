import { buildConverterSchema } from '@/components/seo/schema';
import {
  u2k10AlternateNames,
  u2k10AppDescription,
  u2k10Faqs,
  u2k10FaqsHindi,
  u2k10HowToDescription,
  u2k10HowToSteps,
  u2k10Meta,
  u2k10Toc,
  u2k10WebPageDescription,
} from '@/content/u2k10';

/** Unified @graph schema for /unicode-to-krutidev-10-converter */
export const u2k10JsonLdSchemas = buildConverterSchema({
  path: u2k10Meta.path,
  pageName: u2k10Meta.title,
  pageDescription: u2k10WebPageDescription,
  appName: 'Unicode to KrutiDev 10 Converter',
  appDescription: u2k10AppDescription,
  howToName: 'How to Convert Unicode Hindi Text to KrutiDev 10',
  howToDescription: u2k10HowToDescription,
  toc: u2k10Toc,
  faqs: u2k10Faqs,
  faqsHindi: u2k10FaqsHindi,
  howToSteps: u2k10HowToSteps,
  howToTotalTime: 'PT1M',
  alternateNames: [...u2k10AlternateNames],
  datePublished: '2026-07-27',
  dateModified: '2026-07-27',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Unicode to KrutiDev 10 Converter', path: u2k10Meta.path },
  ],
});
