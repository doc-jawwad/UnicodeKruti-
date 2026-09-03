'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  countChars,
  countWords,
} from '@/lib/converter/engine';
import {
  useUpdeshConverter,
  type UpdeshConverterDirection,
} from '@/lib/hooks/useUpdeshConverter';
import '@/components/converter/converter.css';

const BANNER_DISMISS_KEY = 'updesh_font_banner_dismissed_v1';

const UNICODE_LABEL = 'Unicode Hindi Input (Mangal, Nirmala UI, Kokila)';
const UPDESH_LABEL = 'Updesh / KrutiDev Output';
const UNICODE_OUTPUT_LABEL = 'Unicode Hindi Output (Mangal, Nirmala UI, Kokila)';
const UPDESH_INPUT_LABEL = 'Updesh / KrutiDev Input';

/**
 * Unicode ↔ Updesh / KrutiDev 010 conversion tool UI.
 * Styling reuses the homepage converter (`kdc-*`) classes — no separate theme.
 */
export default function UpdeshConverter() {
  const [direction, setDirection] =
    useState<UpdeshConverterDirection>('unicode-to-updesh');
  const [source, setSource] = useState('');
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState('');
  const [bannerVisible, setBannerVisible] = useState(false);

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
      if (localStorage.getItem(BANNER_DISMISS_KEY) === '1') return;
    } catch {
      /* ignore */
    }
    setBannerVisible(true);
  }, []);

  const dismissBanner = useCallback(() => {
    setBannerVisible(false);
    try {
      localStorage.setItem(BANNER_DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 2200);
  }, []);

  const handleSwap = () => {
    const next: UpdeshConverterDirection = isUniToUpdesh
      ? 'updesh-to-unicode'
      : 'unicode-to-updesh';
    setDirection(next);
    setSource(outputText);
  };

  const handleCopy = async () => {
    if (!outputText.trim()) {
      showToast('Paste some text above to convert');
      return;
    }
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      showToast('Copied!');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Could not copy. Please select the text and copy manually.');
    }
  };

  const handleClear = () => {
    setSource('');
  };

  return (
    <div
      id="updesh-converter-app"
      className="kdc-app-container"
      data-default-mode={direction}
    >
      {toast ? (
        <div className="kdc-toast" role="status">
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
                aria-label={copied ? 'Copied to clipboard' : 'Copy converted text'}
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
        aria-label="Copy or clear converted text"
      >
        <button
          type="button"
          className="kdc-action-btn kdc-btn-copy kdc-action-btn--primary"
          onClick={() => void handleCopy()}
          aria-label={copied ? 'Copied to clipboard' : 'Copy converted text'}
        >
          {copied ? '✓ Copied!' : 'Copy result'}
        </button>
        <button
          type="button"
          className="kdc-action-btn"
          onClick={handleClear}
          aria-label="Clear all text"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
