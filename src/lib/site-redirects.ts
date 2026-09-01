/**
 * Permanent legacy-path redirects (WordPress → Next.js canonical URLs).
 * Applied in middleware before Next.js trailing-slash normalization so each
 * old URL resolves in a single hop (no A→B→C chains).
 *
 * Destinations always use trailing slashes (matches trailingSlash: true).
 * Do not add slash-only rules here — Next.js handles those internally.
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
  // K2U hub rename (old …-converter slug)
  legacy('/krutidev-to-unicode-converter', '/krutidev-to-unicode/'),
  legacy('/krutidev-to-unicode-converter/', '/krutidev-to-unicode/'),

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

/** next.config redirects() — sitemap XML stubs only (middleware handles page paths). */
export function nextConfigRedirects() {
  return SITEMAP_XML_REDIRECTS.map(({ source, destination }) => ({
    source,
    destination,
    permanent: true as const,
  }));
}
