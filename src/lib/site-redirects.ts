/**
 * Permanent legacy-path redirects (WordPress → Next.js canonical URLs).
 *
 * Exact paths + /blog known posts are resolved in middleware so www + path +
 * slash fix happen in a single 308. Author remaps stay in next.config.
 *
 * skipTrailingSlashRedirect: true is required — otherwise Next prepends a
 * priority /path → /path/ rule that forces two-hop chains
 * (/about → /about/ → /about-us/).
 *
 * Junk WP paths (feeds, login, archives, unknown /blog/*) hard-404 in
 * middleware — never 308 → / (soft-404 crawl noise in GSC).
 *
 * Destinations use trailing slashes (site convention), except sitemap.xml.
 * Never redirect a live canonical route to its slash twin here (loops).
 */

export type LegacyRedirect = {
  source: string;
  destination: string;
};

function legacy(source: string, destination: string): LegacyRedirect {
  return { source, destination };
}

/** Exact pathnames (with and without trailing slash) → canonical destination. */
export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  // K2U hub — short slug → canonical …-converter slug
  legacy('/krutidev-to-unicode', '/krutidev-to-unicode-converter/'),
  legacy('/krutidev-to-unicode/', '/krutidev-to-unicode-converter/'),

  // Short converter slugs → versioned canonical pages
  legacy('/krutidev-010-to-unicode', '/krutidev-010-to-unicode-converter/'),
  legacy('/krutidev-010-to-unicode/', '/krutidev-010-to-unicode-converter/'),
  legacy('/krutidev-10-to-unicode', '/krutidev-10-to-unicode-converter/'),
  legacy('/krutidev-10-to-unicode/', '/krutidev-10-to-unicode-converter/'),
  legacy('/unicode-to-krutidev-10', '/unicode-to-krutidev-10-converter/'),
  legacy('/unicode-to-krutidev-10/', '/unicode-to-krutidev-10-converter/'),

  // Updesh short slug
  legacy('/updesh', '/updesh-converter/'),
  legacy('/updesh/', '/updesh-converter/'),
  legacy('/updes', '/updesh-converter/'),
  legacy('/updes/', '/updesh-converter/'),

  // Homepage aliases (intentional — not soft-404 junk)
  legacy('/unicode-to-krutidev', '/'),
  legacy('/unicode-to-krutidev/', '/'),
  legacy('/home', '/'),
  legacy('/home/', '/'),
  legacy('/index.html', '/'),
  legacy('/index.php', '/'),

  // About / legal / contact renames
  legacy('/about', '/about-us/'),
  legacy('/about/', '/about-us/'),
  legacy('/contact', '/contact-us/'),
  legacy('/contact/', '/contact-us/'),
  legacy('/privacy', '/privacy-policy/'),
  legacy('/privacy/', '/privacy-policy/'),
  legacy('/font', '/font-download/'),
  legacy('/font/', '/font-download/'),
  legacy('/fonts', '/font-download/'),
  legacy('/fonts/', '/font-download/'),
  legacy('/terms-and-conditions', '/terms-conditions/'),
  legacy('/terms-and-conditions/', '/terms-conditions/'),
  legacy('/terms', '/terms-conditions/'),
  legacy('/terms/', '/terms-conditions/'),
  legacy('/cookie', '/cookie-policy/'),
  legacy('/cookie/', '/cookie-policy/'),
  legacy('/cookies', '/cookie-policy/'),
  legacy('/cookies/', '/cookie-policy/'),

  // Known blog posts → live tools (blog router not shipped yet)
  legacy('/blog/krutidev-for-government-exams', '/krutidev-010-to-unicode-converter/'),
  legacy('/blog/krutidev-for-government-exams/', '/krutidev-010-to-unicode-converter/'),
  legacy('/blog/what-is-kruti-dev-font', '/font-download/'),
  legacy('/blog/what-is-kruti-dev-font/', '/font-download/'),
  legacy('/blog/kruti-dev-hindi-typing-chart-pdf', '/font-download/'),
  legacy('/blog/kruti-dev-hindi-typing-chart-pdf/', '/font-download/'),
  legacy('/blog/krutidev-010-vs-krutidev-10-difference', '/krutidev-010-to-unicode-converter/'),
  legacy(
    '/blog/krutidev-010-vs-krutidev-10-difference/',
    '/krutidev-010-to-unicode-converter/'
  ),
];

/** WordPress / Rank Math sitemap stubs → App Router /sitemap.xml. */
export const SITEMAP_XML_REDIRECTS: LegacyRedirect[] = [
  legacy('/page-sitemap.xml', '/sitemap.xml'),
  legacy('/sitemap_index.xml', '/sitemap.xml'),
  legacy('/post-sitemap.xml', '/sitemap.xml'),
  legacy('/category-sitemap.xml', '/sitemap.xml'),
  legacy('/wp-sitemap.xml', '/sitemap.xml'),
  legacy('/sitemap-index.xml', '/sitemap.xml'),
];

