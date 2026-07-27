'use client';

import dynamic from 'next/dynamic';
import ToolSkeleton from '@/components/converter/ToolSkeleton';

const UnicodeToKrutidev10Tool = dynamic(
  () => import('@/components/UnicodeToKrutidev10Tool'),
  {
    ssr: false,
    loading: () => <ToolSkeleton minHeight={480} label="Loading converter…" />,
  }
);

/** Client wrapper so the page Server Component can lazy-load the tool. */
export default function UnicodeToKrutidev10ToolLazy() {
  return <UnicodeToKrutidev10Tool />;
}
