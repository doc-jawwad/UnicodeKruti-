import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/**
 * Served at /robots.txt via App Router.
 * Explicitly allows major search + AI crawlers; blocks app internals.
 */
export default function robots(): MetadataRoute.Robots {
  const allowAll = {
    allow: '/',
  } as const;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      { userAgent: 'Googlebot', ...allowAll },
      { userAgent: 'Bingbot', ...allowAll },
      { userAgent: 'GPTBot', ...allowAll },
      { userAgent: 'ClaudeBot', ...allowAll },
      { userAgent: 'PerplexityBot', ...allowAll },
      { userAgent: 'Google-Extended', ...allowAll },
      { userAgent: 'Anthropic-AI', ...allowAll },
      { userAgent: 'cohere-ai', ...allowAll },
      { userAgent: 'meta-externalagent', ...allowAll },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
