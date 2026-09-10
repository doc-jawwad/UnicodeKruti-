'use client';

import {
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import type { ConverterMode, ConverterVariant } from '@/lib/converter/engine';
import type { RelatedToolsVariant } from '@/content/related-tools';
import ToolSkeleton from '@/components/converter/ToolSkeleton';

const ClientConverter = dynamic(
  () => import('@/components/converter/ClientConverter'),
  {
    ssr: false,
    loading: () => <ToolSkeleton minHeight={420} />,
  }
);

const RelatedTools = dynamic(() => import('@/components/seo/RelatedTools'), {
  ssr: false,
  loading: () => null,
});

type Mount = {
  el: HTMLElement;
  mode: ConverterMode;
  variant: ConverterVariant;
  key: string;
};

type RelatedToolsMount = {
  el: HTMLElement;
  path: string;
  variant: RelatedToolsVariant;
  key: string;
};

/**
 * Owns the WP HTML DOM node. Memoized so parent setState (portal mounts) does
 * NOT re-apply dangerouslySetInnerHTML — that wipe was destroying portal
 * targets and leaving the page stuck on "Loading converter…".
 */
const WpHtmlHost = memo(function WpHtmlHost({
  html,
  onHostsReady,
  onRelatedToolsReady,
}: {
  html: string;
  onHostsReady: (mounts: Mount[]) => void;
  onRelatedToolsReady: (mounts: RelatedToolsMount[]) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const appliedHtml = useRef<string | null>(null);
  const onReadyRef = useRef(onHostsReady);
  onReadyRef.current = onHostsReady;
  const onRelatedReadyRef = useRef(onRelatedToolsReady);
  onRelatedReadyRef.current = onRelatedToolsReady;

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (appliedHtml.current !== html) {
      const ssrAlreadyHydrated =
        appliedHtml.current === null &&
        (host.querySelector('#hero') != null ||
          host.querySelector('.kdc-wp-mount') != null);
      if (!ssrAlreadyHydrated) {
        host.innerHTML = html;
      }
      appliedHtml.current = html;
    }

    const found: Mount[] = [];
    host.querySelectorAll<HTMLElement>('.kdc-wp-mount').forEach((el, index) => {
      const key = el.id || `kdc-mount-${index}`;
      if (!el.id) el.id = key;
      // Clear SSR skeleton; React portal owns this node from here.
      el.replaceChildren();
      found.push({
        el,
        key,
        mode: (el.dataset.kdcMode as ConverterMode) || 'uni-to-kd',
        variant: (el.dataset.kdcVariant as ConverterVariant) || '010',
      });
    });
    onReadyRef.current(found);

    const relatedFound: RelatedToolsMount[] = [];
    host.querySelectorAll<HTMLElement>('.kdc-related-tools-mount').forEach((el, index) => {
      const key = el.id || `kdc-related-tools-${index}`;
      if (!el.id) el.id = key;
      el.replaceChildren();
      relatedFound.push({
        el,
        key,
        path: el.dataset.relatedToolsPath || '/',
        variant: el.dataset.relatedToolsVariant === 'compact' ? 'compact' : 'section',
      });
    });
    onRelatedReadyRef.current(relatedFound);

    const cleanups: Array<() => void> = [];
    const liteMode =
      window.matchMedia('(max-width: 992px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    host
      .querySelectorAll<HTMLElement>('.reveal, .faq-item, .error-panel')
      .forEach((el) => el.classList.add('visible'));

    host.querySelectorAll<HTMLButtonElement>('.btn-try-example').forEach((btn) => {
      const onclick = btn.getAttribute('onclick') || '';
      const sample =
        onclick.match(/inp\.value\s*=\s*['"]([^'"]+)['"]/)?.[1] ||
        btn.textContent?.match(/[\u0900-\u097F]+(?:\s+[\u0900-\u097F]+)*/)?.[0] ||
        'नमस्ते भारत';
      btn.removeAttribute('onclick');
      btn.removeAttribute('onmouseover');
      btn.removeAttribute('onmouseout');
      const handler = (e: Event) => {
        e.preventDefault();
        window.dispatchEvent(
          new CustomEvent('kdc-try-example', { detail: { text: sample } })
        );
        document
          .getElementById('main-tool')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      };
      btn.addEventListener('click', handler);
      cleanups.push(() => btn.removeEventListener('click', handler));
    });

    const simInput = host.querySelector<HTMLElement>('#sim-unicode-input');
    const simOutput = host.querySelector<HTMLElement>('#sim-kruti-output');
    const simWords = host.querySelector<HTMLElement>('#sim-word-count');
    if (simInput && simOutput && !liteMode) {
      const phrases = [
        {
          input: 'नमस्ते भारत, यहाँ देवनागरी टाइप हो रहा है।',
          output: 'ueLrs Hkkjr, tgkW nsokxjh Vbi gks jgk gSA',
        },
        {
          input: 'यह एक लाइव यूनिकोड टू कृतिदेव कनवर्टर सिमुलेशन है।',
          output: "tg ,d ykbo twfudksM Vw d`frno dUoVZj flEtyw'ku gSA",
        },
      ];
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let simTimer: number | null = null;
      let simRunning = false;

      const mapLen = (inp: string, out: string, len: number) =>
        Math.ceil(len * (out.length / inp.length));
      const stop = () => {
        simRunning = false;
        if (simTimer) window.clearTimeout(simTimer);
        simTimer = null;
      };
      const schedule = (delay: number) => {
        if (!simRunning) return;
        simTimer = window.setTimeout(tick, delay);
      };
      const tick = () => {
        if (!simRunning) return;
        const phrase = phrases[phraseIndex];
        charIndex += isDeleting ? -1 : 1;
        simInput.textContent = phrase.input.substring(0, charIndex);
        simOutput.textContent = phrase.output.substring(
          0,
          mapLen(phrase.input, phrase.output, charIndex)
        );
        if (simWords) {
          const text = (simInput.textContent || '').trim();
          simWords.textContent = String(text ? text.split(/\s+/).length : 0);
        }
        if (!isDeleting && charIndex === phrase.input.length) {
          isDeleting = true;
          schedule(3000);
          return;
        }
        if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          schedule(1000);
          return;
        }
        schedule(isDeleting ? 40 : 120);
      };
      const start = () => {
        if (simRunning) return;
        simRunning = true;
        schedule(1500);
      };

      if ('IntersectionObserver' in window) {
        const simObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) start();
              else stop();
            });
          },
          { threshold: 0.15 }
        );
        simObserver.observe(simInput.closest('section') || simInput);
        cleanups.push(() => {
          simObserver.disconnect();
          stop();
        });
      } else {
        start();
        cleanups.push(stop);
      }
    }

    // Remington key visualizer — auto-cycle keys when in view
    const simBox = host.querySelector<HTMLElement>('[data-kdc-sim="1"]');
    if (simBox && !liteMode) {
      const keys = Array.from(simBox.querySelectorAll<HTMLButtonElement>('.sim-key'));
      const keyDisp = simBox.querySelector<HTMLElement>('#sim-key-display');
      const uniDisp = simBox.querySelector<HTMLElement>('#sim-unicode-display');
      const kruDisp = simBox.querySelector<HTMLElement>('#sim-kruti-display');
      const descDisp = simBox.querySelector<HTMLElement>('#sim-desc-display');
      if (keys.length) {
        let currentIdx = 0;
        let cycleTimer: number | null = null;
        const activateKey = (index: number) => {
          keys.forEach((k) => k.classList.remove('active'));
          const key = keys[index];
          key.classList.add('active');
          const physicalKey = key.getAttribute('data-key') || '';
          const hindiGlyph = key.getAttribute('data-glyph') || '';
          const charName = key.getAttribute('data-name') || '';
          const asciiCode = key.getAttribute('data-ascii') || '';
          if (keyDisp) keyDisp.textContent = physicalKey;
          if (uniDisp) uniDisp.textContent = physicalKey;
          if (kruDisp) kruDisp.textContent = hindiGlyph;
          if (descDisp) {
            descDisp.innerHTML = `Currently displaying key <strong>${physicalKey}</strong> (ASCII ${asciiCode}). The font renders it visually as <strong>${charName}</strong>.`;
          }
        };
        const stopCycle = () => {
          if (cycleTimer) window.clearInterval(cycleTimer);
          cycleTimer = null;
        };
        const startCycle = () => {
          if (cycleTimer) return;
          cycleTimer = window.setInterval(() => {
            currentIdx = (currentIdx + 1) % keys.length;
            activateKey(currentIdx);
          }, 2200);
        };
        activateKey(0);
        keys.forEach((key, i) => {
          const onClick = () => {
            stopCycle();
            currentIdx = i;
            activateKey(i);
          };
          key.addEventListener('click', onClick);
          cleanups.push(() => key.removeEventListener('click', onClick));
        });
        if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) startCycle();
                else stopCycle();
              });
            },
            { threshold: 0.3 }
          );
          obs.observe(simBox);
          cleanups.push(() => {
            obs.disconnect();
            stopCycle();
          });
        } else {
          startCycle();
          cleanups.push(stopCycle);
        }
      }
    }

    host.querySelectorAll<HTMLElement>('.wp-block-rank-math-toc-block').forEach((toc) => {
      let heading = toc.querySelector<HTMLElement>('h4');
      if (!heading) {
        const nav = toc.querySelector('nav');
        if (!nav) return;
        heading = document.createElement('h4');
        heading.textContent = 'On This Page';
        toc.insertBefore(heading, nav);
      }
      heading.setAttribute('role', 'button');
      heading.setAttribute('tabindex', '0');
      heading.setAttribute('aria-expanded', 'false');
      const toggle = () => {
        const isOpen = toc.classList.contains('toc-open');
        toc.classList.toggle('toc-open', !isOpen);
        heading!.setAttribute('aria-expanded', String(!isOpen));
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      };
      heading.addEventListener('click', toggle);
      heading.addEventListener('keydown', onKey);
      cleanups.push(() => {
        heading!.removeEventListener('click', toggle);
        heading!.removeEventListener('keydown', onKey);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [html]);

  return (
    <div
      ref={hostRef}
      className="wp-html-host"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

/**
 * Renders WP page HTML as one block, then portals the React converter into
 * `.kdc-wp-mount` hosts without letting React wipe those hosts on re-render.
 */
export default function WpHtmlClient({ html }: { html: string }) {
  const [mounts, setMounts] = useState<Mount[]>([]);
  const [relatedToolsMounts, setRelatedToolsMounts] = useState<RelatedToolsMount[]>([]);
  const onHostsReady = useCallback((next: Mount[]) => {
    setMounts(next);
  }, []);
  const onRelatedToolsReady = useCallback((next: RelatedToolsMount[]) => {
    setRelatedToolsMounts(next);
  }, []);

  return (
    <>
      <WpHtmlHost
        html={html}
        onHostsReady={onHostsReady}
        onRelatedToolsReady={onRelatedToolsReady}
      />
      {mounts.map((mount) =>
        createPortal(
          <ClientConverter mode={mount.mode} variant={mount.variant} />,
          mount.el,
          mount.key
        )
      )}
      {relatedToolsMounts.map((mount) =>
        createPortal(
          <RelatedTools currentPath={mount.path} variant={mount.variant} />,
          mount.el,
          `related-${mount.key}`
        )
      )}
    </>
  );
}
