import type { Metadata } from 'next';
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import Analytics from '@/components/seo/Analytics';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import './theme.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const noto = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Unicode ↔ KrutiDev Converters`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Free browser-based Unicode to KrutiDev and KrutiDev to Unicode converters for Hindi typing, CPCT exams, and government workflows.',
  icons: {
    icon: [{ url: '/images/icon.webp', type: 'image/webp' }],
    apple: [{ url: '/images/icon.webp', type: 'image/webp' }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
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
        <a href="#main-tool" className="skip-link">
          Skip to converter
        </a>
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
        <FloatingWidgets />
        <Analytics />
      </body>
    </html>
  );
}
