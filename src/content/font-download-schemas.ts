/** Exact JSON-LD schemas for /font-download */

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KrutiDev 010 Font',
  alternateName: ['Kruti Dev 010', 'KrutiDev Font', 'KRDEV010.TTF'],
  description:
    "KrutiDev 010 is India's most widely used legacy Hindi Devanagari font. A non-Unicode TrueType font used in government typing exams (CPCT, UPSSSC, Rajasthan Patwari), court records, and legacy DTP software. Free to download.",
  applicationCategory: 'Font',
  operatingSystem: 'Windows, macOS',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  fileFormat: 'font/ttf',
  downloadUrl: 'https://unicodekruti.com/fonts/KRDEV010.ttf',
  publisher: {
    '@type': 'Organization',
    name: 'UnicodeKruti',
    url: 'https://unicodekruti.com',
  },
  dateModified: '2026-07-27',
  inLanguage: 'hi',
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
      name: 'KrutiDev Font Download',
      item: 'https://unicodekruti.com/font-download',
    },
  ],
};

export const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'KrutiDev Font Download Free — All Versions (010, 055)',
  description:
    'Download KrutiDev font free. Get the original TTF file for Kruti Dev 010, 055, and other versions. Step-by-step install guide for Windows 10, Windows 11, and Mac.',
  url: 'https://unicodekruti.com/font-download',
  inLanguage: 'en-IN',
  datePublished: '2026-07-27',
  dateModified: '2026-07-27',
  author: {
    '@type': 'Person',
    name: 'Akshay Verma',
    jobTitle: 'Software Developer and Hindi Typing Expert',
    sameAs: 'https://unicodekruti.com/about-us',
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['#tldr-block'],
  },
};

export const howToWindowsSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Install KrutiDev Font on Windows 10 and Windows 11',
  description:
    'Step-by-step guide to download and install the KrutiDev 010 TTF font file on Windows 10 and Windows 11.',
  totalTime: 'PT3M',
  tool: {
    '@type': 'HowToTool',
    name: 'KrutiDev 010 TTF File',
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
      text: 'Right-click on KRDEV010.TTF. Click Install (for your account only) or Install for all users (if you are on a shared or exam-prep computer). The font installs in under 3 seconds. No progress bar appears in most cases.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Handle the Windows SmartScreen warning if it appears',
      text: 'If a blue Windows protected your PC dialog appears, click More info. Verify the file name shown matches KRDEV010.TTF. Then click Run anyway. This warning appears because the font installer is not a signed Microsoft application, not because the file is unsafe.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Verify the installation',
      text: 'Open MS Word or Notepad. Click the font name box. Type Kruti Dev 010. If it appears in the list, installation is complete. You are ready to type in Hindi using the KrutiDev keyboard layout.',
    },
  ],
};

export const howToMacSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Install KrutiDev Font on Mac',
  description:
    'Step-by-step guide to install the KrutiDev 010 TTF font on macOS using Font Book.',
  totalTime: 'PT2M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Download the TTF file',
      text: 'Click the Download KrutiDev 010 button on this page. Save KRDEV010.TTF to your Downloads folder.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Open Font Book',
      text: 'Press Command + Space to open Spotlight. Type Font Book and press Enter.',
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
};

export const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Where can I download the KrutiDev 010 font for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can download the KrutiDev 010 TTF file directly from this page using the Download KrutiDev 010 button above. The file is the original KRDEV010.TTF and is free for personal use.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install KrutiDev font on Windows 10 and Windows 11?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Download the TTF file. Open your Downloads folder. Right-click on KRDEV010.TTF. Click Install or Install for all users. Open MS Word and type Kruti Dev 010 in the font search box to confirm it is installed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does KrutiDev font not show in MS Word after installing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Close MS Word completely before installing the font. Reopen Word after installation. Click the font name box and type Kruti Dev 010. If it still does not appear, restart your computer and check again. On Windows 11, use Install for all users, not just Install, to ensure the font appears in all applications.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does KrutiDev font not work on Android or iPhone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Android and iOS do not allow custom font installation in the system font library. KrutiDev requires the font to be active on the device to display Hindi correctly. On mobile, the text shows as random English letters. The solution is to convert your KrutiDev text to Unicode before sharing or viewing on a phone.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between KrutiDev 010 and KrutiDev 055?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KrutiDev 010 is the Hindi standard used in government typing exams across North and Central India, including CPCT, UPSSSC, and Rajasthan Patwari. KrutiDev 055 is the Marathi variant used in Maharashtra government offices and MPSC-related workflows. The keyboard layouts differ for Marathi-specific characters.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I add KrutiDev font to MS Word after downloading?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Install the TTF file on your system first by right-clicking it and selecting Install. Then open MS Word. Click the font name box in the Home ribbon. Type Kruti Dev 010. It appears in the dropdown. Select it and start typing using the KrutiDev Remington keyboard layout.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does KrutiDev font work on WPS Office on Android?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, with a manual step. Download the KRDEV010.TTF file. Use a file manager to copy it to the Fonts folder inside your Android device\'s internal storage. Open WPS Office, create a document, and select Kruti Dev 010 from the font list. This does not work in other Android apps — only WPS Office supports manual font installation this way.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is KrutiDev font free to download and use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KrutiDev 010 is free for personal and educational use. Government offices and exam preparation use it freely across India. For commercial publishing projects, check the font license from the original distributor.',
      },
    },
  ],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Akshay Verma',
  jobTitle: 'Software Developer and Hindi Typing Expert',
  knowsAbout: [
    'KrutiDev font',
    'Hindi typing',
    'Devanagari encoding',
    'CPCT exam preparation',
  ],
  sameAs: 'https://unicodekruti.com/about-us',
};

export const fontDownloadJsonLdSchemas = [
  softwareApplicationSchema,
  breadcrumbSchema,
  webPageSchema,
  howToWindowsSchema,
  howToMacSchema,
  faqPageSchema,
  personSchema,
];
