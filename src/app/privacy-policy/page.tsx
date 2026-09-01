import type { Metadata } from 'next';
import { buildLegalPage } from '@/lib/legal-page';
import { getCanonicalUrl } from '@/lib/seo';

const PRIVACY_PATH = '/privacy-policy';

const { metadata: baseMetadata, Page } = buildLegalPage({
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  description:
    'UnicodeKruti privacy: browser-only conversion (no text stored or transmitted), Microsoft Clarity analytics, listed cookies only, no third-party sharing of converted text.',
  path: PRIVACY_PATH,
  pageType: 'PrivacyPolicy',
  noIndex: true,
});

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    ...baseMetadata.alternates,
    canonical: getCanonicalUrl(PRIVACY_PATH),
  },
};

export default Page;
