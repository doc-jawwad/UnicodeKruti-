import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { k2uFaqs, k2uHowToSteps, k2uMeta, k2uToc } from '@/content/k2u';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(k2uMeta);

export default function KrutiDevToUnicodePage() {
  const schema = buildConverterSchema({
    path: k2uMeta.path,
    pageName: k2uMeta.title,
    pageDescription: k2uMeta.description,
    appName: 'KrutiDev to Unicode Converter',
    howToName: 'How to Convert KrutiDev Text to Unicode',
    toc: k2uToc,
    faqs: k2uFaqs,
    howToSteps: k2uHowToSteps,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'KrutiDev to Unicode Converter', path: k2uMeta.path },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />
      <WpHtmlPage
        slug="krutidev-to-unicode-converter"
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'KrutiDev to Unicode Converter' },
        ]}
        fallbackConverter={{ mode: 'kd-to-uni', variant: '010' }}
      />
    </>
  );
}
