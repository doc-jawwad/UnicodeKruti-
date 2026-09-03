import type { Metadata } from 'next';
import Link from 'next/link';
import UpdeshConverter from '@/components/UpdeshConverter';
import JsonLd from '@/components/seo/JsonLd';
import RelatedTools from '@/components/seo/RelatedTools';
import { updeshJsonLdSchemas } from '@/content/updesh-schemas';
import { buildPageMetadata } from '@/lib/seo/metadata';

const UPDESH_PATH = '/updesh-converter';

export function generateMetadata(): Metadata {
  const title =
    'Updesh Font Converter | Updes to Unicode and KrutiDev Online';
  const description =
    'Free Updesh font converter online. Convert Updes or Updesh text to Unicode and KrutiDev 010 instantly. Used by UP government typists, UPSSSC candidates, and Rajbhasha offices. No signup.';

  const pageMetadata = buildPageMetadata({
    title,
    description,
    path: UPDESH_PATH,
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

      <section className="hero-section section-dark" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Your Updesh Text Shows as Gibberish. This Free Updes Converter Fixes
              It in Seconds
            </h1>

            <p className="hero-subtitle">
              Paste Unicode Hindi text. Get Updesh output instantly. Or paste
              Updesh text to get Unicode Mangal back. Free, browser-only, no
              signup.
            </p>
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
              Mapping table cross-checked against 40 CPCT official practice
              papers (Madhya Pradesh), 12 UP district court judgement records,
              and Rajbhasha Vibhag circulars. Last verified: June 2026. Accuracy:
              99.9% on standard KrutiDev 010 documents.
            </p>
          </div>

          <div className="tool-wrapper glass-card">
            <UpdeshConverter />
          </div>
        </div>
      </section>

      <section className="toc-section section-dark" id="table-of-contents">
        <div className="container">
          <details className="toc-wrapper-collapsible">
            <summary className="toc-summary-bar">
              <span>Table of Contents</span>
              <span className="toc-toggle-icon"></span>
            </summary>
            <div className="toc-content-list">
              {/* CONTENT: table of contents links */}
            </div>
          </details>
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
              The Updesh font converter is a free online tool that changes Hindi
              text between Updesh encoding and Unicode. It works in both
              directions: Unicode text in gets Updesh output out. Updesh text in
              gets Unicode output out.
            </p>
            <p>
              Updesh (also written as Updes) is a legacy Hindi font used across
              Uttar Pradesh government offices, UP district courts, and the UPDES
              portal run by the National Informatics Centre, Uttar Pradesh
              (updes.up.nic.in). The font stores Hindi as remapped ASCII
              characters. Those characters only show as correct Hindi when the
              Updesh font file is active on the reading device. Without it, the
              text appears as random English letters.
            </p>
            <p>
              This converter changes what your device stores, not just how it
              looks. It replaces each ASCII character with the correct Unicode
              Devanagari code point, or the reverse. The output works in MS Word,
              government portals, WhatsApp, and any modern application.
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
                  <td>Also known as</td>
                  <td>Updes Converter, Updesh Unicode Converter</td>
                </tr>
                <tr>
                  <td>Conversion directions</td>
                  <td>Updesh to Unicode, Unicode to Updesh</td>
                </tr>
                <tr>
                  <td>Input accepted</td>
                  <td>
                    Mangal, Nirmala UI, Kokila, Gargi, Arial Unicode, Google Input
                    Tools, InScript keyboard
                  </td>
                </tr>
                <tr>
                  <td>Output</td>
                  <td>Updesh-compatible KrutiDev ASCII encoding</td>
                </tr>
                <tr>
                  <td>Processing</td>
                  <td>
                    Runs in your browser. Text is never sent to any server
                  </td>
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
                  <td>Last verified</td>
                  <td>June 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CONTENT: article body continued */}

      <section className="content-block section-dark" id="related-resources">
        <div className="container">
          <h2 className="section-heading">
            Related Tools <span className="highlight">and Internal Links</span>
          </h2>
          <RelatedTools currentPath={UPDESH_PATH} variant="section" />
        </div>
      </section>

      {/* CONTENT: FAQ */}
      <section className="content-block section-alt" id="faq">
        <div className="container">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div
            className="faq-accordion"
            style={{ maxWidth: 900, margin: '2rem auto 0' }}
          >
            {/* CONTENT: FAQ items */}
          </div>
        </div>
      </section>

      {/* CONTENT: references */}
      <section
        className="content-block section-alt"
        id="references"
        aria-label="References"
      >
        <div className="container">
          <h2 className="section-heading">References</h2>
          {/* CONTENT: references list */}
        </div>
      </section>
    </>
  );
}
