import Link from 'next/link';
import type { UiBreadcrumb } from '@/lib/seo/breadcrumbs';

export default function Breadcrumbs({
  items,
}: {
  items: UiBreadcrumb[];
}) {
  if (!items.length) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {!isLast && item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span className="current" aria-current="page">
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <span className="breadcrumbs__sep" aria-hidden="true">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
