import { buildLegalPage } from '@/lib/legal-page';

const { metadata, Page } = buildLegalPage({
  slug: 'contact-us',
  title: 'Contact Us',
  description: 'Contact UnicodeKruti.com for converter questions, feedback, or partnership inquiries.',
  path: '/contact-us',
  pageType: 'ContactPage',
});

export { metadata };
export default Page;
