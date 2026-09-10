import type { Metadata } from 'next';
import Link from 'next/link';
import AboutTheTool from '@/components/seo/AboutTheTool';
import U2K10PageBody from '@/components/pages/u2k10/U2K10PageBody';
import UnicodeToKrutidev10ToolLazy from '@/components/UnicodeToKrutidev10ToolLazy';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { TOOL_ABOUT } from '@/content/tool-about';
import { u2k10JsonLdSchemas } from '@/content/u2k10-schemas';
import { buildPageMetadata } from '@/lib/seo/metadata';
import RelatedTools from '@/components/seo/RelatedTools';
import { u2k10Meta } from '@/content/u2k10';
import { uiBreadcrumbs } from '@/lib/seo/breadcrumbs';

const U2K10_PATH = '/unicode-to-krutidev-10-converter';
const U2K10_CRUMB = 'Unicode to KrutiDev 10 Converter';

export const metadata: Metadata = buildPageMetadata(u2k10Meta);

export default function UnicodeToKrutiDev10Page() {
  return (
    <>
      <JsonLd id="u2k10-json-ld" data={u2k10JsonLdSchemas} />

      <div className="container">
        <Breadcrumbs items={uiBreadcrumbs(U2K10_CRUMB)} />
      </div>

      <section className="hero-section section-dark u2k10-hero" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content u2k10-hero-content">
            <h1>
              Unicode to KrutiDev 10 Converter —{' '}
              <span className="highlight">Free Online Tool</span>
            </h1>

            <p
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              Paste Unicode Hindi from Mangal or Nirmala UI to get KrutiDev 10
              for exam forms and DTP layouts. Conversion stays in your
              browser—nothing is uploaded or stored. Free, unlimited
              characters, and no signup required on phone or desktop.
            </p>
          </div>

          <div className="hero-tool-row">
            <RelatedTools
              currentPath={u2k10Meta.path}
              variant="compact"
            />

            <div className="tool-wrapper glass-card">
              <UnicodeToKrutidev10ToolLazy />
            </div>
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
