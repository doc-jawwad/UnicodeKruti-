import Link from 'next/link';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export default function LegalPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="legal-page">
      <div className="container">
        <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: title }]} />
        <header className="legal-hero">
          <h1>{title}</h1>
          <p className="hero-subtitle">{description}</p>
        </header>
        <article className="prose legal-body">{children}</article>
        <p className="legal-back">
          <Link href="/">← Back to Home</Link>
        </p>
      </div>
    </main>
  );
}
