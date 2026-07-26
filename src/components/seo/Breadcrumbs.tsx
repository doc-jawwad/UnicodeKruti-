import Link from 'next/link';

export default function Breadcrumbs({
  items,
}: {
  items: { href?: string; label: string }[];
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
                <span aria-current="page">{item.label}</span>
              )}
              {!isLast ? <span className="breadcrumbs__sep">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
