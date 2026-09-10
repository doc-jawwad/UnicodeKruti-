export const nirmalaUiMeta = {
  title: 'Nirmala UI to KrutiDev Converter — Windows Hindi → 010',
  description:
    'Convert Nirmala UI Hindi to KrutiDev 010 in your browser. Same mapping for Mangal and Kokila. Free, no signup, 99.9% accuracy on standard Devanagari.',
  path: '/nirmala-ui-to-krutidev-converter',
  datePublished: '2026-09-10',
  dateModified: '2026-09-10',
};

/** Longer SoftwareApplication description for JSON-LD. */
export const nirmalaUiAppDescription =
  'Free browser-based tool that converts Nirmala UI Unicode Hindi — and any other Unicode Devanagari font such as Mangal or Kokila — into KrutiDev 010 legacy encoding. Built for Windows typists, CPCT candidates, and government DTP workflows.';

export const nirmalaUiWebPageDescription =
  'Convert Nirmala UI Hindi text to KrutiDev 010 online. Works for Kokila, Mangal, and every Unicode Devanagari font. Free, browser-only, no signup.';

export const nirmalaUiHowToDescription =
  'Convert Nirmala UI Hindi to KrutiDev in three steps: copy Unicode text, paste into the converter above, then copy KrutiDev output and apply KrutiDev 010 in MS Word. Total time under 10 seconds.';

export const nirmalaUiAlternateNames = [
  'Nirmala to KrutiDev Converter',
  'Convert Nirmala UI to Kruti Dev 010',
  'Windows Nirmala UI to KrutiDev',
] as const;

export const nirmalaUiToc = [
  { id: 'about-the-tool', label: 'About this tool' },
  { id: 'what-is-nirmala', label: 'What Is Nirmala UI and Why Do You Need to Convert It?' },
  { id: 'how-to-use', label: 'How to Convert Nirmala UI to KrutiDev in 3 Steps' },
  { id: 'source-fonts', label: 'Does It Matter Whether Your Text Is Nirmala UI, Mangal, or Kokila?' },
  { id: 'who-uses', label: 'Who Uses This Tool?' },
  { id: 'common-errors', label: 'Common Conversion Errors and Fixes' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'faq-hindi', label: 'अक्सर पूछे जाने वाले सवाल' },
  { id: 'key-facts', label: 'Key Facts' },
  { id: 'related-resources', label: 'Related Tools and Resources' },
  { id: 'references', label: 'References' },
];

/** HowTo steps — must match visible #how-to-use in NirmalaUiPageBody.tsx */
export const nirmalaUiHowToSteps = [
  {
    name: 'Copy your Nirmala UI text',
    text: 'Copy Hindi text from any modern source. A government portal, WhatsApp, Google Docs, MS Word, an Excel cell. If your text shows correctly on a phone without installing a special font, it is Unicode and this tool will handle it.',
  },
  {
    name: 'Paste into the converter above',
    text: 'Paste your text into the input box. The conversion runs live in your browser. No button click is needed for short text. For longer documents, click Convert.',
  },
  {
    name: 'Copy the KrutiDev output',
    text: 'Copy the output from the right box. Paste into MS Word. Select the pasted text and apply KrutiDev 010 from the font list. Your Hindi will display correctly. Missing the font? Download KrutiDev 010 from the font download page on unicodekruti.com.',
  },
];

export const nirmalaUiFaqs = [
  {
    question: 'Is Nirmala UI a Unicode font?',
    answer:
      'Yes. Nirmala UI is a Unicode Devanagari font created by Tiro Typeworks and commissioned by Microsoft. It uses the Devanagari Unicode block (U+0900 to U+097F). All Hindi text in Nirmala UI is Unicode text. (Source: Microsoft Typography documentation)',
  },
  {
    question: 'How do I convert Nirmala UI to KrutiDev 010?',
    answer:
      'Paste your text into the box above. Copy the output. Paste into MS Word and apply KrutiDev 010 font. Done in under 10 seconds.',
  },
  {
    question:
      'Is converting Nirmala UI to KrutiDev the same as converting Mangal to KrutiDev?',
    answer:
      'Yes. Both fonts use the same Devanagari code points. The output is identical. You do not need a separate Mangal to KrutiDev tool.',
  },
  {
    question: 'Can I convert Kokila or Arial Unicode to KrutiDev here?',
    answer:
      'Yes. Kokila, Arial Unicode MS, Aparajita, and Gargi are all Unicode Devanagari fonts. Paste text from any of them and the KrutiDev 010 output is identical.',
  },
  {
    question: 'Does this work for CPCT and UPSSSC preparation?',
    answer:
      'Yes. The KrutiDev 010 output matches what CPCT (MP government) and UPSSSC (UP government) exam software expects. Convert your practice material here, apply the font in Word, and your text is exam-ready.',
  },
  {
    question: 'Does this converter work on mobile?',
    answer:
      'Yes. It runs in Chrome, Safari, and Firefox on Android and iPhone. No app download needed.',
  },
  {
    question: "Why can't I just change the font to KrutiDev in MS Word?",
    answer:
      'Changing the font name in Word only changes how characters look on screen. It does not re-encode the text. Nirmala UI text uses Unicode code points. KrutiDev expects ASCII-mapped positions. Applying KrutiDev font directly to Unicode text produces random English symbols. This converter re-encodes the data correctly before you apply the font.',
  },
  {
    question: 'Does this work for Nirmala UI to KrutiDev 10?',
    answer:
      'Yes. KrutiDev 10 and KrutiDev 010 share the same character mapping. Output from this tool works for both versions.',
  },
];

/** Hindi FAQ section — separate FAQPage schema with inLanguage hi-IN. */
export const nirmalaUiFaqsHindi = [
  {
    question: 'निर्मला UI क्या है?',
    answer:
      'निर्मला UI माइक्रोसॉफ्ट का आधिकारिक यूनिकोड हिंदी फॉन्ट है। विंडोज 10 और 11 में यही डिफॉल्ट फॉन्ट है।',
  },
  {
    question: 'क्या निर्मला UI यूनिकोड है?',
    answer:
      'हाँ। निर्मला UI पूरी तरह यूनिकोड फॉन्ट है। इसमें हिंदी अक्षर U+0900 से U+097F कोड पॉइंट्स पर स्टोर होते हैं — बिल्कुल मंगल और कोकिला की तरह।',
  },
  {
    question: 'निर्मला UI को कृतिदेव में कैसे बदलें?',
    answer:
      'ऊपर दिए गए बॉक्स में टेक्स्ट पेस्ट करें, Convert करें, आउटपुट कॉपी करें। MS Word में पेस्ट करके KrutiDev 010 फॉन्ट लगाएं।',
  },
  {
    question: 'क्या यह टूल CPCT और UPSSSC के लिए काम करता है?',
    answer:
      'हाँ। यह कन्वर्टर CPCT और UPSSSC परीक्षाओं के लिए सही KrutiDev 010 आउटपुट देता है।',
  },
  {
    question: 'क्या मोबाइल पर काम करता है?',
    answer:
      'हाँ। किसी भी मोबाइल ब्राउज़र में काम करता है। कोई ऐप या इंस्टॉलेशन नहीं चाहिए।',
  },
];
