import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/wp-admin/:path*',
    '/wp-login.php',
    '/xmlrpc.php',
    '/wp-includes/:path*',
    '/wp-content/plugins/:path*',
    '/wp-content/themes/:path*',
  ],
};
