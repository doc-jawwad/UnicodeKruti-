import Link from 'next/link';
import type { Metadata } from 'next';

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
  return (
    <main className="legal-page">
      <div className="container prose" style={{ padding: '3rem 1.25rem' }}>
        <h1>Blog page not found</h1>
        <p>
          The UnicodeKruti blog is not published yet, so this URL does not exist.
          Use a free converter from the homepage instead.
        </p>
        <p>
          <Link href="/">Go to Homepage</Link>
        </p>
        <ul>
          <li>
            <Link href="/krutidev-to-unicode-converter">
              KrutiDev to Unicode Converter
            </Link>
          </li>
          <li>
            <Link href="/krutidev-010-to-unicode-converter">
              KrutiDev 010 to Unicode Converter
            </Link>
          </li>
          <li>
            <Link href="/font-download">KrutiDev Font Download</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
