'use client';

import {
  useCallback,
  useLayoutEffect,
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
  lockMode: boolean;
  key: string;
};

type RelatedToolsMount = {
  el: HTMLElement;
  path: string;
  variant: RelatedToolsVariant;
  key: string;
};

/**
 * Hydrates converter / related-tools mounts inside Astro-rendered WP HTML.
 * HTML must already be in the document via Astro `set:html` (SEO-critical).
 */
export default function ConverterHostIsland({ rootId }: { rootId: string }) {
  const [mounts, setMounts] = useState<Mount[]>([]);
  const [related, setRelated] = useState<RelatedToolsMount[]>([]);

  const scan = useCallback(() => {
    const host = document.getElementById(rootId);
    if (!host) return;

    const found: Mount[] = [];
    host.querySelectorAll<HTMLElement>('.kdc-wp-mount').forEach((el, index) => {
      const key = el.id || `kdc-mount-${index}`;
      if (!el.id) el.id = key;
      el.replaceChildren();
      found.push({
        el,
        key,
        mode: (el.dataset.kdcMode as ConverterMode) || 'uni-to-kd',
        variant: (el.dataset.kdcVariant as ConverterVariant) || '010',
        lockMode: el.dataset.kdcLockMode === 'true',
      });
    });
    setMounts(found);

    const relatedFound: RelatedToolsMount[] = [];
    host
      .querySelectorAll<HTMLElement>('.kdc-related-tools-mount')
      .forEach((el, index) => {
        const key = el.id || `kdc-related-tools-${index}`;
        if (!el.id) el.id = key;
        el.replaceChildren();
        relatedFound.push({
          el,
          key,
          path: el.dataset.relatedToolsPath || '/',
          variant:
            el.dataset.relatedToolsVariant === 'compact' ? 'compact' : 'section',
        });
      });
    setRelated(relatedFound);

    host
      .querySelectorAll<HTMLElement>('.reveal, .faq-item, .error-panel')
      .forEach((el) => el.classList.add('visible'));

    host.querySelectorAll<HTMLButtonElement>('.btn-try-example').forEach((btn) => {
      const onclick = btn.getAttribute('onclick') || '';
      const sample =
        onclick.match(/inp\.value\s*=\s*['"]([^'"]+)['"]/)?.[1] ||
        'नमस्ते भारत';
      btn.removeAttribute('onclick');
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
    });
  }, [rootId]);

  useLayoutEffect(() => {
    scan();
  }, [scan]);

  return (
    <>
      {mounts.map((m) =>
        createPortal(
          <ClientConverter
            mode={m.mode}
            variant={m.variant}
            lockMode={m.lockMode}
          />,
          m.el,
          m.key
        )
      )}
      {related.map((m) =>
        createPortal(
          <RelatedTools path={m.path} variant={m.variant} />,
          m.el,
          m.key
        )
      )}
    </>
  );
}
