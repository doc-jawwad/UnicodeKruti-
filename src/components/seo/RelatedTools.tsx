import Link from 'next/link';
import {
  getRelatedTools,
  type RelatedToolIcon,
  type RelatedToolsVariant,
} from '@/content/related-tools';

function ToolIcon({ type }: { type: RelatedToolIcon }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  };

  if (type === 'font') {
    return (
      <svg {...common}>
        <path d="M4 20h16" />
        <path d="M6 4v16" />
        <path d="M6 4h6a4 4 0 0 1 0 8H6" />
        <path d="M14 12h2a4 4 0 0 1 0 8h-2" />
      </svg>
    );
  }

  if (type === 'version') {
    return (
      <svg {...common}>
        <path d="M12 3v18" />
        <path d="M5 8h14" />
        <path d="M7 16h10" />
        <path d="M9 12h6" />
      </svg>
    );
  }

  // u2k / k2u — conversion arrows
  return (
    <svg {...common}>
      <path d="M7 7h11" />
      <path d="M14 3l4 4-4 4" />
      <path d="M17 17H6" />
      <path d="M10 13l-4 4 4 4" />
    </svg>
  );
}

export default function RelatedTools({
  currentPath,
  variant = 'section',
}: {
  /** Route path for the page being viewed (e.g. `/krutidev-to-unicode`). */
  currentPath: string;
  variant?: RelatedToolsVariant;
}) {
  const isCompact = variant === 'compact';
  const tools = getRelatedTools(currentPath);
  if (tools.length === 0) return null;

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
            className={`glass-card related-tool-card${isCompact ? ' related-tool-card--rail' : ''}`}
          >
            <div className="related-tool-card__top">
              <span
                className={`related-tool-card__icon related-tool-card__icon--${tool.icon}`}
                aria-hidden="true"
              >
                <ToolIcon type={tool.icon} />
              </span>
              <div className="related-tool-card__copy">
                <h3 className="related-tool-card__title">{tool.name}</h3>
                {!isCompact ? (
                  <p className="related-tool-card__desc">{tool.description}</p>
                ) : null}
              </div>
            </div>
            <span className="related-tool-card__link">
              {isCompact ? tool.railCta : tool.cta}
              <span aria-hidden="true"> →</span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
