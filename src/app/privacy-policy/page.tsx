import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'privacy-policy',
  title: 'Privacy Policy',
  description:
    'How UnicodeKruti handles privacy: browser-only conversion, optional analytics, and cookies.',
  path: '/privacy-policy',
  pageType: 'PrivacyPolicy',
});

export { metadata };
export default Page;
