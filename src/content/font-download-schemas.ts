import { SITE_NAME, SITE_URL, FOOTER } from '@/lib/site';
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
        cssSelector: ['#tldr-block', 'h1'],
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
          name: 'Download the file',
          text: 'Click the Download KrutiDev 010 button above. The file KRDEV010.TTF saves to your Downloads folder. The download takes a few seconds on any connection.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Open your Downloads folder',
          text: 'Press the Windows key and E together. This opens File Explorer. Click Downloads in the left panel. Find KRDEV010.TTF.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Install the font',
          text: 'Right-click on KRDEV010.TTF. Two options appear: Install and Install for all users.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Handle the SmartScreen warning (Windows 11 only)',
          text: 'Windows 11 sometimes shows a blue dialog that says "Windows protected your PC." This happens because the font installer file is not a Microsoft-signed application, not because the file is harmful.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Verify the installation',
          text: 'Open MS Word or Notepad. Click the font name box at the top. Type "Kruti Dev 010" without quotes. If the name appears in the dropdown list, the installation worked. You are ready to type in Hindi.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      '@id': HOWTO_MAC_ID,
      name: 'How to Install KrutiDev Font on Mac',
      description:
        'Step-by-step guide to download and install the KrutiDev 010 TTF font file on macOS using Font Book.',
      totalTime: 'PT2M',
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
          text: 'Click the Download KrutiDev 010 button above. Save KRDEV010.TTF to your Downloads folder.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Open Font Book',
          text: 'Press Command and Space together. Type "Font Book" and press Enter. Font Book opens.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Add the font',
          text: 'In Font Book, click File in the top menu bar. Select "Add Fonts." Go to your Downloads folder. Select KRDEV010.TTF. Click Open. The font installs immediately and appears in Font Book under the name Kruti Dev 010.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Verify in the application',
          text: 'Open Pages, Microsoft Word for Mac, or any text editor. Click the font selector. Type "Kruti Dev 010." Select it. You are now ready to type using the KrutiDev keyboard layout on your Mac.',
        },
      ],
    },
    buildFaqPageNode(FAQ_ID, fontDownloadFaqs, 'en-IN'),
    buildFaqPageNode(FAQ_HI_ID, fontDownloadFaqsHindi, 'hi-IN'),
  ],
};
