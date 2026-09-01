import type { Metadata } from 'next';
import { buildLegalPage } from '@/lib/legal-page';

const { metadata: baseMetadata, Page } = buildLegalPage({
  slug: 'terms-conditions',
  title: 'Terms & Conditions',
  description: 'Terms of use for UnicodeKruti.com converters and website content.',
  path: '/terms-conditions',
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
