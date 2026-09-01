import type { Metadata } from 'next';
import { buildLegalPage } from '@/lib/legal-page';

const { metadata: baseMetadata, Page } = buildLegalPage({
  slug: 'cookie-policy',
  title: 'Cookie Policy',
  description: 'Cookie and similar technology use on UnicodeKruti.com.',
  path: '/cookie-policy',
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
