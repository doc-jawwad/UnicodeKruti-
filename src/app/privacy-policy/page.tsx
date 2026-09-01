import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  description:
    'UnicodeKruti privacy: browser-only conversion (no text stored or transmitted), Microsoft Clarity analytics, listed cookies only, no third-party sharing of converted text.',
  path: '/privacy-policy',
  pageType: 'PrivacyPolicy',
  noIndex: true,
});

export { metadata };
export default Page;
