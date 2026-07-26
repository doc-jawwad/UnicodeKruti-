import Link from 'next/link';
import Toc from '@/components/seo/Toc';
import SocialShare from '@/components/seo/SocialShare';
import StatsBar from '@/components/layout/StatsBar';
import VerificationBanner from '@/components/layout/VerificationBanner';
import ClientConverter from '@/components/converter/ClientConverter';
import { homeFaqs, homeHowToSteps, homeMeta, homeToc } from '@/content/home';
import { absoluteUrl } from '@/lib/seo/metadata';

export default function HomePageContent() {
  return (
    <>
      <section className="hero-section" id="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>{homeMeta.title}</h1>
            <p className="hero-subtitle">{homeMeta.description}</p>
            <div className="key-summary">
              <p>
                <strong>Key summary:</strong> Paste Unicode Hindi (Mangal, Kokila, or any Unicode
                font), get KrutiDev 010 ASCII instantly in your browser — no font install required to
                run the conversion.
              </p>
            </div>
          </div>

          <div className="tool-wrapper glass-card">
            <ClientConverter
              mode="uni-to-kd"
              variant="010"
              exampleSource="नमस्ते भारत"
              exampleHint="नमस्ते भारत"
              ctaHref="/krutidev-to-unicode"
              ctaText="Need KrutiDev to Unicode? Try our KrutiDev to Unicode converter"
            />
          </div>

          <p className="hero-secondary-cta">
            Looking for KrutiDev 010 → Unicode?{' '}
            <Link href="/krutidev-010-to-unicode-converter">
              Open the KrutiDev 010 converter →
            </Link>
            {' · '}
            Looking for KrutiDev 10 / Kurtidev10?{' '}
            <Link href="/krutidev-10-to-unicode-converter">
              Open the KrutiDev 10 converter →
            </Link>
          </p>

          <StatsBar />
          <VerificationBanner />
        </div>
      </section>

      <section className="content-block section-alt">
        <div className="container">
          <Toc items={homeToc} />
        </div>
      </section>

      <section className="content-block" id="what-is-converter">
        <div className="container prose">
          <h2>What Is a Unicode to KrutiDev Converter?</h2>
          <p>
            It is an online Unicode to Kruti Dev converter that changes Hindi text typed in modern
            fonts — Mangal, Kokila, Nirmala UI — into the legacy KrutiDev 010 format required by
            government offices, CPCT typing exams, district court registries, and DTP software like
            PageMaker.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="how-to-use">
        <div className="container prose">
          <h2>How to Use This Unicode to KrutiDev Converter</h2>
          <p>Three steps. Under 10 seconds total.</p>
          {homeHowToSteps.map((step, index) => (
            <article key={step.name} className="step-card">
              <div className="step-badge">Step {index + 1}</div>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </article>
          ))}
          <div className="callout">
            <p>
              <strong>Important:</strong> Without the Kruti Dev 010 font installed, the output will
              look like random English letters, for example भारत becomes Hkkjr. That is not an
              error. Apply Kruti Dev 010 in Word to display correct Hindi.
            </p>
          </div>
        </div>
      </section>

      <section className="content-block" id="how-it-works">
        <div className="container prose">
          <h2>How This Unicode to KrutiDev Font Converter Works</h2>
          <p>
            This font converter unicode to krutidev reads each character’s Unicode code point, finds
            its matching KrutiDev ASCII character in a verified lookup table, and replaces it. The
            process runs across the entire input in milliseconds.
          </p>
          <ol className="pipeline">
            <li>Unicode Text Input</li>
            <li>Read Unicode Code Point (e.g. क = U+0915)</li>
            <li>Character Lookup Table</li>
            <li>Find KrutiDev ASCII Match (e.g. k = ASCII 107)</li>
            <li>Replace Character</li>
            <li>KrutiDev-Encoded Output</li>
            <li>Paste &amp; Apply Font — Hindi Displays Correctly</li>
          </ol>
        </div>
      </section>

      <section className="content-block section-alt" id="real-example">
        <div className="container prose">
          <h2>A Real Example — How भारत Becomes Hkkjr</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Hindi Character</th>
                  <th>Unicode Code Point</th>
                  <th>KrutiDev ASCII Output</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>भ</td><td>U+092D</td><td>Hk</td></tr>
                <tr><td>ा</td><td>U+093E</td><td>k</td></tr>
                <tr><td>र</td><td>U+0930</td><td>j</td></tr>
                <tr><td>त</td><td>U+0924</td><td>r</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>KrutiDev Output:</strong> <code className="font-krutidev">Hkkjr</code>
          </p>
        </div>
      </section>

      <section className="content-block" id="source-font">
        <div className="container prose">
          <h2>Does the Source Font Matter? Mangal, Kokila, Arial Unicode, Gargi</h2>
          <p>
            No. Mangal, Kokila, Nirmala UI, Arial Unicode, and Gargi all store Hindi using identical
            Devanagari code points. This converter works on the underlying encoding, not the visual
            font style. Devlys, Chanakya, and Shree-Lipi are not Unicode fonts and will not convert
            correctly here.
          </p>
          <h3>Key takeaways</h3>
          <ul>
            <li>Unicode fonts share the same Devanagari code points</li>
            <li>Source font name does not change KrutiDev 010 accuracy</li>
            <li>Non-Unicode legacy fonts (Devlys, Chanakya, Shree-Lipi) need a different tool</li>
          </ul>
          <h3>Mini FAQ</h3>
          <details className="faq-item">
            <summary>What is the difference between Mangal and KrutiDev?</summary>
            <p>
              Mangal is a Unicode font. KrutiDev is a non-Unicode ASCII remapping. This tool converts
              Mangal/Unicode text into KrutiDev 010 encoding.
            </p>
          </details>
          <details className="faq-item">
            <summary>Does Kokila vs Nirmala UI change the output?</summary>
            <p>No. Identical Unicode text produces identical KrutiDev output.</p>
          </details>
        </div>
      </section>

      <section className="content-block section-alt" id="hindi-block" lang="hi">
        <div className="container prose">
          <h2>यूनिकोड से कृतिदेव कनवर्टर — मुफ्त ऑनलाइन टूल</h2>
          <p>
            यह टूल मंगल, कोकिला, निर्मला UI जैसे यूनिकोड फॉन्ट को कृतिदेव 010 में बदलता है। सरकारी
            कार्यालय, CPCT, UPSSSC, राजभाषा और DTP वर्कफ्लो के लिए उपयुक्त। पेस्ट करें, कन्वर्ट करें,
            कॉपी करें. कोई सॉफ्टवेयर नहीं, कोई साइनअप नहीं।
          </p>
        </div>
      </section>

      <section className="content-block" id="who-uses">
        <div className="container prose">
          <h2>Who Uses This Converter and Why</h2>
          <div className="card-grid">
            <article className="info-card">
              <h3>Government Typists</h3>
              <p>
                Secretariat typists draft in Mangal, then convert to KrutiDev 010 before legacy DMS
                submission.
              </p>
            </article>
            <article className="info-card">
              <h3>CPCT &amp; State Exam Candidates</h3>
              <p>
                Convert Unicode practice material to KrutiDev 010 so practice matches the exam
                environment.
              </p>
            </article>
            <article className="info-card">
              <h3>DTP &amp; Publishers</h3>
              <p>
                Writers submit Unicode; print teams need KrutiDev for PageMaker and CorelDRAW.
              </p>
            </article>
            <article className="info-card">
              <h3>Court &amp; Legal Staff</h3>
              <p>
                Convert confidential records in-browser — text never leaves your device.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="unicode-vs-krutidev">
        <div className="container prose">
          <h2>Unicode vs KrutiDev — Key Differences</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Unicode (Mangal, Kokila)</th>
                  <th>KrutiDev 010</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Encoding type</td>
                  <td>ISO 10646, universal standard</td>
                  <td>Proprietary ASCII remapping</td>
                </tr>
                <tr>
                  <td>Font install needed</td>
                  <td>No</td>
                  <td>Yes, on every reading device</td>
                </tr>
                <tr>
                  <td>Works on Android and iOS</td>
                  <td>Yes</td>
                  <td>No without font</td>
                </tr>
                <tr>
                  <td>Gmail / WhatsApp</td>
                  <td>Works</td>
                  <td>Breaks</td>
                </tr>
                <tr>
                  <td>Government exams</td>
                  <td>NIC / eOffice portals</td>
                  <td>CPCT, UPSSSC, Patwari</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="content-block" id="common-errors">
        <div className="container prose">
          <h2>Common Conversion Errors and Fixes</h2>
          <details className="faq-item">
            <summary>Error 1: Output Shows Random English Letters</summary>
            <p>
              Cause: Kruti Dev 010 font is not installed. Fix: Download the font, install it, select
              the pasted text in Word, and set the font to Kruti Dev 010.
            </p>
          </details>
          <details className="faq-item">
            <summary>Error 2: Half-Characters or Conjuncts Look Wrong</summary>
            <p>
              Cause: ZWJ-based conjuncts. Fix: remove ZWJ characters and reconvert using standard
              halant-based conjuncts.
            </p>
          </details>
          <details className="faq-item">
            <summary>Error 3: Correct in Output Box, Wrong in Word</summary>
            <p>
              Cause: Word still uses Calibri or Mangal. Fix: select pasted text and change font to
              Kruti Dev 010.
            </p>
          </details>
          <details className="faq-item">
            <summary>Error 4: Scanned PDF Text Does Not Convert</summary>
            <p>
              Cause: scanned PDFs are images. Fix: run OCR first, then paste extracted Unicode text.
            </p>
          </details>
        </div>
      </section>

      <section className="content-block section-alt" id="what-is-unicode">
        <div className="container prose">
          <h2>What Is Unicode?</h2>
          <p>
            Unicode is the global standard for storing text digitally. Every Hindi letter has a
            permanent unique code point. The letter क is always U+0915 on every phone, computer, and
            website.
          </p>
        </div>
      </section>

      <section className="content-block" id="what-is-krutidev">
        <div className="container prose">
          <h2>What Is KrutiDev?</h2>
          <p>
            KrutiDev is India’s most widely used legacy Hindi font encoding. It stores Hindi as
            remapped ASCII characters that only display as Hindi when the KrutiDev font file is
            installed. Without the font, every character shows as a random English letter.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="mobile">
        <div className="container prose">
          <h2>Does This Unicode to KrutiDev Converter Work on Mobile?</h2>
          <p>
            Yes. Paste, convert, and copy work with touch input. No app download is required to run
            the conversion.
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Browser and Device</th>
                  <th>Supported</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Chrome (Desktop and Android)</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Safari (Mac and iOS)</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Firefox</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Microsoft Edge</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Opera</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Internet Explorer</td>
                  <td>No (discontinued)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="content-block" id="related">
        <div className="container prose">
          <h2>Related Tools and Resources</h2>
          <div className="card-grid">
            <Link href="/krutidev-to-unicode" className="info-card">
              <h3>KrutiDev to Unicode Converter</h3>
              <p>Convert legacy KrutiDev text to Unicode for Gmail, WhatsApp, and NIC portals.</p>
            </Link>
            <Link href="/krutidev-010-to-unicode-converter" className="info-card">
              <h3>KrutiDev 010 to Unicode Converter</h3>
              <p>Government-standard KrutiDev 010 → Unicode for CPCT and Digital India portals.</p>
            </Link>
            <Link href="/krutidev-10-to-unicode-converter" className="info-card">
              <h3>KrutiDev 10 to Unicode Converter</h3>
              <p>Dedicated tool for KrutiDev 10 / Kurtidev10 documents.</p>
            </Link>
            <a href="/fonts/KrutiDev010.ttf" download className="info-card">
              <h3>Download KrutiDev Font</h3>
              <p>Download KrutiDev 010 TTF for Windows and Mac.</p>
            </a>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="references">
        <div className="container prose">
          <h2>References</h2>
          <ul>
            <li>
              <a
                href="https://www.unicode.org/versions/Unicode15.1.0/"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Unicode Standard, Version 15.1
              </a>
            </li>
            <li>
              <a href="https://rajbhasha.gov.in" target="_blank" rel="noopener noreferrer">
                Official Language Act / Rajbhasha
              </a>
            </li>
            <li>
              <a href="https://meity.gov.in" target="_blank" rel="noopener noreferrer">
                Digital India Programme
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-block" id="faq">
        <div className="container prose">
          <h2>Frequently Asked Questions</h2>
          {homeFaqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p lang={/[\u0900-\u097F]/.test(faq.question) ? 'hi' : undefined}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="content-block">
        <div className="container">
          <SocialShare title={homeMeta.title} url={absoluteUrl('/')} />
        </div>
      </section>
    </>
  );
}
