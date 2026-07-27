import Link from 'next/link';
import Toc from '@/components/seo/Toc';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import SocialShare from '@/components/seo/SocialShare';
import StatsBar from '@/components/layout/StatsBar';
import VerificationBanner from '@/components/layout/VerificationBanner';
import ClientConverter from '@/components/converter/ClientConverter';
import {
  k010ExamRows,
  k010Faqs,
  k010HowToSteps,
  k010Meta,
  k010Takeaways,
  k010Toc,
} from '@/content/k010';
import { absoluteUrl } from '@/lib/seo/metadata';

export default function K010PageContent() {
  return (
    <>
      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { label: 'KrutiDev 010 to Unicode Converter' },
          ]}
        />
      </div>

      <section className="hero-section section-dark" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content">
            <h1>{k010Meta.title}</h1>
            <p className="hero-subtitle">{k010Meta.description}</p>
            <div className="key-summary">
              <p>
                <strong>Key summary:</strong> Paste KrutiDev 010 text, convert in your browser, get
                Mangal-compatible Unicode for Digital India portals and exams. Same mapping as{' '}
                <Link href="/krutidev-10-to-unicode-converter">KrutiDev 10</Link>; for the general
                hub see <Link href="/krutidev-to-unicode">KrutiDev to Unicode</Link>.
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
            <StatsBar
              items={[
                { value: 'Live', label: 'Conversion Speed' },
                { value: '99.9%', label: 'Accuracy Rate' },
                { value: '6', label: 'Browsers Supported' },
              ]}
            />
          </div>
          <div className="verification-inline" id="tool-verification">
            <VerificationBanner />
          </div>
        </div>
      </section>

      <section className="content-block section-alt">
        <div className="container">
          <Toc items={k010Toc} />
        </div>
      </section>

      <section className="content-block" id="how-to-use">
        <div className="container prose">
          <h2>How to Convert KrutiDev 010 to Unicode — Step by Step</h2>
          <p>Converting KrutiDev 010 text to Unicode takes less than 60 seconds.</p>
          {k010HowToSteps.map((step, index) => (
            <article key={step.name} className="step-card">
              <div className="step-badge">Step {index + 1}</div>
              <h3>{step.name}</h3>
              <p>{step.text}</p>
            </article>
          ))}
          <p>
            <strong>Estimated time:</strong> 1–2 minutes per document. No file size limit for
            paste-based conversion.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="what-is-krutidev-010">
        <div className="container prose">
          <h2>What is KrutiDev 010?</h2>
          <p className="definition-block">
            <strong>Definition:</strong> KrutiDev 010 is the official Hindi typing font used across
            Indian central government departments. It is a non-Unicode, legacy Devanagari font
            developed before the Unicode standard became widespread in India.
          </p>
          <p>
            Unlike Unicode fonts such as Mangal or Nirmala UI, KrutiDev 010 stores Hindi characters
            using a proprietary ASCII mapping, which is why KrutiDev text appears as random English
            characters on any computer that does not have the font installed.
          </p>
          <p>
            The &quot;010&quot; refers to the specific version number in the KrutiDev typeface family.
            It is the most widely used version in government offices and is the required font for
            typing examinations in Madhya Pradesh (CPCT), Rajasthan, Uttar Pradesh, and several other
            states.
          </p>
        </div>
      </section>

      <section className="content-block" id="exam-departments">
        <div className="container prose">
          <h2>Which Government Exams and Departments Use KrutiDev 010?</h2>
          <p>
            KrutiDev 010 is not just a common choice; it is a mandated standard in many states and
            departments. The table below shows where KrutiDev 010 is officially required.
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>State / Exam</th>
                  <th>Requirement</th>
                  <th>Authority</th>
                </tr>
              </thead>
              <tbody>
                {k010ExamRows.map(([exam, req, auth]) => (
                  <tr key={exam}>
                    <td>{exam}</td>
                    <td>{req}</td>
                    <td>{auth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            <strong>Note:</strong> Always verify the font requirement in the official exam
            notification. Some states are transitioning to Unicode-only typing as part of Digital
            India.
          </p>
          <p>
            This reference table is updated for 2026. If you are preparing for a state exam and need
            to confirm which font version is required, check the official recruitment notification
            from the relevant Public Service Commission.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="why-convert">
        <div className="container prose">
          <h2>Why Government Typists Need to Convert KrutiDev 010 to Unicode</h2>
          <p>
            India&apos;s government typing infrastructure was built on KrutiDev 010. For decades,
            court typists, Rajbhasha officials, secretariat staff, and data entry operators across
            central and state departments produced documents in this font.
          </p>
          <p>
            The problem? Modern systems run on Unicode. Government web portals built under the Digital
            India initiative accept only Unicode text. Online affidavit submission systems require
            Unicode. PDF archiving tools used by ministries expect Unicode-encoded Devanagari.
          </p>
          <p>
            When a typist copies KrutiDev 010 text into any of these systems without converting, the
            output breaks — either showing garbled English characters or displaying blank boxes.
          </p>
          <p>
            This converter solves that problem instantly. Paste your KrutiDev 010 text, click
            Convert, and get Unicode output that works everywhere — on web portals, in MS Word, in
            email, in government databases, and in print.
          </p>
        </div>
      </section>

      <section className="content-block" id="vs-k10">
        <div className="container prose">
          <h2>KrutiDev 010 vs KrutiDev 10: What Is the Difference?</h2>
          <p>
            This is the most common point of confusion in government typing. Many typists use the
            terms &quot;KrutiDev 10&quot; and &quot;KrutiDev 010&quot; interchangeably, but they
            refer to the same typeface, just with different naming conventions.
          </p>
          <p>
            The official government-recognised name is KrutiDev 010. The &quot;0&quot; prefix follows
            the standard typeface numbering system used by the KrutiDev font family publisher. Some
            older training materials, exam guides, and third-party websites drop the leading zero and
            write &quot;KrutiDev 10&quot; — this causes understandable confusion.
          </p>
          <p>
            For conversion purposes, this converter handles both. The character mapping for KrutiDev
            010 and KrutiDev 10 (Kurtidev10) is identical. If you are unsure which version your
            document uses, try converting a small paragraph. If the output looks correct, you have
            the right mapping.
          </p>
          <p>
            Need Unicode → KrutiDev 010 instead? Use the{' '}
            <Link href="/">Unicode to KrutiDev converter</Link>. To display KrutiDev output on
            another PC, follow the install guide on the{' '}
            <Link href="/font-download">KrutiDev Font Download</Link> page.
          </p>
        </div>
      </section>

      <section className="content-block section-alt" id="formatting">
        <div className="container prose">
          <h2>Does KrutiDev 010 to Unicode Conversion Preserve Document Formatting?</h2>
          <p>This is a question many government typists ask before converting large files.</p>
          <p>
            The short answer: this tool converts text encoding only, not document layout, fonts,
            spacing, or paragraph formatting.
          </p>
          <p>
            When you paste KrutiDev 010 text from a Word document, you are copying the raw
            characters, not the document structure. The converter processes those characters and
            returns Unicode text.
          </p>
          <p>
            When you paste the Unicode output back into Word, it will appear in whatever font is
            currently active in that Word document — typically Mangal or Nirmala UI if Hindi Unicode
            is set as the language.
          </p>
        </div>
      </section>

      <section className="content-block" id="faq">
        <div className="container prose">
          <h2>Frequently Asked Questions About KrutiDev 010 to Unicode Conversion</h2>
          {k010Faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="content-block section-alt" id="key-takeaways">
        <div className="container prose">
          <h2>Key Takeaways — KrutiDev 010 to Unicode Conversion</h2>
          <ul>
            {k010Takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-block" id="related">
        <div className="container prose">
          <h2>Related Tools</h2>
          <ul>
            <li>
              <Link href="/">Unicode to KrutiDev Converter</Link>
            </li>
            <li>
              <Link href="/krutidev-to-unicode">KrutiDev to Unicode Converter</Link> (general hub)
            </li>
            <li>
              <Link href="/krutidev-10-to-unicode-converter">
                KrutiDev 10 (Kurtidev10) to Unicode Converter
              </Link>
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
          <SocialShare title={k010Meta.title} url={absoluteUrl(k010Meta.path)} />
        </div>
      </section>
    </>
  );
}
