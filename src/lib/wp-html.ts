import fs from 'fs';
import path from 'path';
import { parseFragment, serialize } from 'parse5';
import { ALL_ROUTES } from '@/lib/site';
import type { ConverterMode, ConverterVariant } from '@/lib/converter/engine';

/**
 * Round-trip the HTML through a real HTML parser so the string we hand to the
 * browser is exactly what the browser would produce when parsing it. WP export
 * HTML frequently contains stray/unbalanced tags; without this, the browser
 * silently restructures the DOM on parse, which breaks React hydration
 * (error #418) and can hoist whole sections out of their container — making FAQ
 * / mini sections vanish. Normalizing here guarantees SSR markup === client DOM.
 */
function balanceHtml(html: string): string {
  try {
    return serialize(parseFragment(html));
  } catch {
    return html;
  }
}

export type ConverterMount = {
  mode: ConverterMode;
  variant: ConverterVariant;
};

const SHORTCODE_RE =
  /(?:<!--\s*wp:shortcode\s*-->\s*)?(?:\[krutidev_converter([^\]]*)\]|unicode-krutidev|\[kdd_verification_banner\]|\[rank_math_html_sitemap\]|\[kdd_toolbar_icons\])(?:\s*<!--\s*\/wp:shortcode\s*-->)?/gi;

const VERIFICATION_BANNER_HTML = `
<div class="verification-banner glass-card">
  <div class="verification-banner__headline">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <strong class="verification-banner__title">Verified by Akshay Verma, a software developer and Hindi Typing Expert.</strong>
  </div>
  <p class="verification-banner__text">Mapping table cross-checked against 40 CPCT official practice papers (Madhya Pradesh), 12 UP district court judgement records, and Rajbhasha Vibhag circulars. Last verified: June 2026. Accuracy: 99.9% on standard KrutiDev 010 documents.</p>
</div>`;

function sitemapListHtml(): string {
  const items = ALL_ROUTES.map(
    (route) => `<li><a href="${route.href}">${route.title}</a></li>`
  ).join('');
  return `<ul class="wp-sitemap-list">${items}</ul>`;
}

function parseConverterAttrs(attrs: string): ConverterMount {
  const modeMatch = attrs.match(/mode=["']([^"']+)["']/i);
  const variantMatch = attrs.match(/variant=["']([^"']+)["']/i);
  const mode = (modeMatch?.[1] as ConverterMode) || 'uni-to-kd';
  const variant = (variantMatch?.[1] as ConverterVariant) || '010';
  return { mode, variant };
}

function converterMountHtml(props: ConverterMount, isFirst: boolean): string {
  // Skeleton keeps the tool slot visible before/without JS; client replaces via portal.
  return `<div class="kdc-wp-mount"${isFirst ? ' id="main-tool"' : ''} data-kdc-mode="${props.mode}" data-kdc-variant="${props.variant}"><div class="tool-skeleton" role="status">Loading converter…</div></div>`;
}

/** Normalize WP HTML for Next: strip block comments, fix legacy links. */
export function normalizeWpHtml(raw: string): string {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/<!--\s*\/?wp:(?!shortcode)[^>]*-->/g, '')
    .replace(/href="\/fonts\/(?:KrutiDev010|KRDEV010)\.ttf"/gi, 'href="/font-download"')
    .replace(/href='\/fonts\/(?:KrutiDev010|KRDEV010)\.ttf'/gi, "href='/font-download'")
    .replace(
      /<a([^>]*?)href="\/font-download"([^>]*?)\s+download(?:=["'][^"']*["'])?([^>]*)>/gi,
      '<a$1href="/font-download"$2$3>'
    )
    .replace(
      /<a([^>]*?)\s+download(?:=["'][^"']*["'])?([^>]*?)href="\/font-download"([^>]*)>/gi,
      '<a$1$2href="/font-download"$3>'
    )
    .replace(/href="\/krutidev-to-unicode-converter\/?"/gi, 'href="/krutidev-to-unicode"')
    .replace(/href='\/krutidev-to-unicode-converter\/?'/gi, "href='/krutidev-to-unicode'")
    .replace(/href="\/terms-and-conditions\/?"/gi, 'href="/terms-conditions"')
    .replace(/href="\/about\/?"/gi, 'href="/about-us"')
    .replace(/<a\b[^>]*href=["']\/blog\/[^"']*["'][^>]*class=["'][^"']*inline-resource-card[^"']*["'][\s\S]*?<\/a>/gi, '')
    .replace(/<a\b[^>]*class=["'][^"']*inline-resource-card[^"']*["'][^>]*href=["']\/blog\/[^"']*["'][\s\S]*?<\/a>/gi, '')
    .replace(/<a\b[^>]*href=["']\/blog\/[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi, '$1')
    .trim();
}

/**
 * Load a WP page body as one contiguous HTML string. Converter shortcodes become
 * `.kdc-wp-mount` hosts (filled client-side). Keeping the string whole preserves
 * wrappers like `.tool-wrapper.glass-card`.
 */
export function renderWpHtml(
  slug: string,
  fallbackConverter?: ConverterMount
): string {
  const file = path.join(process.cwd(), 'src', 'content', 'wp-html', `${slug}.html`);
  const raw = normalizeWpHtml(fs.readFileSync(file, 'utf8'));

  let converterCount = 0;
  let html = raw.replace(SHORTCODE_RE, (full, attrs: string | undefined) => {
    if (/kdd_verification_banner/i.test(full)) return VERIFICATION_BANNER_HTML;
    if (/rank_math_html_sitemap/i.test(full)) return sitemapListHtml();
    if (/kdd_toolbar_icons/i.test(full)) return '';
    const props =
      /krutidev_converter/i.test(full)
        ? parseConverterAttrs(attrs || '')
        : fallbackConverter || {
            mode: 'kd-to-uni' as ConverterMode,
            variant: '010' as ConverterVariant,
          };
    return converterMountHtml(props, converterCount++ === 0);
  });

  html = html.replace(/<!--\s*\/?wp:shortcode\s*-->/gi, '');

  // K010 page has a bare shortcode with no tool-wrapper — wrap each mount host.
  if (converterCount > 0 && !html.includes('tool-wrapper')) {
    html = html.replace(
      /<div class="kdc-wp-mount\b/g,
      '<div class="tool-wrapper glass-card"><div class="kdc-wp-mount'
    );
    // Close the wrapper after each mount's closing tag pair (host + skeleton).
    html = html.replace(
      /(class="kdc-wp-mount\b[\s\S]*?<\/div>\s*<\/div>)/g,
      '$1</div>'
    );
  }

  if (fallbackConverter && converterCount === 0) {
    html =
      `<div class="tool-wrapper glass-card">${converterMountHtml(fallbackConverter, true)}</div>` +
      html;
  }

  return balanceHtml(html);
}
