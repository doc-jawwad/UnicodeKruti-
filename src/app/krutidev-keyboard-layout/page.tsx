import type { Metadata } from 'next';
import KeyboardLayoutPageBody from '@/components/pages/keyboard-layout/KeyboardLayoutPageBody';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import {
  KEYBOARD_LAYOUT_PATH,
  KEYBOARD_PDF_PATH,
  keyboardLayoutMeta,
} from '@/content/keyboard-layout';
import { keyboardLayoutJsonLdSchemas } from '@/content/keyboard-layout-schemas';
import { uiBreadcrumbs } from '@/lib/seo/breadcrumbs';
import { buildPageMetadata } from '@/lib/seo/metadata';
import '@/components/pages/keyboard-layout/keyboard-layout.css';

const baseMetadata = buildPageMetadata({
  title: keyboardLayoutMeta.title,
  description: keyboardLayoutMeta.description,
  path: KEYBOARD_LAYOUT_PATH,
});

/** Exact OG/Twitter title (buildPageMetadata would append `| UnicodeKruti` a second time). */
export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: keyboardLayoutMeta.title },
  openGraph: { ...baseMetadata.openGraph, title: keyboardLayoutMeta.title },
  twitter: { ...baseMetadata.twitter, title: keyboardLayoutMeta.title },
};

export default function KrutiDevKeyboardLayoutPage() {
  return (
    <div className="kbd-page">
      <JsonLd id="keyboard-layout-json-ld" data={keyboardLayoutJsonLdSchemas} />

      <div className="container">
        <Breadcrumbs items={uiBreadcrumbs(keyboardLayoutMeta.breadcrumbLabel)} />
      </div>

      <section className="hero-section section-dark kbd-hero" id="hero">
        <div className="orb orb-saffron orb-1" />
        <div className="orb orb-gold orb-2" />
        <div className="container hero-container">
          <div className="hero-content">
            <h1>{keyboardLayoutMeta.h1}</h1>

            <p
              id="tldr-block"
              role="note"
              aria-label="Quick summary"
              className="hero-subtitle"
            >
              {keyboardLayoutMeta.tldr}
            </p>

            <div className="kbd-hero__actions">
              <a className="btn-primary" href="#keyboard-chart">
                View Keyboard
              </a>
              <a className="btn-primary kbd-btn-alt" href={KEYBOARD_PDF_PATH} download>
                Download PDF
              </a>
              <a className="btn-primary kbd-btn-alt" href="#key-search">
                Find Hindi Keys
              </a>
            </div>
          </div>
        </div>
      </section>

      <KeyboardLayoutPageBody />
    </div>
  );
}
