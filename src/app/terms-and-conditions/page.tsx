import type { Metadata } from 'next';
import LegalPage from '@/components/pages/LegalPage';
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalSchema } from '@/components/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';

const meta = {
  title: 'Terms & Conditions',
  description: 'Terms of use for UnicodeKruti.com converters and website content.',
  path: '/terms-and-conditions',
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
          By using UnicodeKruti.com you agree to use the converters for lawful purposes and to verify
          critical outputs yourself. The tools are provided free of charge, as-is, without warranty of
          uninterrupted availability or fitness for a particular filing deadline.
        </p>
        <p>
          You retain ownership of text you paste. We do not claim rights to converter input or output.
          Site branding, layout, and original explanatory content remain UnicodeKruti property.
        </p>
        <p>
          We may update these terms; the date of material site updates is reflected in our sitemap
          and page content. Questions:{' '}
          <a href="mailto:contact@unicodekruti.com">contact@unicodekruti.com</a>.
        </p>
      </LegalPage>
    </>
  );
}
