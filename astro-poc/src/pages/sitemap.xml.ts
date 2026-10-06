import { getCanonicalUrl } from '@/lib/seo';
import type { APIRoute } from 'astro';

const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: '2026-09-10' },
  {
    path: '/krutidev-to-unicode-converter/',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: '2026-09-10',
  },
  {
    path: '/about-us/',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: '2026-09-10',
  },
];

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${getCanonicalUrl(r.path)}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

export const prerender = true;
