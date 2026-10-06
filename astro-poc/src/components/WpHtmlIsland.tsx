'use client';

import WpHtmlClient from '@/components/pages/WpHtmlClient';

/**
 * React island wrapping production WpHtmlClient (converter portals + related tools).
 * Mount with client:only so portals attach after the HTML host exists.
 */
export default function WpHtmlIsland({ html }: { html: string }) {
  return <WpHtmlClient html={html} />;
}
