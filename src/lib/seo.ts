import { SITE_URL } from '@/lib/site';

/** File-like paths must not get a trailing slash (OG images, fonts, logo, XML). */
const FILE_PATH_RE = /\.[a-zA-Z0-9]{1,12}$/;

/**
 * Absolute canonical URL for `<link rel="canonical">`, hreflang, Open Graph,
 * JSON-LD, and the XML sitemap.
 *
 * Rules (must match `trailingSlash: true` in next.config):
 * - Page paths always end with `/` (including homepage `https://…/`)
 * - Asset / file paths never end with `/`
 * - Query strings and hashes are stripped so variants consolidate
 */
export function getCanonicalUrl(path: string): string {
  const base = SITE_URL.replace(/\/+$/, '');
  const withoutQuery = (path.split(/[?#]/, 1)[0] || '/').trim() || '/';
  let pathname = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  pathname = pathname.replace(/\/{2,}/g, '/');

  if (pathname === '/') {
    return `${base}/`;
  }

  const lastSegment = pathname.split('/').filter(Boolean).pop() || '';
  const isFile = FILE_PATH_RE.test(lastSegment);

  if (isFile) {
    return `${base}${pathname.replace(/\/+$/, '')}`;
  }

  const pagePath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${base}${pagePath}`;
}
