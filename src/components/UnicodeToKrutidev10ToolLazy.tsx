'use client';

import dynamic from 'next/dynamic';

const UnicodeToKrutidev10Tool = dynamic(
  () => import('@/components/UnicodeToKrutidev10Tool'),
  {
    ssr: false,
    loading: () => (
      <div
        className="u2k10-tool-skeleton glass-card"
        style={{ minHeight: 420, padding: '1.5rem' }}
        aria-hidden="true"
      >
        Loading converter…
      </div>
    ),
  }
);

/** Client wrapper so the page Server Component can lazy-load the tool. */
export default function UnicodeToKrutidev10ToolLazy() {
  return <UnicodeToKrutidev10Tool />;
}
