import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { k010Faqs, k010HowToSteps, k010Meta, k010Toc } from '@/content/k010';
import { schemaBreadcrumbs, uiBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata, PUBLIC_CANONICAL_PATHS } from '@/lib/seo/metadata';

/** Self-referencing canonical — must match live URL /krutidev-010-to-unicode-converter/ */
const K010_PATH = PUBLIC_CANONICAL_PATHS.k010;
const K010_CRUMB = 'KrutiDev 010 to Unicode Converter';

export const metadata: Metadata = buildPageMetadata({
  ...k010Meta,
  path: K010_PATH,
});

export default function KrutiDev010Page() {
  const schema = buildConverterSchema({
    path: K010_PATH,
    pageName: k010Meta.title,
    pageDescription: k010Meta.description,
    appName: 'KrutiDev 010 to Unicode Converter',
    howToName: 'How to Convert KrutiDev 010 Text to Unicode',
    toc: k010Toc,
    faqs: k010Faqs,
    howToSteps: k010HowToSteps,
    howToTotalTime: 'PT1M',
    datePublished: k010Meta.datePublished,
    dateModified: k010Meta.dateModified,
    breadcrumbs: schemaBreadcrumbs(K010_CRUMB, K010_PATH),
  });

  return (
    <>
      <JsonLd id="k010-json-ld" data={schema} />
      <WpHtmlPage
        slug="krutidev-010-to-unicode-converter"
        breadcrumbs={uiBreadcrumbs(K010_CRUMB)}
        fallbackConverter={{ mode: 'kd-to-uni', variant: '010' }}
      />
    </>
  );
}