const EXACT_REDIRECT_ENTRIES = [...LEGACY_REDIRECTS, ...SITEMAP_XML_REDIRECTS];

const LEGACY_BY_PATH = new Map<string, string>(
  EXACT_REDIRECT_ENTRIES.map(({ source, destination }) => [source, destination])
);

/**
 * Junk / attack / dead WP surfaces — hard 404 + noindex (never soft-404 via `/`).
 * Checked in middleware before legacy redirects.
 */
export const HARD_404_PATTERNS: RegExp[] = [
  /^\/wp-admin(\/|$)/i,
  /^\/wp-includes(\/|$)/i,
  /^\/wp-content\/themes\//i,
  /^\/wp-content\/plugins(\/|$)/i,
  /^\/wp-content\/uploads(\/|$)/i,
  /^\/wp-login\.php$/i,
  /^\/xmlrpc\.php$/i,
  /^\/wp-cron\.php$/i,
  /^\/feed(\/|$)/i,
  /^\/comments\/feed(\/|$)/i,
  /^\/category(\/|$)/i,
  /^\/tag(\/|$)/i,
  /^\/page\/\d+\/?$/i,
  // WordPress date archives: /2024/, /2024/01/, /2024/01/15/…
  /^\/\d{4}(\/\d{2})?(\/\d{2})?(\/|$)/,
];

/** True when pathname should hard-404 (junk WP / unpublished blog shell). */
export function shouldHard404(pathname: string): boolean {
  if (HARD_404_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return true;
  }
  // Unpublished blog index + unknown posts (known posts are in LEGACY_REDIRECTS)
  if (pathname === '/blog' || pathname === '/blog/' || pathname.startsWith('/blog/')) {
    return LEGACY_BY_PATH.get(pathname) === undefined;
  }
  return false;
}

/** Author archives → About (contentful remap; middleware single-hop). */
export function authorRemapDestination(pathname: string): string | undefined {
  if (/^\/author(\/|$)/i.test(pathname)) return '/about-us/';
  return undefined;
}

/** Resolve A→B→C chains to the final destination; throw on loops. */
export function resolveRedirectDestination(
  pathname: string,
  maxHops = 8
): string | undefined {
  let current: string | undefined = LEGACY_BY_PATH.get(pathname);
  if (current === undefined) return undefined;

  const seen = new Set<string>([pathname]);
  for (let i = 0; i < maxHops; i++) {
    if (seen.has(current)) {
      throw new Error(
        `Redirect loop detected: ${[...seen, current].join(' → ')}`
      );
    }
    seen.add(current);
    const next = LEGACY_BY_PATH.get(current);
    if (next === undefined) {
      const twin = current.endsWith('/') ? current.slice(0, -1) : `${current}/`;
      const viaTwin = LEGACY_BY_PATH.get(twin);
      if (viaTwin === undefined) return current;
      current = viaTwin;
      continue;
    }
    current = next;
  }
  throw new Error(`Redirect chain too long starting at ${pathname}`);
}

export function legacyRedirectDestination(pathname: string): string | undefined {
  return (
    resolveRedirectDestination(pathname) ?? authorRemapDestination(pathname)
  );
}

/** True when pathname looks like a static file (has an extension segment). */
export function pathHasFileExtension(pathname: string): boolean {
  return /\/[^/]+\.[^/]+$/.test(pathname);
}

/**
 * Ensure HTML routes use a trailing slash. No-op for `/`, files, or paths that
 * already end with `/`.
 */
export function withTrailingSlash(pathname: string): string {
  if (pathname === '/' || pathname.endsWith('/') || pathHasFileExtension(pathname)) {
    return pathname;
  }
  return `${pathname}/`;
}

/** Assert exact redirect table has no self-maps, unresolved chains, or loops. */
export function assertNoRedirectChainsOrLoops(): void {
  for (const { source, destination } of EXACT_REDIRECT_ENTRIES) {
    if (source === destination) {
      throw new Error(`Redirect self-map: ${source}`);
    }
  }
  for (const { source, destination } of EXACT_REDIRECT_ENTRIES) {
    const final = resolveRedirectDestination(source);
    if (final !== destination) {
      throw new Error(
        `Redirect chain in table (flatten to final): ${source} → ${destination} → … → ${final}`
      );
    }
  }
}

/**
 * next.config redirects() — empty; all legacy remaps + hard-404s are
 * middleware-owned so www + path + slash stay a single hop.
 */
export function nextConfigRedirects() {
  assertNoRedirectChainsOrLoops();
  return [] as Array<{
    source: string;
    destination: string;
    permanent: true;
  }>;
}
