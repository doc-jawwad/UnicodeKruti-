import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const meta = {
  title: 'About Us',
  description:
    'UnicodeKruti.com builds free, browser-based Unicode ↔ KrutiDev converters for Hindi typists, CPCT candidates, and DTP teams.',
  path: '/about-us',
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
          pageType: 'AboutPage',
        })}
      />
      <LegalPage title={meta.title} description={meta.description}>
        <p>
          UnicodeKruti.com provides free, browser-based Unicode ↔ KrutiDev converters for government
          typists, CPCT candidates, DTP operators, and Hindi publishers. Conversion runs entirely on
          your device — we do not upload your text to a server.
        </p>
        <p>
          Our tools focus on the KrutiDev 010 / KrutiDev 10 mapping used across Hindi government and
          exam workflows. Character mapping is cross-checked against CPCT practice materials and
          common Devanagari documents.
        </p>
        <p>
          Mapping review is credited to Akshay Verma, a software developer and Hindi typing expert.
          Accuracy testing (for example 99.9% on standard KrutiDev 010 documents) describes conversion
          quality checks — it is not a user star rating.
        </p>
      </LegalPage>
    </>
  );
}
