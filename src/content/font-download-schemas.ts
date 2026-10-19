import { SITE_NAME, SITE_URL, FOOTER } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo/metadata';
import { buildFaqPageNode } from '@/components/seo/schema';
import { fontDownloadFaqs, fontDownloadFaqsHindi } from '@/content/font-download-faqs';

const PAGE_PATH = '/font-download';
const PAGE_URL = absoluteUrl(PAGE_PATH);
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PAGE_ID = `${PAGE_URL}#webpage`;
const CRUMB_ID = `${PAGE_URL}#breadcrumb`;
const FAQ_ID = `${PAGE_URL}#faq`;
const FAQ_HI_ID = `${PAGE_URL}#faq-hi`;

const PAGE_NAME = 'Kruti Dev Font Download: 010, 011, 016 & 055 Hindi TTF';
const PAGE_DESCRIPTION =
  'Download Kruti Dev 010, 011, 016 & 055 Hindi TTFs. Preview 15 fonts, select your version, and follow simple Windows and MS Word installation steps.';

/**
 * /font-download — Organisation / WebSite / WebPage / BreadcrumbList + FAQPage
 * mirroring visible FAQs. Omits install How-To nodes and unverified review fields.
 */
export const fontDownloadJsonLdSchemas = {
  '@context': 'https://schema.org',
  '@graph': [
    {
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
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': ORG_ID },
      inLanguage: ['en-IN'],
    },
    {
      '@type': 'WebPage',
      '@id': PAGE_ID,
      url: PAGE_URL,
      name: PAGE_NAME,
      description: PAGE_DESCRIPTION,
      inLanguage: 'en-IN',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': FAQ_ID },
      primaryEntity: { '@id': FAQ_ID },
      publisher: { '@id': ORG_ID },
      breadcrumb: { '@id': CRUMB_ID },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#tldr-block', 'h1'],
      },
      hasPart: [{ '@id': FAQ_ID }, { '@id': FAQ_HI_ID }],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': CRUMB_ID,
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
          name: 'Kruti Dev Font Download',
          item: PAGE_URL,
        },
      ],
    },
    buildFaqPageNode(FAQ_ID, fontDownloadFaqs, 'en-IN'),
    buildFaqPageNode(FAQ_HI_ID, fontDownloadFaqsHindi, 'hi-IN'),
  ],
};
