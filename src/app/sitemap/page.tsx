import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/pages/LegalPage';
import { ALL_ROUTES } from '@/lib/site';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Sitemap',
  description: 'HTML sitemap of all public pages on UnicodeKruti.com.',
  path: '/sitemap',
});

export default function HtmlSitemapPage() {
  return (
    <LegalPage
      title="Sitemap"
      description="All public pages on UnicodeKruti.com."
    >
      <ul>
        {ALL_ROUTES.map((route) => (
          <li key={route.href}>
            <Link href={route.href}>{route.title}</Link>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
