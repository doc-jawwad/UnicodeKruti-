import type { Metadata } from 'next';
import { buildLegalPage } from '@/lib/legal-page';

const { metadata: baseMetadata, Page } = buildLegalPage({
  slug: 'sitemap',
  title: 'Sitemap',
  description: 'HTML sitemap of all public pages on UnicodeKruti.com.',
  path: '/sitemap',
  noIndex: true,
});

export const metadata: Metadata = {
  ...baseMetadata,
  robots: {
    index: false,
    follow: false,
  },
};

export default Page;
