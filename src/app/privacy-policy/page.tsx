import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const meta = {
  title: 'Privacy Policy',
  description:
    'How UnicodeKruti handles privacy: browser-only conversion, optional analytics, and cookies.',
  path: '/privacy-policy',
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
          pageType: 'PrivacyPolicy',
        })}
      />
      <LegalPage title={meta.title} description={meta.description}>
        <h2>Converter text</h2>
        <p>
          Unicode ↔ KrutiDev conversion runs in your browser with JavaScript. Your source and output
          text are not uploaded to UnicodeKruti servers for conversion.
        </p>
        <h2>Local storage</h2>
        <p>
          Recent conversions may be stored in your browser’s localStorage so you can reuse history on
          the same device. Clearing site data removes that history.
        </p>
        <h2>Analytics</h2>
        <p>
          If configured, we may use Google Analytics 4 and/or Microsoft Clarity to understand traffic
          and usability. These tools can set cookies or similar identifiers and collect aggregated
          usage data (pages visited, device type, approximate location). They do not receive the
          Hindi text you paste into the converter.
        </p>
        <h2>Contact</h2>
        <p>
          Privacy questions: <a href="mailto:contact@unicodekruti.com">contact@unicodekruti.com</a>.
        </p>
      </LegalPage>
    </>
  );
}
