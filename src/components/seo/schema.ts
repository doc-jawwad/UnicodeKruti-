import { SITE_NAME, SITE_URL } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo/metadata';

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
  };
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { '@id': ORG_ID },
    inLanguage: ['en-IN', 'hi-IN'],
  };
}

function personNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Akshay Verma',
    jobTitle: 'Software developer and Hindi Typing Expert',
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
}) {
  const pageUrl = absoluteUrl(path);
  const pageId = `${pageUrl}#webpage`;
  const appId = `${pageUrl}#webapp`;
  const howToId = `${pageUrl}#howto`;
  const faqId = `${pageUrl}#faq`;
  const tocId = `${pageUrl}#toc`;
  const crumbId = `${pageUrl}#breadcrumb`;

  const hasPart: { '@id': string }[] = [];
  if (toc.length) hasPart.push({ '@id': tocId });
  if (howToSteps.length) hasPart.push({ '@id': howToId });
  if (faqs.length) hasPart.push({ '@id': faqId });

  const graph: Record<string, unknown>[] = [
    organizationNode(),
    websiteNode(),
    ...(includeReviewer ? [personNode()] : []),
    {
      '@type': 'WebPage',
      '@id': pageId,
      url: pageUrl,
      name: pageName,
      description: pageDescription,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': appId },
      primaryEntity: { '@id': appId },
      ...(hasPart.length ? { hasPart } : {}),
      ...(includeReviewer ? { reviewedBy: { '@id': PERSON_ID } } : {}),
      ...(breadcrumbs?.length ? { breadcrumb: { '@id': crumbId } } : {}),
    },
    {
      '@type': 'WebApplication',
      '@id': appId,
      name: appName,
      url: pageUrl,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      description: pageDescription,
      isAccessibleForFree: true,
      featureList: [
        'Real-time Unicode ↔ KrutiDev conversion',
        'Browser-only processing — text never uploaded',
        'Copy, Word, PDF, WhatsApp, and Gmail export',
        'TXT and PDF text upload',
      ],
      privacyPolicy: absoluteUrl('/privacy-policy'),
      ...(includeReviewer ? { reviewedBy: { '@id': PERSON_ID } } : {}),
    },
  ];

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
      description: pageDescription,
      step: howToSteps.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': faqId,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildLegalSchema({
  path,
  pageName,
  pageDescription,
  pageType = 'WebPage',
}: {
  path: string;
  pageName: string;
  pageDescription: string;
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'PrivacyPolicy';
}) {
  const pageUrl = absoluteUrl(path);
  const pageId = `${pageUrl}#webpage`;
  const crumbId = `${pageUrl}#breadcrumb`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      websiteNode(),
      {
        '@type': pageType,
        '@id': pageId,
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        isPartOf: { '@id': WEBSITE_ID },
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
