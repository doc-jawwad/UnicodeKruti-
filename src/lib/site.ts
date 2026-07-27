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

export const FONT_DOWNLOAD_HREF = '/fonts/KRDEV010.ttf';
export const FONT_FILES = {
  '010': '/fonts/KRDEV010.ttf',
  '011': '/fonts/KRDEV011.ttf',
  '016': '/fonts/KRDEV016.ttf',
  '055': '/fonts/KRDEV055.ttf',
} as const;

export const FOOTER = {
  blurb:
    'UnicodeKruti.com — free browser-based tools for Unicode ↔ KrutiDev conversion, keyboard layout references, version guides, and Hindi font resources.',
  pages: [
    { href: '/', label: 'Home' },
    { href: '/krutidev-to-unicode', label: 'KrutiDev to Unicode Converter' },
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
  fontDownloadHref: FONT_DOWNLOAD_HREF,
};

export const ALL_ROUTES = [
  {
    href: '/',
    title: 'Unicode to KrutiDev Converter',
    priority: 1,
    changeFrequency: 'weekly' as const,
  },
  {
    href: '/krutidev-to-unicode',
    title: 'KrutiDev to Unicode Converter',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    href: '/krutidev-010-to-unicode-converter',
    title: 'KrutiDev 010 to Unicode Converter',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    href: '/krutidev-10-to-unicode-converter',
    title: 'KrutiDev 10 to Unicode Converter',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
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
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/about-us',
    title: 'About Us',
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/contact-us',
    title: 'Contact Us',
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  },
  {
    href: '/privacy-policy',
    title: 'Privacy Policy',
    priority: 0.4,
    changeFrequency: 'yearly' as const,
  },
  {
    href: '/cookie-policy',
    title: 'Cookie Policy',
    priority: 0.4,
    changeFrequency: 'yearly' as const,
  },
  {
    href: '/disclaimer',
    title: 'Disclaimer',
    priority: 0.4,
    changeFrequency: 'yearly' as const,
  },
  {
    href: '/dmca-policy',
    title: 'DMCA Policy',
    priority: 0.4,
    changeFrequency: 'yearly' as const,
  },
  {
    href: '/terms-conditions',
    title: 'Terms & Conditions',
    priority: 0.4,
    changeFrequency: 'yearly' as const,
  },
  {
    href: '/sitemap',
    title: 'Sitemap',
    priority: 0.3,
    changeFrequency: 'monthly' as const,
  },
] as const;
