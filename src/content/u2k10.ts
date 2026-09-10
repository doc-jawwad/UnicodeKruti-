export const u2k10Meta = {
  title: 'Unicode to KrutiDev 10 — CPCT & DTP | UnicodeKruti',
  description:
    'Convert Mangal or Nirmala UI text to KrutiDev 10 format. Free online tool for CPCT practice and DTP. No install, no signup, real-time output.',
  path: '/unicode-to-krutidev-10-converter',
  datePublished: '2026-07-27',
  dateModified: '2026-07-27',
};

/** Longer SoftwareApplication description for JSON-LD. */
export const u2k10AppDescription =
  'Free browser-based tool that converts Unicode Devanagari Hindi text — from Mangal, Nirmala UI, Google Input Tools, or InScript — into KrutiDev 10 (Kurtidev10) legacy font encoding. Designed for exam candidates, coaching institutes, and DTP professionals.';

export const u2k10WebPageDescription =
  'Convert Unicode Hindi text to KrutiDev 10 (Kurtidev10) format online. Works for Mangal, Google Input Tools, and InScript output. Free, browser-only, no signup.';

export const u2k10HowToDescription =
  'Step-by-step guide to convert Unicode or Mangal Hindi text into KrutiDev 10 (Kurtidev10) encoding using the free online tool at unicodekruti.com.';

export const u2k10AlternateNames = [
  'Unicode to Kurtidev10 Converter',
  'Convert Unicode to Kruti Dev 10',
] as const;

export const u2k10Toc = [
  { id: 'about-the-tool', label: 'About this tool' },
  { id: 'how-to-use', label: 'How to Convert Unicode Hindi to KrutiDev 10 — Step by Step' },
  { id: 'what-it-does', label: 'What Does This Unicode to KrutiDev 10 Converter Do?' },
  { id: 'who-uses', label: 'Who Uses a Unicode to KrutiDev 10 Converter?' },
  { id: 'exam-workflow', label: 'The Exam Preparation Workflow — From Mangal to KrutiDev 10' },
  { id: 'vs-010', label: 'KrutiDev 10 and KrutiDev 010 — Are They the Same?' },
  { id: 'unicode-sources', label: 'Which Unicode Sources Work as Input?' },
  { id: 'key-takeaways', label: 'Key Takeaways' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'faq-hindi', label: 'हिंदी में प्रश्न' },
  { id: 'related-resources', label: 'Related Tools and Resources' },
  { id: 'references', label: 'References' },
];

/** HowTo steps — must match visible #how-to-use in U2K10PageBody.tsx */
export const u2k10HowToSteps = [
  {
    name: 'Check that your text is Unicode',
    text: 'If your Hindi displays correctly on a mobile phone without any special font installed, it is Unicode and ready for this tool. If it shows as random English letters on another device, it is already in KrutiDev encoding. For that situation, use the Kurtidev10 to Unicode tool instead.',
  },
  {
    name: 'Paste your Unicode text into the input box',
    text: 'Copy text from MS Word (Mangal font), Google Input Tools, the InScript keyboard, a Hindi website, or a WhatsApp message. Paste it into the left-hand input box. The tool accepts any Unicode Devanagari input regardless of which font was used.',
  },
  {
    name: 'Confirm the version selector shows KrutiDev 10',
    text: 'The version is pre-set on this page. No change is needed for standard Hindi. If your specific use case requires KrutiDev 010 by name, the Unicode to KrutiDev 010 converter handles that with the same output.',
  },
  {
    name: 'Copy and use the KrutiDev 10 output',
    text: 'Paste the output into your exam practice software with a KrutiDev font active, into MS Word with Kruti Dev 010 applied, or into a legacy DTP application like PageMaker. For printing, the output works with any KrutiDev 010 or KrutiDev 10 font file; both use the same glyph set.',
  },
];

