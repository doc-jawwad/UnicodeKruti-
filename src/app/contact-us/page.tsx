import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const config = {
  slug: 'contact-us',
  title: 'Contact Us',
  description:
    'Contact UnicodeKruti.com for converter questions, feedback, or partnership inquiries.',
  path: '/contact-us',
  pageType: 'ContactPage' as const,
};

export const metadata: Metadata = buildPageMetadata({
  title: config.title,
  description: config.description,
  path: config.path,
});

export default function ContactUsPage() {
  return (
    <>
      <JsonLd
        data={buildLegalSchema({
          path: config.path,
          pageName: config.title,
          pageDescription: config.description,
          pageType: config.pageType,
        })}
      />
      <WpHtmlPage
        slug={config.slug}
        title={config.title}
        breadcrumbs={[
          { href: '/', label: 'Home' },
          { label: config.title },
        ]}
        className="kdd-legal-page"
      />
      <div className="container contact-form-wrap">
        <ContactForm />
      </div>
    </>
  );
}
