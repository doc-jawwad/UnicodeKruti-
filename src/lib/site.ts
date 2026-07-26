export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://unicodekruti.com';
export const SITE_NAME = 'UnicodeKruti';

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/krutidev-to-unicode', label: 'KrutiDev to Unicode' },
  { href: '/krutidev-10-to-unicode-converter', label: 'KrutiDev 10' },
] as const;

export const FOOTER = {
  blurb:
    'UnicodeKruti.com — free browser-based tools for Unicode ↔ KrutiDev conversion, keyboard layout references, version guides, and Hindi font resources.',
  pages: [
    { href: '/', label: 'Home' },
    { href: '/krutidev-to-unicode', label: 'KrutiDev to Unicode Converter' },
    {
      href: '/krutidev-10-to-unicode-converter',
      label: 'KrutiDev 10 to Unicode Converter',
    },
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
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  ],
  // Only include verified public profiles. Live WP used `#` placeholders — omit until real URLs exist.
  social: [] as { href: string; label: string }[],
  fontDownloadHref: '/fonts/KrutiDev010.ttf',
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
    href: '/krutidev-10-to-unicode-converter',
    title: 'KrutiDev 10 to Unicode Converter',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
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
    href: '/terms-and-conditions',
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
