'use client';

import { useEffect, useRef, useState } from 'react';
import { chordLabel, searchKeys, type KeyLayer } from '@/lib/keyboard-map';

type CopyKind = 'key-label' | 'stored' | 'unicode';

function CopyButton({
  value,
  kind,
  shortLabel,
}: {
  value: string;
  kind: CopyKind;
  /** Visible button text (short). */
  shortLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const kindPhrase =
    kind === 'key-label'
      ? 'keyboard key label'
      : kind === 'stored'
        ? 'legacy stored character'
        : 'Unicode character';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className="kbd-copy"
      onClick={copy}
      aria-label={`Copy ${kindPhrase}: ${value}`}
      title={`Copy ${kindPhrase}`}
    >
      {copied ? 'Copied!' : shortLabel}
    </button>
  );
}

function ResultRow({ layer }: { layer: KeyLayer }) {
  const keyLabel = chordLabel(layer);
  const storedDiffers = layer.stored !== keyLabel;

  return (
    <li className="kbd-search__item">
      <div className="kbd-search__meta">
        <span className="kbd-search__dev" lang="hi" dir="ltr">
          {layer.label}
        </span>
        <span className="kbd-search__name">
          {layer.name}
          {layer.behavior !== 'plain' ? ' (context key)' : ''}
        </span>
      </div>

      <div className="kbd-search__copies" role="group" aria-label="Copy options for this key">
        <div className="kbd-search__copy-row">
          <span className="kbd-search__field-label">Keyboard key</span>
          <kbd className="kbd-search__chord">{keyLabel}</kbd>
          <CopyButton value={keyLabel} kind="key-label" shortLabel="Copy key" />
        </div>

        <div className="kbd-search__copy-row">
          <span className="kbd-search__field-label">
            Legacy stored{storedDiffers ? '' : ' (same as key)'}
          </span>
          <kbd className="kbd-search__stored">{layer.stored}</kbd>
          <CopyButton value={layer.stored} kind="stored" shortLabel="Copy stored" />
        </div>

        {layer.unicode !== null ? (
          <div className="kbd-search__copy-row">
            <span className="kbd-search__field-label">Unicode</span>
            <span className="kbd-search__uni" lang="hi" dir="ltr">
              {layer.unicode}
            </span>
            <CopyButton value={layer.unicode} kind="unicode" shortLabel="Copy Unicode" />
          </div>
        ) : (
          <p className="kbd-search__unresolved">Unresolved — no Unicode output to copy.</p>
        )}
      </div>
    </li>
  );
}

/** Search the key chart by Hindi character, Latin key or Roman Hindi word. */
export default function KeySearch() {
  const [query, setQuery] = useState('');
  const hits = searchKeys(query);
  const trimmed = query.trim();

  return (
    <div className="kbd-search glass-card">
      <label className="kbd-search__label" htmlFor="kbd-search-input">
        Search the key chart
      </label>
      <input
        id="kbd-search-input"
        type="search"
        className="kbd-search__input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try क, d, Shift+D, f, z, Z, ka, reph or halant"
        autoComplete="off"
        spellCheck={false}
        aria-describedby="kbd-search-help"
      />
      <p id="kbd-search-help" className="kbd-search__help">
        Search by Hindi character, by key, or by a word such as ka, matra or
        halant. Copy buttons are separate for the keyboard-key label, the legacy
        stored character, and the Unicode character.
      </p>

      <p className="kbd-search__count" role="status" aria-live="polite">
        {trimmed
          ? hits.length
            ? `${hits.length} ${hits.length === 1 ? 'match' : 'matches'}`
            : 'No match. Try another spelling or the Hindi character.'
          : ''}
      </p>

      {hits.length ? (
        <ul className="kbd-search__list">
          {hits.map(({ layer }) => (
            <ResultRow key={`${layer.layer}-${layer.stored}`} layer={layer} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}
