import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const meta = {
  title: 'Contact Us',
  description:
    'Contact UnicodeKruti for converter feedback, mapping corrections, or content suggestions.',
  path: '/contact-us',
};

export const metadata: Metadata = buildPageMetadata(meta);

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildLegalSchema({
          path: meta.path,
          pageName: meta.title,
          pageDescription: meta.description,
          pageType: 'ContactPage',
        })}
      />
      <LegalPage title={meta.title} description={meta.description}>
        <p>
          Email us at{' '}
          <a href="mailto:contact@unicodekruti.com">contact@unicodekruti.com</a> for product
          feedback, mapping corrections, or content suggestions.
        </p>
        <p>
          We do not collect converter text. Paste, convert, and export happen in your browser. If you
          write to us, include only the information you are comfortable sharing — do not send
          confidential government or court documents by email unless necessary.
        </p>
        <p>Typical response topics: wrong character mappings, UI bugs, and page content clarity.</p>
      </LegalPage>
    </>
  );
}
