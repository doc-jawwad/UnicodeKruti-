import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="legal-page">
      <div className="container prose" style={{ padding: '3rem 1.25rem' }}>
        <h1>Page not found</h1>
        <p>That URL is not on UnicodeKruti.com. Try one of these converters:</p>
        <ul>
          <li>
            <Link href="/">Unicode to KrutiDev</Link>
          </li>
          <li>
            <Link href="/krutidev-to-unicode">KrutiDev to Unicode</Link>
          </li>
          <li>
            <Link href="/krutidev-10-to-unicode-converter">KrutiDev 10 to Unicode</Link>
          </li>
          <li>
            <Link href="/sitemap">HTML Sitemap</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
