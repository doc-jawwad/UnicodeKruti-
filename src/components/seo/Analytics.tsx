'use client';

import { useEffect } from 'react';

/**
 * Third-party analytics — injected only after idle / first interaction, always
 * with `async` so they never block parsing or contend with LCP.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-YVDR26LEM8';
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || 'xjq5psm0fo';

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let loaded = false;

    const loadAsyncScript = (src: string, id: string) => {
      if (document.getElementById(id)) return;
      const el = document.createElement('script');
      el.id = id;
      el.src = src;
      el.async = true;
      document.head.appendChild(el);
    };

    const enable = () => {
      if (cancelled || loaded) return;
      loaded = true;

      if (clarityId) {
        // Official Clarity bootstrap — remote tag is loaded with async=true.
        type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };
        const w = window as Window & { clarity?: ClarityFn };
        if (!w.clarity) {
          const queue: unknown[] = [];
          const stub = ((...args: unknown[]) => {
            queue.push(args);
          }) as ClarityFn;
          stub.q = queue;
          w.clarity = stub;
        }
        loadAsyncScript(
          `https://www.clarity.ms/tag/${clarityId}`,
          'clarity-tag'
        );
      }

      if (gaId) {
        const g = window as Window & {
          dataLayer?: unknown[];
          gtag?: (...args: unknown[]) => void;
        };
        g.dataLayer = g.dataLayer || [];
        g.gtag = function gtag(...args: unknown[]) {
          g.dataLayer!.push(args);
        };
        g.gtag('js', new Date());
        g.gtag('config', gaId);
        loadAsyncScript(
          `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
          'ga4-tag'
        );
      }
    };

    const onInteract = () => enable();
    window.addEventListener('pointerdown', onInteract, {
      once: true,
      passive: true,
    });
    window.addEventListener('keydown', onInteract, { once: true });

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(enable, { timeout: 5000 });
    } else {
      timeoutId = setTimeout(enable, 3000);
    }

    return () => {
      cancelled = true;
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === 'function'
      ) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, [gaId, clarityId]);

  return null;
}
