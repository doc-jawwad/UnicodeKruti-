import Link from 'next/link';
import { nirmalaUiFaqs, nirmalaUiFaqsHindi, nirmalaUiMeta } from '@/content/nirmala-ui';
import ExpertQuote from '@/components/seo/ExpertQuote';
import RelatedTools from '@/components/seo/RelatedTools';
import { externalLinkRel } from '@/lib/seo/external-links';

/** SSR body sections for /nirmala-ui-to-krutidev-converter */
export default function NirmalaUiPageBody() {
  return (
    <>
      <section className="toc-section section-dark" id="table-of-contents">
        <div className="container">
          <details className="toc-wrapper-collapsible">
            <summary className="toc-summary-bar">
              <span>Table of Contents</span>
              <span className="toc-toggle-icon"></span>
            </summary>
            <div className="toc-content-list">
              <a href="#what-is-nirmala-ui" className="toc-link-item">
                What Is Nirmala UI?
              </a>
              <a href="#how-to-convert" className="toc-link-item">
                How to Convert Nirmala UI to KrutiDev
              </a>
              <a href="#does-font-matter" className="toc-link-item">
                Does the Source Font Matter?
              </a>
              <a href="#who-uses" className="toc-link-item">
                Who Uses This Tool?
              </a>
              <a href="#expert-validation" className="toc-link-item">
                Expert Validation
              </a>
              <a href="#common-errors" className="toc-link-item">
                Common Errors and Fixes
              </a>
              <a href="#faq" className="toc-link-item">
                Frequently Asked Questions
              </a>
            </div>
          </details>
        </div>
      </section>

      <section className="content-block section-alt" id="what-is-nirmala-ui">
        <div className="container">
          <h2 className="section-heading">
            What Is <span className="highlight">Nirmala UI?</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Nirmala UI is Microsoft&apos;s official Hindi display font. It
              shipped with Windows 8 in 2012 and has been the default Devanagari
              font on Windows 10 and Windows 11 ever since.
            </p>
            <p>
              When you copy Hindi text from a website, a WhatsApp message, a
              Google Doc, an Excel file, or any NIC government portal on a modern
              Windows computer, that text is almost always in Nirmala UI.
            </p>
            <p>
              Nirmala UI stores Hindi using Unicode. Specifically, it uses
              Devanagari code points U+0900 to U+097F — the international
              standard for Hindi characters defined by the Unicode Consortium.
            </p>
            <p>
              KrutiDev does not use Unicode. It maps Hindi letters onto ASCII
              positions in its own encoding. That is why you cannot just switch
              the font to KrutiDev in MS Word and expect it to work. The text
              turns into random English symbols because Word is reading Unicode
              data through a non-Unicode lens.
            </p>
            <p>
              This converter fixes that. It re-maps every character from Unicode
              to KrutiDev encoding — instantly, in your browser, with nothing
              uploaded to any server.
            </p>
          </div>
        </div>
      </section>

      <section
        className="howto-section section-dark"
        id="how-to-convert"
        itemScope
        itemType="https://schema.org/HowTo"
      >
        <div className="container">
          <h2 className="section-heading" itemProp="name">
            How to Convert Nirmala UI to{' '}
            <span className="highlight">KrutiDev</span>
          </h2>
          <p className="section-desc" itemProp="description">
            Convert Nirmala UI or any Unicode Hindi text to KrutiDev 010 encoding
            using the UnicodeKruti free online tool. No download or signup
            required. Done in under 10 seconds.
          </p>
          <meta itemProp="totalTime" content="PT10S" />

          <div className="howto-steps-container">
            <div
              className="howto-row"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="howto-content-col">
                <div className="howto-step-badge">Step 1</div>
                <h3 itemProp="name">Copy your Nirmala UI text</h3>
                <p itemProp="text">
                  Copy Hindi text from any modern source — a government portal,
                  WhatsApp, Google Docs, MS Word, or an Excel cell. If your text
                  shows correctly on a phone without installing a special font,
                  it is Unicode and this tool will handle it.
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
                <h3 itemProp="name">Paste into the converter</h3>
                <p itemProp="text">
                  Paste your text into the input box. The conversion runs live in
                  your browser. No button click is needed for short text. For
                  longer documents, click Convert.
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
                <h3 itemProp="name">Copy the KrutiDev 010 output</h3>
                <p itemProp="text">
                  Copy the output from the right box. Paste into MS Word. Select
                  the pasted text and apply KrutiDev 010 from the font list. Your
                  Hindi will display correctly.
                </p>
              </div>
            </div>
          </div>

          <p className="section-desc" style={{ marginTop: '1.5rem' }}>
            Total time: under 10 seconds.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="does-font-matter">
        <div className="container">
          <h2 className="section-heading">
            Does the Source Font <span className="highlight">Matter?</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              No. This is the part most people get wrong.
            </p>
            <p>
              Nirmala UI, Mangal, Kokila, Arial Unicode MS, Aparajita, and Gargi
              are all different visual styles for the same underlying Unicode
              data. They all store Hindi using Devanagari code points U+0900 to
              U+097F.
            </p>
            <p>
              The font name only changes how text looks on your screen. The data
              underneath is identical.
            </p>
            <p>
              So converting Nirmala UI to KrutiDev gives the exact same output as
              converting Mangal to KrutiDev, because both fonts are reading from
              the same Unicode standard. The sitewide hub for any Unicode source
              is the{' '}
              <Link href="/">Unicode to KrutiDev converter</Link>; this page is
              the Windows Nirmala UI landing for the same 010 mapping.
            </p>
          </div>

          <div className="table-wrapper glass-card glass-card--lg glass-card--mt">
            <table className="data-table compare-table">
              <caption className="screen-reader-text">
                Which fonts convert on this Nirmala UI to KrutiDev tool
              </caption>
              <thead>
                <tr>
                  <th scope="col">Font</th>
                  <th scope="col">Type</th>
                  <th scope="col">Converts Here?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Nirmala UI</strong>
                  </td>
                  <td>Unicode — Windows default</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <strong>Mangal</strong>
                  </td>
                  <td>Unicode — Windows bundled</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <strong>Kokila</strong>
                  </td>
                  <td>Unicode — Windows bundled</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <strong>Arial Unicode MS</strong>
                  </td>
                  <td>Unicode — Office bundled</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <strong>Aparajita</strong>
                  </td>
                  <td>Unicode</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>
                    <strong>KrutiDev</strong>
                  </td>
                  <td>Non-Unicode — ASCII-based</td>
                  <td>
                    Use{' '}
                    <Link href="/krutidev-to-unicode-converter">
                      reverse tool
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Devlys</strong>
                  </td>
                  <td>Non-Unicode — ASCII-based</td>
                  <td>Different encoding</td>
                </tr>
                <tr>
                  <td>
                    <strong>Chanakya</strong>
                  </td>
                  <td>Non-Unicode — ASCII-based</td>
                  <td>Different encoding</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="content-prose content-prose--left glass-card glass-card--lg glass-card--mt">
            <p>
              <strong>Simple rule:</strong> if your Hindi text shows correctly on
              a smartphone without installing any extra font, it is Unicode and
              this tool converts it.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="who-uses">
        <div className="container">
          <h2 className="section-heading">
            Who Uses <span className="highlight">This Tool?</span>
          </h2>

          <h3 className="section-subheading">
            Government typists and Rajbhasha officials
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              Modern NIC portals, Office 365, and government email systems all
              output text in Nirmala UI or other Unicode fonts. Many departmental
              workflows still require KrutiDev 010 for file notings, office
              orders, and older departmental software. This converter handles
              that switch in one step. For UP Remington / Updesh systems, see the{' '}
              <Link href="/updesh-converter">Updesh converter</Link>. For any
              Unicode source (not only Nirmala UI), the{' '}
              <Link href="/">Unicode to KrutiDev converter</Link> on the homepage
              is the general hub.
            </p>
          </div>

          <h3 className="section-subheading">
            CPCT and UPSSSC exam candidates
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              The CPCT exam (Madhya Pradesh government) and UPSSSC typing test
              (Uttar Pradesh government) both require KrutiDev 010 with Remington
              keyboard layout. Students who practise on modern computers in
              Nirmala UI use this converter to verify their output matches exam
              software requirements. Need KrutiDev 10 labelling for coaching
              software? Use the{' '}
              <Link href="/unicode-to-krutidev-10-converter">
                Unicode to KrutiDev 10 converter
              </Link>
              . Already have KrutiDev practice files to make readable? Open the{' '}
              <Link href="/krutidev-010-to-unicode-converter">
                KrutiDev 010 to Unicode
              </Link>{' '}
              page.
            </p>
          </div>

          <h3 className="section-subheading">
            DTP operators and Hindi publishers
          </h3>
          <div className="content-prose content-prose--left">
            <p>
              Newspaper typesetters and printing press operators receive Unicode
              documents from clients but need KrutiDev 010 for PageMaker and
              CorelDRAW workflows. This converter bridges that gap without any
              software installation.
            </p>
          </div>

          <h3 className="section-subheading">MS Word and Excel users</h3>
          <div className="content-prose content-prose--left">
            <p>
              Hindi text pasted into MS Word or Excel from a modern source
              defaults to Nirmala UI. Convert it here, paste back, apply KrutiDev
              010 font, done.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="expert-validation">
        <div className="container">
          <h2 className="section-heading">
            Expert <span className="highlight">Validation</span>
          </h2>
          <div className="content-prose content-prose--left">
            <p>
              Mapping accuracy is verified by Akshay Verma against CPCT practice
              papers and government document samples. Conversion stays in your
              browser — pasted text is not uploaded.
            </p>
          </div>
          <ExpertQuote quote="Nirmala UI and Mangal store the same Devanagari code points. If your Windows document reads correctly without KrutiDev installed, paste it here for KrutiDev 010 — you do not need a separate engine per font name." />
        </div>
      </section>

      <section className="content-block section-dark" id="common-errors">
        <div className="container">
          <h2 className="section-heading">
            Common Errors and <span className="highlight">Fixes</span>
          </h2>

          <div className="myth-card-list">
            <div className="glass-card glass-card--myth">
              <h3 className="myth-card-title">
                Output shows random English letters in MS Word
              </h3>
              <p className="myth-card-text">
                You pasted the converted text but did not apply the KrutiDev 010
                font. Select all pasted text in Word, open the font dropdown, and
                choose KrutiDev 010. The Hindi will appear correctly. Need the
                file?{' '}
                <Link href="/font-download">Download KrutiDev 010</Link>.
              </p>
            </div>

            <div className="glass-card glass-card--myth glass-card--myth-mid">
              <h3 className="myth-card-title">
                Half-letters or matras look broken
              </h3>
              <p className="myth-card-text">
                Your source text may contain Zero Width Joiner characters
                (U+200D) from certain input apps. Try typing fresh using Google
                Input Tools, which outputs clean Unicode, then convert.
              </p>
            </div>

            <div className="glass-card glass-card--myth glass-card--myth-deep">
              <h3 className="myth-card-title">
                Conjuncts like क्ष or ज्ञ are wrong
              </h3>
              <p className="myth-card-text">
                Standard conjuncts are fully supported. If errors appear, your
                source text is likely from a non-Unicode font such as Devlys,
                Chanakya, or KrutiDev. Use the{' '}
                <Link href="/krutidev-to-unicode-converter">
                  KrutiDev to Unicode Converter
                </Link>{' '}
                for those inputs.
              </p>
            </div>

            <div className="glass-card glass-card--myth">
              <h3 className="myth-card-title">PDF text pastes as symbols</h3>
              <p className="myth-card-text">
                Scanned PDFs have no extractable text. Run OCR on the PDF first,
                then paste the extracted Unicode text here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="faq">
        <div className="container">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="faq-accordion" style={{ maxWidth: 900, margin: '2rem auto 0' }}>
            {nirmalaUiFaqs.map((faq) => (
              <details className="faq-item" key={faq.question}>
                <summary>{faq.question}</summary>
                <div className="faq-content faq-content--padded">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        className="content-block section-alt"
        id="faq-hindi"
        lang="hi"
        dir="ltr"
        aria-label="Section in Hindi"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="container">
          <h2 className="section-heading">
            अक्सर पूछे जाने वाले{' '}
            <span className="highlight">सवाल</span>
          </h2>
          <div className="faq-accordion" style={{ maxWidth: 900, margin: '2rem auto 0' }}>
            {nirmalaUiFaqsHindi.map((faq) => (
              <details
                className="faq-item"
                key={faq.question}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary itemProp="name">
                  <span lang="hi" dir="ltr">
                    {faq.question}
                  </span>
                </summary>
                <div
                  className="faq-content faq-content--padded"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">
                    <span lang="hi" dir="ltr">
                      {faq.answer}
                    </span>
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="content-block section-dark" id="key-facts">
        <div className="container">
          <aside
            id="key-takeaways"
            aria-label="Key facts"
            className="glass-card glass-card--lg"
          >
            <h2 className="section-heading" style={{ marginBottom: '1.25rem' }}>
              Key Facts
            </h2>
            <ul className="quick-answer-list quick-answer-list--stacked">
              <li>
                Nirmala UI is the default Hindi font on Windows 10 and Windows 11
                (Source:{' '}
                <a
                  href="https://learn.microsoft.com/en-us/typography/font-list/nirmala-ui"
                  target="_blank"
                  rel={externalLinkRel(
                    'https://learn.microsoft.com/en-us/typography/font-list/nirmala-ui'
                  )}
                >
                  Microsoft Typography
                </a>
                )
              </li>
              <li>
                The Devanagari Unicode block contains 128 assigned code points
                (U+0900 to U+097F) shared by all Unicode Hindi fonts including
                Nirmala UI, Mangal, and Kokila (Source:{' '}
                <a
                  href="https://www.unicode.org/versions/Unicode15.1.0/"
                  target="_blank"
                  rel={externalLinkRel(
                    'https://www.unicode.org/versions/Unicode15.1.0/'
                  )}
                >
                  Unicode Consortium, Unicode Standard Version 15.1
                </a>
                )
              </li>
              <li>
                KrutiDev 010 is the mandatory font for CPCT (MP), UPSSSC (UP), and
                RPSC LDC (Rajasthan) government typing tests as of 2026
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="content-block section-alt" id="related-resources">
        <div className="container">
          <h2 className="section-heading">
            Related Tools <span className="highlight">and Resources</span>
          </h2>
          <p className="section-desc">
            Tools and guides for Hindi typing and conversion workflows.
          </p>
          <RelatedTools currentPath={nirmalaUiMeta.path} variant="section" />
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
              Unicode Consortium. Devanagari Block: U+0900 to U+097F.{' '}
              <a
                href="https://www.unicode.org/charts/PDF/U0900.pdf"
                target="_blank"
                rel={externalLinkRel('https://www.unicode.org/charts/PDF/U0900.pdf')}
              >
                unicode.org/charts/PDF/U0900.pdf
              </a>
            </li>
            <li>
              Microsoft Typography. Nirmala UI — Devanagari UI font for Windows.{' '}
              <a
                href="https://learn.microsoft.com/en-us/typography/font-list/nirmala-ui"
                target="_blank"
                rel={externalLinkRel(
                  'https://learn.microsoft.com/en-us/typography/font-list/nirmala-ui'
                )}
              >
                learn.microsoft.com/typography/font-list/nirmala-ui
              </a>
            </li>
            <li>
              Bureau of Indian Standards. IS 16652: Hindi Keyboard Layout
              (InScript).{' '}
              <a
                href="https://www.bis.gov.in"
                target="_blank"
                rel={externalLinkRel('https://www.bis.gov.in')}
              >
                bis.gov.in
              </a>
            </li>
            <li>
              CPCT Exam Guidelines. Madhya Pradesh Professional Examination
              Board.{' '}
              <a
                href="https://peb.mp.gov.in"
                target="_blank"
                rel={externalLinkRel('https://peb.mp.gov.in')}
              >
                peb.mp.gov.in
              </a>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
