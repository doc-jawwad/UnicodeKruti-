/**
 * Cloudflare Worker — full production SEO edge contract from
 * `src/lib/site-redirects.ts` (single source of truth with Next middleware).
 */
import {
  legacyRedirectDestination,
  shouldHard404,
  withTrailingSlash,
} from '../../../src/lib/site-redirects';

export interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  CANONICAL_HOST?: string;
}

const APEX = 'unicodekruti.com';

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

function isPreviewHost(host: string | undefined): boolean {
  if (!host) return true;
  return (
    host.endsWith('.workers.dev') ||
    host.includes('localhost') ||
    host === '127.0.0.1'
  );
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

    let legacyDestination: string | undefined;
    try {
      if (shouldHard404(pathname)) {
        return hard404();
      }
      legacyDestination = legacyRedirectDestination(pathname);
    } catch {
      return hard404();
    }

    const nextPath = legacyDestination ?? withTrailingSlash(pathname);
    const pathChanged = nextPath !== pathname;
    const preview = isPreviewHost(requestHost);

    if (!preview && hostIsWww) {
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

    return env.ASSETS.fetch(request);
  },
};
