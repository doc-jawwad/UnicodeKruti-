import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { parseFragment, serialize } from 'parse5';
import { getToolAbout } from '@/content/tool-about';
import { renderAboutTheToolHtml } from '@/lib/about-tool-html';
import { ALL_ROUTES } from '@/lib/site';
import { isTrustedExternalUrl } from '@/lib/seo/external-links';
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
  } catch (error) {
    console.error('[UnicodeKruti] balanceHtml parse error:', error);
    return html;
  }
}

export type ConverterMount = {
  mode: ConverterMode;
  variant: ConverterVariant;
  lockMode?: boolean;
};

const SHORTCODE_RE =
  /(?:<!--\s*wp:shortcode\s*-->\s*)?(?:\[krutidev_converter([^\]]*)\]|unicode-krutidev|\[kdd_verification_banner\]|\[kdd_about_tool([^\]]*)\]|\[rank_math_html_sitemap\]|\[kdd_toolbar_icons\])(?:\s*<!--\s*\/wp:shortcode\s*-->)?/gi;

const RELATED_TOOLS_SHORTCODE_RE =
  /(?:<!--\s*wp:shortcode\s*-->\s*)?\[kdd_related_tools([^\]]*)\](?:\s*<!--\s*\/wp:shortcode\s*-->)?/gi;

function parseRelatedToolsAttrs(attrs: string): { path: string; variant: string } {
  const pathMatch = attrs.match(/path=["']([^"']+)["']/i);
  const variantMatch = attrs.match(/variant=["']([^"']+)["']/i);
  return {
    path: pathMatch?.[1] || '/',
    variant: variantMatch?.[1] === 'compact' ? 'compact' : 'section',
  };
}

function relatedToolsMountHtml(path: string, variant: string): string {
  return `<div class="kdc-related-tools-mount" data-related-tools-path="${path}" data-related-tools-variant="${variant}"></div>`;
}

