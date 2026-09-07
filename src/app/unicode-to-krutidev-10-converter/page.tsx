import type { Metadata } from 'next';
import Link from 'next/link';
import AboutTheTool from '@/components/seo/AboutTheTool';
import U2K10PageBody from '@/components/pages/u2k10/U2K10PageBody';
import UnicodeToKrutidev10ToolLazy from '@/components/UnicodeToKrutidev10ToolLazy';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import { TOOL_ABOUT } from '@/content/tool-about';
import { u2k10JsonLdSchemas } from '@/content/u2k10-schemas';
import { getCanonicalUrl } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seo/metadata';
import RelatedTools from '@/components/seo/RelatedTools';
import { u2k10Meta } from '@/content/u2k10';

const U2K10_PATH = '/unicode-to-krutidev-10-converter';

const pageMetadata = buildPageMetadata(u2k10Meta);

export const metadata: Metadata = {
  ...pageMetadata,
  alternates: {
    ...pageMetadata.alternates,
    canonical: getCanonicalUrl(U2K10_PATH),
  },
};

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
              Paste Unicode Hindi below to get KrutiDev 10 instantly. Free,
              browser-only, no signup.
            </p>
          </div>

          <div className="tool-wrapper glass-card">
            <UnicodeToKrutidev10ToolLazy />
          </div>

          <RelatedTools
            currentPath={u2k10Meta.path}
            variant="compact"
          />

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
