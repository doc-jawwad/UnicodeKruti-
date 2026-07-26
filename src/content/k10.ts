export const k10Meta = {
  title: 'KrutiDev 10 (Kurtidev10) to Unicode Converter — Free Online Tool',
  description:
    'Paste KrutiDev 10 / Kurtidev10 text and get clean Unicode Devanagari instantly. Built for Kurtidev10 naming searches. Same mapping as KrutiDev 010. Browser-only.',
  path: '/krutidev-10-to-unicode-converter',
};

export const k10Toc = [
  { id: 'toolbar-icons', label: 'How to Use the Converter Toolbar Icons' },
  { id: 'what-is-converter', label: 'What Is a KrutiDev 10 to Unicode Converter?' },
  { id: 'how-to-use', label: 'How to Convert KrutiDev 10 to Unicode — Step by Step' },
  { id: 'why-english', label: 'Why Your KrutiDev 10 Text Looks Like English Letters' },
  { id: 'spellings', label: 'Why So Many Spellings? Kurtidev10, Kruti Dev 10, K10' },
  { id: 'what-conversion-does', label: 'What KrutiDev 10 to Unicode Conversion Actually Does' },
  { id: 'to-mangal', label: 'KrutiDev 10 to Mangal — Same Output' },
  { id: 'who-needs', label: 'Who Needs a KrutiDev 10 to Unicode Converter?' },
  { id: 'privacy', label: 'Privacy and Security — What Happens to Your Text' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'key-takeaways', label: 'Key Takeaways' },
  { id: 'faq-hindi', label: 'अक्सर पूछे जाने वाले सवाल (हिंदी में)' },
  { id: 'related', label: 'Related Tools and Resources' },
];

export const k10HowToSteps = [
  {
    name: 'Open this page on any device',
    text: 'This tool runs in your browser. No KrutiDev 10 font needs to be installed. Works on Windows, Mac, Android, and iPhone.',
  },
  {
    name: 'Paste your KrutiDev 10 text',
    text: 'Paste Kurtidev10 text into the left input box. The tool accepts both visual Hindi and raw ASCII output.',
  },
  {
    name: 'Get real-time Unicode output',
    text: 'Conversion runs character by character as you paste. No button click needed. The Unicode Devanagari output appears immediately.',
  },
  {
    name: 'Check the output and copy',
    text: 'Check a few lines, then copy the Unicode text into Gmail, WhatsApp, a government portal, Google Docs, or MS Word.',
  },
];

export const k10Faqs = [
  {
    question: 'Is KrutiDev 10 the same as KrutiDev 010?',
    answer:
      'Yes. KrutiDev 10 and KrutiDev 010 are the same font and the same encoding. Both names point to the identical TrueType font file with the identical ASCII-to-Devanagari character table.',
  },
  {
    question: 'Why does my KrutiDev 10 text show random English letters when I paste it without the font?',
    answer:
      'KrutiDev 10 stores Devanagari characters as ASCII values. Without the font installed, those ASCII characters display as English letters. Converting to Unicode replaces each ASCII position with an actual Devanagari code point.',
  },
  {
    question: 'Does this converter handle matras, half-characters, and conjuncts correctly?',
    answer:
      'Yes. The converter maps all standard KrutiDev 10 characters including vowel matras, the halant sign, and common conjuncts. The matra reordering step runs during conversion.',
  },
  {
    question: 'Can I convert KrutiDev 10 text on my phone without any app?',
    answer:
      'Yes. Open this page in Chrome or Safari on Android or iPhone. Paste your text. The Unicode output appears instantly. No app download needed.',
  },
  {
    question: 'कृतिदेव 10 (Kurtidev10) को यूनिकोड में कैसे बदलें?',
    answer:
      'ऊपर दिए गए इनपुट बॉक्स में अपना कृतिदेव 10 टेक्स्ट पेस्ट करें। यूनिकोड आउटपुट तुरंत दाईं तरफ दिखाई देगा। किसी बटन की जरूरत नहीं।',
  },
];

/** Hindi FAQ section — also merged into FAQPage schema. */
export const k10FaqsHindi = [
  {
    question: 'क्या Kurtidev10 और कृतिदेव 010 एक ही फॉन्ट है?',
    answer: 'हाँ। दोनों एक ही TrueType फॉन्ट फ़ाइल के अलग-अलग नाम हैं।',
  },
  {
    question: 'क्या यह टूल मोबाइल पर काम करता है?',
    answer: 'हाँ। Android में Chrome और iPhone में Safari पर सीधे उपयोग करें।',
  },
];

export const k10AllFaqs = [...k10Faqs, ...k10FaqsHindi];

export const k10NameRows = [
  ['KrutiDev 10', 'Common product label'],
  ['Kurtidev10', 'Frequent search spelling'],
  ['Kruti Dev 10', 'Spaced marketing form'],
  ['K10', 'Shorthand'],
  ['KrutiDev 010', 'Government / CPCT standard label — same mapping'],
] as const;
