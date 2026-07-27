import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FontDownloadPageBody from '@/components/pages/font-download/FontDownloadPageBody';
import { fontDownloadJsonLdSchemas } from '@/content/font-download-schemas';
import { FONT_DOWNLOAD_HREF } from '@/lib/site';

export const metadata: Metadata = {
  title: 'KrutiDev Font Download Free — All Versions (010, 055)',
  description:
    'Download KrutiDev font free. Get the original TTF file for Kruti Dev 010, 055, and other versions—step-by-step install guide for Windows 10, Windows 11, and Mac.',
  alternates: {
    canonical: 'https://unicodekruti.com/font-download',
  },
  openGraph: {
    title: 'KrutiDev Font Download Free — All Versions (010, 055)',
    description:
      'Download KrutiDev font free. Get the original TTF file for Kruti Dev 010, 055, and other versions. Step-by-step install guide for Windows 10, Windows 11, and Mac.',
    url: 'https://unicodekruti.com/font-download',
    siteName: 'UnicodeKruti',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KrutiDev Font Download Free — All Versions (010, 055)',
    description:
      'Download KrutiDev font free. Get the original TTF for Kruti Dev 010 and install guides for Windows and Mac.',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

export default function FontDownloadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fontDownloadJsonLdSchemas),
        }}
      />

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
              Download KrutiDev Font Free —{' '}
              <span className="highlight">TTF Files for Windows and Mac</span>
            </h1>

            <div
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="featured-snippet-box"
            >
              <p>
                KrutiDev 010 is the standard Hindi font for government typing exams and legacy
                office documents in India. Download the original TTF file from this page for free.
                The install takes under 3 minutes on Windows or Mac. If you need to use KrutiDev
                text on a phone or a web platform, convert it to Unicode instead.
              </p>
            </div>

            <p className="hero-subtitle">
              Get the original KrutiDev 010 TTF file. Verified safe. Works on Windows 10, Windows
              11, and Mac. Step-by-step install guide below.
            </p>
          </div>

          <div className="font-dl-cta glass-card">
            <a
              href={FONT_DOWNLOAD_HREF}
              download="KRDEV010.TTF"
              className="btn-primary font-dl-download-btn"
              id="download-krutidev-010"
            >
              Download KrutiDev 010
            </a>
            <p className="font-dl-cta-meta">
              Free TTF File: <strong>KRDEV010.TTF</strong>. Free for personal and educational use.
              File size: approx. 90 KB. Verified by{' '}
              <Link href="/about-us">Akshay Verma</Link>, Software Developer and Hindi Typing
              Expert. Mapping cross-checked against 40 CPCT official practice papers, 12 UP
              district court records, and Rajbhasha Vibhag circulars.
            </p>
          </div>
        </div>
      </section>

      <FontDownloadPageBody />
    </>
  );
}
