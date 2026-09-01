import { SITE_URL } from '@/lib/site';
import { getCanonicalUrl } from '@/lib/seo/metadata';

/** Six standalone JSON-LD objects for /about-us (injected as a JSON array). */

export const aboutUsJsonLdSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. Jawwad Ahmad',
    honorificPrefix: 'Dr.',
    jobTitle: 'ENT Surgeon and Software Developer',
    affiliation: [
      {
        '@type': 'Organization',
        name: 'Allama Iqbal Medical College',
      },
      {
        '@type': 'Organization',
        name: 'Jinnah Hospital, Lahore',
      },
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: 'MBBS',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Allama Iqbal Medical College, Lahore',
      },
    },
    knowsAbout: [
      'KrutiDev font encoding',
      'Unicode Devanagari',
      'Hindi typography',
      'ENT surgery',
    ],
    sameAs: [
      'https://www.linkedin.com/in/jawwad-ahmad/',
      'https://www.instagram.com/docjawwad/',
    ],
    url: getCanonicalUrl('/about-us'),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Akshay Verma',
    jobTitle: 'Software Developer and Hindi Typing Expert',
    description:
      'Akshay Verma is a software developer specialising in Devanagari font encoding systems and Hindi typing workflows. He verified the KrutiDev to Unicode character mapping table used by UnicodeKruti.com against 40 CPCT official practice papers, 12 UP district court judgment records, and Rajbhasha Vibhag circulars. Accuracy: 99.9% on standard KrutiDev 010 documents.',
    knowsAbout: [
      'KrutiDev font encoding',
      'Unicode Devanagari',
      'Hindi typing examinations',
      'CPCT exam preparation',
      'Remington keyboard layout',
      'Devanagari character mapping',
      'Hindi DTP software',
      'Rajbhasha government workflows',
    ],
    url: getCanonicalUrl('/about-us'),
    worksFor: {
      '@type': 'Organization',
      name: 'UnicodeKruti',
      url: SITE_URL,
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'UnicodeKruti',
    alternateName: 'UnicodeKruti.com',
    url: SITE_URL,
    description:
      'UnicodeKruti provides free browser-based tools for KrutiDev to Unicode conversion, Unicode to KrutiDev conversion, font downloads, and Hindi typing resources for government exam candidates, Rajbhasha officials, court typists, and DTP professionals across India.',
    foundingDate: '2026',
    knowsAbout: [
      'KrutiDev font',
      'Unicode Devanagari',
      'Hindi typing',
      'CPCT exam',
      'Rajbhasha',
      'Devanagari encoding',
      'Indian government typing standards',
    ],
    sameAs: [
      'https://www.instagram.com/unikrutidev/',
      'https://www.youtube.com/channel/UCEUKUmIuXLloClmfwQfer4Q',
      'https://www.x.com/UnicodeKruti',
      'https://www.pinterest.com/ukrutidev/_pins/',
      'https://medium.com/@unikrutidev',
      'https://www.reddit.com/user/krutidev/',
      'https://www.quora.com/profile/Uni-Krutidev',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      url: getCanonicalUrl('/contact-us'),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About UnicodeKruti — Akshay Verma, Hindi Typing Expert',
    description:
      'UnicodeKruti is built and verified by Akshay Verma, a software developer and Hindi typing expert. Learn how conversion accuracy is tested and why this tool exists.',
    url: getCanonicalUrl('/about-us'),
    inLanguage: 'en-IN',
    datePublished: '2026-07-27',
    dateModified: '2026-07-27',
    author: {
      '@type': 'Person',
      name: 'Akshay Verma',
      jobTitle: 'Software Developer and Hindi Typing Expert',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['#tldr-block'],
    },
  },
  {
    '@context': 'https://schema.org',
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
        name: 'About Us',
        item: getCanonicalUrl('/about-us'),
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who built UnicodeKruti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UnicodeKruti was built by a software developer and verified by Akshay Verma, a Hindi typing expert. The character mapping table was cross-checked against 40 CPCT official practice papers from Madhya Pradesh, 12 UP district court judgment records, and Rajbhasha Vibhag circulars. Accuracy on standard KrutiDev 010 documents is 99.9%.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate is the KrutiDev to Unicode conversion on UnicodeKruti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The conversion accuracy is 99.9% on standard KrutiDev 010 documents. The mapping covers all 52 standard Hindi consonants, 12 matras, half-characters, conjuncts including ksha, tra, and gya, anusvara, anunasika, and visarga. It was verified against CPCT exam papers, UP district court records, and Rajbhasha Vibhag circulars.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is UnicodeKruti free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All tools on UnicodeKruti are free with no character limit, no signup, and no subscription. Conversion runs entirely in your browser. Your text is never sent to any server.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does UnicodeKruti store or share the text I convert?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. All conversion processing runs in your browser using JavaScript. Your text never reaches any server. This is a technical reality, not just a policy. Government files, court records, and personal documents stay entirely on your device throughout the conversion.',
        },
      },
    ],
  },
] as const;
