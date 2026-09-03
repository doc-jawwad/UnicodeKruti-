/**
 * JSON-LD for /updesh-converter — SoftwareApplication + HowTo + FAQPage.
 * Injected via <JsonLd /> (same pattern as font-download / u2k10).
 */
export const updeshJsonLdSchemas = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Updesh Font Converter',
      alternateName: ['Updes Converter', 'Updesh Unicode Converter'],
      url: 'https://unicodekruti.com/updesh-converter/',
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
      step: [
        {
          '@type': 'HowToStep',
          name: 'Paste Your Text',
          text: 'Copy Hindi text from any Unicode source and paste it into the input box.',
        },
        {
          '@type': 'HowToStep',
          name: 'Conversion Happens Instantly',
          text: 'The tool converts text in real time. No button click needed.',
        },
        {
          '@type': 'HowToStep',
          name: 'Copy and Use the Output',
          text: 'Copy the Updesh or KrutiDev 010 output and paste into MS Word, a government portal, or DTP software.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Updesh font converter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Updesh font converter is a free online tool that converts Hindi text between Updesh encoding and Unicode. It works in both directions and runs in your browser with no signup required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Updes the same as Updesh?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Updes is the abbreviated form used in the UPDES government portal name. The font is named Updesh. Both refer to the same ASCII-based Hindi font encoding used across Uttar Pradesh government offices.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Updesh the same as KrutiDev 010?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Updesh and KrutiDev 010 use the same Remington keyboard ASCII character mapping. Output from this converter works in any software that accepts KrutiDev 010, including UPSSSC exam software.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which UP government exams accept Updesh or KrutiDev output?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'UPSSSC Junior Assistant and Junior Clerk typing tests allow KrutiDev 010. UPPSC RO/ARO tests also accept KrutiDev 010. The qualifying speed is 25 words per minute for Hindi.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does this Updesh converter work on mobile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. It works in Chrome, Safari, Firefox, and Edge on Android and iPhone. No app download needed.',
          },
        },
      ],
    },
  ],
} as const;
