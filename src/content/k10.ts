export const k10Meta = {
  title: 'KrutiDev 10 to Unicode — Kurtidev10, Instant | UnicodeKruti',
  description:
    'Convert KrutiDev 10 (kurtidev10) encoded Hindi to Unicode Devanagari. Works for WhatsApp, Google Docs, and NIC portals. Free, browser-only.',
  path: '/krutidev-10-to-unicode-converter',
  datePublished: '2026-01-15',
  dateModified: '2026-07-27',
};

export const k10Toc = [
  { id: 'about-the-tool', label: 'About this tool' },
  { id: 'toolbar-icons', label: 'How to Use the Converter Toolbar Icons' },
  { id: 'what-is-converter', label: 'What Is a KrutiDev 10 to Unicode Converter?' },
  { id: 'how-to-use', label: 'How to Convert KrutiDev 10 to Unicode — Step by Step' },
  { id: 'why-english', label: 'Why Your KrutiDev 10 Text Looks Like English Letters' },
  { id: 'spellings', label: 'Why So Many Spellings? Kurtidev10, Kruti Dev 10, K10' },
  { id: 'what-conversion-does', label: 'What KrutiDev 10 to Unicode Conversion Actually Does' },
  { id: 'to-mangal', label: 'KrutiDev 10 to Mangal — Same Output' },
  { id: 'who-needs', label: 'Who Needs a KrutiDev 10 to Unicode Converter?' },
  { id: 'privacy', label: 'Privacy and Security — What Happens to Your Text' },
  { id: 'key-takeaways', label: 'Key Takeaways' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'faq-hindi', label: 'अक्सर पूछे जाने वाले सवाल (हिंदी में)' },
  { id: 'references', label: 'References' },
  { id: 'related', label: 'Related Tools and Resources' },
];

export const k10HowToSteps = [
  {
    name: "Open this page on any device",
    text: "This tool runs in your browser. No KrutiDev 10 font needs to be installed. No app to download. It works on Windows, Mac, Android, and iPhone through Chrome, Safari, Firefox, or any modern browser.",
  },
  {
    name: "Paste your KrutiDev 10 text",
    text: "Paste your Kurtidev10 text into the left input box. The tool accepts both visual Hindi and raw ASCII output. Raw ASCII is the random-looking English letters you see on devices without the font. Both convert correctly. You can also upload a file directly using the toolbar.",
  },
  {
    name: "Get real-time Unicode output",
    text: "Conversion runs character by character as you paste. No button click needed. The Unicode Devanagari output appears immediately in the right box. The live word counter updates at the same time. This is useful for CPCT and state exam candidates tracking word count targets.",
  },
  {
    name: "Check the output and copy",
    text: "Check a few lines to confirm the output looks correct. If any character looks wrong, the source document may use a different KrutiDev version. Copy the Unicode text. Paste it into Gmail, WhatsApp, a government portal, Google Docs, or MS Word. No font installation is needed on the receiving end.",
  },
];

