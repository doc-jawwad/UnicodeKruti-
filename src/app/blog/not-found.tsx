import type { Metadata } from 'next';
import NotFoundView from '@/components/seo/NotFoundView';

/**
 * Segment 404 for /blog/* when a path is not redirected.
 * Root `src/app/not-found.tsx` covers the rest of the site.
 */
export const metadata: Metadata = {
  title: 'Blog page not found',
  description:
    'This blog URL is not available on UnicodeKruti. Return to the homepage for free Hindi converters.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function BlogNotFound() {
  return <NotFoundView variant="blog" />;
}
