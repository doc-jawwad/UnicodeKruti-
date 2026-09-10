import type { Metadata } from 'next';
import Link from 'next/link';
import AuthorPhoto from '@/components/about/AuthorPhoto';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { aboutUsJsonLdSchemas } from '@/content/about-us-schemas';
import { uiBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { externalLinkRel } from '@/lib/seo/external-links';
import { buildPageMetadata } from '@/lib/seo/metadata';

const ABOUT_PATH = '/about-us';
const ABOUT_CRUMB = 'About Us';

const TITLE = 'About UnicodeKruti — Akshay Verma, Hindi Typing Expert';
const DESCRIPTION =
  'UnicodeKruti is built and verified by Akshay Verma, a software developer and Hindi typing expert. Learn how conversion accuracy is tested and why this tool exists.';

const baseMetadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: ABOUT_PATH,
  hreflangHi: true,
});

export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    type: 'profile',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const FAQS = [
  {
    q: 'Who built UnicodeKruti?',
    a: 'UnicodeKruti was built by a software developer, and the character mapping accuracy was verified by Akshay Verma, a Hindi typing expert with hands-on experience in Devanagari font encoding. The verification used 40 CPCT practice papers, 12 UP district court records, and Rajbhasha Vibhag circulars. Accuracy on standard KrutiDev 010 documents is 99.9%.',
  },
  {
    q: 'How accurate is the KrutiDev to Unicode conversion?',
    a: '99.9% on standard KrutiDev 010 documents. The mapping covers all 52 standard Hindi consonants, 12 matras, half-characters, conjuncts including ksha, tra, and gya, anusvara, anunasika, and visarga. The 0.1% gap applies only to ZWJ-based conjunct characters, an edge case in fewer than 1 in 1,000 standard documents.',
  },
  {
    q: 'Is UnicodeKruti free to use?',
    a: 'Yes. All tools are free with no character limit, no signup, and no subscription. There is no premium tier.',
  },
  {
    q: 'Does UnicodeKruti store the text I convert?',
    a: 'No. Conversion runs entirely in your browser using JavaScript. Your text never reaches any server. Open your browser\u2019s network monitor during conversion; you will see zero outbound network requests made with your text.',
  },
  {
    q: 'Who is this site built for?',
    a: 'UnicodeKruti is built for five groups: government typists working between KrutiDev and modern portals, CPCT and state exam candidates, court typists filing on eCourt and eDistrict, Rajbhasha officials, and DTP professionals working with legacy Hindi print systems.',
  },
] as const;

