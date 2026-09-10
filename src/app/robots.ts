import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const DISALLOW_PATHS = [
  '/wp-admin/',
  '/wp-includes/',
  '/wp-content/themes/',
  '/wp-content/plugins/',
  '/wp-content/uploads/fonts/',
  '/author/',
  '/fonts/*.ttf',
  '/fonts/*.otf',
];

/**
 * Served at /robots.txt via App Router.
 * Blocks WordPress leftovers + author archives + raw font binaries; allows crawlers; lists sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  const crawlPolicy = {
    allow: '/',
    disallow: DISALLOW_PATHS,
  };

  return {
    rules: [
      { userAgent: '*', ...crawlPolicy },
      { userAgent: 'GPTBot', ...crawlPolicy },
      { userAgent: 'ClaudeBot', ...crawlPolicy },
      { userAgent: 'PerplexityBot', ...crawlPolicy },
      { userAgent: 'Google-Extended', ...crawlPolicy },
      { userAgent: 'Bingbot', ...crawlPolicy },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
