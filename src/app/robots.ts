import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Served at /robots.txt via App Router.
 * Blocks WordPress internals + author archives; allows AI crawlers; lists sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = {
    allow: '/',
  } as const;

  return {
    rules: [
      {
        userAgent: '*',
        disallow: [
          '/wp-admin/',
          '/wp-includes/',
          '/wp-content/themes/',
          '/wp-content/plugins/',
          '/wp-content/uploads/fonts/',
          '/author/',
          '/fonts/*.ttf',
          '/fonts/*.otf',
        ],
        allow: '/wp-admin/admin-ajax.php',
      },
      { userAgent: 'GPTBot', ...allowAll },
      { userAgent: 'ClaudeBot', ...allowAll },
      { userAgent: 'PerplexityBot', ...allowAll },
      { userAgent: 'Google-Extended', ...allowAll },
      { userAgent: 'Bingbot', ...allowAll },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
