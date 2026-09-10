import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE_URL } from '@/lib/site';
import {
  legacyRedirectDestination,
  shouldHard404,
  withTrailingSlash,
} from '@/lib/site-redirects';

/**
 * Crawl-safe edge gate:
 * - Hard-404 junk WP / unpublished blog paths (no soft-404 via homepage)
 * - Single 308 for www→apex + legacy path + trailing slash together
 *
 * Requires skipTrailingSlashRedirect: true in next.config.ts.
 *
 * Redirect URLs are built with `new URL(path, origin)` — mutating
 * `NextURL.pathname` can strip trailing slashes and reintroduce loops.
 */

function hard404Response(): NextResponse {
  return new NextResponse('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
    },
  });
}

function canonicalHostname(): string {
  try {
    return new URL(SITE_URL).hostname.toLowerCase();
  } catch {
    return 'unicodekruti.com';
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHost = (
    request.headers.get('host') ||
    request.nextUrl.hostname
  )
    .split(':')[0]
    ?.toLowerCase();
  const apex = canonicalHostname();
  const hostIsWww = requestHost === `www.${apex}`;

  if (shouldHard404(pathname)) {
    return hard404Response();
  }

  let legacyDestination: string | undefined;
  try {
    legacyDestination = legacyRedirectDestination(pathname);
  } catch {
    // Bad redirect table entry must not 500 the edge — fail closed for crawlers.
    return hard404Response();
  }

  // Legacy targets are already final (incl. slash). Other HTML routes get a slash.
  const nextPath = legacyDestination ?? withTrailingSlash(pathname);
  const pathChanged = nextPath !== pathname;

  if (!hostIsWww && !pathChanged) {
    return NextResponse.next();
  }

  const origin = hostIsWww
    ? `https://${apex}`
    : request.nextUrl.origin;
  const search = legacyDestination ? '' : request.nextUrl.search;
  // Preserve trailing slash: NextURL.pathname setter may normalize it away.
  const destination = new URL(`${nextPath}${search}`, origin);

  if (
    destination.host === request.nextUrl.host &&
    destination.pathname === pathname &&
    destination.search === request.nextUrl.search
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|images/|fonts/|sw.js|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|css|js)$).*)',
  ],
};
