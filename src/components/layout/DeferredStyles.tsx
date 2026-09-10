'use client';

import { useEffect } from 'react';

/**
 * Loads below-the-fold CSS after first paint so theme-deferred.css is not
 * render-blocking for the hero / header / converter shell.
 */
export default function DeferredStyles() {
  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const load = () => {
      if (cancelled) return;
      void import('@/app/theme-deferred.css');
    };

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(load, { timeout: 2000 });
    } else {
      timeoutId = setTimeout(load, 1);
    }

    return () => {
      cancelled = true;
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === 'function'
      ) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
