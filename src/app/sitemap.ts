import type { MetadataRoute } from 'next';
import { SITEMAP_ROUTES } from '@/lib/site';
import { getCanonicalUrl, OG_IMAGE_BY_PATH } from '@/lib/seo/metadata';

/** Bump when sitemap URLs or attached images meaningfully change (GSC lastmod floor). */
export const CONTENT_LASTMOD = '2026-09-11';

function laterDate(a: string, b: string): string {
  return a >= b ? a : b;
}

/** Dynamic XML sitemap at /sitemap.xml — indexable tool/trust pages + featured OG images. */
export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ROUTES.map((route) => {
    const path = route.href.replace(/\/+$/, '') || '/';
    const og = OG_IMAGE_BY_PATH[path];

    return {
      url: getCanonicalUrl(route.href),
      lastModified: laterDate(route.lastModified, CONTENT_LASTMOD),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(og ? { images: [getCanonicalUrl(`/og/${og.file}`)] } : {}),
    };
  });
}
