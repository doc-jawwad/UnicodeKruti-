import type { Metadata } from 'next';
import HomePageContent from '@/components/pages/HomePageContent';
import JsonLd from '@/components/seo/JsonLd';
import { buildConverterSchema } from '@/components/seo/schema';
import { homeFaqs, homeHowToSteps, homeMeta, homeToc } from '@/content/home';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata(homeMeta);

export default function HomePage() {
  const schema = buildConverterSchema({
    path: '/',
    pageName: homeMeta.title,
    pageDescription: homeMeta.description,
    appName: 'Unicode to KrutiDev Converter',
    howToName: 'How to Convert Unicode Hindi to KrutiDev 010',
    toc: homeToc,
    faqs: homeFaqs,
    howToSteps: homeHowToSteps,
  });

  return (
    <main>
      <JsonLd data={schema} />
      <HomePageContent />
    </main>
  );
}
