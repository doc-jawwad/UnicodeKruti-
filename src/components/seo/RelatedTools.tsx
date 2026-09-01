import Link from 'next/link';
import {
  getRelatedTools,
  type RelatedToolsVariant,
} from '@/content/related-tools';

export default function RelatedTools({
  currentPath,
  variant = 'section',
}: {
  /** Route path for the page being viewed (e.g. `/krutidev-to-unicode`). */
  currentPath: string;
  variant?: RelatedToolsVariant;
}) {
  const tools = getRelatedTools(currentPath);
  if (tools.length === 0) return null;

  const isCompact = variant === 'compact';

  return (
    <aside
      className={`related-tools-section${isCompact ? ' related-tools-section--compact' : ''}`}
      aria-label={isCompact ? 'You might also need' : 'Related tools'}
    >
      {isCompact ? (
        <h2 className="related-tools-section__heading">You might also need</h2>
      ) : null}
      <div className="related-tools-grid">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="glass-card related-tool-card"
          >
            <div>
              <h3 className="related-tool-card__title">{tool.name}</h3>
              <p className="related-tool-card__desc">{tool.description}</p>
            </div>
            <span className="related-tool-card__link">{tool.name} →</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
