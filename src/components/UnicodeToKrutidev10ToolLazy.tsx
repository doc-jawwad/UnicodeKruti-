'use client';

import dynamic from 'next/dynamic';

const UnicodeToKrutidev10Tool = dynamic(
  () => import('@/components/UnicodeToKrutidev10Tool'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ minHeight: '400px' }}
        aria-label="Loading converter..."
      />
    ),
  }
);

/** Client wrapper so the page Server Component can lazy-load the tool. */
export default function UnicodeToKrutidev10ToolLazy() {
  return <UnicodeToKrutidev10Tool />;
}
