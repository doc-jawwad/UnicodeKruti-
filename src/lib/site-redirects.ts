/**
 * Permanent legacy-path redirects (WordPress → Next.js canonical URLs).
 * Applied in middleware before Next.js trailing-slash normalization so each
 * old URL resolves in a single hop (no A→B→C chains).
 *
 * Destinations always use trailing slashes (matches trailingSlash: true).
 * Slash normalization for canonical routes is handled by trailingSlash: true
 * in next.config — do not add no-slash → slash rules here (causes redirect loops).
 *
 * Middleware lookup is exact-pathname only (Map.get). Wildcard / :param patterns
 * are not supported there — those live in WORDPRESS_WILDCARD_REDIRECTS and are
 * applied via next.config redirects().
 */

export type LegacyRedirect = {
  source: string;
  destination: string;
};

function legacy(source: string, destination: string): LegacyRedirect {
  return { source, destination };
}

/** Keys are exact pathnames (with or without trailing slash). */
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

  // Homepage aliases
  legacy('/unicode-to-krutidev', '/'),
  legacy('/unicode-to-krutidev/', '/'),
  legacy('/home', '/'),
  legacy('/home/', '/'),

  // About / legal / contact renames
  legacy('/about', '/about-us/'),
  legacy('/about/', '/about-us/'),
  legacy('/contact', '/contact-us/'),
  legacy('/contact/', '/contact-us/'),
  legacy('/privacy', '/privacy-policy/'),
  legacy('/privacy/', '/privacy-policy/'),
  legacy('/font', '/font-download/'),
  legacy('/font/', '/font-download/'),
  legacy('/terms-and-conditions', '/terms-conditions/'),
  legacy('/terms-and-conditions/', '/terms-conditions/'),

  // WordPress core URLs that return 404 in GSC
  legacy('/wp-login.php', '/'),
  legacy('/feed', '/'),
  legacy('/feed/', '/'),
  legacy('/comments/feed', '/'),
  legacy('/comments/feed/', '/'),

  // Common WordPress utility paths
  legacy('/xmlrpc.php', '/'),
  legacy('/wp-cron.php', '/'),

  // Soft-404 blog index + posts (blog router not shipped yet)
  legacy('/blog', '/'),
  legacy('/blog/', '/'),
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

/**
 * WordPress archive / pagination patterns — Next.js path-to-regexp syntax.
 * Applied only via next.config redirects() (not middleware Map lookup).
 */
export const WORDPRESS_WILDCARD_REDIRECTS: LegacyRedirect[] = [
  // WordPress category/tag archives
  legacy('/category/:slug*', '/'),
  legacy('/tag/:slug*', '/'),

  // WordPress date archives
  legacy('/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*', '/'),
  legacy('/:year(\\d{4})/:month(\\d{2})/:slug*', '/'),
  legacy('/:year(\\d{4})/:slug*', '/'),

  // WordPress page pagination
  legacy('/page/:num', '/'),
  legacy('/page/:num/', '/'),

  // Any remaining blog paths (after exact LEGACY_REDIRECTS)
  legacy('/blog/:slug*', '/'),

  // WordPress content paths returning 404
  legacy('/wp-content/plugins/:path*', '/'),
  legacy('/wp-content/uploads/:path*', '/'),
];

/** WordPress / Rank Math sitemap stubs → App Router /sitemap.xml (no trailing slash). */
export const SITEMAP_XML_REDIRECTS: LegacyRedirect[] = [
  legacy('/page-sitemap.xml', '/sitemap.xml'),
  legacy('/sitemap_index.xml', '/sitemap.xml'),
  legacy('/post-sitemap.xml', '/sitemap.xml'),
  legacy('/category-sitemap.xml', '/sitemap.xml'),
  legacy('/wp-sitemap.xml', '/sitemap.xml'),
  legacy('/sitemap-index.xml', '/sitemap.xml'),
];

const LEGACY_BY_PATH = new Map<string, string>(
  [...LEGACY_REDIRECTS, ...SITEMAP_XML_REDIRECTS].map(({ source, destination }) => [
    source,
    destination,
  ])
);

export function legacyRedirectDestination(pathname: string): string | undefined {
  return LEGACY_BY_PATH.get(pathname);
}

/** next.config redirects() — sitemap stubs + WordPress wildcard archives. */
export function nextConfigRedirects() {
  return [...SITEMAP_XML_REDIRECTS, ...WORDPRESS_WILDCARD_REDIRECTS].map(
    ({ source, destination }) => ({
      source,
      destination,
      permanent: true as const,
    })
  );
}
