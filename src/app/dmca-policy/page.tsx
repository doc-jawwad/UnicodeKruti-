import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const meta = {
  title: 'DMCA Policy',
  description: 'DMCA notice and takedown policy for UnicodeKruti.com.',
  path: '/dmca-policy',
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
        })}
      />
      <LegalPage title={meta.title} description={meta.description}>
        <p>
          If you believe content on UnicodeKruti.com infringes your copyright, email a DMCA notice to{' '}
          <a href="mailto:contact@unicodekruti.com">contact@unicodekruti.com</a> with:
        </p>
        <ul>
          <li>Identification of the copyrighted work</li>
          <li>URL of the allegedly infringing material</li>
          <li>Your contact information</li>
          <li>A statement of good-faith belief and accuracy under penalty of perjury</li>
          <li>Your physical or electronic signature</li>
        </ul>
        <p>We will review valid notices and remove or disable access to infringing material as appropriate.</p>
      </LegalPage>
    </>
  );
}
