import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'terms-conditions',
  title: 'Terms & Conditions',
  description: 'Terms of use for UnicodeKruti.com converters and website content.',
  path: '/terms-conditions',
});

export { metadata };
export default Page;
