import Link from 'next/link';

export type TocItem = { id: string; label: string };

export default function Toc({ items }: { items: TocItem[] }) {
  return (
    <nav className="toc" aria-label="Table of contents">
      <details open>
        <summary className="toc__summary">Table of Contents</summary>
        <ol className="toc__list">
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`#${item.id}`}>{item.label}</Link>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
