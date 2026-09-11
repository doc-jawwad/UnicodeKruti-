'use client';

import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import Link from 'next/link';
import {
  convertText,
  countChars,
  countWords,
  detectLikelyKrutiDev,
  type ConverterMode,
  type ConverterVariant,
} from '@/lib/converter/engine';
import ToolSavePrompt from '@/components/converter/ToolSavePrompt';
import './converter.css';

const HISTORY_KEY = 'kdc_recent_conversions_v1';
const DEVANAGARI_RE = /[\u0900-\u097F]/;

function looksLikeUnicodeHindi(text: string): boolean {
  const t = text.trim();
  if (!t) return false;
  const compact = t.replace(/\s+/g, '');
  if (!compact.length) return false;
  const dev = (t.match(DEVANAGARI_RE) || []).length;
  return dev / compact.length >= 0.4;
}

/** True when text looks like KrutiDev ASCII (or other non-Unicode-Hindi) for a uni→kd page. */
function looksLikeNonUnicodeHindi(text: string): boolean {
  const t = text.trim();
  if (t.length < 3) return false;
  if (looksLikeUnicodeHindi(t)) return false;
  return /[A-Za-z]/.test(t);
}

function emptyConvertMessage(isKdToUni: boolean): string {
  return isKdToUni
    ? 'Convert text first — paste KrutiDev above, then share or download.'
    : 'Convert text first — paste Unicode Hindi above, then share or download.';
}

const WHATSAPP_MAX_CHARS = 3500;

const INVALID_UNICODE_MSG =
  'This text does not appear to be Unicode Hindi. Check if your text is already in KrutiDev format.';

const COPY_FAIL_MSG =
  'Could not copy. Please select the text and copy manually.';

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
  /** When true, mode cannot be swapped (page-locked direction). */
  lockMode?: boolean;
  /** Optional content between I/O boxes and share/download buttons. */
  belowBoxes?: ReactNode;
  /** Override the Unicode pane label (default: Unicode (Mangal)). */
  unicodeLabel?: string;
};

