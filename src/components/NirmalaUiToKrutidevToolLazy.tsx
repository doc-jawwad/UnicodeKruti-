'use client';

import dynamic from 'next/dynamic';
import ToolSkeleton from '@/components/converter/ToolSkeleton';

const NirmalaUiToKrutidevTool = dynamic(
  () => import('@/components/NirmalaUiToKrutidevTool'),
  {
    ssr: false,
    loading: () => <ToolSkeleton minHeight={480} label="Loading converter…" />,
  }
);

/** Client wrapper so the page Server Component can lazy-load the tool. */
export default function NirmalaUiToKrutidevToolLazy() {
  return <NirmalaUiToKrutidevTool />;
}
