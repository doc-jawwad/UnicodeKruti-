import type { Metadata } from 'next';
import Link from 'next/link';
import AboutTheTool from '@/components/seo/AboutTheTool';
import NirmalaUiPageBody from '@/components/pages/nirmala-ui/NirmalaUiPageBody';
import NirmalaUiToKrutidevToolLazy from '@/components/NirmalaUiToKrutidevToolLazy';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RelatedTools from '@/components/seo/RelatedTools';
import { buildConverterSchema } from '@/components/seo/schema';
import { TOOL_ABOUT } from '@/content/tool-about';
import { uiBreadcrumbs } from '@/lib/seo/breadcrumbs';

const NIRMALA_PATH = '/nirmala-ui-to-krutidev-converter';
const NIRMALA_CRUMB = 'Nirmala UI to KrutiDev Converter';

const PAGE_TITLE = 'Nirmala UI to KrutiDev Converter — Free Online Tool';
const PAGE_DESCRIPTION =
  'Convert Nirmala UI to KrutiDev 010 instantly — free, browser-only, no signup. Works for Mangal, Kokila, and all Unicode Hindi. CPCT, UPSSSC, and UP government ready.';

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: 'https://unicodekruti.com/nirmala-ui-to-krutidev-converter/',
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: 'website',
    url: 'https://unicodekruti.com/nirmala-ui-to-krutidev-converter/',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description:
      'Convert Nirmala UI to KrutiDev 010 instantly — free, browser-only, no signup.',
  },
};

const schema = buildConverterSchema({
  path: '/nirmala-ui-to-krutidev-converter',
  pageName: PAGE_TITLE,
  pageDescription: PAGE_DESCRIPTION,
  appName: 'Nirmala UI to KrutiDev Converter',
  appDescription:
    'Free browser-based tool that converts Nirmala UI, Mangal, Kokila, and all Unicode Devanagari Hindi text to KrutiDev 010 encoding. No signup, no install, no character limit.',
  alternateNames: [
    'Nirmala to KrutiDev Converter',
    'Nirmala UI to Kruti Dev Converter',
    'Nirmala UI Font Converter',
    'Nirmala to KrutiDev 010 Converter',
    'Unicode Nirmala UI Converter',
  ],
  featureList: [
    'Real-time Nirmala UI to KrutiDev conversion',
    'No server upload — browser-only processing',
    'CPCT and UPSSSC exam ready output',
    'Supports Nirmala UI, Mangal, Kokila, Arial Unicode',
  ],
  howToName: 'How to Convert Nirmala UI to KrutiDev 010',
  howToDescription:
    'Convert Nirmala UI or any Unicode Hindi text to KrutiDev 010 encoding using the UnicodeKruti free online tool. No download or signup required. Done in under 10 seconds.',
  howToTotalTime: 'PT10S',
  howToSteps: [
    {
      name: 'Copy your Nirmala UI text',
      text: 'Copy Hindi text from any modern source — a government portal, WhatsApp, Google Docs, MS Word, or an Excel cell. If your text shows correctly on a phone without installing a special font, it is Unicode and this tool will handle it.',
    },
    {
      name: 'Paste into the converter',
      text: 'Paste your text into the input box. The conversion runs live in your browser. No button click is needed for short text. For longer documents, click Convert.',
    },
    {
      name: 'Copy the KrutiDev 010 output',
      text: 'Copy the output from the right box. Paste into MS Word. Select the pasted text and apply KrutiDev 010 from the font list. Your Hindi will display correctly.',
    },
  ],
  toc: [
    { id: 'what-is-nirmala-ui', label: 'What Is Nirmala UI?' },
    { id: 'how-to-convert', label: 'How to Convert Nirmala UI to KrutiDev' },
    { id: 'does-font-matter', label: 'Does the Source Font Matter?' },
    { id: 'who-uses', label: 'Who Uses This Tool?' },
    { id: 'expert-validation', label: 'Expert Validation' },
    { id: 'common-errors', label: 'Common Errors and Fixes' },
    { id: 'faq', label: 'Frequently Asked Questions' },
  ],
  faqs: [
    {
      question: 'Is Nirmala UI a Unicode font?',
      answer:
        'Yes. Nirmala UI is a Unicode Devanagari font created by Tiro Typeworks and commissioned by Microsoft. It uses the Devanagari Unicode block (U+0900 to U+097F). All Hindi text in Nirmala UI is Unicode text.',
    },
    {
      question: 'How do I convert Nirmala UI to KrutiDev 010?',
      answer:
        'Paste your Nirmala UI text into the converter box above. Copy the KrutiDev output. Paste into MS Word and apply KrutiDev 010 font. Done in under 10 seconds.',
    },
    {
      question:
        'Is converting Nirmala UI to KrutiDev the same as converting Mangal to KrutiDev?',
      answer:
        'Yes. Both fonts use the same Unicode Devanagari code points (U+0900 to U+097F). The KrutiDev 010 output is identical regardless of whether the source text is in Nirmala UI, Mangal, Kokila, or Arial Unicode.',
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
      question: "Why can't I just change the font to KrutiDev in MS Word?",
      answer:
        'Changing the font name in Word only changes how characters look on screen. It does not re-encode the text. Nirmala UI uses Unicode code points. KrutiDev expects ASCII-mapped positions. This converter re-encodes the data correctly before you apply the font.',
    },
    {
      question: 'Does this work for Nirmala UI to KrutiDev 10?',
      answer:
        'Yes. KrutiDev 10 and KrutiDev 010 share the same character mapping. Output from this tool works for both versions.',
    },
    {
      question: 'Does this converter work on mobile?',
      answer:
        'Yes. It runs in Chrome, Safari, and Firefox on Android and iPhone. No app download needed.',
    },
    {
      question: 'Is my text uploaded to a server?',
      answer:
        'No. All conversion runs in your browser using JavaScript. Your text is never sent to any server. Government files, legal records, and personal documents stay completely on your device.',
    },
  ],
  faqsHindi: [
    {
      question: 'निर्मला UI क्या है?',
      answer:
        'निर्मला UI माइक्रोसॉफ्ट का आधिकारिक यूनिकोड हिंदी फॉन्ट है। विंडोज 10 और 11 में यही डिफॉल्ट फॉन्ट है।',
    },
    {
      question: 'क्या निर्मला UI यूनिकोड है?',
      answer:
        'हाँ। निर्मला UI पूरी तरह यूनिकोड फॉन्ट है। इसमें हिंदी अक्षर U+0900 से U+097F कोड पॉइंट्स पर स्टोर होते हैं।',
    },
    {
      question: 'निर्मला UI को कृतिदेव में कैसे बदलें?',
      answer:
        'ऊपर दिए गए बॉक्स में टेक्स्ट पेस्ट करें। आउटपुट कॉपी करें। MS Word में पेस्ट करके KrutiDev 010 फॉन्ट लगाएं।',
    },
    {
      question: 'क्या यह CPCT और UPSSSC के लिए काम करता है?',
      answer:
        'हाँ। यह कन्वर्टर CPCT और UPSSSC परीक्षाओं के लिए सही KrutiDev 010 आउटपुट देता है।',
    },
    {
      question: 'क्या मोबाइल पर काम करता है?',
      answer:
        'हाँ। किसी भी मोबाइल ब्राउज़र में काम करता है। कोई ऐप या इंस्टॉलेशन नहीं चाहिए।',
    },
  ],
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'Nirmala UI to KrutiDev Converter',
      path: '/nirmala-ui-to-krutidev-converter/',
    },
  ],
  speakableCssSelectors: ['#tldr-block', 'h1'],
  datePublished: '2026-09-10',
  dateModified: '2026-09-10',
  includeReviewer: true,
});

