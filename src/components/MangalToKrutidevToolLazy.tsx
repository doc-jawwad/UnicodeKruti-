'use client';

import dynamic from 'next/dynamic';
import ToolSkeleton from '@/components/converter/ToolSkeleton';

const MangalToKrutidevTool = dynamic(
  () => import('@/components/MangalToKrutidevTool'),
  {
    ssr: false,
    loading: () => (
      <ToolSkeleton minHeight={480} label="Loading Mangal to KrutiDev converter…" />
    ),
  }
);

/** Client wrapper so the page Server Component can lazy-load the tool. */
export default function MangalToKrutidevToolLazy() {
  return <MangalToKrutidevTool />;
}
