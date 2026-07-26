'use client';

import { useEffect, useRef, useState } from 'react';
import { REMINGTON_ROWS } from '@/lib/keyboard';

export default function FloatingWidgets() {
  const [kbdOpen, setKbdOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('');
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
      <div id="floating-download-widget">
        <span className="floating-download-label">Download KrutiDev 010 Font</span>
        <a
          href="/fonts/KrutiDev010.ttf"
          download="KrutiDev010.ttf"
          id="floating-download-trigger"
          title="Download KrutiDev Font"
          aria-label="Download KrutiDev Font"
        >
          ↓
        </a>
      </div>

      <div
        id="floating-kbd-widget"
        className={`floating-kbd${kbdOpen ? ' floating-kbd-open' : ' floating-kbd-closed'}`}
      >
        <span className="floating-kbd-label">KrutiDev Keyboard</span>
        <button
          type="button"
          id="floating-kbd-trigger"
          className="floating-kbd-trigger"
          aria-label="Open Remington typing helper"
          aria-expanded={kbdOpen}
          title="Open Remington Typing Helper"
          onClick={() => setKbdOpen((v) => !v)}
        >
          ⌨
        </button>
        {kbdOpen ? (
          <div
            id="floating-kbd-panel"
            className="floating-kbd-panel glass-card"
            role="dialog"
            aria-modal="true"
            aria-label="Remington Keyboard Map"
          >
            <div className="kbd-panel-header">
              <span>Remington Keyboard Map</span>
              <button
                ref={closeRef}
                type="button"
                className="floating-kbd-close"
                onClick={() => setKbdOpen(false)}
                aria-label="Close"
                title="Minimize"
              >
                ×
              </button>
            </div>
            <div className="kbd-panel-body">
              {REMINGTON_ROWS.map((row, rowIndex) => (
                <div className="kbd-row" key={rowIndex}>
                  {row.map((item) => (
                    <kbd
                      key={item.key}
                      data-key={item.key}
                      className={activeKey === item.key ? 'is-active' : undefined}
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
        ) : null}
      </div>
    </>
  );
}
