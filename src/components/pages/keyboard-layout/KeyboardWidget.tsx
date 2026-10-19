'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  KEYBOARD_ROWS,
  MAPPING_META,
  chordLabel,
  codePoints,
  layerOf,
  plainLabel,
  type KeyLayer,
} from '@/lib/keyboard-map';

const BEHAVIOR_NOTE: Record<string, string> = {
  'before-consonant':
    'Context key: in the stored text it comes before the consonant it belongs to (type f, then d, for कि).',
  'after-consonant': 'Context key: added after the consonant it joins (type d, then z, for क्र).',
  'after-letter': 'Context key: stored after the letter it sits above (type d, then Z, for र्क).',
};

function ariaLabel(layer: KeyLayer): string {
  if (layer.status === 'unresolved') return `${chordLabel(layer)}: unresolved, no output published`;
  return `${chordLabel(layer)}: ${layer.name}`;
}

function DetailCopy({ value, what }: { value: string; what: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  return (
    <button
      type="button"
      className="kbd-copy kbd-copy--compact"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
      aria-label={`Copy ${what}: ${value}`}
      title={`Copy ${what}`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

/**
 * Interactive Kruti Dev 010 keyboard. All data comes from `@/lib/keyboard-map`
 * (the same source as the crawlable tables and the PDF).
 */
export default function KeyboardWidget() {
  const [shiftToggle, setShiftToggle] = useState(false);
  const [shiftHeld, setShiftHeld] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const panelId = useId();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShiftHeld(true);
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShiftHeld(false);
    };
    const reset = () => setShiftHeld(false);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', reset);
    };
  }, []);

  const shiftOn = shiftToggle || shiftHeld;
  const selectedKey = KEYBOARD_ROWS.flat().find((k) => k.id === selectedId) ?? null;
  const selected = selectedKey ? layerOf(selectedKey, shiftOn) : null;

  return (
    <div className="kbd-widget glass-card" data-shift={shiftOn ? 'on' : 'off'}>
      <div className="kbd-toolbar">
        <button
          type="button"
          className="kbd-shift"
          aria-pressed={shiftOn}
          onClick={() => setShiftToggle((v) => !v)}
        >
          Shift
          <span className="kbd-shift__state">{shiftOn ? 'on' : 'off'}</span>
        </button>
        <p className="kbd-layer-name" aria-hidden="true">
          {shiftOn ? 'Shift layer' : 'Normal layer'}
        </p>
      </div>

      <div id={panelId} className="kbd-detail" role="status" aria-live="polite" aria-atomic="true">
        {selected ? (
          <>
            <dl className="kbd-detail__grid">
              <div>
                <dt>Keyboard key label</dt>
                <dd className="kbd-detail__dd">
                  <kbd>{chordLabel(selected)}</kbd>
                  <DetailCopy value={chordLabel(selected)} what="keyboard key label" />
                </dd>
              </div>
              <div>
                <dt>Legacy stored character</dt>
                <dd className="kbd-detail__dd">
                  <kbd>{selected.stored}</kbd>
                  <DetailCopy value={selected.stored} what="legacy stored character" />
                </dd>
              </div>
              <div>
                <dt>Unicode Devanagari</dt>
                <dd className="kbd-detail__dd">
                  {selected.unicode === null ? (
                    <span>Unresolved</span>
                  ) : (
                    <>
                      <span className="kbd-detail__dev" lang="hi" dir="ltr">
                        {selected.label}
                      </span>{' '}
                      <span className="kbd-detail__cp">{codePoints(plainLabel(selected.unicode))}</span>
                      <DetailCopy value={selected.unicode} what="Unicode character" />
                    </>
                  )}
                </dd>
              </div>
            </dl>
            <p className="kbd-detail__name">{selected.name}</p>
            {selected.behavior !== 'plain' ? (
              <p className="kbd-detail__warn">{BEHAVIOR_NOTE[selected.behavior]}</p>
            ) : null}
            <p className="kbd-detail__status">
              {selected.status === 'unresolved'
                ? 'Status: unresolved. No output is published for this key.'
                : 'Status: decoder-derived. Not tested on a physical keyboard.'}
            </p>
          </>
        ) : (
          <p className="kbd-detail__hint">
            Click or tap a key to see its stored character and Unicode label.
          </p>
        )}
      </div>

      <div className="kbd-scroll" role="group" aria-label="Kruti Dev 010 keyboard, Remington layout">
        <div className="kbd-board">
          {KEYBOARD_ROWS.map((row, r) => (
            <div className={`kbd-row kbd-row--${r}`} key={r}>
              {row.map((key) => {
                const layer = layerOf(key, shiftOn);
                const isSelected = selectedId === key.id;
                const flags = [
                  layer.status === 'unresolved' ? 'is-unresolved' : '',
                  layer.behavior !== 'plain' ? 'is-context' : '',
                  isSelected ? 'is-selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <button
                    type="button"
                    key={key.id}
                    className={`kbd-key ${flags}`}
                    aria-pressed={isSelected}
                    aria-label={ariaLabel(layer)}
                    aria-controls={panelId}
                    onClick={() => setSelectedId(key.id)}
                  >
                    <span className="kbd-key__phys" aria-hidden="true">
                      {layer.stored}
                    </span>
                    <span className="kbd-key__dev" lang="hi" dir="ltr" aria-hidden="true">
                      {layer.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="kbd-legend" aria-hidden="true">
        <span>
          <i className="kbd-swatch kbd-swatch--context" /> context key (f, z, Z)
        </span>
        <span>
          <i className="kbd-swatch kbd-swatch--unresolved" /> unresolved
        </span>
      </div>


      <p className="kbd-foot">
        Mapping: {MAPPING_META.status}. Shift+4 and Shift+5 are left unresolved.
      </p>
    </div>
  );
}
