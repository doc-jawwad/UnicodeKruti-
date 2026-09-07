import Breadcrumbs from '@/components/seo/Breadcrumbs';
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
          <Breadcrumbs items={breadcrumbs} />
        </div>
      ) : null}

      <div className={`kdd-custom-page${className ? ` ${className}` : ''}`}>
        <div className="kdd-page-html entry-content editorial-home">
          {needsTitle ? <h1>{title}</h1> : null}
          <WpHtmlClient html={html} />
        </div>
      </div>
    </>
  );
}
