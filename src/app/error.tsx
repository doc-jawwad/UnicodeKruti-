'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="legal-page">
      <div className="container prose" style={{ padding: '3rem 1.25rem' }}>
        <h1>Something went wrong</h1>
        <p>Please try again. Your converter text stays in the browser and was not uploaded.</p>
        <p>
          <button type="button" className="btn-primary" onClick={reset}>
            Try again
          </button>{' '}
          <Link href="/">Back to Home</Link>
        </p>
      </div>
    </main>
  );
}
