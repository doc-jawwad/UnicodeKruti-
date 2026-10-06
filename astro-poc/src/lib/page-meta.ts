import { getCanonicalUrl, OG_IMAGE_BY_PATH } from '@/lib/seo/metadata';
import { SITE_NAME } from '@/lib/site';

export type PocPageMeta = {
  title: string;
  description: string;
  path: string;
  hreflangHi?: boolean;
  /** When set, OG/Twitter title uses this instead of title + site suffix. */
  ogTitleExact?: string;
  robotsIndex?: boolean;
};

export function buildAstroMeta(input: PocPageMeta) {
  const canonical = getCanonicalUrl(input.path);
  const ogTitle =
    input.ogTitleExact ??
    (input.title.includes(SITE_NAME)
      ? input.title
      : `${input.title} | ${SITE_NAME}`);
  const pathKey = input.path.replace(/\/+$/, '') || '/';
  const og = OG_IMAGE_BY_PATH[pathKey] || {
    file: 'unicode-to-krutidev.webp',
    alt: `${SITE_NAME} — Unicode ↔ KrutiDev tools`,
    width: 1672,
    height: 941,
  };
  const ogImageUrl = getCanonicalUrl(`/og/${og.file}`);

  const languages: Record<string, string> = {
    'en-IN': canonical,
    'x-default': canonical,
  };
  if (input.hreflangHi) {
    languages.hi = canonical;
  }

  return {
    title: input.title,
    description: input.description,
    canonical,
    ogTitle,
    descriptionOg: input.description,
    ogImageUrl,
    ogWidth: og.width,
    ogHeight: og.height,
    ogAlt: og.alt,
    ogType: og.file.endsWith('.webp') ? 'image/webp' : 'image/png',
    languages,
    robotsIndex: input.robotsIndex !== false,
  };
}
