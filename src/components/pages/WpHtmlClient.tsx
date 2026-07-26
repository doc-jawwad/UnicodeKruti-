'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ClientConverter from '@/components/converter/ClientConverter';
import type { ConverterMode, ConverterVariant } from '@/lib/converter/engine';

type Mount = {
  el: HTMLElement;
  mode: ConverterMode;
  variant: ConverterVariant;
};

/**
 * Renders a full WP page body as one HTML block, then portals the React
 * converter into `.kdc-wp-mount` placeholders and replays the theme's
 * interactivity (reveal animations, typing simulator, TOC folding).
 */
export default function WpHtmlClient({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounts, setMounts] = useState<Mount[]>([]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const found: Mount[] = [];
    root.querySelectorAll<HTMLElement>('.kdc-wp-mount').forEach((el) => {
      found.push({
        el,
        mode: (el.dataset.kdcMode as ConverterMode) || 'uni-to-kd',
        variant: (el.dataset.kdcVariant as ConverterVariant) || '010',
      });
    });
    setMounts(found);
  }, [html]);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];

    // Always show FAQ / reveal blocks immediately
    root
      .querySelectorAll<HTMLElement>(
        '.reveal, .faq-item, .error-panel, .timeline-item, .v-timeline-item'
      )
      .forEach((el) => el.classList.add('visible'));

    root.querySelectorAll<HTMLElement>('.capacity-bar-fill').forEach((bar) => {
      const w = bar.getAttribute('data-width');
      if (w) bar.style.width = w;
    });

    const liteMode =
      window.matchMedia('(max-width: 992px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ----- "Try an example" buttons -> feed converter via event -----
    root.querySelectorAll<HTMLButtonElement>('.btn-try-example').forEach((btn) => {
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

    // ----- Real-time typing simulator (home page howto step 2) -----
    const simInput = root.querySelector<HTMLElement>('#sim-unicode-input');
    const simOutput = root.querySelector<HTMLElement>('#sim-kruti-output');
    const simWords = root.querySelector<HTMLElement>('#sim-word-count');
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

    // ----- RankMath TOC block — foldable -----
    root.querySelectorAll<HTMLElement>('.wp-block-rank-math-toc-block').forEach((toc) => {
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
    <>
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
      {mounts.map((mount, i) =>
        createPortal(
          <ClientConverter mode={mount.mode} variant={mount.variant} />,
          mount.el,
          `kdc-mount-${i}`
        )
      )}
    </>
  );
}
