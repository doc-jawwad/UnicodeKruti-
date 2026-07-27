import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import FontDownloadPageBody from '@/components/pages/font-download/FontDownloadPageBody';
import JsonLd from '@/components/seo/JsonLd';
import { fontDownloadJsonLdSchemas } from '@/content/font-download-schemas';
import { FONT_PACK } from '@/lib/site';

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
      <JsonLd data={fontDownloadJsonLdSchemas} />

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

            <p
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              KrutiDev 010 is the standard Hindi font for government typing exams and legacy office
              documents in India. Download the original TTF files below for free. Install takes under
              3 minutes on Windows or Mac. Verified safe. If you need KrutiDev text on a phone or
              web platform, convert it to Unicode instead.
            </p>
          </div>

          <div className="font-pack" aria-label="KrutiDev font downloads">
            <h2 className="font-pack__heading">Download Font Files</h2>
            <p className="font-pack__intro">
              Free for personal and educational use. Pick the version your exam or software asks
              for — most users need <strong>KrutiDev 010</strong>.
            </p>
            <ul className="font-pack__grid">
              {FONT_PACK.map((font) => (
                <li key={font.file} className="font-pack__item">
                  <div className="font-pack__meta">
                    <span className="font-pack__name">{font.name}</span>
                    <span className="font-pack__file">{font.file}</span>
                    <span className="font-pack__note">{font.note}</span>
                  </div>
                  <a
                    href={`/fonts/${font.file}`}
                    download={font.file}
                    className="btn-primary font-pack__btn"
                    id={font.file === 'KRDEV010.ttf' ? 'download-krutidev-010' : undefined}
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
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
