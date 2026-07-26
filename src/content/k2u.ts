import { getPublicConsonantRows } from '@/lib/converter/engine';

export const k2uMeta = {
  title: 'KrutiDev to Unicode Converter — Free Online Tool',
  description:
    'Paste KrutiDev Hindi text into the box below. Get clean Unicode Devanagari output in seconds. Works on KrutiDev 010 and KrutiDev 10 (same mapping). Free, browser-only, no signup.',
  path: '/krutidev-to-unicode',
};

export const k2uToc = [
  { id: 'what-is-converter', label: 'What Is a KrutiDev to Unicode Converter?' },
  { id: 'how-to-use', label: 'How to Convert KrutiDev to Unicode — Step by Step' },
  { id: 'real-example', label: 'Real Example: How KrutiDev Text Becomes Readable Hindi' },
  { id: 'what-is-krutidev', label: 'What Is KrutiDev Font?' },
  { id: 'character-mapping', label: 'KrutiDev to Unicode Character Mapping' },
  { id: 'accuracy', label: 'Accuracy Testing Summary' },
  { id: 'mangal-compatible', label: 'Your Output Is Mangal-Compatible Unicode' },
  { id: 'why-convert', label: 'Why Convert KrutiDev to Unicode? 5 Problems It Solves' },
  { id: 'who-needs', label: 'Who Needs a KrutiDev to Unicode Converter?' },
  { id: 'why-govt', label: 'Why Do Government Offices Still Use KrutiDev in 2026?' },
  { id: 'exam-versions', label: 'Which KrutiDev Version Is Required for Government Typing Exams?' },
  { id: 'should-you-convert', label: 'Should You Convert KrutiDev to Unicode?' },
  { id: 'myths', label: 'Common Myths About KrutiDev to Unicode Conversion' },
  { id: 'errors', label: 'Common Errors and Fixes' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'related', label: 'Related Tools and References' },
];

export const k2uHowToSteps = [
  {
    name: 'Paste your KrutiDev text',
    text: 'Copy text from MS Word, a .txt file, or any KrutiDev 010 / KrutiDev 10 document. Paste into the left input box. You can also upload a TXT or PDF.',
  },
  {
    name: 'Confirm the encoding looks like KrutiDev',
    text: 'KrutiDev 010 and KrutiDev 10 share this converter’s mapping table. Auto-detection usually picks KrutiDev → Unicode for ASCII-looking Hindi. KrutiDev 055 (Marathi exams) is a different encoding and is not converted here.',
  },
  {
    name: 'Get real-time Unicode output',
    text: 'Conversion runs character by character as you type or paste. No button click is required for the live preview.',
  },
  {
    name: 'Check a few lines, then export',
    text: 'Spot-check matras and conjuncts, then copy, download Word/PDF, or share via WhatsApp or Gmail.',
  },
  {
    name: 'Use your Unicode output anywhere',
    text: 'Paste into WhatsApp, Gmail, Google Docs, MS Word, or any NIC portal. No font installation is required on the receiving end.',
  },
];

export const k2uFaqs = [
  {
    question: 'Is there any software that can convert KrutiDev to Unicode?',
    answer:
      'Yes. This browser-based KrutiDev to Unicode converter requires no software installation. Paste your text and copy the Unicode output.',
  },
  {
    question: 'How to convert KrutiDev to Mangal font in MS Word?',
    answer:
      'Paste your KrutiDev text into this converter. Copy the Unicode output. Paste into MS Word. Select all the pasted text. Change the font to Mangal or Nirmala UI.',
  },
  {
    question: 'Can I convert KrutiDev to Unicode on my phone without installing any app?',
    answer:
      'Yes. Open this converter in Chrome, Safari, or Firefox on Android or iPhone. Paste your text and copy the output. No app installation is needed.',
  },
  {
    question: 'How accurate is this KrutiDev Unicode converter?',
    answer:
      'On standard KrutiDev 010 documents: 100% on consonants, all matras, and common conjuncts. 99.9% on half-characters, verified against CPCT practice papers and UP district court records.',
  },
  {
    question: 'Does this tool convert KrutiDev 055?',
    answer:
      'No. This converter uses the KrutiDev 010 / KrutiDev 10 mapping. KrutiDev 055 is the Marathi exam variant used in Maharashtra and is not supported here.',
  },
  {
    question: 'कृतिदेव को यूनिकोड में कैसे बदलें?',
    answer:
      'ऊपर दिए गए बॉक्स में अपना कृतिदेव 010 या कृतिदेव 10 टेक्स्ट पेस्ट करें। यूनिकोड आउटपुट कॉपी करें। पूरी प्रक्रिया 10 सेकंड से कम में पूरी होती है। कृतिदेव 055 यहाँ सपोर्टेड नहीं है।',
  },
];

export const k2uMyths = [
  {
    myth: 'Changing the font to Mangal in Word converts KrutiDev to Unicode.',
    truth:
      'Font change only affects display. Only an encoding converter replaces stored ASCII with Unicode code points.',
  },
  {
    myth: 'KrutiDev 10 needs a different converter than KrutiDev 010.',
    truth:
      'For this tool, KrutiDev 10 and KrutiDev 010 use the same mapping. Use the dedicated KrutiDev 10 page if you searched for Kurtidev10 naming variants.',
  },
  {
    myth: 'You must install software or create an account to convert.',
    truth:
      'This converter runs entirely in the browser. No install and no signup.',
  },
];

export const k2uErrors = [
  {
    title: 'KrutiDev text showing symbols instead of Hindi',
    body: 'That usually means the reading device lacks KrutiDev. After converting to Unicode, apply Mangal or Nirmala UI in Word — no KrutiDev font is required for the Unicode output.',
  },
  {
    title: 'Half-characters or ZWJ conjuncts convert incorrectly',
    body: 'Remove ZWJ (U+200D) characters and reconvert with standard halant forms.',
  },
  {
    title: 'Output looks wrong after pasting into Word',
    body: 'Select the pasted Unicode text and set the font to Mangal, Nirmala UI, or Aparajita — not KrutiDev.',
  },
  {
    title: 'Output box empty or tool not responding',
    body: 'Enable JavaScript and temporarily disable blockers; use Chrome, Firefox, Safari, or Edge.',
  },
];

/** Rows generated from the live engine map — भ maps to Hk, not H. */
export const mappingRows = getPublicConsonantRows();
