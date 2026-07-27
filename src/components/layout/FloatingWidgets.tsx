'use client';

import { useEffect, useRef, useState } from 'react';
import { REMINGTON_ROWS } from '@/lib/keyboard';

export default function FloatingWidgets() {
  const [kbdOpen, setKbdOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('');
  const [showDlLabel, setShowDlLabel] = useState(false);
  const [showKbdLabel, setShowKbdLabel] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setKbdOpen(false);
      if (!kbdOpen) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      setActiveKey(key);
    };
    const onKeyUp = () => setActiveKey('');
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [kbdOpen]);

  useEffect(() => {
    if (kbdOpen) closeRef.current?.focus();
  }, [kbdOpen]);

  return (
    <>
      <div
        id="floating-download-widget"
        onMouseEnter={() => setShowDlLabel(true)}
        onMouseLeave={() => setShowDlLabel(false)}
      >
        <span
          id="floating-download-label"
          className={`floating-download-label${showDlLabel ? ' label-active' : ''}`}
        >
          Download KrutiDev 010 Font
        </span>
        <a
          href="/font-download"
          id="floating-download-trigger"
          title="KrutiDev Font Download"
          aria-label="Open KrutiDev font download page"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
      </div>

      <div
        id="floating-kbd-widget"
        className={kbdOpen ? 'floating-kbd-open' : 'floating-kbd-closed'}
        onMouseEnter={() => setShowKbdLabel(true)}
        onMouseLeave={() => setShowKbdLabel(false)}
      >
        <span
          id="floating-kbd-label"
          className={`floating-kbd-label${showKbdLabel && !kbdOpen ? ' label-active' : ''}`}
        >
          KrutiDev Keyboard
        </span>
        <button
          type="button"
          id="floating-kbd-trigger"
          title="Open Remington Typing Helper"
          aria-label="Open Remington keyboard layout helper"
          aria-expanded={kbdOpen}
          onClick={() => setKbdOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10" />
          </svg>
        </button>

        <div
          id="floating-kbd-panel"
          className="glass-card"
          role="application"
          aria-label="KrutiDev Remington keyboard layout reference"
          hidden={!kbdOpen}
        >
          <div className="kbd-panel-header">
            <span>Remington Keyboard Map</span>
            <button
              ref={closeRef}
              type="button"
              id="floating-kbd-close"
              title="Minimize"
              aria-label="Close keyboard panel"
              onClick={() => setKbdOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="kbd-panel-body">
            {REMINGTON_ROWS.map((row, rowIndex) => (
              <div className="kbd-row" key={rowIndex}>
                {row.map((item) => (
                  <kbd
                    key={item.key}
                    data-key={item.key}
                    className={activeKey === item.key ? 'active' : undefined}
                  >
                    {item.key} <span>{item.label}</span>
                  </kbd>
                ))}
              </div>
            ))}
          </div>
          <div className="kbd-panel-footer">
            <span>Press keys on your keyboard to highlight Remington maps!</span>
          </div>
        </div>
      </div>
    </>
  );
}
