import Link from 'next/link';
import WpHtmlClient from '@/components/pages/WpHtmlClient';
import { renderWpHtml, type ConverterMount } from '@/lib/wp-html';

export default function WpHtmlPage({
  slug,
  title,
  breadcrumbs,
  fallbackConverter,
  className = '',
}: {
  slug: string;
  title?: string;
  breadcrumbs?: { href?: string; label: string }[];
  fallbackConverter?: ConverterMount;
  className?: string;
}) {
  const html = renderWpHtml(slug, fallbackConverter);
  const showCrumbs = breadcrumbs && breadcrumbs.length > 0;
  const needsTitle = title && !html.includes('<h1');

  return (
    <>
      {showCrumbs ? (
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <span key={`${item.label}-${index}`}>
                  {index > 0 ? <span className="separator">/</span> : null}
                  {isLast || !item.href ? (
                    <span className="current" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href}>{item.label}</Link>
                  )}
                </span>
              );
            })}
          </nav>
        </div>
      ) : null}

      <main className={`kdd-custom-page${className ? ` ${className}` : ''}`}>
        <div className="kdd-page-html entry-content editorial-home">
          {needsTitle ? <h1>{title}</h1> : null}
          <WpHtmlClient html={html} />
        </div>
      </main>
    </>
  );
}
