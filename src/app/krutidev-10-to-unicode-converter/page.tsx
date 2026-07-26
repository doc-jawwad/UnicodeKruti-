import type { Metadata } from 'next';
import K10PageContent from '@/components/pages/K10PageContent';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { k10AllFaqs, k10HowToSteps, k10Meta, k10Toc } from '@/content/k10';
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
    faqs: k10AllFaqs,
    howToSteps: k10HowToSteps,
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'KrutiDev 10 to Unicode Converter', path: k10Meta.path },
    ],
  });

  return (
    <main>
      <JsonLd data={schema} />
      <K10PageContent />
    </main>
  );
}
