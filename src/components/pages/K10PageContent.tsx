import Link from 'next/link';
import Toc from '@/components/seo/Toc';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SocialShare from '@/components/seo/SocialShare';
import StatsBar from '@/components/layout/StatsBar';
import VerificationBanner from '@/components/layout/VerificationBanner';
import ClientConverter from '@/components/converter/ClientConverter';
import {
  k10Faqs,
  k10FaqsHindi,
  k10HowToSteps,
  k10Meta,
  k10NameRows,
  k10Toc,
} from '@/content/k10';
import { absoluteUrl } from '@/lib/seo/metadata';

export default function K10PageContent() {
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { label: 'KrutiDev 10 to Unicode Converter' },
          ]}
        />
      </div>

      <section className="hero-section section-dark" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content">
            <h1>{k10Meta.title}</h1>
            <p className="hero-subtitle">{k10Meta.description}</p>
            <div className="key-summary">
              <p>
                <strong>Key summary:</strong> This page targets Kurtidev10 / Kruti Dev 10 / K10
                naming searches. The mapping matches KrutiDev 010. For official government naming,
                use the{' '}
                <Link href="/krutidev-010-to-unicode-converter">KrutiDev 010 converter</Link>. For
                the general hub, see{' '}
                <Link href="/krutidev-to-unicode">KrutiDev to Unicode</Link>.
              </p>
            </div>
            <ul className="hero-bullets">
              <li>Handles KrutiDev 10, Kurtidev10, Kruti Dev 10, K10 — same mapping</li>
              <li>Runs entirely in your browser — no server upload</li>
              <li>Matras, half-characters &amp; conjuncts handled automatically</li>
              <li>Export as TXT, Word, PDF, or copy/share</li>
            </ul>
          </div>
          <div className="tool-wrapper glass-card">
            <ClientConverter
              mode="kd-to-uni"
              variant="10"
              exampleSource="kqfr nsO"
              exampleHint="kqfr nsO → कृति देव"
              ctaHref="/"
              ctaText="Need Unicode to KrutiDev 010? Try our homepage converter"
            />
            <StatsBar />
          </div>
          <div className="verification-inline" id="tool-verification">
            <VerificationBanner
              title="Validated by Akshay Verma, software developer and Hindi font specialist"
              text="The KrutiDev 10 character mapping covers standard Devanagari characters: vowels, consonants, matras, the halant for half-consonants, and common conjuncts including क्ष, त्र, ज्ञ, and श्र. Naming variants Kurtidev10, Kruti Dev 10, Kurti Dev10, and K10 all use the same mapping table."
            />
          </div>
        </div>
      </section>

      <section className="content-block section-alt">
        <div className="container">
          <Toc items={k10Toc} />
        </div>
      </section>

      <section className="content-block" id="toolbar-icons">
        <div className="container prose">
          <h2>How to Use the Converter Toolbar Icons</h2>
          <div className="card-grid">
            <article className="info-card">
              <h3>Paste / Upload</h3>
              <p>Paste clipboard text or upload TXT/PDF into the input window.</p>
            </article>
            <article className="info-card">
              <h3>Clear Text</h3>
              <p>Clear input and output to start a new session.</p>
            </article>
            <article className="info-card">
              <h3>Swap Mode</h3>
              <p>Toggle between Unicode↔KrutiDev direction instantly.</p>
            </article>
            <article className="info-card">
              <h3>Copy / Download</h3>
              <p>Copy results or download as TXT, Word, or PDF.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="what-is-converter">
        <div className="container prose">
          <h2>What Is a KrutiDev 10 to Unicode Converter?</h2>
          <p className="definition-block">
            <strong>Definition:</strong> A KrutiDev 10 to Unicode converter remaps Kurtidev10 /
            KrutiDev 10 ASCII Hindi into Unicode Devanagari so the text works without installing the
            font.
          </p>
          <ul>
            <li>Same character table as KrutiDev 010 on this site</li>
            <li>Built for people who searched “Kurtidev10” or “K10 converter”</li>
            <li>Browser-only — text stays on your device</li>
          </ul>
        </div>
      </section>

      <section className="content-block" id="how-to-use">
        <div className="container prose">
          <h2>How to Convert KrutiDev 10 to Unicode — Step by Step</h2>
          {k10HowToSteps.map((step, index) => (
            <article key={step.name} className="step-card">
              <div className="step-badge">Step {index + 1}</div>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-block section-alt" id="why-english">
        <div className="container prose">
          <h2>Why Your KrutiDev 10 Text Looks Like English Letters</h2>
          <p>
            KrutiDev 10 remaps ASCII characters to Devanagari-shaped glyphs. Remove the font and you
            see English letters again. Unicode stores real Devanagari code points so Hindi displays
            everywhere without the font.
          </p>
        </div>
      </section>

      <section className="content-block" id="spellings">
        <div className="container prose">
          <h2>Why So Many Spellings? Kurtidev10, Kruti Dev 10, K10 — Same Font</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name you may see</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {k10NameRows.map(([name, note]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="what-conversion-does">
        <div className="container prose">
          <h2>What KrutiDev 10 to Unicode Conversion Actually Does</h2>
          <p>
            Conversion is character-by-character remapping with i-matra reordering and conjunct
            detection. Output is NFC-normalised Unicode suitable for government portals and modern
            publishing systems.
          </p>
        </div>
      </section>

      <section className="content-block" id="to-mangal">
        <div className="container prose">
          <h2>KrutiDev 10 to Mangal — Same Output</h2>
          <p>
            Mangal is a Unicode font, not a separate encoding. Unicode output from this converter
            works with Mangal, Nirmala UI, Aparajita, and any Unicode Hindi font.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="who-needs">
        <div className="container prose">
          <h2>Who Needs a KrutiDev 10 to Unicode Converter?</h2>
          <p>
            CPCT candidates, government typists, court clerks, DTP operators, and publishers use this
            tool to move KrutiDev 10 text into WhatsApp, NIC portals, and CMS workflows.
          </p>
        </div>
      </section>

      <section className="content-block" id="privacy">
        <div className="container prose">
          <h2>Privacy and Security — What Happens to Your Text</h2>
          <p>
            Conversion runs entirely in your browser. No text is sent to any server for conversion.
            Once you clear the input box, the text is gone from the page.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="faq">
        <div className="container prose">
          <h2>Frequently Asked Questions — KrutiDev 10 to Unicode</h2>
          {k10Faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p lang={/[\u0900-\u097F]/.test(faq.question) ? 'hi' : undefined}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="content-block" id="key-takeaways">
        <div className="container prose">
          <h2>Key Takeaways</h2>
          <ul>
            <li>KrutiDev 10, Kurtidev10, Kruti Dev 10, and K10 are the same encoding.</li>
            <li>Conversion replaces ASCII positions with Unicode Devanagari code points.</li>
            <li>Matras and conjuncts use a reordering step, not simple find-and-replace.</li>
            <li>Your text stays on your device during conversion.</li>
          </ul>
        </div>
      </section>

      <section
        className="content-block section-alt"
        id="faq-hindi"
        lang="hi"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="container prose">
          <h2>अक्सर पूछे जाने वाले सवाल — हिंदी में</h2>
          {k10FaqsHindi.map((faq) => (
            <details
              className="faq-item"
              key={faq.question}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary itemProp="name">{faq.question}</summary>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="content-block" id="related">
        <div className="container prose">
          <h2>Related Tools and Resources</h2>
          <ul>
            <li>
              <Link href="/krutidev-to-unicode">KrutiDev to Unicode Converter</Link> (general hub)
            </li>
            <li>
              <Link href="/krutidev-010-to-unicode-converter">
                KrutiDev 010 to Unicode Converter
              </Link>
            </li>
            <li>
              <Link href="/">Unicode to KrutiDev Converter</Link>
            </li>
            <li>
              <Link href="/unicode-to-krutidev-10-converter">
                Unicode to KrutiDev 10 Converter
              </Link>
            </li>
            <li>
              <Link href="/font-download">KrutiDev Font Download</Link>
            </li>
          </ul>
          <SocialShare title={k10Meta.title} url={absoluteUrl(k10Meta.path)} />
        </div>
      </section>
    </>
  );
}
