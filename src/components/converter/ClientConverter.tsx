'use client';

import dynamic from 'next/dynamic';
import type { ConverterAppProps } from '@/components/converter/ConverterApp';

const ConverterApp = dynamic(() => import('@/components/converter/ConverterApp'), {
  ssr: false,
  loading: () => <div className="tool-skeleton">Loading converter…</div>,
});

export default function ClientConverter(props: ConverterAppProps) {
  return <ConverterApp {...props} />;
}
