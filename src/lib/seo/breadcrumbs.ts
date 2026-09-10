/**
 * Shared Home → Page breadcrumb trails (UI + JSON-LD).
 * Tool / trust pages use a two-level trail — do not invent deeper hierarchy.
 */

export type UiBreadcrumb = { href?: string; label: string };
export type SchemaBreadcrumb = { name: string; path: string };

/** Visible nav items for `<Breadcrumbs />`. */
export function uiBreadcrumbs(pageLabel: string): UiBreadcrumb[] {
  return [{ href: '/', label: 'Home' }, { label: pageLabel }];
}

/** BreadcrumbList entries for `buildConverterSchema` / custom graphs. */
export function schemaBreadcrumbs(
  pageLabel: string,
  pagePath: string
): SchemaBreadcrumb[] {
  return [
    { name: 'Home', path: '/' },
    { name: pageLabel, path: pagePath },
  ];
}
