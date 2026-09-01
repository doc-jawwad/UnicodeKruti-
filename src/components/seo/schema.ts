import { SITE_NAME, SITE_URL, FOOTER } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo/metadata';
import {
  generateWebAppSchema,
  getConverterWebAppConfig,
} from '@/lib/seo/web-app-schema';

export { generateWebAppSchema, getConverterWebAppConfig };

type TocItem = { id: string; label: string };
type FaqItem = { question: string; answer: string };
type HowToStep = { name: string; text: string };

const PERSON_ID = `${SITE_URL}/#akshay-verma`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo.svg'),
      width: 512,
      height: 512,
    },
    privacyPolicy: absoluteUrl('/privacy-policy'),
    sameAs: FOOTER.social.map((s) => s.href),
  };
}

function websiteNode(opts?: { sitelinksId?: string }) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORG_ID },
    inLanguage: ['en-IN', 'hi-IN'],
    ...(opts?.sitelinksId ? { hasPart: { '@id': opts.sitelinksId } } : {}),
  };
}

/** Primary tool/pages Google may surface as homepage sitelinks. */
export const HOMEPAGE_SITELINKS = [
  {
    name: 'KrutiDev to Unicode Converter',
    description:
      'Paste KrutiDev Hindi text and get Unicode Devanagari output. Free, browser-only, 99.9% accurate.',
    path: '/krutidev-to-unicode',
  },
  {
    name: 'KrutiDev Font Download',
    description:
      'Download free KrutiDev TTF fonts (010, 055, and more) for Windows and Mac.',
    path: '/font-download',
  },
  {
    name: 'KrutiDev 010 to Unicode Converter',
    description:
      'Convert official KrutiDev 010 documents to Unicode for portals, Gmail, and WhatsApp.',
    path: '/krutidev-010-to-unicode-converter',
  },
  {
    name: 'KrutiDev 10 to Unicode Converter',
    description:
      'Convert KrutiDev 10 (Kurtidev10) encoded Hindi text to Unicode online.',
    path: '/krutidev-10-to-unicode-converter',
  },
  {
    name: 'Unicode to KrutiDev 10 Converter',
    description:
      'Convert Unicode or Mangal Hindi to KrutiDev 10 for exams and DTP workflows.',
    path: '/unicode-to-krutidev-10-converter',
  },
  {
    name: 'About UnicodeKruti',
    description:
      'Built and verified by Akshay Verma — methodology, accuracy testing, and privacy.',
    path: '/about-us',
  },
] as const;

export function buildSitelinksNavigationNode(sitelinksId: string) {
  return {
    '@type': 'ItemList',
    '@id': sitelinksId,
    name: `${SITE_NAME} Site Links`,
    numberOfItems: HOMEPAGE_SITELINKS.length,
    itemListElement: HOMEPAGE_SITELINKS.map((link, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: link.name,
      description: link.description,
      url: absoluteUrl(link.path),
    })),
  };
}

/** Site-wide E-E-A-T Person node (Akshay Verma). */
export function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Akshay Verma',
    jobTitle: 'Software Developer and Hindi Typing Expert',
    url: absoluteUrl('/about-us'),
    sameAs: [absoluteUrl('/about-us')],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: 'BSCS',
    },
    worksFor: { '@id': ORG_ID },
  };
}

