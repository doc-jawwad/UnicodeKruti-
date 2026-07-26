import Link from 'next/link';
import ClientConverter from '@/components/converter/ClientConverter';
import VerificationBanner from '@/components/layout/VerificationBanner';
import WpHtmlIsland from '@/components/pages/WpHtmlIsland';
import { ALL_ROUTES } from '@/lib/site';
import {
  loadWpHtml,
  splitWpHtml,
  type ConverterMount,
} from '@/lib/wp-html';

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
  const html = loadWpHtml(slug);
  const segments = splitWpHtml(html, fallbackConverter);
  const showCrumbs = breadcrumbs && breadcrumbs.length > 0;

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

      <main
        className={`kdd-custom-page${className ? ` ${className}` : ''}`}
      >
        <div className="kdd-page-html entry-content editorial-home">
          {title && !html.includes('<h1') ? <h1>{title}</h1> : null}
          {segments.map((seg, i) => {
            if (seg.type === 'html') {
              return <WpHtmlIsland key={`h-${i}`} html={seg.html} />;
            }
            if (seg.type === 'converter') {
              return (
                <div key={`c-${i}`} id="main-tool" className="wp-converter-mount">
                  <ClientConverter
                    mode={seg.props.mode}
                    variant={seg.props.variant}
                  />
                </div>
              );
            }
            if (seg.type === 'verification') {
              return <VerificationBanner key={`v-${i}`} />;
            }
            if (seg.type === 'sitemap') {
              return (
                <ul key={`s-${i}`} className="wp-sitemap-list">
                  {ALL_ROUTES.map((route) => (
                    <li key={route.href}>
                      <Link href={route.href}>{route.title}</Link>
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>
      </main>
    </>
  );
}
