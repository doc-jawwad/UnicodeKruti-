import type { Metadata } from 'next';
import Link from 'next/link';
import U2K10PageBody from '@/components/pages/u2k10/U2K10PageBody';
import UnicodeToKrutidev10ToolLazy from '@/components/UnicodeToKrutidev10ToolLazy';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { u2k10JsonLdSchemas } from '@/content/u2k10-schemas';

export const metadata: Metadata = {
  title: 'Unicode to KrutiDev 10 Converter — Free Online Tool',
  description:
    'Convert Unicode Hindi text to Kruti Dev 10 format online. Works for Mangal, Google Input Tools, and InScript output. Free, browser-only. No signup. Exam-ready.',
  alternates: {
    canonical: 'https://unicodekruti.com/unicode-to-krutidev-10-converter',
  },
  openGraph: {
    title: 'Unicode to KrutiDev 10 Converter — Free Online Tool',
    description:
      'Convert Unicode Hindi text to Kruti Dev 10 format online. Works for Mangal, Google Input Tools, and InScript output. Free, browser-only. No signup.',
    url: 'https://unicodekruti.com/unicode-to-krutidev-10-converter',
    siteName: 'UnicodeKruti',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unicode to KrutiDev 10 Converter — Free Online Tool',
    description: 'Convert Unicode Hindi text to Kruti Dev 10 format online.',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

export default function UnicodeToKrutiDev10Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(u2k10JsonLdSchemas),
        }}
      />

      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/', label: 'Unicode to KrutiDev Converter' },
            { label: 'Unicode to KrutiDev 10 Converter' },
          ]}
        />
      </div>

      <section className="hero-section section-dark u2k10-hero" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content u2k10-hero-content">
            <h1>Convert Unicode Hindi Text to KrutiDev 10 — Free Online Tool</h1>

            <div
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="featured-snippet-box"
            >
              <p>
                This free online tool converts Unicode Hindi text, typed in Mangal, Google Input
                Tools, or InScript, directly into KrutiDev 10 (also called Kurtidev10) encoding.
                Paste your text, get KrutiDev 10 output in seconds. No software to install. No
                signup. Runs entirely in your browser.
              </p>
            </div>

            <p className="hero-subtitle">
              Typed in Mangal or Google Input Tools? This tool outputs KrutiDev 10 format. Designed
              for exam candidates, coaching institutes, and DTP professionals who need the reverse of
              the standard conversion direction.
            </p>
          </div>

          <div className="tool-wrapper glass-card">
            <UnicodeToKrutidev10ToolLazy />
          </div>

          <p className="u2k10-author-byline">
            Validated by{' '}
            <Link href="/about-us">Akshay Verma</Link>
            , software developer and Hindi font specialist
          </p>
        </div>
      </section>

      <U2K10PageBody />
    </>
  );
}
