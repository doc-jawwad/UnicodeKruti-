export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://unicodekruti.com';
export const SITE_NAME = 'UnicodeKruti';

/** Primary nav — matches backup theme fallback menu (depth 2 Versions). */
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/krutidev-to-unicode', label: 'KrutiDev to Unicode' },
] as const;

export const NAV_VERSIONS = [
  {
    href: '/krutidev-10-to-unicode-converter',
    label: 'KrutiDev 10 to Unicode Converter',
  },
  {
    href: '/krutidev-010-to-unicode-converter',
    label: 'KrutiDev 010 to Unicode Converter',
  },
  {
    href: '/unicode-to-krutidev-10-converter',
    label: 'Unicode to KrutiDev 10 Converter',
  },
] as const;

export const FONT_DOWNLOAD_PAGE = '/font-download';
/** Actual TTF asset — only use on the font-download page download button. */
export const FONT_DOWNLOAD_HREF = '/fonts/KRDEV010.ttf';
export const FONT_FILES = {
  '010': '/fonts/KRDEV010.ttf',
  '011': '/fonts/KRDEV011.ttf',
  '016': '/fonts/KRDEV016.ttf',
  '055': '/fonts/KRDEV055.ttf',
} as const;

/** All downloadable font files shown above the fold on /font-download.
 * `sort` = numeric order; Bold variants sort just after their base number.
 * `sample` = KrutiDev-encoded ASCII that renders as Hindi when the TTF is applied.
 */
export const FONT_PACK = [
  {
    file: 'KRDEV010.ttf',
    name: 'KrutiDev 010',
    note: 'Standard Hindi — exams & govt',
    sort: 10,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'KRDEV011.ttf',
    name: 'KrutiDev 011',
    note: 'Bold weight',
    sort: 11,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'Kruti-Dev-012.ttf',
    name: 'Kruti Dev 012',
    note: 'Variant 012',
    sort: 12,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'Kruti-Dev-013.ttf',
    name: 'Kruti Dev 013',
    note: 'Variant 013',
    sort: 13,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'Kruti-Dev-014.ttf',
    name: 'Kruti Dev 014',
    note: 'Variant 014',
    sort: 14,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'KRDEV016.ttf',
    name: 'KrutiDev 016',
    note: 'Wide spacing',
    sort: 16,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'KRDEV020.ttf',
    name: 'KrutiDev 020',
    note: 'Variant 020',
    sort: 20,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'Kruti-Dev-021.ttf',
    name: 'Kruti Dev 021',
    note: 'Variant 021',
    sort: 21,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'Kruti-Dev-022.ttf',
    name: 'Kruti Dev 022',
    note: 'Variant 022',
    sort: 22,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'KRDEV030.ttf',
    name: 'KrutiDev 030',
    note: 'Variant 030',
    sort: 30,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'KRDEV030-BOLD.ttf',
    name: 'KrutiDev 030 Bold',
    note: 'Bold 030',
    sort: 30.5,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'KRDEV055.ttf',
    name: 'KrutiDev 055',
    note: 'Marathi standard',
    sort: 55,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'K24.ttf',
    name: 'K24',
    note: 'Legacy pack',
    sort: 124,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'K25.ttf',
    name: 'K25',
    note: 'Legacy pack',
    sort: 125,
    sample: 'ueLrs Hkkjr',
  },
  {
    file: 'K26.ttf',
    name: 'K26',
    note: 'Legacy pack',
    sort: 126,
    sample: 'ueLrs Hkkjr',
  },
] as const;

/** Stable CSS family id for a pack file (used in @font-face + sample). */
export function fontPackFamily(file: string): string {
  return `KrutiPack-${file.replace(/[^a-zA-Z0-9]/g, '-')}`;
}

export const FOOTER = {
  blurb:
    'UnicodeKruti.com — free browser-based tools for Unicode ↔ KrutiDev conversion, keyboard layout references, version guides, and Hindi font resources.',
  pages: [
    { href: '/', label: 'Unicode to KrutiDev Converter' },
    { href: '/krutidev-to-unicode', label: 'KrutiDev to Unicode Converter' },
    { href: '/krutidev-010-to-unicode-converter', label: 'KrutiDev 010 to Unicode' },
    { href: '/krutidev-10-to-unicode-converter', label: 'KrutiDev 10 to Unicode' },
    { href: '/unicode-to-krutidev-10-converter', label: 'Unicode to KrutiDev 10' },
    { href: '/font-download', label: 'KrutiDev Font Download' },
    { href: '/sitemap', label: 'Sitemap' },
  ],
  legal: [
    { href: '/about-us', label: 'About Us' },
    { href: '/contact-us', label: 'Contact Us' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
  ],
  bottomLegal: [
    { href: '/cookie-policy', label: 'Cookie Policy' },
    { href: '/disclaimer', label: 'Disclaimer' },
    { href: '/dmca-policy', label: 'DMCA Policy' },
    { href: '/terms-conditions', label: 'Terms & Conditions' },
  ],
  social: [
    {
      href: 'https://www.instagram.com/unikrutidev/',
      label: 'Follow UnicodeKruti on Instagram',
      network: 'instagram' as const,
    },
    {
      href: 'https://www.youtube.com/channel/UCEUKUmIuXLloClmfwQfer4Q',
      label: 'Follow UnicodeKruti on YouTube',
      network: 'youtube' as const,
    },
    {
      href: 'https://www.x.com/UnicodeKruti',
      label: 'Follow UnicodeKruti on X (Twitter)',
      network: 'x' as const,
    },
    {
      href: 'https://www.pinterest.com/ukrutidev/_pins/',
      label: 'Follow UnicodeKruti on Pinterest',
      network: 'pinterest' as const,
    },
    {
      href: 'https://medium.com/@unikrutidev',
      label: 'Follow UnicodeKruti on Medium',
      network: 'medium' as const,
    },
    {
      href: 'https://www.reddit.com/user/krutidev/',
      label: 'Follow UnicodeKruti on Reddit',
      network: 'reddit' as const,
    },
    {
      href: 'https://www.quora.com/profile/Uni-Krutidev',
      label: 'Follow UnicodeKruti on Quora',
      network: 'quora' as const,
    },
  ],
  fontDownloadHref: FONT_DOWNLOAD_PAGE,
};

export const ALL_ROUTES = [
  {
    href: '/',
    title: 'Unicode to KrutiDev Converter',
    priority: 1.0,
    changeFrequency: 'weekly' as const,
  },
  {
    href: '/krutidev-to-unicode',
    title: 'KrutiDev to Unicode Converter',
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/krutidev-010-to-unicode-converter',
    title: 'KrutiDev 010 to Unicode Converter',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/krutidev-10-to-unicode-converter',
    title: 'KrutiDev 10 to Unicode Converter',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/unicode-to-krutidev-10-converter',
    title: 'Unicode to KrutiDev 10 Converter',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/font-download',
    title: 'KrutiDev Font Download',
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/about-us',
    title: 'About Us',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/contact-us',
    title: 'Contact Us',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/privacy-policy',
    title: 'Privacy Policy',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/cookie-policy',
    title: 'Cookie Policy',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/disclaimer',
    title: 'Disclaimer',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/dmca-policy',
    title: 'DMCA Policy',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/terms-conditions',
    title: 'Terms & Conditions',
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/sitemap',
    title: 'Sitemap',
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  },
] as const;
