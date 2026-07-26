'use client';

import { useEffect, useRef } from 'react';

/**
 * Renders WP HTML islands and rewires "Try an example" buttons so they
 * update the React-controlled converter via a custom event.
 */
export default function WpHtmlIsland({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const buttons = root.querySelectorAll<HTMLButtonElement>('.btn-try-example');
    const cleanups: Array<() => void> = [];

    buttons.forEach((btn) => {
      const handler = (e: Event) => {
        e.preventDefault();
        const label = btn.getAttribute('aria-label') || btn.textContent || '';
        // Prefer Devanagari or ASCII sample from the button label/text.
        const hindi = label.match(/[\u0900-\u097F]+(?:\s+[\u0900-\u097F]+)*/)?.[0];
        const ascii = label.match(/[A-Za-z]{3,}(?:\s+[A-Za-z]+)*/)?.[0];
        const sample =
          hindi ||
          (ascii && /Hkkjr|ueLrs|Hkkjr/i.test(ascii) ? ascii : null) ||
          extractFromOnclick(btn.getAttribute('onclick')) ||
          'नमस्ते भारत';
        window.dispatchEvent(
          new CustomEvent('kdc-try-example', { detail: { text: sample } })
        );
        document.getElementById('main-tool')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      };
      btn.removeAttribute('onclick');
      btn.addEventListener('click', handler);
      cleanups.push(() => btn.removeEventListener('click', handler));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [html]);

  return (
    <div
      ref={ref}
      className="wp-html-island"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function extractFromOnclick(onclick: string | null): string | null {
  if (!onclick) return null;
  const m = onclick.match(/inp\.value\s*=\s*['"]([^'"]+)['"]/);
  return m?.[1] || null;
}
