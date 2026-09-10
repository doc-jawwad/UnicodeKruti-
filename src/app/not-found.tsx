import type { Metadata } from 'next';
import NotFoundView from '@/components/seo/NotFoundView';

/** App Router not-found.tsx — Next.js serves this with HTTP 404 (not a soft 200). */
export const metadata: Metadata = {
  title: 'Page not found',
  description:
    'This page does not exist on UnicodeKruti. Use a free Hindi converter or return home.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function NotFound() {
  return <NotFoundView />;
}
