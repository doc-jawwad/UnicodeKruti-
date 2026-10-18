import { SITE_NAME, SITE_URL, FOOTER } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo/metadata';
import {
  KEYBOARD_LAYOUT_PATH,
  KEYBOARD_PDF_PATH,
  keyboardLayoutMeta,
} from '@/content/keyboard-layout';

const PAGE_URL = absoluteUrl(KEYBOARD_LAYOUT_PATH);
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PAGE_ID = `${PAGE_URL}#webpage`;
const CRUMB_ID = `${PAGE_URL}#breadcrumb`;

/**
 * /krutidev-keyboard-layout — WebPage + BreadcrumbList only.
 * Visible FAQ stays on-page; FAQPage JSON-LD and speakable markup are omitted on purpose
 * (Gate 5C). No Person/reviewer, Review/Rating, or WebApplication nodes.
 */
export const keyboardLayoutJsonLdSchemas = {
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
      inLanguage: ['en-IN', 'hi-IN'],
    },
    {
      '@type': 'WebPage',
      '@id': PAGE_ID,
      url: PAGE_URL,
      name: keyboardLayoutMeta.h1,
      description: keyboardLayoutMeta.description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': WEBSITE_ID },
      datePublished: keyboardLayoutMeta.datePublished,
      dateModified: keyboardLayoutMeta.dateModified,
      publisher: { '@id': ORG_ID },
      breadcrumb: { '@id': CRUMB_ID },
      associatedMedia: {
        '@type': 'DigitalDocument',
        name: 'Kruti Dev 010 keyboard layout chart (A4 PDF)',
        encodingFormat: 'application/pdf',
        contentUrl: absoluteUrl(KEYBOARD_PDF_PATH),
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': CRUMB_ID,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        {
          '@type': 'ListItem',
          position: 2,
          name: keyboardLayoutMeta.breadcrumbLabel,
          item: PAGE_URL,
        },
      ],
    },
  ],
};
