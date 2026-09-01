import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FontDownloadPageBody from '@/components/pages/font-download/FontDownloadPageBody';
import FontPackGrid from '@/components/font-download/FontPackGrid';
import JsonLd from '@/components/seo/JsonLd';
import ContentDates from '@/components/seo/ContentDates';
import { fontDownloadJsonLdSchemas } from '@/content/font-download-schemas';
import { getCanonicalUrl } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seo/metadata';

const FONT_DOWNLOAD_PATH = '/font-download';
const FONT_DATES = { published: '2026-07-27', modified: '2026-07-27' } as const;

const pageMetadata = buildPageMetadata({
  title: 'KrutiDev Font Free Download — 010, 10, 055, 011 TTF Files',
  description:
    'Download KrutiDev TTF fonts free — KrutiDev 010 for CPCT and government exams, KrutiDev 055 for Marathi. Install on Windows 10, 11, and Mac in 3 minutes. No signup.',
  path: FONT_DOWNLOAD_PATH,
  hreflangHi: true,
});

export const metadata: Metadata = {
  ...pageMetadata,
  alternates: {
    ...pageMetadata.alternates,
    canonical: getCanonicalUrl(FONT_DOWNLOAD_PATH),
  },
};

export default function FontDownloadPage() {
  return (
    <>
      <JsonLd id="font-download-json-ld" data={fontDownloadJsonLdSchemas} />

      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { label: 'KrutiDev Font Download' },
          ]}
        />
        <ContentDates published={FONT_DATES.published} modified={FONT_DATES.modified} />
      </div>

      <section className="hero-section section-dark font-dl-hero" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content font-dl-hero-content">
            <h1>
              Download KrutiDev Font Free —{' '}
              <span className="highlight">TTF Files for Windows and Mac</span>
            </h1>

            <p
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              Download free KrutiDev TTF fonts for Windows and Mac, including KrutiDev 010 for CPCT
              and other government typing exams. Install in under three minutes with a right-click.
              No signup required. Verified safe files for personal and educational use across India.
            </p>
          </div>

          <div className="font-pack" aria-label="KrutiDev font downloads">
            <h2 className="font-pack__heading">Download Font Files</h2>
            <p className="font-pack__intro">
              Free for personal and educational use. Preview each typeface below, then download.
              Most users need <strong>KrutiDev 010</strong>.
            </p>
            <FontPackGrid />
            <p className="font-pack__verify">
              Verified by{' '}
              <Link href="/about-us">Akshay Verma</Link>, Software Developer and Hindi Typing
              Expert. Mapping cross-checked against 40 CPCT official practice papers, 12 UP district
              court records, and Rajbhasha Vibhag circulars.
            </p>
          </div>
        </div>
      </section>

      <FontDownloadPageBody />
    </>
  );
}
