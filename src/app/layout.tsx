import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import FloatingWidgetsLazy from '@/components/layout/FloatingWidgetsLazy';
import Analytics from '@/components/seo/Analytics';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import './theme.css';
import './globals.css';

/**
 * GSC HTML-tag verification token only — reject HTML-file filenames like
 * `googleXXXX.html` which are invalid in meta content=.
 */
function googleSiteVerificationToken(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();
  if (!raw) return undefined;
  if (/\.html$/i.test(raw) || /^google[a-f0-9]+\.html$/i.test(raw)) {
    return undefined;
  }
  return raw;
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: true,
  preload: true,
});

const noto = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto',
  display: 'swap',
  adjustFontFallback: true,
  // Devanagari is below-fold for most LCP; don't compete with Inter on critical path
  preload: false,
});

export const viewport: Viewport = {
  themeColor: '#ff6600',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Unicode ↔ KrutiDev Converters`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Free browser-based Unicode to KrutiDev and KrutiDev to Unicode converters for Hindi typing, CPCT exams, and government workflows.',
  manifest: '/manifest.json',
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    title: 'UnicodeKruti',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/images/icon.webp', type: 'image/webp' },
    ],
    apple: [{ url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
  },
  verification: {
    google: googleSiteVerificationToken(),
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className={`${inter.variable} ${inter.className} ${noto.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <FloatingWidgetsLazy />
        <Analytics />
      </body>
    </html>
  );
}
