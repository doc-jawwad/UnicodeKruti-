'use client';

import { useCallback, useEffect, useState } from 'react';
import { countChars, countWords } from '@/lib/converter/engine';
import {
  useUpdeshConverter,
  type UpdeshConverterDirection,
} from '@/lib/hooks/useUpdeshConverter';
import '@/components/converter/converter.css';

const BANNER_DISMISS_KEY = 'updesh_font_banner_dismissed_v1';
const HISTORY_KEY = 'updesh_recent_conversions_v1';
const EXAMPLE_UPDESH = 'ueLrs Hkkjr';
const EXAMPLE_UNICODE = 'नमस्ते भारत';
const WHATSAPP_MAX_CHARS = 3500;

const UNICODE_LABEL = 'Unicode Hindi Input (Mangal, Nirmala UI, Kokila)';
const UPDESH_LABEL = 'Updesh / KrutiDev Output';
const UNICODE_OUTPUT_LABEL = 'Unicode Hindi Output (Mangal, Nirmala UI, Kokila)';
const UPDESH_INPUT_LABEL = 'Updesh / KrutiDev Input';

type HistoryItem = {
  id: string;
  source: string;
  target: string;
  direction: UpdeshConverterDirection;
  at: number;
};

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Unicode ↔ Updesh / KrutiDev 010 conversion tool UI.
 * Styling reuses the homepage converter (`kdc-*`) classes — no separate theme.
 */