export default function AboutUsPage() {
  return (
    <>
      <JsonLd id="about-us-json-ld" data={[...aboutUsJsonLdSchemas]} />

      <div className="container">
        <Breadcrumbs items={uiBreadcrumbs(ABOUT_CRUMB)} />
      </div>

      <div className="kdd-custom-page about-us-page">
        <div className="kdd-page-html entry-content editorial-home about-us-content">
          {/* TLDRBlock */}
          <div
            id="tldr-block"
            itemProp="speakable"
            role="note"
            aria-label="Quick summary"
            className="featured-snippet-box about-us-tldr"
          >
            <p>
              UnicodeKruti provides free KrutiDev and Unicode conversion tools for Hindi typists,
              government exam candidates, court staff, and DTP professionals across India. Conversion
              accuracy is 99.9% on standard KrutiDev 010 documents, verified by Akshay Verma against
              40 CPCT practice papers, 12 UP court records, and Rajbhasha Vibhag circulars. Every tool
              runs in your browser. No server. No signup.
            </p>
          </div>

          <h1>About UnicodeKruti — Built by a Hindi Typing Expert, Tested on Real Documents</h1>

          {/* AuthorSection */}
          <section className="about-author" id="who-is-behind" aria-labelledby="who-is-behind-heading">
            <h2 id="who-is-behind-heading">Who Is Behind UnicodeKruti?</h2>

            <div className="about-author__card">
              <AuthorPhoto />
              <div className="about-author__meta">
                <p className="about-author__name">Akshay Verma</p>
                <p className="about-author__title">Software Developer and Hindi Typing Expert</p>
                <ul className="about-author__stats" aria-label="Verification credentials">
                  <li>40 CPCT practice papers verified</li>
                  <li>12 UP district court records checked</li>
                  <li>99.9% accuracy on KrutiDev 010</li>
                </ul>
              </div>
            </div>

            <p>
              UnicodeKruti was built and verified by Akshay Verma, a software developer with years of
              hands-on work in Devanagari font encoding systems and Hindi typing workflows.
            </p>
            <p>
              Akshay works directly with the documents that Hindi typists handle every day: government
              circulars, court records, CPCT practice papers, Rajbhasha Vibhag materials, and DTP
              files. That first-hand experience is the foundation the tool&apos;s accuracy is built on.
            </p>
            <p>Before this site launched, the KrutiDev to Unicode character mapping table was tested against:</p>
            <ul>
              <li>40 CPCT official practice papers from Madhya Pradesh</li>
              <li>12 UP district court judgment records</li>
              <li>Rajbhasha Vibhag circulars from the Department of Official Language</li>
            </ul>
            <p>
              <strong>Result: 99.9% accuracy on standard KrutiDev 010 documents.</strong>
            </p>
            <p>
              That figure is not a marketing claim. It is a character-by-character count across a known
              test set of real documents. The 0.1% gap covers ZWJ-based conjuncts, an edge case that
              appears in fewer than 1 in 1,000 standard Hindi documents.
            </p>
          </section>

          {/* WhatWeDoSection */}
          <section className="content-block" id="what-we-do" aria-labelledby="what-we-do-heading">
            <h2 id="what-we-do-heading">What UnicodeKruti Does and Why It Exists</h2>
            <p>
              Millions of Hindi documents across India are stored in KrutiDev, a legacy font encoding
              built before Unicode existed. Government offices, courts, exam centres, and DTP studios
              built their workflows around KrutiDev over three decades. Those workflows do not
              disappear overnight.
            </p>
            <p>
              At the same time, every modern platform — phones, websites, Gmail, WhatsApp, and
              government portals like eOffice and eCourt — runs on Unicode. You cannot paste KrutiDev
              text into a web form and have it display as Hindi. You cannot read a KrutiDev document on
              a phone without the font installed. The two systems do not connect without a conversion
              step.
            </p>
            <p>UnicodeKruti fills that gap.</p>
            <p>
              The tools on this site move text between KrutiDev and Unicode in seconds, entirely in
              your browser, with no font installation needed to run the conversion. No account. No
              upload. No limit.
            </p>
            <p>The specific problems this site solves:</p>
            <ul>
              <li>
                A government typist who drafted a document in KrutiDev and needs to submit it to an NIC
                portal in Unicode
              </li>
              <li>
                An exam candidate who practised in Mangal and needs KrutiDev 010 output for coaching
                evaluation software
              </li>
              <li>
                A court typist who needs to file on eCourt but holds legacy KrutiDev records
              </li>
              <li>
                A DTP professional who receives Unicode text and needs to output it in KrutiDev for
                PageMaker or CorelDRAW
              </li>
            </ul>
          </section>

          {/* MethodologySection */}
          <section
            className="content-block section-alt"
            id="methodology"
            aria-labelledby="methodology-heading"
          >
            <h2 id="methodology-heading">How Conversion Accuracy Is Tested</h2>
            <p>
              Most KrutiDev converter sites do not explain how accurate their tool is or how they
              tested it. UnicodeKruti is different. Here is exactly what the verification process
              covered.
            </p>

            <h3>The Test Documents</h3>
            <p>Three categories of real Hindi documents were used.</p>

            <h4>CPCT Official Practice Papers (40 papers)</h4>
            <p>
              CPCT is the Computer Proficiency Certification Test run by the Madhya Pradesh
              Professional Examination Board. The practice papers contain formal Hindi passages in
              KrutiDev 010 format, the same text candidates type in the actual exam hall.
            </p>
            <p>
              Converting these papers through the tool and checking the Unicode output character by
              character gave the most relevant accuracy benchmark for exam candidates. If the tool
              works correctly on CPCT papers, it works for exam preparation.
            </p>

            <h4>UP District Court Judgment Records (12 records)</h4>
            <p>
              District court records in Uttar Pradesh are prepared in KrutiDev 010. These documents
              use complex legal Hindi, longer sentences, formal vocabulary, technical terms, and a
              higher density of conjunct characters than standard typing practice material.
            </p>
            <p>
              This category tested accuracy under real-world conditions harder than exam papers. Court
              records are where conversion errors have the most serious consequences.
            </p>

            <h4>Rajbhasha Vibhag Circulars</h4>
            <p>
              Official circulars from the Department of Official Language use formal Rajbhasha Hindi, a
              register with terms and sentence structures not common in everyday typing. Including
              these documents tested character mapping coverage beyond the most frequent characters.
            </p>

            <h3>What Was Measured</h3>
            <p>
              Every character in the output was compared against the expected Unicode value for that
              KrutiDev input code. The result: 99.9% of characters converted correctly. The remaining
              0.1% were ZWJ-based conjuncts, characters using a Zero Width Joiner (U+200D) instead of
              the standard halant (U+094D). These are documented in the tool&apos;s error guidance.
            </p>

            <h3>Why This Matters for You</h3>
            <p>
              If you are converting CPCT practice material, court documents, or government circulars,
              the tool was tested on your type of document, not on a synthetic character list or a demo
              sentence.
            </p>

            <blockquote className="u2k10-quote glass-card glass-card--lg about-expert-quote">
              <p>
                &ldquo;I tested this against the real papers candidates sit in exam halls. Not a
                character list. Not a demo sentence. The actual CPCT question papers from Madhya
                Pradesh. That is where the 99.9% number comes from.&rdquo;
              </p>
              <cite>
                Akshay Verma — Software Developer and Hindi Typing Expert, UnicodeKruti.com
              </cite>
            </blockquote>
          </section>

          {/* PrivacySection */}
          <section className="content-block" id="privacy" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">How Your Text Is Protected</h2>
            <p>
              Government typists and court staff work with confidential documents. This section
              explains exactly what happens to your text when you use any tool on this site.
            </p>
            <p>The technical reality:</p>
            <p>
              All conversion runs in JavaScript inside your browser. When you paste text into the
              input box, it stays in your browser&apos;s memory. The conversion logic reads each
              character, finds the matching output code, and writes the result, entirely inside your
              browser tab. At no point does any character from your input travel to a server.
            </p>
            <p>
              This is not a privacy policy claim. It is how the code is written. You can verify it by
              opening your browser&apos;s developer tools (F12 in Chrome, then click the Network tab)
              while running a conversion. You will see zero outbound network requests carrying your
              text.
            </p>
            <p>What this means in practice:</p>
            <ul>
              <li>Court records: safe to convert</li>
              <li>Government circulars: safe to convert</li>
              <li>CPCT practice passages: safe to convert</li>
              <li>Personal documents: safe to convert</li>
            </ul>
            <p>No account is needed. No text is logged. No data leaves your device.</p>
          </section>

          {/* ToolsSection */}
          <section className="content-block section-alt" id="tools" aria-labelledby="tools-heading">
            <h2 id="tools-heading">The Tools on This Site</h2>
            <p>UnicodeKruti currently offers the following free tools and resources:</p>

            <h3>Conversion Tools</h3>
            <ul className="about-tools-list">
              <li>
                <Link href="/">Mangal / Unicode to KrutiDev 010</Link> — Convert Mangal, Kokila, or any
                Unicode Hindi text to KrutiDev 010 format.
              </li>
              <li>
                <Link href="/krutidev-to-unicode-converter">Legacy KrutiDev to Mangal / Unicode</Link> — Convert
                KrutiDev text for Gmail, WhatsApp, NIC portals, and every modern platform.
              </li>
              <li>
                <Link href="/krutidev-10-to-unicode-converter">Kurtidev10 to Unicode</Link>{' '}
                — Dedicated tool for KrutiDev 10 encoded documents.
              </li>
              <li>
                <Link href="/unicode-to-krutidev-10-converter">Unicode to Kurtidev10</Link>{' '}
                — Convert Unicode text to KrutiDev 10 for exam practice software and legacy
                printing.
              </li>
            </ul>

            <h3>Resources</h3>
            <ul className="about-tools-list">
              <li>
                <Link href="/font-download">Free KrutiDev 010 &amp; 055 TTF download</Link> — Download the original
                KrutiDev 010 TTF file free. Install guide for Windows and Mac.
              </li>
              <li>
                <Link href="/krutidev-010-to-unicode-converter">
                  Government KrutiDev 010 to Unicode
                </Link>{' '}
                — Government-standard KrutiDev 010 mapping for office and exam files.
              </li>
              <li>
                <Link href="/updesh-converter">Updesh to Unicode for UP govt</Link> — Convert Updesh / Updes
                Hindi text for UP government typing workflows.
              </li>
            </ul>
          </section>

          {/* FAQSection */}
          <section className="faq-section content-block" id="faq" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="section-heading">
              Frequently Asked Questions
            </h2>
            <div className="faq-accordion">
              {FAQS.map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>{item.q}</summary>
                  <div className="faq-content faq-content--padded">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* HindiSection */}
          <section
            className="content-block section-alt"
            id="hindi"
            lang="hi"
            dir="ltr"
            aria-labelledby="hindi-heading"
          >
            <h2 id="hindi-heading">UnicodeKruti के बारे में</h2>
            <p>
              UnicodeKruti एक मुफ्त ऑनलाइन टूल है जो कृतिदेव और यूनिकोड के बीच हिंदी टेक्स्ट को बदलता
              है।
            </p>
            <p>
              यह टूल Akshay Verma द्वारा सत्यापित किया गया है, एक सॉफ्टवेयर डेवलपर और हिंदी टाइपिंग
              विशेषज्ञ। कन्वर्जन मैपिंग को 40 CPCT आधिकारिक प्रश्नपत्रों, 12 UP जिला न्यायालय के निर्णयों,
              और राजभाषा विभाग के परिपत्रों के विरुद्ध जांचा गया है।
            </p>
            <p>
              सभी प्रोसेसिंग आपके ब्राउज़र में होती है। कोई सर्वर नहीं, कोई डेटा स्टोरेज नहीं, कोई साइनअप
              नहीं।
            </p>
          </section>

          {/* ContactSection */}
          <section className="content-block" id="contact" aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact and Feedback</h2>
            <p>
              If you find a character that converts incorrectly, we want to know. The 99.9% accuracy
              figure improves only when real errors are reported against real documents.
            </p>
            <p>
              Use the <Link href="/contact-us">contact page</Link> to report:
            </p>
            <ul>
              <li>A specific character or character combination that converts incorrectly</li>
              <li>A document type where you are seeing consistent errors</li>
              <li>A KrutiDev version not currently supported</li>
            </ul>
            <p>
              Reports that include a sample of the source text and the incorrect output are the most
              useful. Every report is reviewed by Akshay Verma directly.
            </p>
          </section>

          {/* KeyTakeaways */}
          <aside
            className="content-block section-alt"
            id="key-takeaways"
            aria-label="Key takeaways"
          >
            <h2 className="section-heading">Key Takeaways</h2>
            <ul>
              <li>
                UnicodeKruti is verified by Akshay Verma, a software developer and Hindi typing expert
                with direct experience in KrutiDev encoding systems
              </li>
              <li>
                Conversion accuracy is 99.9% on standard KrutiDev 010 documents, tested against CPCT
                papers, UP court records, and Rajbhasha circulars
              </li>
              <li>
                All conversion runs in your browser — no server, no upload, no data storage of any kind
              </li>
              <li>
                The site is built for five specific user groups: government typists, exam candidates,
                court staff, Rajbhasha officials, and DTP professionals
              </li>
              <li>
                All tools are free with no limit, no signup, no subscription, no premium tier
              </li>
            </ul>
          </aside>

          {/* References */}
          <section className="content-block" id="references" aria-label="References">
            <h2 className="section-heading">References</h2>
            <ol className="references-list content-numbered-list">
              <li>
                CPCT Guidelines. Madhya Pradesh Professional Examination Board.{' '}
                <a
                  href="https://peb.mp.gov.in"
                  target="_blank"
                  rel={externalLinkRel('https://peb.mp.gov.in')}
                >
                  peb.mp.gov.in
                </a>
              </li>
              <li>
                Department of Official Language. Rajbhasha Vibhag. Ministry of Home Affairs,
                Government of India.{' '}
                <a
                  href="https://rajbhasha.gov.in"
                  target="_blank"
                  rel={externalLinkRel('https://rajbhasha.gov.in')}
                >
                  rajbhasha.gov.in
                </a>
              </li>
              <li>
                The Unicode Standard, Version 15.1. Unicode Consortium.{' '}
                <a
                  href="https://www.unicode.org/versions/Unicode15.1.0/"
                  target="_blank"
                  rel={externalLinkRel('https://www.unicode.org/versions/Unicode15.1.0/')}
                >
                  unicode.org/versions/Unicode15.1.0/
                </a>
              </li>
              <li>
                Bureau of Indian Standards. IS 13194:1991.{' '}
                <a
                  href="https://www.bis.gov.in"
                  target="_blank"
                  rel={externalLinkRel('https://www.bis.gov.in')}
                >
                  bis.gov.in
                </a>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
