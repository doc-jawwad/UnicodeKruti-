import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'disclaimer',
  title: 'Disclaimer',
  description: 'Disclaimer for UnicodeKruti.com converters and informational content.',
  path: '/disclaimer',
});

export { metadata };
export default Page;
