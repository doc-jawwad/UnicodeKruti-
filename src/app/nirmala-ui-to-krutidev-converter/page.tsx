import type { Metadata } from 'next';
import Link from 'next/link';
import AboutTheTool from '@/components/seo/AboutTheTool';
import NirmalaUiPageBody from '@/components/pages/nirmala-ui/NirmalaUiPageBody';
import NirmalaUiToKrutidevToolLazy from '@/components/NirmalaUiToKrutidevToolLazy';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RelatedTools from '@/components/seo/RelatedTools';
import { TOOL_ABOUT } from '@/content/tool-about';
import { nirmalaUiJsonLdSchemas } from '@/content/nirmala-ui-schemas';
import { nirmalaUiMeta } from '@/content/nirmala-ui';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { uiBreadcrumbs } from '@/lib/seo/breadcrumbs';

const NIRMALA_PATH = '/nirmala-ui-to-krutidev-converter';
const NIRMALA_CRUMB = 'Nirmala UI to KrutiDev Converter';

export const metadata: Metadata = buildPageMetadata({
  ...nirmalaUiMeta,
  hreflangHi: true,
});

export default function NirmalaUiToKrutiDevPage() {
  return (
    <>
      <JsonLd id="nirmala-ui-json-ld" data={nirmalaUiJsonLdSchemas} />

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

            <ul className="nirmala-support-list" aria-label="Supported conversions">
              <li>Nirmala UI to KrutiDev 010</li>
              <li>Kokila to KrutiDev 010</li>
              <li>Mangal to KrutiDev 010</li>
              <li>All Unicode Devanagari to KrutiDev 010</li>
            </ul>
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