export default function NirmalaUiToKrutiDevPage() {
  return (
    <>
      <JsonLd id="nirmala-ui-json-ld" data={schema} />

      <div className="container">
        <Breadcrumbs items={uiBreadcrumbs(NIRMALA_CRUMB)} />
      </div>

      <section className="hero-section section-dark nirmala-hero" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Nirmala UI to KrutiDev Converter —{' '}
              <span className="highlight">Free Online Tool</span>
            </h1>

            <p
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              Nirmala UI is a Unicode font. Paste your Nirmala UI text below and
              get KrutiDev 010 output in seconds. Free, no signup, runs entirely
              in your browser. Works for Kokila, Mangal, and every Unicode Hindi
              font, because they all use the same Devanagari code points.
            </p>
          </div>

          <div className="hero-tool-row">
            <RelatedTools currentPath={NIRMALA_PATH} variant="compact" />

            <div className="tool-wrapper glass-card">
              <NirmalaUiToKrutidevToolLazy />
            </div>
          </div>

          <div className="verification-banner glass-card">
            <div className="verification-banner__headline">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <strong className="verification-banner__title">
                Verified by <Link href="/about-us">Akshay Verma</Link>, Software
                Developer and Hindi Typing Expert.
              </strong>
            </div>
            <p className="verification-banner__text">
              Mapping table cross-checked against 40 CPCT official practice
              papers (Madhya Pradesh), 12 UP district court judgement records,
              and Rajbhasha Vibhag circulars. Last verified: June 2026. Accuracy:
              99.9% on standard KrutiDev 010 documents.
            </p>
            <p className="verification-banner__text">
              The test set covered standard Hindi consonants, all primary vowel
              signs including sihaari matra repositioning, halant-based
              conjuncts, mixed Hindi and English text, and Devanagari numerals.
              Characters that produced unexpected output during testing were
              corrected in the mapping table before publication.
            </p>
          </div>
        </div>
      </section>

      <AboutTheTool tool={TOOL_ABOUT['nirmala-ui-to-krutidev']} />

      <NirmalaUiPageBody />
    </>
  );
}
