import Link from 'next/link';
import {
  RELATED_TOOLS,
  getRelatedTools,
  normalizeToolPath,
  type RelatedTool,
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

function resolveRelatedTools(
  currentPath: string,
  onlyPaths?: readonly string[],
): RelatedTool[] {
  if (!onlyPaths?.length) return getRelatedTools(currentPath);

  const current = normalizeToolPath(currentPath);
  const byPath = new Map(
    RELATED_TOOLS.map((tool) => [normalizeToolPath(tool.path), tool] as const),
  );

  return onlyPaths.flatMap((path) => {
    const tool = byPath.get(normalizeToolPath(path));
    if (!tool || normalizeToolPath(tool.path) === current) return [];
    return [tool];
  });
}

export default function RelatedTools({
  currentPath,
  variant = 'section',
  semanticHeadings = true,
  onlyPaths,
}: {
  /** Route path for the page being viewed (e.g. `/krutidev-to-unicode`). */
  currentPath: string;
  variant?: RelatedToolsVariant;
  /**
   * When false, compact-rail title/card labels stay visual-only (`p` / `span`)
   * so pages with a fixed heading budget are not inflated. Default true.
   */
  semanticHeadings?: boolean;
  /** If set, show only these registry paths in this order (current page excluded). */
  onlyPaths?: readonly string[];
}) {
  const isCompact = variant === 'compact';
  const tools = resolveRelatedTools(currentPath, onlyPaths);
  if (tools.length === 0) return null;

  const RailHeadingTag = semanticHeadings ? 'h2' : 'p';
  const CardTitleTag = semanticHeadings ? 'h3' : 'span';

  return (
    <aside
      className={`related-tools-section${isCompact ? ' related-tools-section--compact' : ''}`}
      aria-label={isCompact ? 'You might also need' : 'Related tools'}
    >
      {isCompact ? (
        <RailHeadingTag className="related-tools-section__heading">
          You might also need
        </RailHeadingTag>
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
                <CardTitleTag className="related-tool-card__title">
                  {tool.name}
                </CardTitleTag>
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
