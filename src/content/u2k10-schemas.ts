/** Exact JSON-LD schemas for /unicode-to-krutidev-10-converter */

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Unicode to KrutiDev 10 Converter',
  alternateName: [
    'Unicode to Kurtidev10 Converter',
    'Convert Unicode to Kruti Dev 10',
  ],
  description:
    'Free browser-based tool that converts Unicode Devanagari Hindi text — from Mangal, Nirmala UI, Google Input Tools, or InScript — into KrutiDev 10 (Kurtidev10) legacy font encoding. Designed for exam candidates, coaching institutes, and DTP professionals.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  url: 'https://unicodekruti.com/unicode-to-krutidev-10-converter',
  author: {
    '@type': 'Person',
    name: 'Akshay Verma',
    jobTitle: 'Software developer and Hindi Typing Expert',
    sameAs: 'https://unicodekruti.com/about-us',
  },
  publisher: {
    '@type': 'Organization',
    name: 'UnicodeKruti',
    url: 'https://unicodekruti.com',
  },
  datePublished: '2026-07-27',
  dateModified: '2026-07-27',
  inLanguage: 'en-IN',
  isAccessibleForFree: true,
};

export const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
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
      name: 'Unicode to KrutiDev Converter',
      item: 'https://unicodekruti.com/',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Unicode to KrutiDev 10 Converter',
      item: 'https://unicodekruti.com/unicode-to-krutidev-10-converter',
    },
  ],
};

export const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Unicode to KrutiDev 10 Converter — Free Online Tool',
  description:
    'Convert Unicode Hindi text to KrutiDev 10 (Kurtidev10) format online. Works for Mangal, Google Input Tools, and InScript output. Free, browser-only, no signup.',
  url: 'https://unicodekruti.com/unicode-to-krutidev-10-converter',
  inLanguage: 'en-IN',
  datePublished: '2026-07-27',
  dateModified: '2026-07-27',
  author: {
    '@type': 'Person',
    name: 'Akshay Verma',
    sameAs: 'https://unicodekruti.com/about-us',
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['#tldr-block'],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
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
        name: 'Unicode to KrutiDev Converter',
        item: 'https://unicodekruti.com/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Unicode to KrutiDev 10 Converter',
        item: 'https://unicodekruti.com/unicode-to-krutidev-10-converter',
      },
    ],
  },
};

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert Unicode Mangal text to KrutiDev 10 format for exam submission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your Mangal or Unicode Hindi text into the input box above. The tool converts it to KrutiDev 10 encoding in real time. Copy the output and paste it into your exam practice software, coaching institute evaluation form, or legacy printing application. The process takes under 10 seconds on any device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is KrutiDev 10 the same as KrutiDev 010 for exam purposes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Both versions use the same character-to-ASCII mapping. Exam boards specify 010 by name in official notifications, but the output from a KrutiDev 10 converter is technically interchangeable. For the complete explanation, see KrutiDev 010 vs KrutiDev 10 — Full Comparison.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I type in Unicode Mangal and then convert to KrutiDev 10 for DTP or printing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type or paste your Mangal text into this converter. Copy the KrutiDev 10 output. Open PageMaker, CorelDRAW, or MS Word and apply the Kruti Dev 010 font to the pasted text. Your Hindi displays correctly. This approach avoids retyping entirely and works for full documents as well as short passages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Unicode fonts convert to KrutiDev 10 without errors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mangal, Nirmala UI, Aparajita, Kokila, Hind, and Noto Sans Devanagari all convert correctly because they store Hindi as standard Unicode Devanagari code points in the range U+0900 to U+097F. Legacy fonts like Devlys, Chanakya, and Shree-Lipi use separate proprietary ASCII systems and are not compatible input for this tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my text is Unicode or KrutiDev before using this converter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your Hindi text displays correctly on a mobile phone without any special font, it is Unicode and ready for this tool. If the same text shows as random English letters on another device, it is already in KrutiDev encoding and needs the reverse direction. Use the KrutiDev 10 to Unicode Converter for KrutiDev input.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this unicode to krutidev 10 converter on Android or iPhone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The tool runs in Chrome on Android and Safari on iPhone. No app installation is needed. All four actions, paste, convert, copy, and download— work with touch input on any modern mobile browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this tool handle matras and half-characters in the Unicode to KrutiDev 10 direction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. I-matra reordering, all 12 matras, and halant-based half-characters (ardha akshara) convert correctly. Accuracy on standard Unicode to KrutiDev 10 conversion is 99.7%. ZWJ-based conjunct characters (those using U+200D instead of the standard halant U+094D) may need a manual check after conversion.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between converting to KrutiDev 10 versus KrutiDev 010?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no technical difference in the output. KrutiDev 10 and KrutiDev 010 use the same encoding. This page targets users searching specifically for KrutiDev 10 or KrutiDev10 by name. Users who need KrutiDev 010 labelling for a government portal or court submission should use the Unicode to KrutiDev Converter, which defaults to 010 throughout.',
      },
    },
  ],
};

export const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert Unicode Hindi Text to KrutiDev 10',
  description:
    'Step-by-step guide to convert Unicode or Mangal Hindi text into KrutiDev 10 (Kurtidev10) encoding using the free online tool at unicodekruti.com.',
  totalTime: 'PT1M',
  tool: {
    '@type': 'HowToTool',
    name: 'Unicode to KrutiDev 10 Converter',
    url: 'https://unicodekruti.com/unicode-to-krutidev-10-converter',
  },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check that your text is Unicode',
      text: 'Confirm your Hindi text displays correctly on a mobile phone without any special font. If it does, it is Unicode and ready to convert. If it shows random English letters, it is already KrutiDev — use the reverse tool instead.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste your Unicode text into the input box',
      text: 'Copy Hindi text from Mangal in MS Word, Google Input Tools, InScript keyboard, or any modern Hindi website. Paste it into the left-hand input box on this page.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Confirm the version is set to KrutiDev 10',
      text: 'The version selector is pre-set to KrutiDev 10 on this page. No change is needed for standard Hindi conversion.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Copy the KrutiDev 10 output and use it',
      text: 'Copy the output from the right-hand box. Paste into your exam practice software, MS Word with KrutiDev 010 font active, or legacy DTP application. The conversion is complete.',
    },
  ],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Akshay Verma',
  jobTitle: 'Software Developer and Hindi Typing Expert',
  url: 'https://unicodekruti.com/about-us',
  sameAs: ['https://unicodekruti.com/about-us'],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'degree',
    educationalLevel: 'BSCS',
  },
};

export const u2k10JsonLdSchemas = [
  softwareApplicationSchema,
  breadcrumbSchema,
  webPageSchema,
  faqPageSchema,
  howToSchema,
  personSchema,
];
