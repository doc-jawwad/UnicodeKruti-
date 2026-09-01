import type { Metadata } from 'next';
import { buildLegalPage } from '@/lib/legal-page';

const { metadata: baseMetadata, Page } = buildLegalPage({
  slug: 'dmca-policy',
  title: 'DMCA Policy',
  description: 'DMCA copyright notice and takedown policy for UnicodeKruti.com.',
  path: '/dmca-policy',
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
