import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { legacyRedirectDestination } from '@/lib/site-redirects';

/**
 * SEC-03 — WordPress admin / login surfaces must not be public on the Next.js host.
 * Returns 404 for legacy WP attack paths (no redirect that confirms the path exists).
 */
const BLOCKED_PATHS = [
  /^\/wp-admin(\/|$)/i,
  /^\/wp-login\.php$/i,
  /^\/xmlrpc\.php$/i,
  /^\/wp-includes(\/|$)/i,
  /^\/wp-content\/(plugins|themes)\//i,
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BLOCKED_PATHS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-store',
      },
    });
  }

  const legacyDestination = legacyRedirectDestination(pathname);
  if (legacyDestination) {
    const url = request.nextUrl.clone();
    url.pathname = legacyDestination;
    url.search = '';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|images/|fonts/|sw.js|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|css|js)$).*)',
  ],
};
