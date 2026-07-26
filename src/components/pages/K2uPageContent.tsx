import Link from 'next/link';
import Toc from '@/components/seo/Toc';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SocialShare from '@/components/seo/SocialShare';
import StatsBar from '@/components/layout/StatsBar';
import VerificationBanner from '@/components/layout/VerificationBanner';
import ClientConverter from '@/components/converter/ClientConverter';
import {
  k2uErrors,
  k2uFaqs,
  k2uHowToSteps,
  k2uMeta,
  k2uMyths,
  k2uToc,
  mappingRows,
} from '@/content/k2u';
import { absoluteUrl } from '@/lib/seo/metadata';
import { REMINGTON_ROWS } from '@/lib/keyboard';

export default function K2uPageContent() {
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { label: 'KrutiDev to Unicode Converter' },
          ]}
        />
      </div>

      <section className="hero-section" id="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>{k2uMeta.title}</h1>
            <p className="hero-subtitle">{k2uMeta.description}</p>
            <div className="key-summary">
              <p>
                <strong>Key summary:</strong> Paste KrutiDev 010 / KrutiDev 10 ASCII text, get
                Mangal-compatible Unicode in your browser. This is the general KrutiDev → Unicode
                hub. For official KrutiDev 010 naming, use the{' '}
                <Link href="/krutidev-010-to-unicode-converter">KrutiDev 010 converter</Link>. For
                Kurtidev10 searches, see the{' '}
                <Link href="/krutidev-10-to-unicode-converter">KrutiDev 10 converter</Link>.
              </p>
            </div>
          </div>
          <div className="tool-wrapper glass-card">
            <ClientConverter
              mode="kd-to-uni"
              variant="010"
              exampleSource="Xt fgUn"
              exampleHint="Xt fgUn → जय हिंद"
              ctaHref="/"
              ctaText="Need Unicode to KrutiDev 010? Try our homepage converter"
            />
          </div>
          <StatsBar
            items={[
              { value: 'Live', label: 'Conversion Speed' },
              { value: '99.9%', label: 'Accuracy Rate' },
              { value: '6', label: 'Browsers Supported' },
            ]}
          />
          <VerificationBanner />
        </div>
      </section>

      <section className="content-block section-alt">
        <div className="container">
          <Toc items={k2uToc} />
        </div>
      </section>

      <section className="content-block" id="what-is-converter">
        <div className="container prose">
          <h2>What Is a KrutiDev to Unicode Converter?</h2>
          <p className="definition-block">
            <strong>Definition:</strong> A KrutiDev to Unicode converter is a tool that remaps
            legacy KrutiDev ASCII Hindi into Unicode Devanagari code points (U+0900–U+097F) so the
            text works in WhatsApp, Gmail, NIC portals, and modern apps without installing KrutiDev.
          </p>
          <ul>
            <li>Runs in the browser — no server upload of your text</li>
            <li>Targets KrutiDev 010 / KrutiDev 10 (same mapping on this site)</li>
            <li>Does not convert KrutiDev 055 (Marathi exam encoding)</li>
          </ul>
        </div>
      </section>

      <section className="content-block section-alt" id="how-to-use">
        <div className="container prose">
          <h2>How to Convert KrutiDev to Unicode Online — Step by Step</h2>
          <p>The entire conversion takes under 10 seconds.</p>
          {k2uHowToSteps.map((step, index) => (
            <article key={step.name} className="step-card">
              <div className="step-badge">Step {index + 1}</div>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-block" id="real-example">
        <div className="container prose">
          <h2>Real Example: How KrutiDev Text Becomes Readable Hindi</h2>
          <p>
            Take the phrase जय हिंद. On a device without the KrutiDev font, it stores and displays
            as: <code>Xt fgUn</code>. The converter maps each ASCII code to Devanagari code points.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="what-is-krutidev">
        <div className="container prose">
          <h2>What Is KrutiDev Font?</h2>
          <p>
            KrutiDev is India’s most widely used non-Unicode Hindi font family. When you press the k
            key with KrutiDev active, your computer stores ASCII code 107 (letter k), but the font
            displays it visually as क.
          </p>
          <h3>Remington keyboard map (reference)</h3>
          <p>
            Many government typists use a Remington-style layout. Press keys on your keyboard with
            the floating helper, or use this static map:
          </p>
          <div className="kbd-static">
            {REMINGTON_ROWS.map((row, i) => (
              <div className="kbd-row" key={i}>
                {row.map((item) => (
                  <kbd key={item.key}>
                    {item.key} <span>{item.label}</span>
                  </kbd>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-block" id="character-mapping">
        <div className="container prose">
          <h2>KrutiDev to Unicode Character Mapping — Standard Hindi Consonants</h2>
          <p>Keys below come from the live converter map (भ = Hk, not H).</p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Hindi</th>
                  <th>Name</th>
                  <th>KrutiDev Key</th>
                  <th>Unicode</th>
                </tr>
              </thead>
              <tbody>
                {mappingRows.map(([hi, name, key, uni]) => (
                  <tr key={uni}>
                    <td>{hi}</td>
                    <td>{name}</td>
                    <td>
                      <code>{key}</code>
                    </td>
                    <td>{uni}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="accuracy">
        <div className="container prose">
          <h2>Accuracy Testing Summary</h2>
          <p>
            Mapping checks focus on consonants, matras, and common conjuncts against CPCT-style
            practice text and typical court/office documents. Reported accuracy figures describe
            those tests — not a star rating from users.
          </p>
        </div>
      </section>

      <section className="content-block" id="mangal-compatible">
        <div className="container prose">
          <h2>Your Output Is Mangal-Compatible Unicode</h2>
          <p>
            Output is standard Devanagari Unicode. Apply Mangal, Nirmala UI, or Aparajita in Word —
            you do not need KrutiDev installed to read the converted text.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="why-convert">
        <div className="container prose">
          <h2>Why Convert KrutiDev to Unicode? 5 Problems It Solves</h2>
          <ol>
            <li>WhatsApp / Gmail show random Latin letters for KrutiDev ASCII</li>
            <li>NIC and eOffice portals expect Unicode</li>
            <li>Search engines index Unicode Hindi, not remapped ASCII</li>
            <li>Phones and Macs rarely ship KrutiDev</li>
            <li>Cross-team editing breaks when only some machines have the font</li>
          </ol>
        </div>
      </section>

      <section className="content-block" id="who-needs">
        <div className="container prose">
          <h2>Who Needs a KrutiDev to Unicode Converter?</h2>
          <p>
            Court staff, secretariat typists, journalists, and students who receive KrutiDev files
            but must publish or submit Unicode Hindi.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="why-govt">
        <div className="container prose">
          <h2>Why Do Government Offices Still Use KrutiDev in 2026?</h2>
          <p>
            Legacy DMS and exam software were built on KrutiDev decades ago. Migration is slow, so
            many workflows keep KrutiDev in active use even as public portals move to Unicode.
          </p>
        </div>
      </section>

      <section className="content-block" id="exam-versions">
        <div className="container prose">
          <h2>Which KrutiDev Version Is Required for Government Typing Exams?</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>State / Body</th>
                  <th>Exam</th>
                  <th>Version</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Madhya Pradesh</td>
                  <td>CPCT / MPPEB</td>
                  <td>KrutiDev 010</td>
                </tr>
                <tr>
                  <td>Uttar Pradesh</td>
                  <td>UPSSSC / Lekhpal</td>
                  <td>KrutiDev 010</td>
                </tr>
                <tr>
                  <td>Rajasthan</td>
                  <td>Patwari / RSMSSB</td>
                  <td>KrutiDev 010</td>
                </tr>
                <tr>
                  <td>Bihar</td>
                  <td>BPSC typing posts</td>
                  <td>KrutiDev 010</td>
                </tr>
                <tr>
                  <td>Maharashtra</td>
                  <td>State government</td>
                  <td>KrutiDev 055 (Marathi) — not converted here</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="content-block section-alt" id="should-you-convert">
        <div className="container prose">
          <h2>Should You Convert KrutiDev to Unicode?</h2>
          <p>
            Convert for WhatsApp, email, NIC portals, blogs, and Google Workspace. Keep KrutiDev for
            legacy court DMS, secretariat systems, and PageMaker/CorelDRAW print workflows.
          </p>
        </div>
      </section>

      <section className="content-block" id="myths">
        <div className="container prose">
          <h2>Common Myths About KrutiDev to Unicode Conversion</h2>
          {k2uMyths.map((item) => (
            <p key={item.myth}>
              <strong>Myth:</strong> {item.myth}
              <br />
              <strong>Truth:</strong> {item.truth}
            </p>
          ))}
        </div>
      </section>

      <section className="content-block section-alt" id="errors">
        <div className="container prose">
          <h2>Common Errors and Fixes</h2>
          {k2uErrors.map((err) => (
            <details className="faq-item" key={err.title}>
              <summary>{err.title}</summary>
              <p>{err.body}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="content-block" id="faq">
        <div className="container prose">
          <h2>Frequently Asked Questions</h2>
          {k2uFaqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p lang={/[\u0900-\u097F]/.test(faq.question) ? 'hi' : undefined}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="content-block section-alt" id="related">
        <div className="container prose">
          <h2>Related Tools and References</h2>
          <ul>
            <li>
              <Link href="/">Unicode to KrutiDev Converter</Link>
            </li>
            <li>
              <Link href="/krutidev-010-to-unicode-converter">
                KrutiDev 010 to Unicode Converter
              </Link>
            </li>
            <li>
              <Link href="/krutidev-10-to-unicode-converter">
                KrutiDev 10 (Kurtidev10) to Unicode Converter
              </Link>
            </li>
            <li>
              <a href="/fonts/KrutiDev010.ttf" download>
                Download KrutiDev 010 Font
              </a>
            </li>
          </ul>
          <h3>References</h3>
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
                Department of Official Language
              </a>
            </li>
          </ul>
          <SocialShare title={k2uMeta.title} url={absoluteUrl(k2uMeta.path)} />
        </div>
      </section>
    </>
  );
}
