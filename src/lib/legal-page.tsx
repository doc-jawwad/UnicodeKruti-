import type { Metadata } from 'next';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { uiBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata, NOINDEX_ROBOTS } from '@/lib/seo/metadata';

type LegalConfig = {
  slug: string;
  title: string;
  description: string;
  path: string;
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'PrivacyPolicy';
  /** Block indexing for utility/legal pages that dilute crawl authority. */
  noIndex?: boolean;
};

export function buildLegalPage(config: LegalConfig) {
  const baseMetadata = buildPageMetadata({
    title: config.title,
    description: config.description,
    path: config.path,
  });

  const metadata: Metadata = config.noIndex
    ? { ...baseMetadata, robots: NOINDEX_ROBOTS }
    : baseMetadata;

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
          breadcrumbs={uiBreadcrumbs(config.title)}
          className="kdd-legal-page"
        />
      </>
    );
  }

  return { metadata, Page };
}