const VERIFICATION_BANNER_HTML = `
<div class="verification-banner glass-card">
  <div class="verification-banner__headline">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <strong class="verification-banner__title">Verified by Akshay Verma, Software Developer and Hindi Typing Expert.</strong>
  </div>
  <p class="verification-banner__text">KrutiDev 010 mapping aligned to SIL TECkit KrutiDev010.map and cross-checked against the Remington/LTRC sequence algorithm. Verified against the <code>tests/krutidev010</code> regression corpus. Last verified: 11 September 2026. ASCII digits are preserved; Latin letters in KrutiDev are encoding, not English. KrutiDev 055 is not converted.</p>
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
  const lockMatch = attrs.match(/lockMode=["']([^"']+)["']/i);
  const mode = (modeMatch?.[1] as ConverterMode) || 'uni-to-kd';
  const variant = (variantMatch?.[1] as ConverterVariant) || '010';
  const lockMode = lockMatch
    ? /^(1|true|yes)$/i.test(lockMatch[1])
    : mode === 'kd-to-uni';
  return { mode, variant, lockMode };
}

/** Strip nofollow from high-authority external refs (gov, Unicode, NIC, etc.). */
function applyTrustedExternalRel(html: string): string {
  return html.replace(/<a\b([^>]*?)>/gi, (tag, attrs: string) => {
    const hrefMatch = attrs.match(/\bhref=["'](https:\/\/[^"']+)["']/i);
    if (!hrefMatch || !isTrustedExternalUrl(hrefMatch[1])) return tag;
    if (!/\bnofollow\b/i.test(attrs)) return tag;

    const nextAttrs = attrs.replace(/\brel=["']([^"']*)["']/i, (_m, rel: string) => {
      const cleaned = rel
        .split(/\s+/)
        .filter((t) => t && !/^nofollow$/i.test(t))
        .join(' ');
      return cleaned ? `rel="${cleaned}"` : '';
    });
    return `<a${nextAttrs}>`;
  });
}

function converterMountHtml(props: ConverterMount, isFirst: boolean): string {
  // Skeleton keeps the tool slot visible before/without JS; client replaces via portal.
  const lockAttr = props.lockMode ? ' data-kdc-lock-mode="true"' : '';
  return `<div class="kdc-wp-mount"${isFirst ? ' id="main-tool"' : ''} data-kdc-mode="${props.mode}" data-kdc-variant="${props.variant}"${lockAttr}><div class="tool-skeleton" role="status" aria-busy="true" aria-label="Loading converter" style="min-height:420px"><span class="tool-skeleton__pulse" aria-hidden="true"></span><span>Loading converter…</span></div></div>`;
}

/** Normalize WP HTML for Next: strip block comments, fix legacy links. */
export function normalizeWpHtml(raw: string): string {
  const normalized = raw
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
    .replace(/href="\/krutidev-to-unicode\/?"/gi, 'href="/krutidev-to-unicode-converter/"')
    .replace(/href='\/krutidev-to-unicode\/?'/gi, "href='/krutidev-to-unicode-converter/'")
    .replace(
      /unicodekruti\.com\/krutidev-to-unicode(?!-converter)/gi,
      'unicodekruti.com/krutidev-to-unicode-converter/'
    )
    .replace(
      /["']\/krutidev-to-unicode["']/gi,
      '"/krutidev-to-unicode-converter/"'
    )
    .replace(/href="\/krutidev-010-to-unicode\/?"/gi, 'href="/krutidev-010-to-unicode-converter/"')
    .replace(/href="\/krutidev-10-to-unicode\/?"/gi, 'href="/krutidev-10-to-unicode-converter/"')
    .replace(/href="\/unicode-to-krutidev-10\/?"/gi, 'href="/unicode-to-krutidev-10-converter/"')
    .replace(/href="\/updesh\/?"/gi, 'href="/updesh-converter/"')
    .replace(/href="\/updes\/?"/gi, 'href="/updesh-converter/"')
    .replace(/href="\/unicode-to-krutidev\/?"/gi, 'href="/"')
    .replace(/href="\/terms-and-conditions\/?"/gi, 'href="/terms-conditions/"')
    .replace(/href="\/terms\/?"/gi, 'href="/terms-conditions/"')
    .replace(/href="\/about\/?"/gi, 'href="/about-us/"')
    .replace(/href="\/contact\/?"/gi, 'href="/contact-us/"')
    .replace(/href="\/privacy\/?"/gi, 'href="/privacy-policy/"')
    .replace(/href="\/cookie\/?"/gi, 'href="/cookie-policy/"')
    .replace(/href="\/cookies\/?"/gi, 'href="/cookie-policy/"')
    .replace(/href="\/font\/?"/gi, 'href="/font-download/"')
    .replace(/href="\/fonts\/?"/gi, 'href="/font-download/"')
    // trailingSlash: true — ensure internal paths end with / (keep bare "/" for home)
    .replace(/href="(\/(?!\/)[^"#?][^"#?/]+)(?<!\/)"/g, 'href="$1/"')
    .replace(/href='(\/(?!\/)[^'#?][^'#?/]+)(?<!\/)'/g, "href='$1/'")
    // Legal/about/contact WP exports used h1 for every section — demote to h2
    // so WpHtmlPage can inject a single page-title <h1>.
    .replace(
      /<h1(\s+class="wp-block-heading"[^>]*)>([\s\S]*?)<\/h1>/gi,
      '<h2$1>$2</h2>'
    )
    .replace(/<a\b[^>]*href=["']\/blog\/[^"']*["'][^>]*class=["'][^"']*inline-resource-card[^"']*["'][\s\S]*?<\/a>/gi, '')
    .replace(/<a\b[^>]*class=["'][^"']*inline-resource-card[^"']*["'][^>]*href=["']\/blog\/[^"']*["'][\s\S]*?<\/a>/gi, '')
    .replace(/<a\b[^>]*href=["']\/blog\/[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi, '$1')
    .trim();

  return applyTrustedExternalRel(withLazyImages(normalized));
}

/**
 * Ensure content `<img>` tags defer offscreen work. Skips explicit LCP opt-ins
 * (`loading="eager"` or `fetchpriority="high"`).
 */
function withLazyImages(html: string): string {
  return html.replace(/<img\b([^>]*)>/gi, (_full, attrs: string) => {
    let next = attrs;
    if (/\bloading\s*=\s*["']?eager["']?/i.test(next)) {
      return `<img${next}>`;
    }
    if (/\bfetchpriority\s*=\s*["']?high["']?/i.test(next)) {
      return `<img${next}>`;
    }
    if (/\bloading\s*=/i.test(next)) {
      next = next.replace(/\bloading\s*=\s*(["']?)[^"'\s>]*\1/i, 'loading="lazy"');
    } else {
      next += ' loading="lazy"';
    }
    if (!/\bdecoding\s*=/i.test(next)) {
      next += ' decoding="async"';
    }
    return `<img${next}>`;
  });
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
  let fileContents: string;
  try {
    fileContents = fs.readFileSync(file, 'utf8');
  } catch (error) {
    // Missing/unreadable body must not 500 crawlers — hard 404 instead.
    console.error(`[UnicodeKruti] Missing WP HTML for slug "${slug}":`, error);
    notFound();
  }
  const raw = normalizeWpHtml(fileContents);

  let converterCount = 0;
  let html = raw.replace(
    SHORTCODE_RE,
    (full, converterAttrs: string | undefined, aboutAttrs: string | undefined) => {
      if (/kdd_verification_banner/i.test(full)) return VERIFICATION_BANNER_HTML;
      if (/kdd_about_tool/i.test(full)) {
        const idMatch = (aboutAttrs || full).match(/id=["']([^"']+)["']/i);
        const tool = getToolAbout(idMatch?.[1] || '');
        return tool ? renderAboutTheToolHtml(tool) : '';
      }
      if (/rank_math_html_sitemap/i.test(full)) return sitemapListHtml();
      if (/kdd_toolbar_icons/i.test(full)) return '';
      const props =
        /krutidev_converter/i.test(full)
          ? parseConverterAttrs(converterAttrs || '')
          : fallbackConverter || {
              mode: 'kd-to-uni' as ConverterMode,
              variant: '010' as ConverterVariant,
            };
      return converterMountHtml(props, converterCount++ === 0);
    }
  );

  html = html.replace(/<!--\s*\/?wp:shortcode\s*-->/gi, '');

  html = html.replace(RELATED_TOOLS_SHORTCODE_RE, (_full, attrs: string) => {
    const { path, variant } = parseRelatedToolsAttrs(attrs || '');
    return relatedToolsMountHtml(path, variant);
  });

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
