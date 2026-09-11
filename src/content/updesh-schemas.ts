/**
 * JSON-LD for /updesh-converter — SoftwareApplication + HowTo + FAQPage.
 * Injected via <JsonLd /> (same pattern as font-download / u2k10).
 * FAQ answers must stay in sync with visible FAQ markup on the page.
 */
import { getCanonicalUrl } from '@/lib/seo/metadata';

const UPDESH_PATH = '/updesh-converter';
const UPDESH_URL = getCanonicalUrl(UPDESH_PATH);

export const updeshJsonLdSchemas = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Updesh Font Converter — Free Updesh ↔ Unicode Tool',
      url: UPDESH_URL,
      description:
        'Free browser-based Updesh converter. Convert Updesh or Updes Hindi text to Unicode and Unicode to Updesh. No download or signup required.',
      inLanguage: 'en-IN',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#tldr-block', 'h1'],
      },
      isPartOf: {
        '@type': 'WebSite',
        name: 'UnicodeKruti',
        url: 'https://unicodekruti.com',
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Updesh Font Converter',
      alternateName: [
        'Updes Converter',
        'Updesh Unicode Converter',
        'Updesh Hindi Converter',
      ],
      url: UPDESH_URL,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      description:
        'Free online Updesh font converter. Converts Hindi text between Updesh and Unicode encoding in both directions. No signup required.',
      author: {
        '@type': 'Person',
        name: 'Akshay Verma',
        jobTitle: 'Software Developer and Hindi Typing Expert',
        url: 'https://unicodekruti.com/about-us/',
      },
    },
    {
      '@type': 'HowTo',
      name: 'How to Convert Updesh Font to Unicode Online',
      description:
        'Convert Updesh legacy Hindi text to Unicode or Unicode Hindi to Updesh using the UnicodeKruti free online tool. No download or signup required.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Paste Your Text',
          text: 'Paste Unicode Hindi text from any source into the left input box. To convert in the other direction, paste Updesh-encoded text into the input box with Updesh-to-Unicode selected.',
        },
        {
          '@type': 'HowToStep',
          name: 'The Conversion Runs in Your Browser',
          text: 'No button click is needed. Output appears as you type or paste. The process runs entirely in your browser without a page reload.',
        },
        {
          '@type': 'HowToStep',
          name: 'Copy and Use the Output',
          text: 'Copy the output text and paste it into your target application. For Updesh legacy output, apply the corresponding legacy font after pasting.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://unicodekruti.com/updesh-converter/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Updesh font converter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Updesh font converter is a free browser-based tool that converts Hindi text between Updesh legacy encoding and Unicode Devanagari. It works in both directions and requires no sign-up or installation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Updes the same as Updesh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes as a search term. Updes, Updesh, and the UPDES NIC converter all refer to KrutiDev-10 / KrutiDev 010 conversion. The UPDES portal at updes.up.nic.in is operated by the Directorate of Economics and Statistics, Government of Uttar Pradesh, and documents KrutiDev-10. This page uses that Remington map for all three names.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Updesh the same as KrutiDev 010?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'This converter uses the KrutiDev 010 Remington ASCII map. There is no separately documented Updesh encoding or Updesh.ttf. Search terms Updesh and Updes refer to UP government / UPDES KrutiDev-10 workflows. Text converted here is the same encoding as KrutiDev 010.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I convert Updesh text to Unicode online?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Paste your Updesh legacy text into the converter input box. Select the Updesh-to-Unicode direction if it is not already active. The Unicode output appears instantly. Copy the output and paste it into any application that supports Unicode Devanagari text.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I convert Unicode Hindi to Updesh using this tool?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Paste Unicode Hindi text into the input box and select the Unicode-to-Updesh direction. The converted legacy text appears in the output box. Apply the appropriate legacy font in your target application after pasting so the Hindi displays correctly.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the UPDES NIC font converter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The UPDES site at updes.up.nic.in is operated by the Directorate of Economics and Statistics, Government of Uttar Pradesh. It provides a browser-based utility documented as a KrutiDev-10 to Unicode and Unicode to KrutiDev-10 converter (Source: updes.up.nic.in/esd/font_converter). This page at UnicodeKruti addresses the same conversion search intent with both directions available, no government portal login required, and mobile browser support.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does my converted text show as random letters in MS Word?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The conversion is working as expected. The legacy font is not applied. Select the pasted text in MS Word, open the font selector, and apply the appropriate legacy Hindi font. Without that font, legacy-encoded text displays as the underlying keyboard characters rather than Devanagari. This is normal behavior for legacy font-dependent text.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to download anything to use this converter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The converter runs in your browser. If you need a legacy font file to display converted text in MS Word or another application, that is a separate requirement. Visit the font download page for the font file.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does this Updesh converter work on mobile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. It works in Chrome, Safari, Firefox, and Edge on Android and iPhone. No app download is needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is my text sent to a server when I use this tool?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The conversion runs in your browser. This is especially relevant for users working with administrative or confidential documents. Verify with your own network inspection if your use case requires confirmed local-only processing.',
          },
        },
      ],
    },
    {
      '@type': 'Article',
      headline:
        'Updesh Font Converter: Free Online Updesh to Unicode Tool',
      description:
        'Free browser-based Updesh converter. Convert Updesh or Updes Hindi text to Unicode and Unicode to Updesh. No download or signup required.',
      url: 'https://unicodekruti.com/updesh-converter/',
      inLanguage: 'en-IN',
      datePublished: '2026-09-03',
      dateModified: '2026-09-03',
      author: {
        '@type': 'Person',
        name: 'Akshay Verma',
        jobTitle: 'Software Developer and Hindi Typing Expert',
        url: 'https://unicodekruti.com/about-us/',
      },
      publisher: {
        '@type': 'Organization',
        name: 'UnicodeKruti',
        url: 'https://unicodekruti.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://unicodekruti.com/images/logo.webp',
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getCanonicalUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Updesh Converter',
          item: UPDESH_URL,
        },
      ],
    },
  ],
} as const;
