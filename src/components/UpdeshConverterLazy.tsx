'use client';

import dynamic from 'next/dynamic';
import ToolSkeleton from '@/components/converter/ToolSkeleton';

const UpdeshConverter = dynamic(
  () => import('@/components/UpdeshConverter'),
  {
    ssr: false,
    loading: () => <ToolSkeleton minHeight={480} label="Loading converter…" />,
  }
);

/** Client wrapper so the page Server Component can lazy-load the tool. */
export default function UpdeshConverterLazy() {
  return <UpdeshConverter />;
}
