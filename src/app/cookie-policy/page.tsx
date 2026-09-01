import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'cookie-policy',
  title: 'Cookie Policy',
  description: 'Cookie and similar technology use on UnicodeKruti.com.',
  path: '/cookie-policy',
  noIndex: true,
});

export { metadata };
export default Page;
