import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_Devanagari } from 'next/font/google';
import Script from 'next/script';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import FloatingWidgetsLazy from '@/components/layout/FloatingWidgetsLazy';
import DeferredStyles from '@/components/layout/DeferredStyles';
import Analytics from '@/components/seo/Analytics';
import { getCanonicalUrl } from '@/lib/seo/metadata';
import { SITE_NAME } from '@/lib/site';
import './theme.css';
import './globals.css';

/** Inlined before chunked CSS so ATF chrome paints without waiting on CSS files. */
const CRITICAL_ORB_CSS = `
.orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0;contain:layout style paint}
.hero-section{position:relative;overflow:hidden;isolation:isolate}
.orb-saffron{background:radial-gradient(circle,rgba(255,107,0,.15) 0%,transparent 70%)}
.hero-section .orb-1{width:700px;height:700px;top:0;left:0;transform:translate(40vw,-10%) translateZ(0)}
.hero-section .orb-2{width:500px;height:500px;bottom:0;left:0;transform:translate(-10%,0) translateZ(0)}
@media (max-width:768px){.hero-section .orb{display:none}}
.tool-skeleton{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;min-height:420px;padding:1.5rem;border-radius:12px;background:var(--bg-card,#fff);border:1px solid rgba(255,102,0,.12);color:var(--text-dim,#595959);font-size:.95rem}
.tool-skeleton__pulse{width:2.5rem;height:2.5rem;border-radius:50%;border:3px solid rgba(255,102,0,.2);border-top-color:var(--primary,#ff6600);animation:uk-spin .8s linear infinite}
@keyframes uk-spin{to{transform:rotate(360deg)}}
`;

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
  weight: ['400', '700'],
  variable: '--font-noto',
  display: 'swap',
  adjustFontFallback: true,
  // Devanagari is below-fold for most LCP — do not preload on the critical path
  preload: false,
});

export const viewport: Viewport = {
  themeColor: '#ff6600',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(getCanonicalUrl('/')),
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: 'CWxoQqujTs7qr9eSNPC-YSxNlsRRDCoGBMDMeuRY6gs',
    other: {
      'msvalidate.01':
        process.env.NEXT_PUBLIC_BING_VERIFICATION?.trim() ||
        'ABB0D7DFF207FB13B03D41AAF6919296',
    },
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
      <head>
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_ORB_CSS }} />
      </head>
      <body className={`${inter.variable} ${inter.className} ${noto.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <DeferredStyles />
        <FloatingWidgetsLazy />
        <Analytics />
        <Script src="/kdc-direction-banner.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
