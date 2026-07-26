import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

type LegalConfig = {
  slug: string;
  title: string;
  description: string;
  path: string;
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'PrivacyPolicy';
};

export function buildLegalPage(config: LegalConfig) {
  const metadata: Metadata = buildPageMetadata({
    title: config.title,
    description: config.description,
    path: config.path,
  });

  function Page() {
    return (
      <>
        <JsonLd
          data={buildLegalSchema({
            path: config.path,
            pageName: config.title,
            pageDescription: config.description,
            pageType: config.pageType,
          })}
        />
        <WpHtmlPage
          slug={config.slug}
          title={config.title}
          breadcrumbs={[
            { href: '/', label: 'Home' },
            { label: config.title },
          ]}
          className="kdd-legal-page"
        />
      </>
    );
  }

  return { metadata, Page };
}
