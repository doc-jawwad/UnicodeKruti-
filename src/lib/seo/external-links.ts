/**
 * External link rel attributes.
 *
 * High-authority / trusted references (gov, Unicode Consortium, standards bodies,
 * NIC portals, Microsoft docs) are dofollow: `noopener noreferrer`.
 * Other externals stay nofollow.
 */

const TRUSTED_HOST_SUFFIXES = [
  'unicode.org',
  'gov.in',
  'nic.in',
  'microsoft.com',
  'gsma.com',
  'bis.gov.in',
] as const;

/** Exact hostnames that are trusted even if not matching a suffix above. */
const TRUSTED_GITHUB_PATH_PREFIXES = ['/silnrsi/'] as const;

export function isTrustedExternalUrl(href: string): boolean {
  try {
    const url = new URL(href);
    if (url.protocol !== 'https:') return false;
    const host = url.hostname.toLowerCase().replace(/^www\./, '');

    if (TRUSTED_HOST_SUFFIXES.some((s) => host === s || host.endsWith(`.${s}`))) {
      return true;
    }

    if (host === 'github.com') {
      return TRUSTED_GITHUB_PATH_PREFIXES.some((p) =>
        url.pathname.toLowerCase().startsWith(p),
      );
    }

    return false;
  } catch {
    return false;
  }
}

/** Safe target=_blank rel — dofollow for trusted authority pages. */
export function externalLinkRel(href: string): string {
  return isTrustedExternalUrl(href)
    ? 'noopener noreferrer'
    : 'noopener noreferrer nofollow';
}
