import fs from 'fs';
import path from 'path';
import type { ConverterMode, ConverterVariant } from '@/lib/converter/engine';

export type ConverterMount = {
  mode: ConverterMode;
  variant: ConverterVariant;
};

export type WpSegment =
  | { type: 'html'; html: string }
  | { type: 'converter'; props: ConverterMount }
  | { type: 'verification' }
  | { type: 'sitemap' };

const SHORTCODE_RE =
  /(?:<!--\s*wp:shortcode\s*-->\s*)?(?:\[krutidev_converter([^\]]*)\]|unicode-krutidev|\[kdd_verification_banner\]|\[rank_math_html_sitemap\])(?:\s*<!--\s*\/wp:shortcode\s*-->)?/gi;

function parseConverterAttrs(attrs: string): ConverterMount {
  const modeMatch = attrs.match(/mode=["']([^"']+)["']/i);
  const variantMatch = attrs.match(/variant=["']([^"']+)["']/i);
  const mode = (modeMatch?.[1] as ConverterMode) || 'uni-to-kd';
  const variant = (variantMatch?.[1] as ConverterVariant) || '010';
  return { mode, variant };
}

/** Normalize WP HTML for Next: strip block comments, fix unfinished CTAs lightly. */
export function normalizeWpHtml(raw: string): string {
  return raw
    .replace(/\r\n/g, '\n')
    .replace(/<!--\s*\/?wp:[^>]*-->/g, '')
    .replace(/href="\/font-download\/?"/gi, 'href="/fonts/KrutiDev010.ttf" download="KrutiDev010.ttf"')
    .replace(/href='\/font-download\/?'/gi, "href='/fonts/KrutiDev010.ttf' download='KrutiDev010.ttf'")
    .replace(/href="\/krutidev-to-unicode-converter\/?"/gi, 'href="/krutidev-to-unicode"')
    .replace(/href='\/krutidev-to-unicode-converter\/?'/gi, "href='/krutidev-to-unicode'")
    .replace(/href="\/terms-and-conditions\/?"/gi, 'href="/terms-conditions"')
    .trim();
}

export function loadWpHtml(slug: string): string {
  const file = path.join(process.cwd(), 'src', 'content', 'wp-html', `${slug}.html`);
  return normalizeWpHtml(fs.readFileSync(file, 'utf8'));
}

export function splitWpHtml(
  html: string,
  fallbackConverter?: ConverterMount
): WpSegment[] {
  const segments: WpSegment[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(SHORTCODE_RE.source, SHORTCODE_RE.flags);

  while ((match = re.exec(html))) {
    if (match.index > last) {
      segments.push({ type: 'html', html: html.slice(last, match.index) });
    }
    const full = match[0];
    if (/kdd_verification_banner/i.test(full)) {
      segments.push({ type: 'verification' });
    } else if (/rank_math_html_sitemap/i.test(full)) {
      segments.push({ type: 'sitemap' });
    } else if (/unicode-krutidev/i.test(full) && !/krutidev_converter/i.test(full)) {
      segments.push({
        type: 'converter',
        props: fallbackConverter || { mode: 'kd-to-uni', variant: '010' },
      });
    } else {
      segments.push({
        type: 'converter',
        props: parseConverterAttrs(match[1] || ''),
      });
    }
    last = match.index + full.length;
  }

  if (last < html.length) {
    segments.push({ type: 'html', html: html.slice(last) });
  }

  // If a page expects a converter but none was found (legacy stub), inject at top.
  if (
    fallbackConverter &&
    !segments.some((s) => s.type === 'converter')
  ) {
    segments.unshift({ type: 'converter', props: fallbackConverter });
  }

  return segments.filter(
    (s) => s.type !== 'html' || s.html.replace(/\s+/g, '').length > 0
  );
}