export const u2k10Faqs = [
  {
    question:
      'How do I convert Unicode Mangal text to KrutiDev 10 format for exam submission?',
    answer:
      'Paste your Unicode or Mangal Hindi text into the input box on this page. The tool converts it to KrutiDev 10 encoding in real time. Copy the output and paste it into your exam practice software, coaching evaluation form, or legacy printing application. The process takes under 10 seconds.',
  },
  {
    question: 'Is KrutiDev 10 the same as KrutiDev 010 for exam purposes?',
    answer:
      'Yes. KrutiDev 10 and KrutiDev 010 share the same character-to-ASCII mapping. Exam boards specify 010 by name, but the KrutiDev 10 output from this converter is interchangeable. The naming difference is a font-file labelling convention from the 1990s, not a technical difference.',
  },
  {
    question:
      'Can I type in Unicode Mangal and then convert to KrutiDev 10 for printing or DTP?',
    answer:
      'Yes. Paste your Mangal or Google Input Tools output into this converter. Copy the KrutiDev 10 output. Paste into PageMaker, CorelDRAW, or MS Word with the KrutiDev 010 font active. The text displays as correct Devanagari Hindi immediately. Coaching institutes use this path so students type in Unicode first, then match the exact KrutiDev 10 encoding required by printers.',
  },
  {
    question: 'Which Unicode fonts can be converted to KrutiDev 10 without errors?',
    answer:
      'Mangal, Nirmala UI, Aparajita, Kokila, Hind, and Noto Sans Devanagari all convert to KrutiDev 10 correctly because they use standard Unicode Devanagari code points (U+0900 to U+097F). Non-Unicode legacy fonts like Devlys, Chanakya, or Shree-Lipi do not work as input for this tool.',
  },
  {
    question: 'How do I know if my text is Unicode or KrutiDev before converting?',
    answer:
      'If your Hindi text reads correctly on a mobile phone without any special font installed, it is Unicode. If it shows as random English letters on another device, it is already in KrutiDev encoding. For KrutiDev text that needs to become Unicode, use the Kurtidev10 to Unicode tool at unicodekruti.com/krutidev-10-to-unicode-converter.',
  },
  {
    question: 'Can I use this Unicode to KrutiDev 10 converter on Android or iPhone?',
    answer:
      'Yes. This converter is fully responsive and works in Chrome on Android and Safari on iPhone. No app installation is needed. Paste, convert, and copy all work with touch input on any modern mobile browser. Candidates can prepare KrutiDev 10 practice sheets from phone notes and paste them into desktop exam software later.',
  },
  {
    question:
      'Does this converter handle matras and half-characters in the Unicode to KrutiDev 10 direction?',
    answer:
      'Yes. I-matra reordering, all 12 matras, and halant-based half-characters convert correctly in the Unicode to KrutiDev 10 direction. Conversion accuracy on standard Devanagari is 99.7%. ZWJ-based conjunct characters may need a manual check after conversion. For CPCT-style passages, review a few lines in Word with Kruti Dev 010 applied before printing practice sheets.',
  },
  {
    question:
      'What is the difference between Unicode to KrutiDev 10 and Unicode to KrutiDev 010 conversion?',
    answer:
      'The output is identical. KrutiDev 10 and KrutiDev 010 share the same character mapping. This page defaults to KrutiDev 10 labelling. Users who need KrutiDev 010 specifically for a government portal or court document should use the Mangal to KrutiDev 010 converter at unicodekruti.com.',
  },
];

/** Hindi FAQ section — separate FAQPage schema with inLanguage hi-IN. */
export const u2k10FaqsHindi = [
  {
    question: 'यूनिकोड से कृतिदेव 10 में कैसे बदलें?',
    answer:
      'ऊपर दिए गए बॉक्स में अपना यूनिकोड या मंगल फॉन्ट का हिंदी टेक्स्ट पेस्ट करें। टूल उसे तुरंत कृतिदेव 10 फॉर्मेट में बदल देगा। आउटपुट कॉपी करें और जहां जरूरत हो, वहां पेस्ट करें। पूरी प्रक्रिया 10 सेकंड से कम में पूरी होती है।',
  },
  {
    question: 'क्या मंगल फॉन्ट का टेक्स्ट कृतिदेव 10 में बदला जा सकता है?',
    answer:
      'हां। मंगल एक यूनिकोड फॉन्ट है। इसका टेक्स्ट इस टूल में पेस्ट करने पर सटीक कृतिदेव 10 का आउटपुट मिलता है। गूगल इनपुट टूल्स, इनस्क्रिप्ट, या किसी भी आधुनिक हिंदी स्रोत से टेक्स्ट यहां कन्वर्ट किया जा सकता है।',
  },
  {
    question: 'क्या यह कन्वर्टर CPCT परीक्षा की तैयारी के लिए उपयोगी है?',
    answer:
      'हां। जो उम्मीदवार मंगल या गूगल इनपुट टूल्स में टाइप करते हैं, वे इस टूल से अपना टेक्स्ट कृतिदेव 10 में बदलकर कोचिंग मूल्यांकन सॉफ्टवेयर में सटीकता जांच सकते हैं।',
  },
];
