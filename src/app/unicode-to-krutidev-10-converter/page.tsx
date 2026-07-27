import type { Metadata } from 'next';
import Link from 'next/link';
import AboutTheTool from '@/components/seo/AboutTheTool';
import U2K10PageBody from '@/components/pages/u2k10/U2K10PageBody';
import UnicodeToKrutidev10ToolLazy from '@/components/UnicodeToKrutidev10ToolLazy';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import ContentDates from '@/components/seo/ContentDates';
import { TOOL_ABOUT } from '@/content/tool-about';
import { u2k10JsonLdSchemas } from '@/content/u2k10-schemas';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { u2k10Meta } from '@/content/u2k10';

export const metadata: Metadata = buildPageMetadata(u2k10Meta);

export default function UnicodeToKrutiDev10Page() {
  return (
    <>
      <JsonLd id="u2k10-json-ld" data={u2k10JsonLdSchemas} />

      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { label: 'Unicode to KrutiDev 10 Converter' },
          ]}
        />
        <ContentDates
          published={u2k10Meta.datePublished}
          modified={u2k10Meta.dateModified}
        />
      </div>

      <section className="hero-section section-dark u2k10-hero" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content u2k10-hero-content">
            <h1>
              Convert Unicode Hindi Text to KrutiDev 10 —{' '}
              <span className="highlight">Free Online Tool</span>
            </h1>

            <p
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              Convert Unicode Hindi typed in Mangal, Google Input Tools, or InScript into KrutiDev 10
              encoding in seconds. Free, browser-only, no signup required. Built for exam candidates,
              coaching institutes, and DTP workflows that still need Remington-compatible KrutiDev
              output for practice software and legacy printers.
            </p>
          </div>

          <div className="tool-wrapper glass-card">
            <UnicodeToKrutidev10ToolLazy />
          </div>

          <p className="u2k10-author-byline">
            Validated by{' '}
            <Link href="/about-us">Akshay Verma</Link>
            , Software Developer and Hindi Typing Expert
          </p>
        </div>
      </section>

      <AboutTheTool tool={TOOL_ABOUT['unicode-to-krutidev-10']} />

      <U2K10PageBody />
    </>
  );
}