function getLabels(variant: ConverterVariant, unicodeLabel?: string) {
  const krutidevLabel =
    variant === '10' ? 'KrutiDev 10 (Kurtidev10)' : 'KrutiDev 010';
  return {
    krutidevLabel,
    unicodeLabel: unicodeLabel ?? 'Unicode (Mangal)',
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
  lockMode = false,
  belowBoxes,
  unicodeLabel,
}: ConverterAppProps) {
  const labels = useMemo(
    () => getLabels(variant, unicodeLabel),
    [variant, unicodeLabel],
  );
  const [mode, setMode] = useState<ConverterMode>(initialMode);
  const [autoDetect, setAutoDetect] = useState(true);
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [toast, setToast] = useState('');
  const [toastIsError, setToastIsError] = useState(false);
  const [hasConverted, setHasConverted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadLabel, setDownloadLabel] = useState<Record<string, string>>({});
  const [inlineAlert, setInlineAlert] = useState<string | null>(null);

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
      ? variant === '10'
        ? {
            href: '/unicode-to-krutidev-10-converter',
            text: 'Need Unicode to KrutiDev 10? Try our Unicode to KrutiDev 10 converter',
          }
        : {
            href: '/',
            text: 'Need Unicode to KrutiDev 010? Try our homepage converter',
          }
      : variant === '10'
        ? {
            href: '/krutidev-10-to-unicode-converter',
            text: 'Need KrutiDev 10 to Unicode? Try our KrutiDev 10 converter',
          }
        : {
            href: '/krutidev-to-unicode-converter',
            text: 'Need KrutiDev to Unicode? Try our KrutiDev converter',
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

  const showToast = useCallback((msg: string, isError = false) => {
    setToastIsError(isError);
    setToast(msg);
    window.setTimeout(() => {
      setToast('');
      setToastIsError(false);
    }, 2200);
  }, []);

  const showInlineAlert = useCallback((msg: string) => {
    setInlineAlert(msg);
  }, []);

  const clearInlineAlert = useCallback(() => {
    setInlineAlert(null);
  }, []);

  const requireTarget = useCallback((): boolean => {
    if (target.trim()) {
      clearInlineAlert();
      return true;
    }
    showInlineAlert(emptyConvertMessage(isKdToUni));
    return false;
  }, [target, isKdToUni, showInlineAlert, clearInlineAlert]);

  /** Keep input responsive; defer conversion off the urgent interaction path (INP). */
  const onSourceChange = useCallback(
    (value: string) => {
      setSource(value);
      if (!value.trim()) {
        setInlineAlert(null);
        return;
      }
      // Live encoding mismatch hint for Unicode → KrutiDev direction
      if (mode === 'uni-to-kd' && looksLikeNonUnicodeHindi(value)) {
        setInlineAlert(INVALID_UNICODE_MSG);
      } else if (mode === 'uni-to-kd') {
        setInlineAlert(null);
      } else if (mode === 'kd-to-uni' && looksLikeUnicodeHindi(value)) {
        setInlineAlert(
          'This text looks like Unicode Hindi already. Use the Unicode to KrutiDev Converter if you need the other direction.'
        );
      } else {
        setInlineAlert(null);
      }
    },
    [mode]
  );

  useEffect(() => {
    const delay = source.length > 4000 ? 120 : 50;
    const timer = window.setTimeout(() => {
      startTransition(() => {
        let activeMode = mode;
        if (!lockMode && autoDetect && source.trim()) {
          const looksKd = detectLikelyKrutiDev(source);
          activeMode = looksKd ? 'kd-to-uni' : 'uni-to-kd';
          if (activeMode !== mode) setMode(activeMode);
        }
        const out = convertText(source, activeMode);
        setTarget(out);
        if (source.trim() && out.trim()) setHasConverted(true);
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [source, mode, autoDetect, lockMode]);

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

  const pushHistory = useCallback((src: string, tgt: string, m: ConverterMode) => {
    if (!src.trim() || !tgt.trim()) return;
    setHasConverted(true);
    const item: HistoryItem = {
      id: `${Date.now()}`,
      source: src.slice(0, 120),
      target: tgt.slice(0, 120),
      mode: m,
      at: Date.now(),
    };
    setHistory((prev) => {
      const sameAsLatest =
        prev[0] &&
        prev[0].source === item.source &&
        prev[0].target === item.target &&
        prev[0].mode === item.mode;
      if (sameAsLatest) return prev;
      const next = [item, ...prev].slice(0, 8);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  // Save to recent history after the user pauses typing (conversion itself is real-time).
  useEffect(() => {
    if (!source.trim() || !target.trim()) return;
    const timer = window.setTimeout(() => {
      pushHistory(source, target, mode);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [source, target, mode, pushHistory]);

  const handleSwap = () => {
    if (lockMode) return;
    const nextMode: ConverterMode =
      mode === 'uni-to-kd' ? 'kd-to-uni' : 'uni-to-kd';
    setMode(nextMode);
    setSource(target);
    const out = convertText(target, nextMode);
    setTarget(out);
  };

  const handleCopy = async () => {
    if (!requireTarget()) return;
    try {
      await navigator.clipboard.writeText(target);
      pushHistory(source, target, mode);
      setCopied(true);
      showToast('Copied!');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      showInlineAlert(COPY_FAIL_MSG);
      showToast(COPY_FAIL_MSG, true);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onSourceChange(text);
      showToast('Pasted');
    } catch {
      showInlineAlert('Error: Paste permission denied. Use Ctrl+V or ⌘V to paste.');
      showToast('Paste permission denied', true);
    }
  };

  const handleClear = () => {
    setSource('');
    setTarget('');
    clearInlineAlert();
  };

  const flashDownload = (key: string, working: string, done: string) => {
    setDownloadLabel((prev) => ({ ...prev, [key]: working }));
    window.setTimeout(() => {
      setDownloadLabel((prev) => ({ ...prev, [key]: done }));
      window.setTimeout(() => {
        setDownloadLabel((prev) => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      }, 2000);
    }, 400);
  };

  const handleDownloadTxt = () => {
    if (!requireTarget()) return;
    flashDownload('txt', 'Downloading…', 'Downloaded!');
    downloadBlob(
      'unicodekruti-conversion.txt',
      new Blob([target], { type: 'text/plain;charset=utf-8' })
    );
  };

  const handleDownloadWord = () => {
    if (!requireTarget()) return;
    flashDownload('word', 'Downloading…', 'Downloaded!');
    void (async () => {
      try {
        const { downloadTextAsDocx } = await import('@/lib/converter/docx');
        await downloadTextAsDocx(target, {
          fontMode: isKdToUni ? 'unicode' : 'krutidev',
          filename: 'unicodekruti-conversion.docx',
        });
      } catch {
        setDownloadLabel((prev) => {
          const next = { ...prev };
          delete next.word;
          return next;
        });
        showInlineAlert('Could not generate the Word file. Try Download as TXT instead.');
        showToast('Error generating Word file', true);
      }
    })();
  };

  const handleDownloadPdf = async () => {
    if (!requireTarget()) return;
    flashDownload('pdf', 'Generating PDF…', 'Downloaded!');
    try {
      const { downloadTextAsPdf } = await import('@/lib/converter/pdf');
      showToast('Generating PDF…');
      await downloadTextAsPdf(target, isKdToUni ? 'unicode' : 'krutidev');
      showToast('PDF downloaded');
    } catch {
      setDownloadLabel((prev) => {
        const next = { ...prev };
        delete next.pdf;
        return next;
      });
      showInlineAlert('Error: Could not generate the PDF. Try Download as TXT instead.');
      showToast('Error generating PDF', true);
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
    if (!requireTarget()) return;
    let text = target;
    if (text.length > WHATSAPP_MAX_CHARS) {
      text = `${text.slice(0, WHATSAPP_MAX_CHARS)}\n…`;
      showToast('Text truncated for WhatsApp length limit');
    }
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleGmail = () => {
    if (!requireTarget()) return;
    let body = target;
    // mailto URLs blow up past ~2k; keep a safe body size
    if (body.length > 1800) {
      body = `${body.slice(0, 1800)}\n…`;
      showToast('Text truncated for email length limit');
    }
    window.open(
      `mailto:?subject=${encodeURIComponent('Converted Hindi text')}&body=${encodeURIComponent(body)}`,
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
          className={`kdc-toast${toastIsError ? ' kdc-toast--error' : ''}`}
          role={toastIsError ? 'alert' : 'status'}
        >
          {toastIsError ? <span aria-hidden="true">⚠ </span> : null}
          {toastIsError && !toast.startsWith('Error:') && !toast.startsWith('Could not')
            ? `Error: ${toast}`
            : toast}
        </div>
      ) : null}

      {inlineAlert ? (
        <div className="kdc-inline-alert" role="alert">
          <span className="kdc-inline-alert__icon" aria-hidden="true">
            ⚠
          </span>
          <span>
            {inlineAlert.startsWith('Error:') ||
            inlineAlert.startsWith('Could not') ||
            inlineAlert.startsWith('This text') ||
            inlineAlert.startsWith('Paste some')
              ? inlineAlert
              : `Error: ${inlineAlert}`}
          </span>
        </div>
      ) : null}

      {!lockMode ? (
        <div className="kdc-controls">
          <div className="kdc-controls-left">
            <div className="kdc-toggle-group">
              <label className="kdc-switch">
                <input
                  type="checkbox"
                  checked={autoDetect}
                  onChange={(e) => setAutoDetect(e.target.checked)}
                  aria-describedby="kdc-autodetect-help"
                  aria-label="Auto-detect encoding"
                />
                <span className="kdc-slider" />
              </label>
              <div className="kdc-toggle-copy">
                <span className="kdc-toggle-label">Auto-detect encoding</span>
                <span id="kdc-autodetect-help" className="kdc-toggle-help">
                  Picks Unicode ↔ KrutiDev direction from your text. Turn off to lock the direction with the swap button.
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="kdc-main-grid">
        <div className="kdc-card" id="kdc-source-card">
          <div className="kdc-card-header">
            <div className="kdc-card-title">
              <span>{sourceLabel}</span>
            </div>
            <div className="kdc-card-actions">
              <label className="kdc-btn-icon" title="Upload TXT or PDF" aria-label="Upload TXT or PDF" style={{ cursor: 'pointer' }}>
                <input
                  type="file"
                  accept=".txt,text/plain,application/pdf,.pdf"
                  hidden
                  aria-label="Upload TXT or PDF file"
                  onChange={(e) => {
                    void handleUpload(e.target.files?.[0] ?? null);
                    e.currentTarget.value = '';
                  }}
                />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
              </label>
              <button
                type="button"
                className="kdc-btn-icon"
                title="Paste Content"
                aria-label="Paste content"
                onClick={handlePaste}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>
              </button>
              <button
                type="button"
                className="kdc-btn-icon kdc-clear-btn"
                title="Clear"
                aria-label="Clear input"
                onClick={handleClear}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
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
              aria-label={
                isKdToUni ? 'KrutiDev text input' : 'Unicode Hindi text input'
              }
              autoComplete="off"
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
          {lockMode ? (
            <Link
              href={reverseCta.href}
              className="kdc-swap-btn"
              title={reverseCta.text}
              aria-label={reverseCta.text}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 16V4M7 4L3 8M7 4L11 8M17 8v12M17 20l4-4M17 20l-4-4" /></svg>
            </Link>
          ) : (
            <button
              type="button"
              className="kdc-swap-btn"
              title="Swap Conversion Mode"
              aria-label="Swap conversion direction"
              onClick={handleSwap}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 16V4M7 4L3 8M7 4L11 8M17 8v12M17 20l4-4M17 20l-4-4" /></svg>
            </button>
          )}
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
                title={copied ? 'Copied!' : 'Copy Result'}
                aria-label={copied ? 'Copied!' : 'Copy converted text'}
                onClick={handleCopy}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              </button>
              <button
                type="button"
                className="kdc-btn-icon"
                title={downloadLabel.txt || 'Download TXT'}
                aria-label={downloadLabel.txt || 'Download converted text as TXT'}
                onClick={handleDownloadTxt}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
              </button>
            </div>
          </div>
          <div className="kdc-textarea-wrapper">
            <textarea
              id="krutidev-output"
              className={isKdToUni ? 'font-unicode' : 'font-krutidev'}
              placeholder={targetPlaceholder}
              spellCheck={false}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              aria-label={isKdToUni ? 'Unicode output' : 'KrutiDev output'}
              autoComplete="off"
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

      {belowBoxes}

      <div className="kdc-share-row" role="group" aria-label="Share or download converted text">
        <button
          type="button"
          className="kdc-action-btn kdc-btn-copy kdc-action-btn--primary"
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy converted text'}
        >
          {copied ? 'Copied!' : 'Copy result'}
        </button>
        <button type="button" className="kdc-action-btn kdc-btn-whatsapp" onClick={handleWhatsApp}>
          WhatsApp
        </button>
        <button type="button" className="kdc-action-btn kdc-btn-gmail" onClick={handleGmail}>
          Gmail
        </button>
        <button
          type="button"
          className="kdc-action-btn kdc-btn-word"
          onClick={handleDownloadWord}
          aria-label="Download as Word (.docx)"
        >
          {downloadLabel.word || 'Word'}
        </button>
        <button type="button" className="kdc-action-btn" onClick={() => void handleDownloadPdf()}>
          {downloadLabel.pdf || 'PDF'}
        </button>
        <button type="button" className="kdc-action-btn" onClick={handleDownloadTxt}>
          {downloadLabel.txt || 'TXT'}
        </button>
      </div>

      <ToolSavePrompt
        hasConverted={hasConverted}
        toolName={
          variant === '10'
            ? isKdToUni
              ? 'the KrutiDev 10 converter'
              : 'the Unicode to KrutiDev 10 converter'
            : isKdToUni
              ? 'the KrutiDev to Unicode converter'
              : 'the Unicode to KrutiDev Converter'
        }
      />

      <div className="kdc-cta-banner">
        <p>
          Need to go the other way?{' '}
          <Link href={reverseCta.href}>{reverseCta.text} →</Link>
        </p>
      </div>

      <section className="kdc-history-section">
        <div className="kdc-history-header">
          <h2 className="kdc-history-title">Recent Conversions</h2>
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
