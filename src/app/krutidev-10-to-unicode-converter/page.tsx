import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { k10Faqs, k10FaqsHindi, k10HowToSteps, k10Meta, k10Toc } from '@/content/k10';
import { getCanonicalUrl } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seo/metadata';

const K10_PATH = '/krutidev-10-to-unicode-converter';

const pageMetadata = buildPageMetadata({
  ...k10Meta,
  hreflangHi: true,
});

export const metadata: Metadata = {
  ...pageMetadata,
  alternates: {
    ...pageMetadata.alternates,
    canonical: getCanonicalUrl(K10_PATH),
  },
};

export default function KrutiDev10Page() {
  const schema = buildConverterSchema({
    path: k10Meta.path,
    pageName: k10Meta.title,
    pageDescription: k10Meta.description,
    appName: 'KrutiDev 10 to Unicode Converter',
    howToName: 'How to Convert KrutiDev 10 Text to Unicode',
    toc: k10Toc,
    faqs: k10Faqs,
    faqsHindi: k10FaqsHindi,
    howToSteps: k10HowToSteps,
    howToTotalTime: 'PT10S',
    datePublished: k10Meta.datePublished,
    dateModified: k10Meta.dateModified,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'KrutiDev 10 to Unicode Converter', path: k10Meta.path },
    ],
  });

  return (
    <>
      <JsonLd id="k10-json-ld" data={schema} />
      <WpHtmlPage
        slug="krutidev-10-to-unicode-converter"
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'KrutiDev 10 to Unicode Converter' },
        ]}
        fallbackConverter={{ mode: 'kd-to-uni', variant: '10' }}
        datePublished={k10Meta.datePublished}
        dateModified={k10Meta.dateModified}
      />
    </>
  );
}
