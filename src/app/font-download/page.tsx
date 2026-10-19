import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FontDownloadPageBody from '@/components/pages/font-download/FontDownloadPageBody';
import FontPackGrid from '@/components/font-download/FontPackGrid';
import JsonLd from '@/components/seo/JsonLd';
import { fontDownloadJsonLdSchemas } from '@/content/font-download-schemas';
import { uiBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/metadata';

const FONT_DOWNLOAD_PATH = '/font-download';
const FONT_CRUMB = 'Kruti Dev Font Download';

const PAGE_TITLE = 'Kruti Dev Font Download: 010, 011, 016 & 055 Hindi TTF';
const PAGE_DESCRIPTION =
  'Download Kruti Dev 010, 011, 016 & 055 Hindi TTFs. Preview 15 fonts, select your version, and follow simple Windows and MS Word installation steps.';

const baseMetadata = buildPageMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: FONT_DOWNLOAD_PATH,
  // Hindi FAQs are in-page lang="hi" blocks only — not a hi hreflang alternate.
  hreflangHi: false,
});

/**
 * Exact approved SEO title — no brand suffix.
 * `absolute` bypasses the root layout `%s | UnicodeKruti` template (page-scoped only).
 * OG/Twitter also use the brand-free title (no global helper change).
 */
export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    absolute: PAGE_TITLE,
  },
  openGraph: {
    ...baseMetadata.openGraph,
    title: PAGE_TITLE,
  },
  twitter: {
    ...baseMetadata.twitter,
    title: PAGE_TITLE,
  },
};

export default function FontDownloadPage() {
  return (
    <>
      <JsonLd id="font-download-json-ld" data={fontDownloadJsonLdSchemas} />

      <div className="container">
        <Breadcrumbs items={uiBreadcrumbs(FONT_CRUMB)} />
      </div>

      <section className="hero-section section-dark font-dl-hero" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content font-dl-hero-content">
            <h1>Kruti Dev Font Download – Free Hindi TTF Fonts (010, 011 &amp; More)</h1>

            <p
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              This Kruti Dev font download page lists 15 Hindi TTF font files, each with its own
              download button and a live preview. Kruti Dev is a legacy, non-Unicode font, so text
              typed in it looks like Hindi only where a matching font is available. If you need Hindi
              that works on phones and websites, use the{' '}
              <Link href="/krutidev-to-unicode-converter/">Kruti Dev to Unicode converter</Link>{' '}
              instead.
            </p>
          </div>

          <div className="font-pack" id="download-collection" aria-label="Kruti Dev font downloads">
            <h2 className="font-pack__heading">
              Download Kruti Dev Fonts – Free Hindi TTF Collection
            </h2>
            <p className="font-pack__intro">
              Each Kruti Dev Hindi font file below downloads on its own. There is no sign-up and no
              payment on this page. Pick the version your document or instructions name. If nothing
              is named, see the{' '}
              <a href="#krutidev-010">Kruti Dev 010</a> section below.
            </p>
            <FontPackGrid />
          </div>
        </div>
      </section>

      <FontDownloadPageBody />
    </>
  );
}
