import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/wp-admin/',
          '/wp-login.php',
          '/xmlrpc.php',
          '/wp-includes/',
          '/api/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/wp-admin/', '/wp-login.php', '/xmlrpc.php'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/wp-admin/', '/wp-login.php', '/xmlrpc.php'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/wp-admin/', '/wp-login.php', '/xmlrpc.php'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/wp-admin/', '/wp-login.php', '/xmlrpc.php'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
