import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { k010Faqs, k010HowToSteps, k010Meta, k010Toc } from '@/content/k010';
import { buildPageMetadata, getCanonicalUrl, PUBLIC_CANONICAL_PATHS } from '@/lib/seo/metadata';

/** Self-referencing canonical — must match live URL /krutidev-010-to-unicode-converter/ */
const K010_PATH = PUBLIC_CANONICAL_PATHS.k010;

const pageMetadata = buildPageMetadata({ ...k010Meta, path: K010_PATH });

export const metadata: Metadata = {
  ...pageMetadata,
  alternates: {
    ...pageMetadata.alternates,
    canonical: getCanonicalUrl(K010_PATH),
  },
};

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
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'KrutiDev 010 to Unicode Converter', path: K010_PATH },
    ],
  });

  return (
    <>
      <JsonLd id="k010-json-ld" data={schema} />
      <WpHtmlPage
        slug="krutidev-010-to-unicode-converter"
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'KrutiDev 010 to Unicode Converter' },
        ]}
        fallbackConverter={{ mode: 'kd-to-uni', variant: '010' }}
        datePublished={k010Meta.datePublished}
        dateModified={k010Meta.dateModified}
      />
    </>
  );
}
