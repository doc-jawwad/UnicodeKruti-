import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FontDownloadPageBody from '@/components/pages/font-download/FontDownloadPageBody';
import FontPackGrid from '@/components/font-download/FontPackGrid';
import JsonLd from '@/components/seo/JsonLd';
import ContentDates from '@/components/seo/ContentDates';
import { fontDownloadJsonLdSchemas } from '@/content/font-download-schemas';
import { buildPageMetadata } from '@/lib/seo/metadata';

const FONT_DATES = { published: '2026-07-27', modified: '2026-07-27' } as const;

export const metadata: Metadata = buildPageMetadata({
  title: 'KrutiDev Font Download Free — 010, 055, Windows & Mac TTF',
  description:
    'Download KrutiDev font free (010, 055, and more). Step-by-step install guide for Windows 10, Windows 11, and Mac. No signup.',
  path: '/font-download',
  hreflangHi: true,
});

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
