import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { k2uFaqs, k2uFaqsHindi, k2uHowToSteps, k2uMeta, k2uToc } from '@/content/k2u';
import { getCanonicalUrl } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seo/metadata';

const K2U_PATH = '/krutidev-to-unicode-converter';

const pageMetadata = buildPageMetadata({
  ...k2uMeta,
  path: K2U_PATH,
  hreflangHi: true,
});

export const metadata: Metadata = {
  ...pageMetadata,
  alternates: {
    ...pageMetadata.alternates,
    canonical: getCanonicalUrl(K2U_PATH),
  },
};

export default function KrutiDevToUnicodePage() {
  const schema = buildConverterSchema({
    path: K2U_PATH,
    pageName: k2uMeta.title,
    pageDescription: k2uMeta.description,
    appName: 'KrutiDev to Unicode Converter',
    howToName: 'How to Convert KrutiDev Text to Unicode',
    toc: k2uToc,
    faqs: k2uFaqs,
    faqsHindi: k2uFaqsHindi,
    howToSteps: k2uHowToSteps,
    howToTotalTime: 'PT10S',
    datePublished: k2uMeta.datePublished,
    dateModified: k2uMeta.dateModified,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'KrutiDev to Unicode Converter', path: K2U_PATH },
    ],
  });

  return (
    <>
      <JsonLd id="k2u-json-ld" data={schema} />
      <WpHtmlPage
        slug="krutidev-to-unicode-converter"
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'KrutiDev to Unicode Converter' },
        ]}
        fallbackConverter={{ mode: 'kd-to-uni', variant: '010' }}
        datePublished={k2uMeta.datePublished}
        dateModified={k2uMeta.dateModified}
      />
    </>
  );
}
