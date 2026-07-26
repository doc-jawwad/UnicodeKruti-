'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  convertText,
  countChars,
  countWords,
  detectLikelyKrutiDev,
  type ConverterMode,
  type ConverterVariant,
} from '@/lib/converter/engine';
import './converter.css';

const HISTORY_KEY = 'kdc_recent_conversions_v1';

type HistoryItem = {
  id: string;
  source: string;
  target: string;
  mode: ConverterMode;
  at: number;
};

export type ConverterAppProps = {
  mode?: ConverterMode;
  variant?: ConverterVariant;
  ctaHref?: string;
  ctaText?: string;
  exampleSource?: string;
  exampleHint?: string;
};

function getLabels(variant: ConverterVariant) {
  const krutidevLabel =
    variant === '10' ? 'KrutiDev 10 (Kurtidev10)' : 'KrutiDev 010';
  return {
    krutidevLabel,
    unicodeLabel: 'Unicode (Mangal)',
  };
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ConverterApp({
  mode: initialMode = 'uni-to-kd',
  variant = '010',
  ctaHref,
  ctaText,
  exampleSource,
  exampleHint,
}: ConverterAppProps) {
  const labels = useMemo(() => getLabels(variant), [variant]);
  const [mode, setMode] = useState<ConverterMode>(initialMode);
  const [autoDetect, setAutoDetect] = useState(true);
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toast, setToast] = useState('');

  const isKdToUni = mode === 'kd-to-uni';
  const sourceLabel = isKdToUni ? labels.krutidevLabel : labels.unicodeLabel;
  const targetLabel = isKdToUni ? labels.unicodeLabel : labels.krutidevLabel;
  const sourcePlaceholder = isKdToUni
    ? `Type or paste ${labels.krutidevLabel} text here...`
    : 'Type or paste Unicode text here...';
  const targetPlaceholder = isKdToUni
    ? 'Unicode conversion will appear here...'
    : `${labels.krutidevLabel} conversion will appear here...`;

  const defaultCta =
    mode === 'kd-to-uni'
      ? {
          href: '/',
          text: 'Need Unicode to KrutiDev 010? Try our homepage converter',
        }
      : {
          href: '/krutidev-10-to-unicode-converter',
          text: 'Need KrutiDev 10 to Unicode? Try our KrutiDev 10 converter',
        };

  const reverseCta = {
    href: ctaHref || defaultCta.href,
    text: ctaText || defaultCta.text,
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw) as HistoryItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2200);
  }, []);

  const runConvert = useCallback(
    (text: string, nextMode: ConverterMode) => {
      const out = convertText(text, nextMode);
      setTarget(out);
      return out;
    },
    []
  );

  const onSourceChange = useCallback(
    (value: string) => {
      setSource(value);
      let activeMode = mode;
      if (autoDetect && value.trim()) {
        const looksKd = detectLikelyKrutiDev(value);
        activeMode = looksKd ? 'kd-to-uni' : 'uni-to-kd';
        if (activeMode !== mode) setMode(activeMode);
      }
      runConvert(value, activeMode);
    },
    [autoDetect, mode, runConvert]
  );

  useEffect(() => {
    const onTryExample = (e: Event) => {
      const detail = (e as CustomEvent<{ text?: string }>).detail;
      const text = detail?.text?.trim();
      if (!text) return;
      onSourceChange(text);
    };
    window.addEventListener('kdc-try-example', onTryExample);
    return () => window.removeEventListener('kdc-try-example', onTryExample);
  }, [onSourceChange]);

  const pushHistory = (src: string, tgt: string, m: ConverterMode) => {
    if (!src.trim() || !tgt.trim()) return;
    const item: HistoryItem = {
      id: `${Date.now()}`,
      source: src.slice(0, 120),
      target: tgt.slice(0, 120),
      mode: m,
      at: Date.now(),
    };
    setHistory((prev) => {
      const next = [item, ...prev].slice(0, 8);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  const handleConvert = () => {
    const out = runConvert(source, mode);
    pushHistory(source, out, mode);
    showToast('Converted');
  };

  const handleSwap = () => {
    const nextMode: ConverterMode =
      mode === 'uni-to-kd' ? 'kd-to-uni' : 'uni-to-kd';
    setMode(nextMode);
    setSource(target);
    const out = convertText(target, nextMode);
    setTarget(out);
  };

  const handleCopy = async () => {
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target);
      pushHistory(source, target, mode);
      showToast('Copied to clipboard');
    } catch {
      showToast('Copy failed');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onSourceChange(text);
      showToast('Pasted');
    } catch {
      showToast('Paste permission denied');
    }
  };

  const handleClear = () => {
    setSource('');
    setTarget('');
  };

  const handleDownloadTxt = () => {
    if (!target) return;
    downloadBlob(
      'unicodekruti-conversion.txt',
      new Blob([target], { type: 'text/plain;charset=utf-8' })
    );
  };

  const handleDownloadWord = () => {
    if (!target) return;
    const html = `<html><head><meta charset="utf-8"><title>UnicodeKruti</title></head><body><pre style="font-family:Mangal,Nirmala UI,Arial,sans-serif;white-space:pre-wrap;">${target
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')}</pre></body></html>`;
    downloadBlob(
      'unicodekruti-conversion.doc',
      new Blob([html], { type: 'application/msword' })
    );
  };

  const handleDownloadPdf = async () => {
    if (!target.trim()) {
      showToast('No text available to download');
      return;
    }
    try {
      const { downloadTextAsPdf } = await import('@/lib/converter/pdf');
      showToast('Generating PDF…');
      await downloadTextAsPdf(target, isKdToUni ? 'unicode' : 'krutidev');
      showToast('PDF downloaded');
    } catch {
      showToast('Error generating PDF');
    }
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    try {
      if (file.size > 8 * 1024 * 1024) {
        showToast('File is larger than 8 MB');
        return;
      }
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        const { extractTextFromPdf } = await import('@/lib/converter/pdf');
        showToast('Extracting PDF…');
        const text = await extractTextFromPdf(file);
        onSourceChange(text);
        showToast('PDF text loaded');
        return;
      }
      const text = await file.text();
      onSourceChange(text);
      showToast('File loaded');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Could not read that file');
    }
  };

  const handleWhatsApp = () => {
    if (!target) return;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(target)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleGmail = () => {
    if (!target) return;
    window.open(
      `mailto:?subject=${encodeURIComponent('Converted Hindi text')}&body=${encodeURIComponent(target)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      /* ignore */
    }
  };

  const loadExample = () => {
    if (!exampleSource) return;
    onSourceChange(exampleSource);
  };

  return (
    <div
      id="kdc-converter-app"
      className="kdc-app-container"
      data-default-mode={mode}
      data-variant={variant}
    >
      {toast ? (
        <div
          className="kdc-toast"
          role="status"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#0f172a',
            color: '#fff',
            padding: '0.65rem 1rem',
            borderRadius: 10,
            zIndex: 1000,
            fontSize: '0.9rem',
          }}
        >
          {toast}
        </div>
      ) : null}

      <div className="kdc-controls">
        <div className="kdc-controls-left">
          <div className="kdc-toggle-group">
            <label className="kdc-switch">
              <input
                type="checkbox"
                checked={autoDetect}
                onChange={(e) => setAutoDetect(e.target.checked)}
                aria-label="Auto-Detection"
              />
              <span className="kdc-slider" />
            </label>
            <span className="kdc-toggle-label">Auto-Detection</span>
          </div>
        </div>
        <div className="kdc-controls-right">
          <button
            type="button"
            className="kdc-convert-btn"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
      </div>

      <div className="kdc-main-grid">
        <div className="kdc-card" id="kdc-source-card">
          <div className="kdc-card-header">
            <div className="kdc-card-title">
              <span>{sourceLabel}</span>
            </div>
            <div className="kdc-card-actions">
              <label className="kdc-btn-icon" title="Upload TXT or PDF" style={{ cursor: 'pointer' }}>
                <input
                  type="file"
                  accept=".txt,text/plain,application/pdf,.pdf"
                  hidden
                  onChange={(e) => {
                    void handleUpload(e.target.files?.[0] ?? null);
                    e.currentTarget.value = '';
                  }}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
              </label>
              <button
                type="button"
                className="kdc-btn-icon"
                title="Paste Content"
                onClick={handlePaste}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
              </button>
              <button
                type="button"
                className="kdc-btn-icon kdc-clear-btn"
                title="Clear"
                onClick={handleClear}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
          <div className="kdc-textarea-wrapper">
            <textarea
              id="krutidev-input"
              className={`converter-input ${isKdToUni ? 'font-krutidev' : 'font-unicode'}`}
              placeholder={sourcePlaceholder}
              spellCheck={false}
              value={source}
              onChange={(e) => onSourceChange(e.target.value)}
            />
          </div>
          <div className="kdc-card-footer">
            <div className="kdc-stats">
              <span>{countChars(source)}</span> Chars |{' '}
              <span>{countWords(source)}</span> Words
            </div>
          </div>
        </div>

        <div className="kdc-divider">
          <button
            type="button"
            className="kdc-swap-btn"
            title="Swap Conversion Mode"
            onClick={handleSwap}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 16V4M7 4L3 8M7 4L11 8M17 8v12M17 20l4-4M17 20l-4-4" /></svg>
          </button>
        </div>

        <div className="kdc-card" id="kdc-target-card">
          <div className="kdc-card-header">
            <div className="kdc-card-title">
              <span>{targetLabel}</span>
            </div>
            <div className="kdc-card-actions">
              <button
                type="button"
                className="kdc-btn-icon"
                title="Copy Result"
                onClick={handleCopy}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              </button>
              <button
                type="button"
                className="kdc-btn-icon"
                title="Download TXT"
                onClick={handleDownloadTxt}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              </button>
            </div>
          </div>
          <div className="kdc-textarea-wrapper">
            <textarea
              className={isKdToUni ? 'font-unicode' : 'font-krutidev'}
              placeholder={targetPlaceholder}
              spellCheck={false}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
          <div className="kdc-card-footer">
            <div className="kdc-stats">
              <span>{countChars(target)}</span> Chars |{' '}
              <span>{countWords(target)}</span> Words
            </div>
          </div>
        </div>
      </div>

      <div className="kdc-share-row">
        <button type="button" className="kdc-action-btn kdc-btn-whatsapp" onClick={handleWhatsApp}>
          WhatsApp
        </button>
        <button type="button" className="kdc-action-btn kdc-btn-gmail" onClick={handleGmail}>
          Gmail
        </button>
        <button type="button" className="kdc-action-btn kdc-btn-word" onClick={handleDownloadWord}>
          Download Word File
        </button>
        <button type="button" className="kdc-action-btn" onClick={() => void handleDownloadPdf()}>
          Download PDF
        </button>
        <button type="button" className="kdc-action-btn kdc-btn-copy" onClick={handleCopy}>
          Copy To Clipboard
        </button>
      </div>

      <div className="kdc-cta-banner">
        <p>
          Need to go the other way?{' '}
          <Link href={reverseCta.href}>{reverseCta.text} →</Link>
        </p>
      </div>

      <section className="kdc-history-section">
        <div className="kdc-history-header">
          <h3 className="kdc-history-title">Recent Conversions</h3>
          <button type="button" className="kdc-btn-text" onClick={clearHistory}>
            Clear All
          </button>
        </div>
        <div className="kdc-history-list" aria-live="polite">
          {history.length === 0 ? (
            <p style={{ color: 'var(--kdc-text-muted)', fontSize: '0.95rem' }}>
              No recent conversions found
              {exampleSource ? (
                <>
                  {' '}
                  <button
                    type="button"
                    className="kdc-btn-text"
                    onClick={loadExample}
                    style={{ display: 'inline', marginLeft: 4 }}
                  >
                    Try an example: {exampleHint || exampleSource} →
                  </button>
                </>
              ) : null}
            </p>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                type="button"
                className="kdc-history-item"
                onClick={() => {
                  setMode(item.mode);
                  setSource(item.source);
                  setTarget(item.target);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--kdc-border)',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <strong>{item.source}</strong>
                <span style={{ margin: '0 0.5rem', color: 'var(--kdc-primary)' }}>→</span>
                <span>{item.target}</span>
              </button>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
