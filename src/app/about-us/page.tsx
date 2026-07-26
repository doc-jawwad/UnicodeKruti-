import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'about-us',
  title: 'About Us',
  description:
    'UnicodeKruti.com builds free, browser-based Unicode ↔ KrutiDev converters for Hindi typists, CPCT candidates, and DTP teams.',
  path: '/about-us',
  pageType: 'AboutPage',
});

export { metadata };
export default Page;
