'use client';

import ConverterApp from '@/components/converter/ConverterApp';
import type { ConverterAppProps } from '@/components/converter/ConverterApp';

/** Thin client entry — keep ConverterApp in the main client graph (no dynamic lag). */
export default function ClientConverter(props: ConverterAppProps) {
  return <ConverterApp {...props} />;
}
