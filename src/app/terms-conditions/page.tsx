import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'terms-conditions',
  title: 'Terms & Conditions',
  description: 'Terms of use for UnicodeKruti.com converters and website content.',
  path: '/terms-conditions',
  noIndex: true,
});

export { metadata };
export default Page;
