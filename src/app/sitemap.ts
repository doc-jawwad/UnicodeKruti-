import type { MetadataRoute } from 'next';
import { SITEMAP_ROUTES } from '@/lib/site';
import { getCanonicalUrl } from '@/lib/seo/metadata';

/** Dynamic XML sitemap at /sitemap.xml — indexable tool and trust pages only. */
export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ROUTES.map((route) => ({
    url: getCanonicalUrl(route.href),
    lastModified: route.lastModified,
    changeFrequency: 'monthly',
    priority: route.priority,
  }));
}
