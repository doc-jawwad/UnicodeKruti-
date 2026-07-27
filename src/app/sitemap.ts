import type { MetadataRoute } from 'next';
import { ALL_ROUTES, SITE_URL } from '@/lib/site';

/**
 * XML sitemap for Google Search Console: https://unicodekruti.com/sitemap.xml
 *
 * Sourced from ALL_ROUTES in src/lib/site.ts.
 * When adding a public page: add it to ALL_ROUTES (with lastModified), then
 * resubmit /sitemap.xml in GSC after deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_ROUTES.map((route) => ({
    // Homepage loc matches canonical: no trailing slash (trailingSlash: false).
    url: route.href === '/' ? SITE_URL : `${SITE_URL}${route.href}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