export const k10Faqs = [
  {
    question: 'Is KrutiDev 10 the same as KrutiDev 010?',
    answer:
      'Yes. KrutiDev 10 and KrutiDev 010 are the same font and the same encoding. Both names point to the identical TrueType font file with the identical ASCII-to-Devanagari character table. The difference is only in how different Indian font distributors numbered the release in the 1990s. This converter uses one character mapping that handles both correctly.',
  },
  {
    question:
      'Why does my KrutiDev 10 text show random English letters when I paste it without the font?',
    answer:
      'KrutiDev 10 stores Devanagari characters as ASCII values. The letter क is stored as the ASCII character k. The letter ग is stored as x. Without the KrutiDev 10 font installed and applied, those ASCII characters display as their original English equivalents. This is not file corruption. It is how the encoding works. Converting to Unicode replaces each ASCII position with an actual Devanagari code point, so the text displays as Hindi on any device without the font.',
  },
  {
    question: 'Does this converter handle matras, half-characters, and conjuncts correctly?',
    answer:
      'Yes. The converter maps all standard KrutiDev 10 characters including all vowel matras, the halant sign for half-consonants, and common conjuncts used in everyday Hindi writing: क्ष , त्र , ज्ञ , and श्र . The matra reordering step runs during conversion since KrutiDev 10 places the short-i matra before the consonant while Unicode requires it after. Validated accuracy for standard government document text is above 99%.',
  },
  {
    question: 'Which version does the CPCT exam require — KrutiDev 10 or KrutiDev 010?',
    answer:
      'The CPCT exam run by MAP_IT (Madhya Pradesh Agency for Promotion of IT) refers to KrutiDev 010 in its official notifications. Since KrutiDev 10 and KrutiDev 010 are the same font and encoding, candidates who practise with files labelled KrutiDev 10 are using the correct font.',
  },
  {
    question: 'How do I convert a KrutiDev 10 Word document to Unicode?',
    answer:
      'Open the Word file and select all text with Ctrl+A. Copy with Ctrl+C. Paste into the input box on this page. The Unicode output appears immediately. Copy the output, open a new Word document, and paste with Ctrl+V. Then change the font to Nirmala UI or Mangal. Your Hindi appears correctly.',
  },
  {
    question: 'Can I convert KrutiDev 10 text on my phone without any app?',
    answer:
      'Yes. Open this page in Chrome or Safari on your Android or iPhone. Paste your text. The Unicode output appears instantly without pressing any button. Copy the output and paste it wherever you need it. No app download, no account, no cost.',
  },
  {
    question:
      'My converted text looks correct in the output box but pastes as symbols into MS Word. Why?',
    answer:
      'Word is set to a non-Unicode font before you paste. After pasting the Unicode output into Word, select all the pasted text and change the font to Mangal or Nirmala UI. Do not change the font before pasting. Change it after. If you use Paste Special (Ctrl+Shift+V), choose Unformatted Text to stop Word from applying its own font settings over the pasted Unicode.',
  },
  {
    question: 'Where can I download the KrutiDev 10 font for Windows 10 or Windows 11?',
    answer:
      'The font file is KRDEV010.TTF. The same file works for both KrutiDev 10 and KrutiDev 010 references. You do not need it installed to use this converter. If you need it to view source documents, download it from unicodekruti.com/font-download, then right-click the .ttf file and select Install on Windows 10 or Windows 11.',
  },
];

/** Hindi FAQ section — separate FAQPage schema with inLanguage hi-IN. */
export const k10FaqsHindi = [
  {
    question: 'कृतिदेव 10 (Kurtidev10) को यूनिकोड में कैसे बदलें?',
    answer:
      'ऊपर दिए गए इनपुट बॉक्स में अपना कृतिदेव 10 टेक्स्ट पेस्ट करें। यूनिकोड आउटपुट तुरंत दाईं तरफ दिखाई देगा। किसी बटन की जरूरत नहीं। यह टूल मोबाइल और कंप्यूटर दोनों पर काम करता है। आपका कोई भी टेक्स्ट सर्वर पर नहीं भेजा जाता।',
  },
  {
    question: 'क्या Kurtidev10 और कृतिदेव 010 एक ही फॉन्ट है?',
    answer:
      'हाँ। Kurtidev10 और KrutiDev 010 दोनों एक ही TrueType फॉन्ट फ़ाइल के अलग-अलग नाम हैं। दोनों में ASCII-to-Devanagari की बिल्कुल एक जैसी मैपिंग होती है। यह कन्वर्टर दोनों को एक ही कैरेक्टर टेबल से सही तरीके से प्रोसेस करता है।',
  },
  {
    question: 'क्या CPCT परीक्षा में KrutiDev 10 मान्य है?',
    answer:
      'हाँ। CPCT परीक्षा में KrutiDev 010 का नाम लिया जाता है, लेकिन KrutiDev 10 और KrutiDev 010 एक ही फॉन्ट हैं। अगर आप KrutiDev 10 में टाइपिंग की प्रैक्टिस कर रहे हैं, तो आप सही फॉन्ट पर काम कर रहे हैं।',
  },
  {
    question: 'क्या यह टूल मोबाइल पर काम करता है?',
    answer:
      'हाँ। यह टूल पूरी तरह ब्राउज़र-आधारित है। Android में Chrome और iPhone में Safari पर खोलें। टेक्स्ट पेस्ट करें। यूनिकोड आउटपुट तुरंत दिखाई देगा। कोई ऐप डाउनलोड करने की जरूरत नहीं है।',
  },
  {
    question: 'कृतिदेव 10 में टाइप किया गया टेक्स्ट फॉन्ट के बिना अंग्रेजी क्यों दिखता है?',
    answer:
      'कृतिदेव 10 असल में Devanagari फॉन्ट नहीं है। यह ASCII कैरेक्टर्स की जगह Devanagari जैसे ग्लिफ़ दिखाता है। जब फॉन्ट इंस्टॉल नहीं होता, तो वही ASCII कैरेक्टर्स अंग्रेजी अक्षरों के रूप में दिखते हैं। यूनिकोड में बदलने के बाद यह समस्या हमेशा के लिए खत्म हो जाती है।',
  },
];
