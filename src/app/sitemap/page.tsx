import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'sitemap',
  title: 'Sitemap',
  description: 'HTML sitemap of all public pages on UnicodeKruti.com.',
  path: '/sitemap',
});

export { metadata };
export default Page;
