/**
 * Thin Cloudflare Worker — reproduces Next middleware SEO edge behavior for the POC.
 *
 * - www → apex (single 308)
 * - trailing slash for HTML routes
 * - representative legacy 308 redirects
 * - hard 404 + X-Robots-Tag for junk WP/blog patterns
 * - then serve static Astro assets
 */

export interface Env {
  ASSETS: Fetcher;
  CANONICAL_HOST?: string;
}

const APEX = 'unicodekruti.com';

/** Representative legacy redirects (subset of production LEGACY_REDIRECTS). */
const LEGACY: Record<string, string> = {
  '/krutidev-to-unicode': '/krutidev-to-unicode-converter/',
  '/krutidev-to-unicode/': '/krutidev-to-unicode-converter/',
  '/about': '/about-us/',
  '/about/': '/about-us/',
  '/unicode-to-krutidev': '/',
  '/unicode-to-krutidev/': '/',
  '/home': '/',
  '/home/': '/',
  '/page-sitemap.xml': '/sitemap.xml',
  '/sitemap_index.xml': '/sitemap.xml',
};

const HARD_404: RegExp[] = [
  /^\/wp-admin(\/|$)/i,
  /^\/wp-login\.php$/i,
  /^\/xmlrpc\.php$/i,
  /^\/feed(\/|$)/i,
];

function pathHasFileExtension(pathname: string): boolean {
  return /\/[^/]+\.[^/]+$/.test(pathname);
}

function withTrailingSlash(pathname: string): string {
  if (pathname === '/' || pathname.endsWith('/') || pathHasFileExtension(pathname)) {
    return pathname;
  }
  return `${pathname}/`;
}

function hard404(): Response {
  return new Response('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

function redirect308(destination: URL): Response {
  return Response.redirect(destination.toString(), 308);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const requestHost = (request.headers.get('host') || url.hostname)
      .split(':')[0]
      ?.toLowerCase();
    const apex = (env.CANONICAL_HOST || APEX).toLowerCase();
    const hostIsWww = requestHost === `www.${apex}`;

    if (HARD_404.some((re) => re.test(pathname))) {
      return hard404();
    }

    // Unknown /blog/* that isn't a known redirect — hard 404 (POC: all /blog)
    if (pathname === '/blog' || pathname === '/blog/' || pathname.startsWith('/blog/')) {
      if (!LEGACY[pathname]) return hard404();
    }

    const legacyDestination = LEGACY[pathname];
    const nextPath = legacyDestination ?? withTrailingSlash(pathname);
    const pathChanged = nextPath !== pathname;

    // On workers.dev / preview hosts, only apply path redirects (not www→apex).
    const isPreviewHost =
      !requestHost ||
      requestHost.endsWith('.workers.dev') ||
      requestHost.includes('localhost') ||
      requestHost === '127.0.0.1';

    if (!isPreviewHost && hostIsWww) {
      const dest = new URL(
        `${nextPath}${legacyDestination ? '' : url.search}`,
        `https://${apex}`
      );
      return redirect308(dest);
    }

    if (pathChanged) {
      const dest = new URL(
        `${nextPath}${legacyDestination ? '' : url.search}`,
        url.origin
      );
      return redirect308(dest);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    return assetResponse;
  },
} satisfies ExportedHandler<Env>;
