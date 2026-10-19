'use client';

import { useCallback, useState } from 'react';
import { canEmitFontDownloadResult, track } from '@/lib/analytics/track';
import { FONT_DOWNLOAD_FEEDBACK } from '@/components/font-download/font-download-feedback';

export { FONT_DOWNLOAD_FEEDBACK } from '@/components/font-download/font-download-feedback';

/**
 * Forces a same-origin TTF download (blob URL + click, with <a download> fallback).
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
  const [label, setLabel] = useState<string>(FONT_DOWNLOAD_FEEDBACK.idle);
  const [busy, setBusy] = useState(false);

  const startDownload = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (busy) return;
      setBusy(true);
      setLabel(FONT_DOWNLOAD_FEEDBACK.loading);

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
        setLabel(FONT_DOWNLOAD_FEEDBACK.started);
        if (
          canEmitFontDownloadResult({
            resOk: true,
            blobReceived: true,
            usedFallback: false,
          })
        ) {
          track('download_result', {
            tool_name: 'font_download',
            download_kind: 'ttf',
            font_file: fileName,
          });
        }
      } catch {
        // Last resort: native download attribute — do not claim success; no download_result.
        const a = document.createElement('a');
        a.href = href;
        a.download = fileName;
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setLabel(FONT_DOWNLOAD_FEEDBACK.fallback);
      }

      window.setTimeout(() => {
        setLabel(FONT_DOWNLOAD_FEEDBACK.idle);
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
