'use client';

/**
 * Defer floating widgets until the browser is idle (or after first interaction /
 * a short timeout). Keeps Remington keyboard listeners off the critical path.
 */
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const FloatingWidgets = dynamic(
  () => import('@/components/layout/FloatingWidgets'),
  { ssr: false, loading: () => null }
);

export default function FloatingWidgetsLazy() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => {
      if (cancelled) return;
      setReady(true);
    };

    const onInteract = () => enable();
    window.addEventListener('pointerdown', onInteract, { once: true, passive: true });
    window.addEventListener('keydown', onInteract, { once: true });
    window.addEventListener('scroll', onInteract, { once: true, passive: true });

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enable, { timeout: 4000 });
    } else {
      timeoutId = setTimeout(enable, 2500);
    }

    return () => {
      cancelled = true;
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
      window.removeEventListener('scroll', onInteract);
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;
  return <FloatingWidgets />;
}
