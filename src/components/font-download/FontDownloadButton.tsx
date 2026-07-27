'use client';

import { useCallback, useState } from 'react';

/**
 * Forces a same-origin TTF download (Content-Disposition + blob fallback).
 * Avoids the browser opening/navigating to the font file.
 */
export default function FontDownloadButton({
  href,
  fileName,
  id,
}: {
  href: string;
  fileName: string;
  id?: string;
}) {
  const [label, setLabel] = useState('Download');
  const [busy, setBusy] = useState(false);

  const startDownload = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (busy) return;
      setBusy(true);
      setLabel('Downloading…');

      try {
        const res = await fetch(href, { credentials: 'same-origin' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        setLabel('Downloaded!');
      } catch {
        // Last resort: navigate with download attribute
        const a = document.createElement('a');
        a.href = href;
        a.download = fileName;
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setLabel('Downloaded!');
      }

      window.setTimeout(() => {
        setLabel('Download');
        setBusy(false);
      }, 2000);
    },
    [busy, fileName, href]
  );

  return (
    <a
      href={href}
      download={fileName}
      className="btn-primary font-pack__btn"
      id={id}
      aria-busy={busy}
      onClick={(e) => {
        void startDownload(e);
      }}
    >
      {label}
    </a>
  );
}