export default function UpdeshConverter() {
  const [direction, setDirection] =
    useState<UpdeshConverterDirection>('updesh-to-unicode');
  const [source, setSource] = useState('');
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState('');
  const [toastIsError, setToastIsError] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [downloadLabel, setDownloadLabel] = useState<Record<string, string>>({});

  const { outputText, wordCount, charCount, isConverting } = useUpdeshConverter(
    source,
    direction
  );

  const isUniToUpdesh = direction === 'unicode-to-updesh';
  const sourceLabel = isUniToUpdesh ? UNICODE_LABEL : UPDESH_INPUT_LABEL;
  const targetLabel = isUniToUpdesh ? UPDESH_LABEL : UNICODE_OUTPUT_LABEL;
  const directionLabel = isUniToUpdesh
    ? 'Unicode → Updesh'
    : 'Updesh → Unicode';
  const swapAriaLabel = isUniToUpdesh
    ? 'Switch to Updesh to Unicode'
    : 'Switch to Unicode to Updesh';

  useEffect(() => {
    try {
      if (localStorage.getItem(BANNER_DISMISS_KEY) !== '1') {
        setBannerVisible(true);
      }
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setHistory(JSON.parse(raw) as HistoryItem[]);
    } catch {
      setBannerVisible(true);
    }
  }, []);

  const dismissBanner = useCallback(() => {
    setBannerVisible(false);
    try {
      localStorage.setItem(BANNER_DISMISS_KEY, '1');
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

  const requireOutput = useCallback((): boolean => {
    if (outputText.trim()) return true;
    showToast('Convert text first — paste above, then share or download.', true);
    return false;
  }, [outputText, showToast]);

  const pushHistory = useCallback(
    (src: string, tgt: string, dir: UpdeshConverterDirection) => {
      if (!src.trim() || !tgt.trim()) return;
      const item: HistoryItem = {
        id: `${Date.now()}`,
        source: src.slice(0, 120),
        target: tgt.slice(0, 120),
        direction: dir,
        at: Date.now(),
      };
      setHistory((prev) => {
        const sameAsLatest =
          prev[0] &&
          prev[0].source === item.source &&
          prev[0].target === item.target &&
          prev[0].direction === item.direction;
        if (sameAsLatest) return prev;
        const next = [item, ...prev].slice(0, 8);
        try {
          localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (!source.trim() || !outputText.trim()) return;
    const timer = window.setTimeout(() => {
      pushHistory(source, outputText, direction);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [source, outputText, direction, pushHistory]);

  const handleSwap = () => {
    const next: UpdeshConverterDirection = isUniToUpdesh
      ? 'updesh-to-unicode'
      : 'unicode-to-updesh';
    setDirection(next);
    setSource(outputText);
  };

  const handleCopy = async () => {
    if (!requireOutput()) return;
    try {
      await navigator.clipboard.writeText(outputText);
      pushHistory(source, outputText, direction);
      setCopied(true);
      showToast('Copied!');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy. Please select the text and copy manually.', true);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setSource(text);
      showToast('Pasted');
    } catch {
      showToast('Paste permission denied. Use Ctrl+V or ⌘V to paste.', true);
    }
  };

  const handleClear = () => {
    setSource('');
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
    if (!requireOutput()) return;
    flashDownload('txt', 'Downloading…', 'Downloaded!');
    downloadBlob(
      'unicodekruti-updesh-conversion.txt',
      new Blob([outputText], { type: 'text/plain;charset=utf-8' })
    );
  };

  const handleDownloadWord = () => {
    if (!requireOutput()) return;
    flashDownload('word', 'Downloading…', 'Downloaded!');
    void (async () => {
      try {
        const { downloadTextAsDocx } = await import('@/lib/converter/docx');
        await downloadTextAsDocx(outputText, {
          fontMode: isUniToUpdesh ? 'krutidev' : 'unicode',
          filename: 'unicodekruti-updesh-conversion.docx',
        });
      } catch {
        setDownloadLabel((prev) => {
          const next = { ...prev };
          delete next.word;
          return next;
        });
        showToast('Could not generate the Word file. Try Download as TXT instead.', true);
      }
    })();
  };

  const handleDownloadPdf = async () => {
    if (!requireOutput()) return;
    flashDownload('pdf', 'Generating PDF…', 'Downloaded!');
    try {
      const { downloadTextAsPdf } = await import('@/lib/converter/pdf');
      showToast('Generating PDF…');
      await downloadTextAsPdf(
        outputText,
        isUniToUpdesh ? 'krutidev' : 'unicode'
      );
      showToast('PDF downloaded');
    } catch {
      setDownloadLabel((prev) => {
        const next = { ...prev };
        delete next.pdf;
        return next;
      });
      showToast('Could not generate the PDF. Try Download as TXT instead.', true);
    }
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;
    try {
      if (file.size > 8 * 1024 * 1024) {
        showToast('File is larger than 8 MB', true);
        return;
      }
      if (
        file.type === 'application/pdf' ||
        file.name.toLowerCase().endsWith('.pdf')
      ) {
        const { extractTextFromPdf } = await import('@/lib/converter/pdf');
        showToast('Extracting PDF…');
        const text = await extractTextFromPdf(file);
        setSource(text);
        showToast('PDF text loaded');
        return;
      }
      const text = await file.text();
      setSource(text);
      showToast('File loaded');
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : 'Could not read that file',
        true
      );
    }
  };

  const handleWhatsApp = () => {
    if (!requireOutput()) return;
    let text = outputText;
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
    if (!requireOutput()) return;
    let body = outputText;
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
    if (isUniToUpdesh) {
      setSource(EXAMPLE_UNICODE);
    } else {
      setSource(EXAMPLE_UPDESH);
    }
  };

  return (
    <div
      id="updesh-converter-app"
      className="kdc-app-container"
      data-default-mode={direction}
    >
      {toast ? (
        <div
          className={`kdc-toast${toastIsError ? ' kdc-toast--error' : ''}`}
          role={toastIsError ? 'alert' : 'status'}
        >
          {toast}
        </div>
      ) : null}

      {bannerVisible ? (
        <aside
          className="kdc-save-prompt"
          role="status"
          aria-label="Font reminder"
        >
          <div className="kdc-save-prompt__body">
            <p className="kdc-save-prompt__text">
              Apply Kruti Dev 010 or Updesh font in MS Word after pasting —
              without the font, output shows as English letters. That is correct
              behavior.
            </p>
            <div className="kdc-save-prompt__actions">
              <button
                type="button"
                className="kdc-save-prompt__dismiss"
                onClick={dismissBanner}
                aria-label="Dismiss font reminder"
              >
                Dismiss
              </button>
            </div>
          </div>
        </aside>
      ) : null}

      <div className="kdc-controls">
        <div className="kdc-controls-left">
          <p className="kdc-live-status kdc-live-status--left" role="status">
            Direction: {directionLabel}
          </p>
        </div>
        <div className="kdc-controls-right">
          <p className="kdc-live-status" role="status">
            <span className="kdc-live-dot" aria-hidden="true" />
            {isConverting
              ? 'Converting…'
              : 'Live conversion — start typing or paste below. No Convert click needed.'}
          </p>
        </div>
      </div>

      <div className="kdc-main-grid">
        <div className="kdc-card" id="kdc-source-card">
          <div className="kdc-card-header">
            <div className="kdc-card-title">
              <span id="kdc-source-label">{sourceLabel}</span>
            </div>
            <div className="kdc-card-actions">
              <label
                className="kdc-btn-icon"
                title="Upload TXT or PDF"
                aria-label="Upload TXT or PDF"
              >
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                </svg>
              </label>
              <button
                type="button"
                className="kdc-btn-icon"
                title="Paste Content"
                aria-label="Paste content"
                onClick={() => void handlePaste()}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
              </button>
              <button
                type="button"
                className="kdc-btn-icon kdc-clear-btn"
                title="Clear"
                aria-label="Clear input"
                onClick={handleClear}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="kdc-textarea-wrapper">
            <textarea
              id="kdc-source-input"
              className={`converter-input ${
                isUniToUpdesh ? 'font-unicode' : 'font-krutidev'
              }`}
              placeholder={
                isUniToUpdesh
                  ? 'Type or paste Unicode text here...'
                  : 'Type or paste Updesh / KrutiDev text here...'
              }
              spellCheck={false}
              value={source}
              onChange={(e) => setSource(e.target.value)}
              aria-label={
                isUniToUpdesh
                  ? 'Unicode Hindi text input'
                  : 'Updesh or KrutiDev text input'
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
          <button
            type="button"
            className="kdc-swap-btn"
            title={swapAriaLabel}
            aria-label={swapAriaLabel}
            onClick={handleSwap}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8v12M17 20l4-4M17 20l-4-4" />
            </svg>
          </button>
        </div>

        <div className="kdc-card" id="kdc-target-card">
          <div className="kdc-card-header">
            <div className="kdc-card-title">
              <span id="kdc-target-label">{targetLabel}</span>
            </div>
            <div className="kdc-card-actions">
              <button
                type="button"
                className="kdc-btn-icon"
                title={copied ? 'Copied!' : 'Copy Result'}
                aria-label={
                  copied ? 'Copied to clipboard' : 'Copy converted text'
                }
                onClick={() => void handleCopy()}
              >
                {copied ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                className="kdc-btn-icon"
                title={downloadLabel.txt || 'Download TXT'}
                aria-label={
                  downloadLabel.txt || 'Download converted text as TXT'
                }
                onClick={handleDownloadTxt}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </button>
            </div>
          </div>
          <div className="kdc-textarea-wrapper">
            <textarea
              id="kdc-target-output"
              className={isUniToUpdesh ? 'font-krutidev' : 'font-unicode'}
              placeholder={
                isUniToUpdesh
                  ? 'Updesh / KrutiDev conversion will appear here...'
                  : 'Unicode conversion will appear here...'
              }
              spellCheck={false}
              value={outputText}
              readOnly
              aria-label={
                isUniToUpdesh
                  ? 'Updesh or KrutiDev output'
                  : 'Unicode Hindi output'
              }
              autoComplete="off"
            />
          </div>
          <div className="kdc-card-footer">
            <div className="kdc-stats">
              <span>{charCount}</span> Chars | <span>{wordCount}</span> Words
            </div>
          </div>
        </div>
      </div>

      <div
        className="kdc-share-row"
        role="group"
        aria-label="Share or download converted text"
      >
        <button
          type="button"
          className="kdc-action-btn kdc-btn-copy kdc-action-btn--primary"
          onClick={() => void handleCopy()}
          aria-label={copied ? 'Copied!' : 'Copy converted text'}
        >
          {copied ? 'Copied!' : 'Copy result'}
        </button>
        <button
          type="button"
          className="kdc-action-btn kdc-btn-whatsapp"
          onClick={handleWhatsApp}
          aria-label="Share converted text on WhatsApp"
        >
          WhatsApp
        </button>
        <button
          type="button"
          className="kdc-action-btn kdc-btn-gmail"
          onClick={handleGmail}
          aria-label="Share converted text by Gmail"
        >
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
        <button
          type="button"
          className="kdc-action-btn"
          onClick={() => void handleDownloadPdf()}
          aria-label="Download converted text as PDF"
        >
          {downloadLabel.pdf || 'PDF'}
        </button>
        <button
          type="button"
          className="kdc-action-btn"
          onClick={handleDownloadTxt}
          aria-label="Download converted text as TXT"
        >
          {downloadLabel.txt || 'TXT'}
        </button>
      </div>

      <section className="kdc-history-section">
        <div className="kdc-history-header">
          <h2 className="kdc-history-title">Recent Conversions</h2>
          <button
            type="button"
            className="kdc-btn-text"
            onClick={clearHistory}
            aria-label="Clear all recent conversions"
          >
            Clear All
          </button>
        </div>
        <div className="kdc-history-list" aria-live="polite">
          {history.length === 0 ? (
            <p className="kdc-history-empty">No recent conversions found</p>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                type="button"
                className="kdc-history-item"
                onClick={() => {
                  setDirection(item.direction);
                  setSource(item.source);
                }}
                aria-label="Restore this conversion"
              >
                <span className="kdc-history-preview">
                  {item.source} → {item.target}
                </span>
                <span className="kdc-history-meta">
                  <span className="kdc-history-mode">
                    {item.direction === 'unicode-to-updesh'
                      ? 'Unicode → Updesh'
                      : 'Updesh → Unicode'}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      </section>

      <div className="try-example-bar">
        <button
          type="button"
          className="btn-try-example"
          onClick={loadExample}
          aria-label="Try the converter with an example Hindi phrase"
        >
          Try an example:{' '}
          <span lang="hi" dir="ltr">
            नमस्ते भारत
          </span>{' '}
          →
        </button>
      </div>

      <div className="stats-bar" aria-label="Tool stats">
        <div className="stat-item">
          <span className="stat-value">Live</span>
          <span className="stat-label">Real-Time Conversion</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">KD 010</span>
          <span className="stat-label">Remington map</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">6</span>
          <span className="stat-label">Browsers Supported</span>
        </div>
      </div>
    </div>
  );
}
