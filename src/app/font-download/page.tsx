import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FontDownloadPageBody from '@/components/pages/font-download/FontDownloadPageBody';
import FontPackGrid from '@/components/font-download/FontPackGrid';
import JsonLd from '@/components/seo/JsonLd';
import { fontDownloadJsonLdSchemas } from '@/content/font-download-schemas';
import { getCanonicalUrl } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seo/metadata';

const FONT_DOWNLOAD_PATH = '/font-download';

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
      </div>

      <section className="hero-section section-dark font-dl-hero" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content font-dl-hero-content">
            <h1>
              KrutiDev Font Download —{' '}
              <span className="highlight">Free TTF for Windows &amp; Mac</span>
            </h1>

            <p
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              Free KrutiDev TTF fonts, including 010 for CPCT exams. No signup
              required.
            </p>
          </div>

          <div className="font-pack" aria-label="KrutiDev font downloads">
            <h2 className="font-pack__heading">Download Font Files</h2>
            <p className="font-pack__intro">
              Free for personal and educational use. Most users need{' '}
              <strong>KrutiDev 010</strong>.
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
