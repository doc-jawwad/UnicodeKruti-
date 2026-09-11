import type { Metadata } from 'next';
import Link from 'next/link';
import UpdeshConverterLazy from '@/components/UpdeshConverterLazy';
import AboutTheTool from '@/components/seo/AboutTheTool';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RelatedTools from '@/components/seo/RelatedTools';
import { TOOL_ABOUT } from '@/content/tool-about';
import { updeshJsonLdSchemas } from '@/content/updesh-schemas';
import { uiBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/metadata';

const UPDESH_PATH = '/updesh-converter';
const UPDESH_CRUMB_LABEL = 'Updesh Converter';

export function generateMetadata(): Metadata {
  const title = 'Updesh Font Converter | Updesh to Unicode Free Online';
  const description =
    'Free Updesh converter online. Convert Updesh or Updes text to Unicode and Unicode to Updesh instantly. Browser based, free, no signup required.';

  const pageMetadata = buildPageMetadata({
    title,
    description,
    path: UPDESH_PATH,
    hreflangHi: true,
  });

  // Bypass root layout `%s | UnicodeKruti` template so the title matches the brief exactly.
  return {
    ...pageMetadata,
    title: { absolute: title },
  };
}

export default function UpdeshConverterPage() {
  return (
    <>
      <JsonLd id="updesh-json-ld" data={updeshJsonLdSchemas} />

      <div className="container">
        <Breadcrumbs items={uiBreadcrumbs(UPDESH_CRUMB_LABEL)} />
      </div>

      <section className="hero-section section-dark" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content">
            <h1>Updesh to Unicode Converter — Free Online Tool</h1>

            <p
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              Paste Updesh or Updes legacy Hindi to get readable Unicode—or
              convert Unicode back for UP government typing workflows. Both
              directions run in your browser only; nothing is uploaded or
              stored. Free, unlimited characters, and no signup required.
            </p>
          </div>

          <div className="hero-tool-row">
            <RelatedTools currentPath={UPDESH_PATH} variant="compact" />

            <div className="tool-wrapper glass-card">
              <UpdeshConverterLazy />
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
                Verified by{' '}
                <Link href="/about-us">Akshay Verma</Link>, Software Developer
                and Hindi Typing Expert.
              </strong>
            </div>
            <p className="verification-banner__text">
              Mapping follows SIL KrutiDev 010 / Remington (same table as this
              site&apos;s KrutiDev converters). Last verified: September 2026
              against the Updesh/KrutiDev 010 golden corpus. There is no
              separately documented Updesh.ttf encoding.
            </p>
            <p className="verification-banner__text">
              The corpus covers standard Hindi consonants, sihaari matra
              repositioning, Z-reph, z-rakar, halant conjuncts, nukta letters,
              and ASCII digits. Latin letters that are also Remington keys
              convert as Hindi glyphs in Updesh → Unicode. Characters that
              produced unexpected output during testing were corrected in the
              mapping table before this revision.
            </p>
          </div>
        </div>
      </section>

      <AboutTheTool tool={TOOL_ABOUT.updesh} />

      <section className="toc-section section-dark" id="table-of-contents">
        <div className="container">
          <details className="toc-wrapper-collapsible">
            <summary className="toc-summary-bar">
              <span>Table of Contents</span>
              <span className="toc-toggle-icon"></span>
            </summary>
            <div className="toc-content-list">
              <a href="#about-the-tool" className="toc-link-item">
                About this tool
              </a>
              <a href="#how-to-use" className="toc-link-item">
                How to Convert Updesh Text in 3 Steps
              </a>
              <a
                href="#what-is-updesh-font-converter"
                className="toc-link-item"
              >
                What Is the Updesh Font Converter?
              </a>
              <a href="#is-updes-same-as-updesh" className="toc-link-item">
                Is Updes the Same as Updesh?
              </a>
              <a href="#what-is-updesh-font" className="toc-link-item">
                What Is Updesh Font?
              </a>
              <a href="#updesh-vs-krutidev-mangal" className="toc-link-item">
                Updesh vs KrutiDev 010 vs Mangal
              </a>
              <a href="#updesh-same-as-krutidev-010" className="toc-link-item">
                Is Updesh the Same as KrutiDev 010?
              </a>
              <a href="#who-uses-updesh" className="toc-link-item">
                Who Uses the Updesh Converter and Why
              </a>
              <a href="#how-updesh-converter-works" className="toc-link-item">
                How the Updesh Converter Works
              </a>
              <a href="#do-you-need-download" className="toc-link-item">
                Do You Need to Download the Updesh Converter?
              </a>
              <a href="#updesh-hindi" className="toc-link-item">
                अपडेश फॉन्ट कनवर्टर
              </a>
              <a href="#common-issues" className="toc-link-item">
                Common Issues When Using the Updesh Converter
              </a>
              <a href="#key-takeaways" className="toc-link-item">
                Key Takeaways
              </a>
              <a href="#related-resources" className="toc-link-item">
                Related Tools and Internal Links
              </a>
              <a href="#faq" className="toc-link-item">
                Frequently Asked Questions
              </a>
              <a href="#references" className="toc-link-item">
                References
              </a>
            </div>
          </details>
        </div>
      </section>

      <section
        className="howto-section section-alt"
        id="how-to-use"
        itemScope
        itemType="https://schema.org/HowTo"
      >
        <div className="container">
          <h2 className="section-heading" itemProp="name">
            How to Convert Updesh Text in{' '}
            <span className="highlight">3 Steps</span>
          </h2>
          <meta itemProp="totalTime" content="PT1M" />

          <div className="howto-steps-container">
            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 1</div>
                <h3 itemProp="name">Paste Your Text</h3>
                <p itemProp="text">
                  Paste Unicode Hindi text from any source into the left input
                  box. The text can come from a document, a website, a messaging
                  app, or any Unicode-compatible source.
                </p>
                <p>
                  To convert in the other direction, paste Updesh-encoded text
                  into the right input box.
                </p>
              </div>
            </div>

            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 2</div>
                <h3 itemProp="name">The Conversion Runs in Your Browser</h3>
                <p itemProp="text">
                  No button click is needed. Output appears as you type or paste.
                  The conversion maps legacy character sequences to their
                  corresponding Unicode Devanagari text, or performs the reverse.
                  It handles character ordering changes that occur between
                  Unicode and legacy encoding formats, including vowel sign
                  positioning. The process runs entirely in your browser without
                  a page reload.
                </p>
              </div>
            </div>

            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 3</div>
                <h3 itemProp="name">Copy and Use the Output</h3>
                <p itemProp="text">
                  Copy the output text and paste it into your target application.
                </p>
                <p>
                  <strong>For Unicode output:</strong> paste into Word, a web
                  form, a messaging app, email, or any application that supports
                  Unicode Devanagari text.
                </p>
                <p>
                  <strong>For Updesh legacy output:</strong> apply the
                  corresponding legacy font in your target application after
                  pasting so the Hindi text displays correctly. Without the font
                  active, the output will appear as ordinary keyboard characters.
                  That is expected behavior, not a conversion error.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="content-block section-dark"
        id="what-is-updesh-font-converter"
        aria-labelledby="what-is-updesh-font-converter-heading"
      >
        <div className="container">
          <h2
            id="what-is-updesh-font-converter-heading"
            className="section-heading"
          >
            What Is the Updesh Font Converter?
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              The Updesh font converter is a free online tool that converts Hindi
              text between Updesh legacy encoding and Unicode Devanagari. It
              works in both directions. Paste Unicode Hindi text and get Updesh
              output. Paste Updesh text and get Unicode output back.
            </p>
            <p>
              This converter changes what your device stores, not just how the
              text looks on screen. Switching fonts in MS Word only changes the
              visual appearance. This tool changes the actual character encoding
              underneath. The result is text that works correctly in the target
              system without needing any font installed on the reading device.
            </p>
            <p>
              Unicode output works in modern applications that support Unicode
              Devanagari text. Updesh output is intended for software and
              workflows that specifically require legacy Updesh encoding.
            </p>
            <p>
              <strong>Tool facts:</strong>
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th>Detail</th>
                  <th>Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tool name</td>
                  <td>Updesh Font Converter</td>
                </tr>
                <tr>
                  <td>Common search terms</td>
                  <td>Updes converter, Updesh Unicode converter</td>
                </tr>
                <tr>
                  <td>Conversion directions</td>
                  <td>Unicode to Updesh, Updesh to Unicode</td>
                </tr>
                <tr>
                  <td>Input</td>
                  <td>Unicode Devanagari text or Updesh legacy text</td>
                </tr>
                <tr>
                  <td>Output</td>
                  <td>Updesh legacy encoding or Unicode Devanagari text</td>
                </tr>
                <tr>
                  <td>Processing</td>
                  <td>Runs in your browser only</td>
                </tr>
                <tr>
                  <td>Cost</td>
                  <td>Free, no account needed</td>
                </tr>
                <tr>
                  <td>Verified by</td>
                  <td>
                    <Link href="/about-us">Akshay Verma</Link>, Software
                    Developer and Hindi Typing Expert
                  </td>
                </tr>
                <tr>
                  <td>Last tested</td>
                  <td>September 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        className="content-block section-alt"
        id="is-updes-same-as-updesh"
        aria-labelledby="is-updes-same-as-updesh-heading"
      >
        <div className="container">
          <h2
            id="is-updes-same-as-updesh-heading"
            className="section-heading"
          >
            Is Updes the Same as Updesh?
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Users searching for an Updes converter and users searching for an
              Updesh converter are looking for the same tool. The two spellings
              refer to the same legacy Hindi encoding context. This page covers
              both.
            </p>
            <p>
              The Uttar Pradesh government operates a separate system at{' '}
              <a
                href="https://updes.up.nic.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                updes.up.nic.in
              </a>
              , run by the Directorate of Economics and Statistics. That site
              hosts its own font conversion utility, which it describes as a
              KrutiDev-10 and Unicode converter.
            </p>
            <p>
              The exact naming relationship between that government system and
              the search terms Updes or Updesh is not officially documented in
              available public sources. What is clear is that all three terms
              appear in the same search ecosystem, and users reaching this page
              through any of those spellings need the same conversion function.
            </p>
          </div>
        </div>
      </section>

      <section
        className="content-block section-dark"
        id="what-is-updesh-font"
        aria-labelledby="what-is-updesh-font-heading"
      >
        <div className="container">
          <h2 id="what-is-updesh-font-heading" className="section-heading">
            What Is Updesh Font?
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Updesh is a legacy Hindi text format used in older font-based
              typing workflows. It stores Devanagari text using a character
              mapping that depends on a specific font being active on the reading
              device. Without that font, the stored text displays as ordinary
              Latin keyboard characters rather than Hindi.
            </p>
            <p>
              This is the core problem the Updesh converter solves. The text
              itself has not changed. What changes is whether the expected font
              or encoding is present on the system reading it.
            </p>
            <p>
              The difference between changing a font and converting encoding is
              important here. Changing the font in a document only changes how
              text looks on screen. The stored characters underneath stay the
              same. Converting the encoding changes what is actually stored, so
              the text works correctly in the target system regardless of which
              font is installed.
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th>Detail</th>
                  <th>Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Type</td>
                  <td>Legacy Hindi text format</td>
                </tr>
                <tr>
                  <td>Script</td>
                  <td>Devanagari</td>
                </tr>
                <tr>
                  <td>Character model</td>
                  <td>Non-Unicode legacy representation</td>
                </tr>
                <tr>
                  <td>Common context</td>
                  <td>Older Hindi typing and document workflows</td>
                </tr>
                <tr>
                  <td>Conversion target</td>
                  <td>Unicode Devanagari</td>
                </tr>
                <tr>
                  <td>Main problem</td>
                  <td>
                    Text displays as Latin characters when the expected font or
                    encoding is unavailable
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-prose content-prose--left">
            <p>
              The Uttar Pradesh government operates a font conversion utility at{' '}
              <a
                href="https://updes.up.nic.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                updes.up.nic.in
              </a>
              , maintained by the Directorate of Economics and Statistics. That
              utility documents its conversion as KrutiDev-10 to Unicode and
              Unicode to KrutiDev-10, which places it within the same legacy
              Hindi conversion ecosystem that Updesh-related searches come from
              (Source:{' '}
              <a
                href="https://updes.up.nic.in/esd/font_converter"
                target="_blank"
                rel="noopener noreferrer"
              >
                updes.up.nic.in/esd/font_converter
              </a>
              ).
            </p>
            <p>
              Users searching for an Updesh converter are dealing with the same
              underlying problem: legacy Hindi text that needs to work in a
              modern Unicode environment, or Unicode text that needs to work in a
              legacy system.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT: article body continued */}

      <section
        className="content-block section-alt"
        id="updesh-vs-krutidev-mangal"
        aria-labelledby="updesh-vs-krutidev-mangal-heading"
      >
        <div className="container">
          <h2
            id="updesh-vs-krutidev-mangal-heading"
            className="section-heading"
          >
            Updesh vs KrutiDev 010 vs Mangal:{' '}
            <span className="highlight">What Is the Difference?</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              The core difference is between legacy Hindi text formats and
              Unicode-based fonts. Updesh and KrutiDev 010 belong to the legacy
              category. Mangal and{' '}
              <Link href="/nirmala-ui-to-krutidev-converter">Nirmala UI</Link>{' '}
              belong to the Unicode category.
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table compare-table--features">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>What it is</th>
                  <th>Text representation</th>
                  <th>Unicode?</th>
                  <th>Common context</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Updesh</td>
                  <td>Legacy Hindi format</td>
                  <td>Legacy character mapping</td>
                  <td>No</td>
                  <td>Updesh-related conversion workflows</td>
                </tr>
                <tr>
                  <td>KrutiDev 010</td>
                  <td>Legacy Hindi font</td>
                  <td>Legacy character mapping</td>
                  <td>No</td>
                  <td>Legacy Hindi typing workflows</td>
                </tr>
                <tr>
                  <td>Mangal</td>
                  <td>Unicode-capable font</td>
                  <td>Unicode Devanagari</td>
                  <td>Yes</td>
                  <td>Unicode Hindi documents</td>
                </tr>
                <tr>
                  <td>Nirmala UI</td>
                  <td>Windows font with Devanagari support</td>
                  <td>Unicode Devanagari</td>
                  <td>Yes</td>
                  <td>Windows Unicode documents</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-prose content-prose--left">
            <p>
              Two things are important to understand from this table.
            </p>
            <p>
              First, Mangal and Nirmala UI are fonts, not encoding systems. The
              same Unicode Devanagari text looks identical whether displayed in
              Mangal or Nirmala UI, because the stored characters are the same.
              Unicode defines Devanagari characters as standardized code points
              in the range U+0900 to U+097F (Source: Unicode Standard 17.0,{' '}
              <a
                href="https://www.unicode.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                unicode.org
              </a>
              ). Mangal is a font that renders those code points visually. To turn
              that Unicode into KrutiDev 010, use the{' '}
              <Link href="/nirmala-ui-to-krutidev-converter">
                Nirmala UI to KrutiDev
              </Link>{' '}
              tool (same mapping for Mangal and Kokila).
            </p>
            <p>
              A government source from the Madhya Pradesh Pollution Control Board
              explicitly identifies Mangal as a Unicode font (Source:{' '}
              <a
                href="https://mppcb.mp.gov.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                mppcb.mp.gov.in
              </a>
              ). Microsoft documentation identifies Nirmala UI as a Windows
              system font with Devanagari support (Source: Microsoft Typography,{' '}
              <a
                href="https://learn.microsoft.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                learn.microsoft.com
              </a>
              ).
            </p>
            <p>
              Second, a font is not the same thing as an encoding or a keyboard
              layout. These are three separate concepts that users often
              encounter together but should not treat as interchangeable.
            </p>
          </div>
        </div>
      </section>

      <section
        className="content-block section-dark"
        id="updesh-same-as-krutidev-010"
        aria-labelledby="updesh-same-as-krutidev-010-heading"
      >
        <div className="container">
          <h2
            id="updesh-same-as-krutidev-010-heading"
            className="section-heading"
          >
            Is Updesh the Same as KrutiDev 010?
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Users frequently encounter Updesh and KrutiDev 010 in the same
              conversion context, which leads to this question.
            </p>
            <p>
              The official UPDES government converter at{' '}
              <a
                href="https://updes.up.nic.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                updes.up.nic.in
              </a>{' '}
              documents its conversion as KrutiDev-10 to Unicode and Unicode to
              KrutiDev-10. This page uses that same KrutiDev 010 Remington ASCII
              map. &ldquo;Updesh&rdquo; here is the UP-government search and
              workflow name for that encoding — not a separately published font
              table or Updesh.ttf.
            </p>
            <p>
              Text converted on this page is byte-compatible with KrutiDev 010.
              Other legacy fonts used in some UP offices (for example Chandni)
              use a different map and are not converted here.
            </p>
          </div>
        </div>
      </section>

      <section
        className="content-block section-alt"
        id="who-uses-updesh"
        aria-labelledby="who-uses-updesh-heading"
      >
        <div className="container">
          <h2 id="who-uses-updesh-heading" className="section-heading">
            Who Uses the Updesh Converter and Why
          </h2>

          <h3 className="section-subheading">
            People Working With Legacy Hindi Documents
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              The most common use case is straightforward: a user has Hindi text
              in a legacy format that does not display correctly in modern
              software, or has Unicode Hindi text that needs to work in an older
              system. The Updesh converter handles both directions without
              requiring any software installation.
            </p>
            <p>
              Current Uttar Pradesh government web guidelines explicitly require
              Unicode characters for Hindi and regional language content on
              government websites (Source: Guidelines for Indian Government
              Websites,{' '}
              <a
                href="https://mksy.up.gov.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                mksy.up.gov.in
              </a>
              ). This creates a real compatibility gap between modern
              Unicode-based publishing and older legacy Hindi documents still in
              circulation.
            </p>
          </div>

          <h3 className="section-subheading">
            Government and Administrative Document Users
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              Users handling older Hindi administrative documents may encounter
              legacy text that needs conversion before it works in
              Unicode-compatible systems. The official UPDES utility at{' '}
              <a
                href="https://updes.up.nic.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                updes.up.nic.in
              </a>{' '}
              documents KrutiDev-10 and Unicode as the two formats in that
              government conversion workflow (Source:{' '}
              <a
                href="https://updes.up.nic.in/esd/font_converter"
                target="_blank"
                rel="noopener noreferrer"
              >
                updes.up.nic.in/esd/font_converter
              </a>
              ).
            </p>
            <p>
              Users in similar workflows who need browser-based conversion
              without logging into a government portal use this tool for the same
              purpose.
            </p>
          </div>

          <h3 className="section-subheading">Hindi Typing Exam Candidates</h3>
          <div className="content-prose content-prose--left">
            <p>
              Some Uttar Pradesh recruitment and typing examinations reference
              legacy Hindi typing formats. An official UPPSC RO/ARO examination
              document references Kruti Dev 010 as a typing format in that
              context (Source:{' '}
              <a
                href="https://uppsc.up.nic.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                uppsc.up.nic.in
              </a>
              ). Candidates who prepare using Unicode Hindi text can use this
              converter to practice in a legacy format environment.
            </p>
            <p>
              Check the current official examination notification for the
              required font, keyboard layout, and typing speed before preparing.
              Detailed exam coverage is available on the{' '}
              <Link href="/#who-uses">CPCT &amp; Hindi typing exam workflows</Link>.
            </p>
          </div>

          <h3 className="section-subheading">
            Users Moving Legacy Hindi Text Into Modern Software
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              Anyone working with older Hindi files that display as garbled Latin
              characters in modern applications can paste that text here and get
              readable Unicode output. The conversion runs in your browser. No
              text is sent to a server, which matters when the source documents
              contain sensitive or confidential content.
            </p>
          </div>
        </div>
      </section>

      <section
        className="content-block section-dark"
        id="how-updesh-converter-works"
        aria-labelledby="how-updesh-converter-works-heading"
      >
        <div className="container">
          <h2
            id="how-updesh-converter-works-heading"
            className="section-heading"
          >
            How the Updesh Converter Works
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              The converter reads each character in your input text and applies a
              character mapping between Unicode Devanagari and the legacy format,
              or the reverse.
            </p>
            <p>
              For Unicode-to-Updesh conversion, the tool identifies each Unicode
              Devanagari character in the input, maps it to its corresponding
              character value in the legacy encoding used by the converter, and
              produces the converted output. For Updesh-to-Unicode conversion,
              the same process runs in the opposite direction.
            </p>
            <p>
              One conversion case that requires special handling: the i-vowel
              sign, known as sihaari matra (
              <span lang="hi" dir="ltr">
                ि
              </span>
              , Unicode character U+093F). The Unicode Consortium documents this
              character as visually appearing to the left of the consonant it
              modifies, while its logical position in stored Unicode text is
              after that consonant (Source: Unicode Character Chart, Devanagari
              Block,{' '}
              <a
                href="https://www.unicode.org/charts/PDF/U0900.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                unicode.org/charts
              </a>
              ).
            </p>
            <p>
              In legacy Hindi text formats, the stored character sequence places
              the i-vowel sign before the consonant it modifies. The converter
              handles this reordering automatically.
            </p>
            <p>
              <strong>What works as Unicode input:</strong> Any Hindi text stored
              as Unicode Devanagari. The underlying code points are the same
              regardless of which Unicode font is used to display the text
              visually. Mangal is one common example.
            </p>
            <p>
              <strong>What does not work as input:</strong> Text from other
              legacy Hindi fonts such as Devlys, Chanakya, or Shree-Lipi. Those
              formats use their own character mappings that are different from
              the mapping this converter uses. Pasting text from those fonts will
              produce incorrect output. A separate font-specific converter is
              needed for those formats.
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th>Input case</th>
                  <th>Handling</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Standard Hindi consonants</td>
                  <td>Converted</td>
                </tr>
                <tr>
                  <td>Vowel signs including sihaari</td>
                  <td>Converted with automatic reordering</td>
                </tr>
                <tr>
                  <td>Halant and conjuncts</td>
                  <td>Converted</td>
                </tr>
                <tr>
                  <td>Mixed Hindi and English text</td>
                  <td>
                    Latin letters that are also Remington keys (for example H, e,
                    l, o) convert as Hindi glyphs. Mixed English is not preserved
                    in Updesh → Unicode. Unicode → Updesh leaves Latin letters
                    unchanged.
                  </td>
                </tr>
                <tr>
                  <td>Text from other legacy fonts (Devlys, Chanakya)</td>
                  <td>Not supported</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section
        className="content-block section-alt"
        id="do-you-need-download"
        aria-labelledby="do-you-need-download-heading"
      >
        <div className="container">
          <h2 id="do-you-need-download-heading" className="section-heading">
            Do You Need to Download the Updesh Converter?
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              No download is needed. This is a browser-based tool. Paste your
              text, get the converted output, and copy it. The conversion runs on
              your device without a page reload.
            </p>
            <p>
              A converter and a font file are two different things. This tool
              converts the text encoding. If you need a legacy font file installed
              on your computer so that converted text displays as Hindi in MS Word
              or another application, that is a separate requirement. Visit the{' '}
              <Link href="/font-download">download KrutiDev 010 TTF for Windows</Link> for the font
              file.
            </p>
            <p>
              Some search results for &ldquo;Updesh converter download&rdquo;
              refer to desktop software programs. This page provides a
              browser-based version that works on Windows, Mac, Android, and
              iPhone without installation. No text you paste is stored or sent
              anywhere.
            </p>
          </div>
        </div>
      </section>

      <section
        className="content-block section-dark"
        id="updesh-hindi"
        lang="hi"
        dir="ltr"
        aria-labelledby="updesh-hindi-heading"
      >
        <div className="container">
          <h2 id="updesh-hindi-heading" className="section-heading">
            अपडेश फॉन्ट कनवर्टर
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              यह टूल पुराने legacy Hindi text को Unicode Devanagari में बदलता
              है, और Unicode text को वापस legacy format में भी।
            </p>
            <p>
              आधुनिक Hindi computing में Unicode का उपयोग होता है। पुराने Hindi
              दस्तावेज़ों के साथ काम करने वाले उपयोगकर्ता इस converter का उपयोग
              दोनों दिशाओं में text convert करने के लिए कर सकते हैं।
            </p>
            <p>
              कोई software download नहीं, कोई account नहीं, कोई शुल्क नहीं।
              Android और iPhone पर Chrome, Safari, और Firefox में काम करता है।
            </p>
          </div>
        </div>
      </section>

      <section
        className="content-block section-alt"
        id="common-issues"
        aria-labelledby="common-issues-heading"
      >
        <div className="container">
          <h2 id="common-issues-heading" className="section-heading">
            Common Issues When Using the{' '}
            <span className="highlight">Updesh Converter</span>
          </h2>

          <div className="myth-card-list">
            <div className="glass-card glass-card--myth">
              <h3 className="myth-card-title">
                Output Shows Latin Characters in MS Word
              </h3>
              <p className="myth-card-text">
                If the converted text appears as ordinary keyboard characters in
                MS Word, first check whether the expected legacy font is installed
                and applied. Legacy Hindi text depends on a specific font to
                display Devanagari correctly. Without that font active, stored
                character values appear as Latin letters or symbols.
              </p>
              <p className="myth-card-text">
                To fix this: select the pasted text in MS Word, open the font
                selector, type the name of the legacy font you are using, and
                press Enter. The Hindi text should display correctly.
              </p>
              <p className="myth-card-text">
                If the output still looks wrong after applying the font, check
                that you selected the correct conversion direction before
                converting.
              </p>
            </div>

            <div className="glass-card glass-card--myth glass-card--myth-mid">
              <h3 className="myth-card-title">
                Scanned PDF Text Does Not Convert
              </h3>
              <p className="myth-card-text">
                A scanned PDF contains an image of text, not selectable character
                data. This converter processes stored text characters. It cannot
                read images.
              </p>
              <p className="myth-card-text">
                Run the scanned PDF through an OCR tool first to extract the text
                as selectable characters. Then paste the extracted text here and
                convert.
              </p>
              <p className="myth-card-text">
                OCR and conversion are two separate steps. OCR turns an image into
                text. This converter changes the encoding of that text.
              </p>
            </div>

            <div className="glass-card glass-card--myth glass-card--myth-deep">
              <h3 className="myth-card-title">
                Some Devanagari Sequences Look Wrong After Conversion
              </h3>
              <p className="myth-card-text">
                Some Unicode Hindi text contains control characters such as Zero
                Width Joiner (ZWJ, U+200D) to shape conjuncts or half-consonant
                forms. Unicode 17.0 documents ZWJ as a meaningful character in
                Devanagari rendering, used to request specific half-form or
                conjunct behavior (Source: Unicode Standard 17.0, Chapter 12,{' '}
                <a
                  href="https://www.unicode.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  unicode.org
                </a>
                ).
              </p>
              <p className="myth-card-text">
                Do not delete ZWJ characters without checking whether they are
                intentional. If a sequence involving virama or ZWJ converts
                differently than expected, inspect the source character sequence
                and compare the output against a known reference. The converter
                handles standard halant-based conjuncts. If your source text uses
                unusual shaping sequences, check the output carefully.
              </p>
            </div>

            <div className="glass-card glass-card--myth">
              <h3 className="myth-card-title">
                Text From Other Legacy Hindi Fonts Looks Garbled
              </h3>
              <p className="myth-card-text">
                This converter handles Updesh-related legacy text and Unicode
                Hindi text. Text encoded with other legacy Hindi font systems
                such as Devlys, Chanakya, or Shree-Lipi uses different character
                mappings. Pasting text from those fonts will produce incorrect
                output because their encoding is not the same as the encoding this
                tool uses. A converter specific to those encodings is needed
                first.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="key-takeaways">
        <div className="container">
          <aside
            id="key-takeaways-block"
            aria-label="Key takeaways"
            className="glass-card glass-card--lg"
          >
            <h2 className="section-heading">Key Takeaways</h2>
            <ul className="quick-answer-list quick-answer-list--stacked">
              <li>
                Updesh is a legacy Hindi text format. It stores Devanagari using
                a character mapping that depends on a specific font being active
                to display correctly.
              </li>
              <li>
                This Updesh converter works in both directions: Unicode to Updesh
                legacy format, and Updesh legacy format to Unicode.
              </li>
              <li>
                The converter handles Unicode Devanagari input. Unicode text uses
                the same underlying character encoding regardless of which Unicode
                font displays it visually.
              </li>
              <li>
                The i-vowel sign (sihaari, U+093F) requires a different character
                order in legacy formats than in Unicode. The converter is designed
                to handle this reordering.
              </li>
              <li>
                Legacy text from other font systems such as Devlys or Chanakya is
                not supported as input.
              </li>
              <li>
                The conversion runs in your browser. No text is sent to a server.
              </li>
              <li>No download, no account, no usage limit.</li>
            </ul>
            <p>
              Verified by{' '}
              <Link href="/about-us">Akshay Verma</Link>, Software Developer and
              Hindi Typing Expert. Last tested: September 2026.
            </p>
          </aside>
        </div>
      </section>

      <section className="content-block section-dark" id="related-resources">
        <div className="container">
          <h2 className="section-heading">
            Related Tools <span className="highlight">and Internal Links</span>
          </h2>
          <RelatedTools currentPath={UPDESH_PATH} variant="section" />
        </div>
      </section>

      <section className="content-block section-alt" id="faq">
        <div className="container">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="faq-accordion">
            <details className="faq-item">
              <summary>What is the Updesh font converter?</summary>
              <div className="faq-content faq-content--padded">
                <p>
                  The Updesh font converter is a free browser-based tool that
                  converts Hindi text between Updesh legacy encoding and Unicode
                  Devanagari. It works in both directions and requires no sign-up
                  or installation.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>Is Updes the same as Updesh?</summary>
              <div className="faq-content faq-content--padded">
                <p>
                  Yes as a search term. Updes, Updesh, and the UPDES NIC
                  converter all refer to KrutiDev-10 / KrutiDev 010 conversion.
                  The UPDES portal at updes.up.nic.in is operated by the
                  Directorate of Economics and Statistics, Government of Uttar
                  Pradesh, and documents KrutiDev-10. This page uses that
                  Remington map for all three names.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>Is Updesh the same as KrutiDev 010?</summary>
              <div className="faq-content faq-content--padded">
                <p>
                  This converter uses the KrutiDev 010 Remington ASCII map.
                  There is no separately documented Updesh encoding or
                  Updesh.ttf. Search terms Updesh and Updes refer to UP
                  government / UPDES KrutiDev-10 workflows. Text converted here
                  is the same encoding as KrutiDev 010.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>How do I convert Updesh text to Unicode online?</summary>
              <div className="faq-content faq-content--padded">
                <p>
                  Paste your Updesh legacy text into the converter input box.
                  Select the Updesh-to-Unicode direction if it is not already
                  active. The Unicode output appears instantly. Copy the output
                  and paste it into any application that supports Unicode
                  Devanagari text.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                Can I convert Unicode Hindi to Updesh using this tool?
              </summary>
              <div className="faq-content faq-content--padded">
                <p>
                  Yes. Paste Unicode Hindi text into the input box and select the
                  Unicode-to-Updesh direction. The converted legacy text appears
                  in the output box. Apply the appropriate legacy font in your
                  target application after pasting so the Hindi displays
                  correctly.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>What is the UPDES NIC font converter?</summary>
              <div className="faq-content faq-content--padded">
                <p>
                  The UPDES site at{' '}
                  <a
                    href="https://updes.up.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    updes.up.nic.in
                  </a>{' '}
                  is operated by the Directorate of Economics and Statistics,
                  Government of Uttar Pradesh. It provides a browser-based utility
                  documented as a KrutiDev-10 to Unicode and Unicode to
                  KrutiDev-10 converter (Source:{' '}
                  <a
                    href="https://updes.up.nic.in/esd/font_converter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    updes.up.nic.in/esd/font_converter
                  </a>
                  ).
                </p>
                <p>
                  This page at UnicodeKruti addresses the same conversion search
                  intent with both directions available, no government portal
                  login required, and mobile browser support.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                Why does my converted text show as random letters in MS Word?
              </summary>
              <div className="faq-content faq-content--padded">
                <p>
                  The conversion is working as expected. The legacy font is not
                  applied. Select the pasted text in MS Word, open the font
                  selector, and apply the appropriate legacy Hindi font. Without
                  that font, legacy-encoded text displays as the underlying
                  keyboard characters rather than Devanagari. This is normal
                  behavior for legacy font-dependent text.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                Do I need to download anything to use this converter?
              </summary>
              <div className="faq-content faq-content--padded">
                <p>
                  No. The converter runs in your browser. If you need a legacy
                  font file to display converted text in MS Word or another
                  application, that is a separate requirement. Visit the{' '}
                  <Link href="/font-download">KrutiDev font download (010 &amp; 055 TTF)</Link> for the
                  font file.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>Does this Updesh converter work on mobile?</summary>
              <div className="faq-content faq-content--padded">
                <p>
                  Yes. It works in Chrome, Safari, Firefox, and Edge on Android
                  and iPhone. No app download is needed.
                </p>
              </div>
            </details>

            <details className="faq-item">
              <summary>
                Is my text sent to a server when I use this tool?
              </summary>
              <div className="faq-content faq-content--padded">
                <p>
                  The conversion runs in your browser. This is especially
                  relevant for users working with administrative or confidential
                  documents. Verify with your own network inspection if your use
                  case requires confirmed local-only processing.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section
        className="content-block section-dark"
        id="references"
        aria-label="References"
      >
        <div className="container">
          <h2 className="section-heading">References</h2>
          <ol className="content-numbered-list">
            <li>
              Unicode Standard 17.0, Chapter 12: South and Central Asia. Unicode
              Consortium.{' '}
              <a
                href="https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-12/"
                target="_blank"
                rel="noopener noreferrer"
              >
                unicode.org/versions/Unicode17.0.0/core-spec/chapter-12/
              </a>
            </li>
            <li>
              Department of Official Language, Introduction and Unicode guidance.
              Ministry of Home Affairs, Government of India.{' '}
              <a
                href="https://rajbhasha.gov.in/en/introduction"
                target="_blank"
                rel="noopener noreferrer"
              >
                rajbhasha.gov.in/en/introduction
              </a>
            </li>
            <li>
              Department of Official Language, Rules and Notifications.{' '}
              <a
                href="https://rajbhasha.gov.in/sites/default/files/niyampustak_eng_dec2021.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                rajbhasha.gov.in/sites/default/files/niyampustak_eng_dec2021.pdf
              </a>
            </li>
            <li>
              UPDES Font Converter. Directorate of Economics and Statistics,
              Government of Uttar Pradesh.{' '}
              <a
                href="https://updes.up.nic.in/esd/font_converter/"
                target="_blank"
                rel="noopener noreferrer"
              >
                updes.up.nic.in/esd/font_converter/
              </a>
            </li>
            <li>
              UPPSC RO/ARO Typing Test Notice. Uttar Pradesh Public Service
              Commission.{' '}
              <a
                href="https://uppsc.up.nic.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                uppsc.up.nic.in
              </a>
            </li>
            <li>
              Guidelines for Indian Government Websites (GIGW 3.0).{' '}
              <a
                href="https://mksy.up.gov.in/women_welfare_test/pdf/gigw3.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                mksy.up.gov.in/women_welfare_test/pdf/gigw3.pdf
              </a>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
