import path from 'node:path';
import { renderWpHtml, type ConverterMount } from '@/lib/wp-html';

/**
 * Call parent renderWpHtml with cwd = monorepo root so WP HTML paths resolve.
 * Uses process.cwd() (astro-poc during `npm run build`), not import.meta.url —
 * Astro prerender bundles rewrite import.meta.url and break relative REPO_ROOT.
 */
export function renderWpHtmlPoc(
  slug: string,
  fallbackConverter?: ConverterMount
): string {
  const repoRoot = path.resolve(process.cwd(), '..');
  const prev = process.cwd();
  process.chdir(repoRoot);
  try {
    return renderWpHtml(slug, fallbackConverter);
  } finally {
    process.chdir(prev);
  }
}
