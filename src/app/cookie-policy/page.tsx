import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const meta = {
  title: 'Cookie Policy',
  description: 'Cookies and similar technologies used on UnicodeKruti.com.',
  path: '/cookie-policy',
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
          UnicodeKruti uses essential cookies or local storage needed for site function (for example
          remembering recent conversions in your browser).
        </p>
        <p>
          If Google Analytics 4 or Microsoft Clarity are enabled via environment configuration, those
          services may set analytics cookies to measure visits and interactions. Converter text is not
          sent to analytics as part of conversion.
        </p>
        <p>
          You can block cookies in your browser settings. Blocking analytics cookies does not stop
          the converter from working.
        </p>
      </LegalPage>
    </>
  );
}
