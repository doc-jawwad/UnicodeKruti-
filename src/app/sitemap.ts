import type { MetadataRoute } from 'next';
import { ALL_ROUTES, SITE_URL } from '@/lib/site';

/** Stable date for crawl hints — bump when content meaningfully changes. */
const CONTENT_LASTMOD = new Date('2026-07-27');

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_ROUTES.map((route) => ({
    // Homepage loc uses trailing slash; all other locs do not.
    url: route.href === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.href}`,
    lastModified: CONTENT_LASTMOD,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
