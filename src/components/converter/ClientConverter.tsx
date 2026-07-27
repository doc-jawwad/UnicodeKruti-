'use client';

import dynamic from 'next/dynamic';
import type { ConverterAppProps } from '@/components/converter/ConverterApp';

const ConverterApp = dynamic(
  () => import('@/components/converter/ConverterApp'),
  {
    loading: () => (
      <div
        style={{ minHeight: '400px' }}
        aria-label="Loading converter..."
      />
    ),
    ssr: false,
  }
);

/** Code-split converter widget off the initial JS bundle. */
export default function ClientConverter(props: ConverterAppProps) {
  return <ConverterApp {...props} />;
}
