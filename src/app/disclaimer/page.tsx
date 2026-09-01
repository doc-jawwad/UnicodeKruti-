import type { Metadata } from 'next';
import { buildLegalPage } from '@/lib/legal-page';

const { metadata: baseMetadata, Page } = buildLegalPage({
  slug: 'disclaimer',
  title: 'Disclaimer',
  description: 'Disclaimer for UnicodeKruti.com converters and informational content.',
  path: '/disclaimer',
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