export function buildConverterSchema({
  path,
  pageName,
  pageDescription,
  appName,
  howToName,
  toc,
  faqs,
  howToSteps,
  breadcrumbs,
  includeReviewer = true,
  alternateNames,
  appDescription,
  howToDescription,
  howToTotalTime = 'PT1M',
  datePublished,
  dateModified,
  featureList,
  faqsHindi,
  speakableCssSelectors = ['#tldr-block', 'h1'],
  includeSitelinks = false,
}: {
  path: string;
  pageName: string;
  pageDescription: string;
  appName: string;
  howToName: string;
  toc: TocItem[];
  faqs: FaqItem[];
  howToSteps: HowToStep[];
  breadcrumbs?: { name: string; path: string }[];
  includeReviewer?: boolean;
  alternateNames?: string[];
  appDescription?: string;
  howToDescription?: string;
  howToTotalTime?: string;
  datePublished?: string;
  dateModified?: string;
  /** WebApplication featureList — defaults from converter-web-app-schema config by path. */
  featureList?: string[];
  /** Hindi FAQ section — emitted as a separate FAQPage with inLanguage hi-IN. */
  faqsHindi?: FaqItem[];
  /** Speakable CSS selectors for voice search (homepage / key tools). */
  speakableCssSelectors?: string[];
  /** Homepage only — SiteNavigationElement ItemList for sitelinks. */
  includeSitelinks?: boolean;
}) {
  const pageUrl = absoluteUrl(path);
  const pageId = `${pageUrl}#webpage`;
  const appId = `${pageUrl}#webapp`;
  const howToId = `${pageUrl}#howto`;
  const faqId = `${pageUrl}#faq`;
  const faqHindiId = `${pageUrl}#faq-hindi`;
  const tocId = `${pageUrl}#toc`;
  const crumbId = `${pageUrl}#breadcrumb`;
  const sitelinksId = `${SITE_URL}/#sitelinks`;
  const webAppConfig = getConverterWebAppConfig(path);
  const resolvedAppName = appName || webAppConfig?.name || pageName;
  const resolvedAppDescription =
    appDescription || webAppConfig?.description || pageDescription;
  const resolvedFeatureList = featureList ?? webAppConfig?.featureList;
  const hindiFaqs = faqsHindi?.length ? faqsHindi : [];

  const hasPart: { '@id': string }[] = [];
  if (includeSitelinks) hasPart.push({ '@id': sitelinksId });
  if (toc.length) hasPart.push({ '@id': tocId });
  if (howToSteps.length) hasPart.push({ '@id': howToId });
  if (faqs.length) hasPart.push({ '@id': faqId });
  if (hindiFaqs.length) hasPart.push({ '@id': faqHindiId });

  const graph: Record<string, unknown>[] = [
    organizationNode(),
    websiteNode(includeSitelinks ? { sitelinksId } : undefined),
    ...(includeReviewer ? [personNode()] : []),
    {
      '@type': 'WebPage',
      '@id': pageId,
      url: pageUrl,
      name: pageName,
      description: pageDescription,
      inLanguage: 'en-IN',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': appId },
      primaryEntity: { '@id': appId },
      ...(datePublished ? { datePublished } : {}),
      ...(dateModified ? { dateModified } : {}),
      ...(includeReviewer
        ? {
            author: { '@id': PERSON_ID },
            reviewedBy: { '@id': PERSON_ID },
          }
        : {}),
      ...(hasPart.length ? { hasPart } : {}),
      ...(breadcrumbs?.length ? { breadcrumb: { '@id': crumbId } } : {}),
      ...(speakableCssSelectors?.length
        ? {
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: speakableCssSelectors,
            },
          }
        : {}),
    },
    {
      ...generateWebAppSchema({
        name: resolvedAppName,
        path,
        description: resolvedAppDescription,
        featureList: resolvedFeatureList,
      }),
      '@id': appId,
      ...(alternateNames?.length ? { alternateName: alternateNames } : {}),
      isAccessibleForFree: true,
      ...(datePublished ? { datePublished } : {}),
      ...(dateModified ? { dateModified } : {}),
      publisher: { '@id': ORG_ID },
      ...(includeReviewer
        ? {
            author: { '@id': PERSON_ID },
            reviewedBy: { '@id': PERSON_ID },
          }
        : {}),
    },
  ];

  if (includeSitelinks) {
    graph.push(buildSitelinksNavigationNode(sitelinksId));
  }

  if (breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': crumbId,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    });
  }

  if (toc.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': tocId,
      name: 'Table of Contents',
      itemListElement: toc.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        url: `${pageUrl}#${item.id}`,
      })),
    });
  }

  if (howToSteps.length) {
    graph.push({
      '@type': 'HowTo',
      '@id': howToId,
      name: howToName,
      description: howToDescription || pageDescription,
      totalTime: howToTotalTime,
      tool: {
        '@type': 'HowToTool',
        name: appName || resolvedAppName,
        url: pageUrl,
      },
      step: howToSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  if (faqs.length) {
    graph.push(buildFaqPageNode(faqId, faqs, 'en-IN'));
  }

  if (hindiFaqs.length) {
    graph.push(buildFaqPageNode(faqHindiId, hindiFaqs, 'hi-IN'));
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/** Standalone FAQPage JSON-LD (English or Hindi). */
export function buildFaqPageNode(
  id: string,
  faqs: FaqItem[],
  inLanguage: 'en-IN' | 'hi-IN' = 'en-IN'
) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    inLanguage,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      inLanguage,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        inLanguage,
      },
    })),
  };
}

export function buildLegalSchema({
  path,
  pageName,
  pageDescription,
  pageType = 'WebPage',
  datePublished = '2026-07-27',
  dateModified = '2026-07-27',
}: {
  path: string;
  pageName: string;
  pageDescription: string;
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'PrivacyPolicy';
  datePublished?: string;
  dateModified?: string;
}) {
  const pageUrl = absoluteUrl(path);
  const pageId = `${pageUrl}#webpage`;
  const crumbId = `${pageUrl}#breadcrumb`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      personNode(),
      {
        '@type': pageType,
        '@id': pageId,
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        inLanguage: 'en-IN',
        isPartOf: { '@id': WEBSITE_ID },
        datePublished,
        dateModified,
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORG_ID },
        breadcrumb: { '@id': crumbId },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': crumbId,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: pageName,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
