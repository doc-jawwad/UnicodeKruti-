import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'dmca-policy',
  title: 'DMCA Policy',
  description: 'DMCA copyright notice and takedown policy for UnicodeKruti.com.',
  path: '/dmca-policy',
  noIndex: true,
});

export { metadata };
export default Page;
