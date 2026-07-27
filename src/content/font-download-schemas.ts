import { SITE_NAME, SITE_URL } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo/metadata';
import { buildFaqPageNode, personNode } from '@/components/seo/schema';
import { fontDownloadFaqs, fontDownloadFaqsHindi } from '@/content/font-download-faqs';

const PAGE_URL = 'https://unicodekruti.com/font-download';
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#akshay-verma`;
const PAGE_ID = `${PAGE_URL}#webpage`;
const FONT_ID = `${PAGE_URL}#font`;
const CRUMB_ID = `${PAGE_URL}#breadcrumb`;
const HOWTO_WIN_ID = `${PAGE_URL}#howto-windows`;
const HOWTO_MAC_ID = `${PAGE_URL}#howto-mac`;
const FAQ_ID = `${PAGE_URL}#faq`;
const FAQ_HI_ID = `${PAGE_URL}#faq-hindi`;

/** Single @graph JSON-LD for /font-download — aligned with on-page content. */
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
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': ORG_ID },
      inLanguage: ['en-IN', 'hi-IN'],
    },
    personNode(),
    {
      '@type': 'WebPage',
      '@id': PAGE_ID,
      url: PAGE_URL,
      name: 'KrutiDev Font Download Free — All Versions (010, 055)',
      description:
        'Download KrutiDev font free. Get the original TTF file for Kruti Dev 010, 055, and other versions. Step-by-step install guide for Windows 10, Windows 11, and Mac.',
      inLanguage: 'en-IN',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': FONT_ID },
      primaryEntity: { '@id': FONT_ID },
      datePublished: '2026-07-27',
      dateModified: '2026-07-27',
      author: { '@id': PERSON_ID },
      reviewedBy: { '@id': PERSON_ID },
      publisher: { '@id': ORG_ID },
      breadcrumb: { '@id': CRUMB_ID },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#tldr-block', '#about-the-tool', '#faq-hindi'],
      },
      hasPart: [
        { '@id': HOWTO_WIN_ID },
        { '@id': HOWTO_MAC_ID },
        { '@id': FAQ_ID },
        { '@id': FAQ_HI_ID },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': CRUMB_ID,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://unicodekruti.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'KrutiDev Font Download',
          item: PAGE_URL,
        },
      ],
    },
    {
      '@type': ['SoftwareApplication', 'CreativeWork'],
      '@id': FONT_ID,
      name: 'KrutiDev 010 Font',
      alternateName: ['Kruti Dev 010', 'KrutiDev Font', 'KRDEV010.TTF'],
      description:
        "KrutiDev 010 is India's most widely used legacy Hindi Devanagari font. A non-Unicode TrueType font used in government typing exams (CPCT, UPSSSC, Rajasthan Patwari), court records, and legacy DTP software. Free to download.",
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Windows, macOS',
      encodingFormat: 'font/ttf',
      fileFormat: 'font/ttf',
      downloadUrl: 'https://unicodekruti.com/fonts/KRDEV010.ttf',
      url: PAGE_URL,
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      datePublished: '2026-07-27',
      dateModified: '2026-07-27',
      inLanguage: 'hi-IN',
      publisher: { '@id': ORG_ID },
      author: { '@id': PERSON_ID },
    },
    {
      '@type': 'HowTo',
      '@id': HOWTO_WIN_ID,
      name: 'How to Install KrutiDev Font on Windows 10 and Windows 11',
      description:
        'Step-by-step guide to download and install the KrutiDev 010 TTF font file on Windows 10 and Windows 11.',
      totalTime: 'PT3M',
      tool: {
        '@type': 'HowToTool',
        name: 'KrutiDev 010 TTF File',
        url: 'https://unicodekruti.com/fonts/KRDEV010.ttf',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Download the TTF file',
          text: 'Click the Download KrutiDev 010 button on this page. The file KRDEV010.TTF saves to your Downloads folder automatically.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Open your Downloads folder',
          text: 'Press Windows key + E to open File Explorer. Click Downloads on the left side panel. Find the file KRDEV010.TTF.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Install the font',
          text: 'Right-click on KRDEV010.TTF. Click Install (for your account only) or Install for all users (if you are on a shared or exam-prep computer). The font installs in under 3 seconds.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Verify in MS Word',
          text: 'Open MS Word. Click the font name box in the Home ribbon. Type Kruti Dev 010. Select it from the dropdown. You are ready to type using the Remington keyboard layout.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': HOWTO_MAC_ID,
      name: 'How to Install KrutiDev Font on Mac',
      description:
        'Step-by-step guide to download and install the KrutiDev 010 TTF font file on macOS using Font Book.',
      totalTime: 'PT3M',
      tool: {
        '@type': 'HowToTool',
        name: 'KrutiDev 010 TTF File',
        url: 'https://unicodekruti.com/fonts/KRDEV010.ttf',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Download the TTF file',
          text: 'Click the Download KrutiDev 010 button on this page. The file KRDEV010.TTF saves to your Downloads folder.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Open Font Book',
          text: 'Open Font Book from Applications, or press Command + Space and type Font Book.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Add the font',
          text: 'In Font Book, click File in the top menu. Select Add Fonts. Navigate to your Downloads folder. Select KRDEV010.TTF. Click Open. The font installs immediately.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Verify in the application',
          text: 'Open Pages, Word for Mac, or TextEdit. Click the font selector. Type Kruti Dev 010. Select it from the list. You are ready to type using the KrutiDev keyboard layout on Mac.',
        },
      ],
    },
    buildFaqPageNode(FAQ_ID, fontDownloadFaqs, 'en-IN'),
    buildFaqPageNode(FAQ_HI_ID, fontDownloadFaqsHindi, 'hi-IN'),
  ],
};
