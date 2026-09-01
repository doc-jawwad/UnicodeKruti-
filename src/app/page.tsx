import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { homeFaqs, homeFaqsHindi, homeHowToSteps, homeMeta, homeToc } from '@/content/home';
import { getCanonicalUrl } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seo/metadata';

const pageMetadata = buildPageMetadata({
  ...homeMeta,
  hreflangHi: true,
});

export const metadata: Metadata = {
  ...pageMetadata,
  alternates: {
    ...pageMetadata.alternates,
    canonical: getCanonicalUrl('/'),
  },
};

export default function HomePage() {
  const schema = buildConverterSchema({
    path: '/',
    pageName: homeMeta.title,
    pageDescription: homeMeta.description,
    appName: 'Unicode to KrutiDev Converter',
    howToName: 'How to Convert Unicode Hindi to KrutiDev 010',
    toc: homeToc,
    faqs: homeFaqs,
    faqsHindi: homeFaqsHindi,
    howToSteps: homeHowToSteps,
    howToTotalTime: 'PT10S',
    datePublished: homeMeta.datePublished,
    dateModified: homeMeta.dateModified,
    breadcrumbs: [{ name: 'Home', path: '/' }],
    speakableCssSelectors: ['#tldr-block', 'h1'],
    includeSitelinks: true,
  });

  return (
    <>
      <JsonLd id="home-json-ld" data={schema} />
      <WpHtmlPage
        slug="home"
        fallbackConverter={{ mode: 'uni-to-kd', variant: '010' }}
        datePublished={homeMeta.datePublished}
        dateModified={homeMeta.dateModified}
      />
    </>
  );
}
