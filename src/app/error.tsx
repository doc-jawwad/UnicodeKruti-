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
    <div className="not-found-page">
      <section className="not-found-hero" aria-labelledby="error-heading">
        <div className="orb orb-saffron not-found-orb not-found-orb--1" aria-hidden="true" />
        <div className="container not-found-hero__inner">
          <h1 id="error-heading" className="not-found-title">
            Something went wrong
          </h1>
          <p className="not-found-lead">
            Please try again. Your converter text stays in the browser and was not uploaded.
          </p>
          <div className="not-found-actions">
            <button type="button" className="btn-primary" onClick={reset}>
              Try again
            </button>
            <Link href="/" className="not-found-secondary-link">
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
