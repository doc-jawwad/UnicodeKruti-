import type { APIRoute } from 'astro';
import { SITE_URL } from '@/lib/site';

const DISALLOW = [
  '/wp-admin/',
  '/wp-includes/',
  '/wp-content/themes/',
  '/wp-content/plugins/',
  '/wp-content/uploads/fonts/',
  '/author/',
  '/fonts/*.ttf',
  '/fonts/*.otf',
];

function block(userAgent: string): string {
  return [
    `User-agent: ${userAgent}`,
    'Allow: /',
    ...DISALLOW.map((p) => `Disallow: ${p}`),
    '',
  ].join('\n');
}

export const GET: APIRoute = () => {
  const body = [
    block('*'),
    block('GPTBot'),
    block('ClaudeBot'),
    block('PerplexityBot'),
    block('Google-Extended'),
    block('Bingbot'),
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Host: ${SITE_URL}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

export const prerender = true;
