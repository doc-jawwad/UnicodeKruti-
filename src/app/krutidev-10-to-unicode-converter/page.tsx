import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { k10Faqs, k10HowToSteps, k10Meta, k10Toc } from '@/content/k10';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(k10Meta);

export default function KrutiDev10Page() {
  const schema = buildConverterSchema({
    path: k10Meta.path,
    pageName: k10Meta.title,
    pageDescription: k10Meta.description,
    appName: 'KrutiDev 10 to Unicode Converter',
    howToName: 'How to Convert KrutiDev 10 Text to Unicode',
    toc: k10Toc,
    faqs: k10Faqs,
    howToSteps: k10HowToSteps,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'KrutiDev 10 to Unicode Converter', path: k10Meta.path },
    ],
  });

  return (
    <>
      <JsonLd data={schema} />
      <WpHtmlPage
        slug="krutidev-10-to-unicode-converter"
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: 'KrutiDev 10 to Unicode Converter' },
        ]}
        fallbackConverter={{ mode: 'kd-to-uni', variant: '10' }}
      />
    </>
  );
}
