import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const meta = {
  title: 'Disclaimer',
  description: 'Disclaimer for UnicodeKruti.com conversion tools and content.',
  path: '/disclaimer',
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
          Conversion accuracy is high on standard KrutiDev 010 / KrutiDev 10 documents but cannot be
          guaranteed for every mixed-encoding, OCR, or scanned-image file. Always verify critical
          government or exam submissions before filing.
        </p>
        <p>
          Content on this site is informational and not legal, exam, or professional advice.
          KrutiDev 055 (Marathi) is outside the scope of this converter.
        </p>
      </LegalPage>
    </>
  );
}
