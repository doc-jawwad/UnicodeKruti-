'use client';

/**
 * Lazy client boundary for floating widgets — keeps Remington keyboard
 * listeners and markup off the critical path (helps TBT / INP).
 */
import dynamic from 'next/dynamic';

const FloatingWidgets = dynamic(
  () => import('@/components/layout/FloatingWidgets'),
  { ssr: false, loading: () => null }
);

export default function FloatingWidgetsLazy() {
  return <FloatingWidgets />;
}
