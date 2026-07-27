import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { k010Faqs, k010HowToSteps, k010Meta, k010Toc } from '@/content/k010';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(k010Meta);

export default function KrutiDev010Page() {
  const schema = buildConverterSchema({
    path: k010Meta.path,
    pageName: k010Meta.title,
    pageDescription: k010Meta.description,
    appName: 'KrutiDev 010 to Unicode Converter',
    howToName: 'How to Convert KrutiDev 010 Text to Unicode',
    toc: k010Toc,
    faqs: k010Faqs,
    howToSteps: k010HowToSteps,
    datePublished: k010Meta.datePublished,
    dateModified: k010Meta.dateModified,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'KrutiDev 010 to Unicode Converter', path: k010Meta.path },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />
      <WpHtmlPage
        slug="krutidev-010-to-unicode-converter"
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'KrutiDev 010 to Unicode Converter' },
        ]}
        fallbackConverter={{ mode: 'kd-to-uni', variant: '010' }}
      />
    </>
  );
}
