import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import WpHtmlPage from '@/components/pages/WpHtmlPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { getCanonicalUrl } from '@/lib/seo';
import { buildPageMetadata } from '@/lib/seo/metadata';

const CONTACT_PATH = '/contact-us';

const config = {
  slug: 'contact-us',
  title: 'Contact Us',
  description:
    'Contact UnicodeKruti.com for converter questions, feedback, or partnership inquiries.',
  path: CONTACT_PATH,
  pageType: 'ContactPage' as const,
};

const pageMetadata = buildPageMetadata({
  title: config.title,
  description: config.description,
  path: config.path,
});

export const metadata: Metadata = {
  ...pageMetadata,
  alternates: {
    ...pageMetadata.alternates,
    canonical: getCanonicalUrl(CONTACT_PATH),
  },
};

export default function ContactUsPage() {
  return (
    <>
      <JsonLd
        id="contact-us-json-ld"
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
