import Link from 'next/link';
import { RELATED_TOOLS } from '@/content/related-tools';

type NotFoundViewProps = {
  /** Optional variant copy (e.g. unpublished blog URLs). */
  variant?: 'default' | 'blog';
};

export default function NotFoundView({ variant = 'default' }: NotFoundViewProps) {
  const isBlog = variant === 'blog';

  return (
    <div className="not-found-page">
      <section className="not-found-hero" aria-labelledby="not-found-heading">
        <div className="orb orb-saffron not-found-orb not-found-orb--1" aria-hidden="true" />
        <div className="orb orb-saffron not-found-orb not-found-orb--2" aria-hidden="true" />

        <div className="container not-found-hero__inner">
          <p className="not-found-code" aria-hidden="true">
            404
          </p>
          <h1 id="not-found-heading" className="not-found-title">
            {isBlog ? 'Blog page not found' : 'Page not found'}
          </h1>
          <p className="not-found-lead">
            {isBlog
              ? 'The UnicodeKruti blog is not published yet, so this URL does not exist. Use a free Hindi converter below instead.'
              : 'That URL is not on UnicodeKruti. It may be an old WordPress link. Pick a free tool below or go home.'}
          </p>
          <div className="not-found-actions">
            <Link href="/" className="btn-primary not-found-home-btn">
              Go to Homepage
              <span aria-hidden="true"> →</span>
            </Link>
            <Link href="/sitemap" className="not-found-secondary-link">
              View HTML sitemap
            </Link>
          </div>
        </div>
      </section>

      <section
        className="not-found-tools content-block section-alt"
        aria-labelledby="not-found-tools-heading"
      >
        <div className="container">
          <h2 id="not-found-tools-heading" className="section-heading">
            Free tools you can use <span className="highlight">right now</span>
          </h2>
          <p className="section-desc not-found-tools__desc">
            Browser-only converters and font download — no signup, text stays on your device.
          </p>
          <ul className="not-found-tool-grid">
            {RELATED_TOOLS.map((tool) => (
              <li key={tool.path}>
                <Link href={tool.path} className="glass-card not-found-tool-card">
                  <h3 className="not-found-tool-card__title">{tool.name}</h3>
                  <p className="not-found-tool-card__desc">{tool.description}</p>
                  <span className="not-found-tool-card__cta">
                    {tool.cta}
                    <span aria-hidden="true"> →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
