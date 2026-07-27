'use client';

import dynamic from 'next/dynamic';
import type { ConverterAppProps } from '@/components/converter/ConverterApp';
import ToolSkeleton from '@/components/converter/ToolSkeleton';

const ConverterApp = dynamic(
  () => import('@/components/converter/ConverterApp'),
  {
    loading: () => <ToolSkeleton minHeight={420} />,
    ssr: false,
  }
);

/** Code-split converter widget off the initial JS bundle. */
export default function ClientConverter(props: ConverterAppProps) {
  return <ConverterApp {...props} />;
}
