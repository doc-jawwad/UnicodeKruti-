import type { Metadata } from 'next';
import MangalToKrutidevPageBody from '@/components/pages/mangal-to-krutidev/MangalToKrutidevPageBody';
import MangalToKrutidevToolLazy from '@/components/MangalToKrutidevToolLazy';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import RelatedTools from '@/components/seo/RelatedTools';
import { buildConverterSchema } from '@/components/seo/schema';
import { mangalFaqs, mangalMeta } from '@/content/mangal-to-krutidev';
import { buildPageMetadata, PUBLIC_CANONICAL_PATHS } from '@/lib/seo/metadata';
import { schemaBreadcrumbs, uiBreadcrumbs } from '@/lib/seo/breadcrumbs';

/** Compact rail destinations — curated next actions only (ordered). */
const MANGAL_RELATED_PATHS = [
  '/krutidev-to-unicode-converter/',
  '/nirmala-ui-to-krutidev-converter/',
  '/font-download/',
  '/',
] as const;

const PATH = PUBLIC_CANONICAL_PATHS.mangalToKrutidev;

const baseMetadata = buildPageMetadata({
  title: mangalMeta.title,
  description: mangalMeta.description,
  path: PATH,
});

/** Exact OG/Twitter title (buildPageMetadata would append `| UnicodeKruti`). */
export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: mangalMeta.title },
  openGraph: { ...baseMetadata.openGraph, title: mangalMeta.title },
  twitter: { ...baseMetadata.twitter, title: mangalMeta.title },
};

const schema = buildConverterSchema({
  path: PATH,
  pageName: mangalMeta.title,
  pageDescription: mangalMeta.description,
  appName: 'Mangal to KrutiDev Converter',
  appDescription:
    'Free browser-based tool that converts Unicode Hindi text, including text from Mangal, to KrutiDev 010. Copy the result for Word or DTP software.',
  featureList: [
    'Converts Unicode Hindi to KrutiDev 010 as you paste',
    'Conversion runs in the browser',
    'Copy output or download as Word, PDF or TXT',
  ],
  howToName: '',
  toc: [],
  howToSteps: [],
  faqs: mangalFaqs,
  breadcrumbs: schemaBreadcrumbs(mangalMeta.breadcrumbLabel, `${PATH}/`),
  speakableCssSelectors: ['#tldr-block', 'h1'],
  // No Person/reviewer nodes: this page makes no expert-verification claim.
  includeReviewer: false,
});

// The shared WebApplication generator defaults to a Person author and hi language;
// this page claims neither.
for (const node of schema['@graph'] as Record<string, unknown>[]) {
  if (node['@type'] === 'WebApplication') {
    delete node.author;
    node.inLanguage = 'en-IN';
  }
}

export default function MangalToKrutidevPage() {
  return (
    <>
      <JsonLd id="mangal-to-krutidev-json-ld" data={schema} />

      <div className="container">
        <Breadcrumbs items={uiBreadcrumbs(mangalMeta.breadcrumbLabel)} />
      </div>

      <section className="hero-section section-dark nirmala-hero" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content">
            <h1>
              Mangal to KrutiDev Converter —{' '}
              <span className="highlight">Free Online (Kruti Dev 010)</span>
            </h1>

            <p
              id="tldr-block"
              itemProp="speakable"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              Use this Mangal to KrutiDev converter to turn Unicode Hindi into
              KrutiDev 010 instantly. Then copy the result into Word or your DTP
              software.
            </p>
          </div>

          <div className="hero-tool-row">
            <RelatedTools
              currentPath={PATH}
              variant="compact"
              semanticHeadings={false}
              onlyPaths={MANGAL_RELATED_PATHS}
            />

            <div className="tool-wrapper glass-card">
              <MangalToKrutidevToolLazy />
            </div>
          </div>
        </div>
      </section>

      <MangalToKrutidevPageBody />
    </>
  );
}
