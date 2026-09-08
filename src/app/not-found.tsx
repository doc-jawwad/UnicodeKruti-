import Link from 'next/link';
import type { Metadata } from 'next';

/** App Router not-found.tsx — Next.js serves this with HTTP 404 (not a soft 200). */
export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist on UnicodeKruti. Use a free Hindi converter or return home.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function NotFound() {
  return (
    <main className="legal-page">
      <div className="container prose" style={{ padding: '3rem 1.25rem' }}>
        <h1>Page not found</h1>
        <p>
          That URL is not on UnicodeKruti.com. It may be an old WordPress link.
          Try the homepage or one of these free tools:
        </p>
        <ul>
          <li>
            <Link href="/">Unicode to KrutiDev Converter (Homepage)</Link>
          </li>
          <li>
            <Link href="/krutidev-to-unicode-converter">
              KrutiDev to Unicode Converter
            </Link>
          </li>
          <li>
            <Link href="/krutidev-10-to-unicode-converter">
              KrutiDev 10 to Unicode Converter
            </Link>
          </li>
          <li>
            <Link href="/krutidev-010-to-unicode-converter">
              KrutiDev 010 to Unicode Converter
            </Link>
          </li>
          <li>
            <Link href="/unicode-to-krutidev-10-converter">
              Unicode to KrutiDev 10 Converter
            </Link>
          </li>
          <li>
            <Link href="/updesh-converter">Updesh Converter</Link>
          </li>
          <li>
            <Link href="/font-download">KrutiDev Font Download</Link>
          </li>
        </ul>
        <p>
          <Link href="/">Go to Homepage</Link>
        </p>
      </div>
    </main>
  );
}
