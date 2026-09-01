import { SITE_URL } from '@/lib/site';

/** Canonical URL for `<link rel="canonical">`, hreflang, and Open Graph. */
export function getCanonicalUrl(path: string): string {
  const base = SITE_URL.replace(/\/+$/, '');
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  const normalized = withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
  return `${base}${normalized}`;
}
