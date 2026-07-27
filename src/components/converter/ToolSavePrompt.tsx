'use client';

import { useCallback, useEffect, useState } from 'react';

const DISMISS_KEY = 'kdc_save_prompt_dismissed_v1';
const USED_KEY = 'kdc_tool_used_v1';

type ToolSavePromptProps = {
  /** When true, user has completed at least one conversion this session. */
  hasConverted: boolean;
  toolName?: string;
};

/**
 * UX-02 — Subtle bookmark / share prompt after first successful conversion.
 */
export default function ToolSavePrompt({
  hasConverted,
  toolName = 'this tool',
}: ToolSavePromptProps) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarkHint, setBookmarkHint] = useState('');

  useEffect(() => {
    if (!hasConverted) return;
    try {
      if (localStorage.getItem(DISMISS_KEY) === '1') return;
      localStorage.setItem(USED_KEY, '1');
      setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [hasConverted]);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  const copyLink = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, []);

  const showBookmarkTip = useCallback(() => {
    const isMac =
      typeof navigator !== 'undefined' &&
      /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
    setBookmarkHint(
      isMac
        ? 'Press ⌘ + D to bookmark this page in your browser.'
        : 'Press Ctrl + D to bookmark this page in your browser.'
    );
  }, []);

  if (!visible) return null;

  return (
    <aside className="kdc-save-prompt" aria-label="Save or share this tool" role="status">
      <div className="kdc-save-prompt__body">
        <p className="kdc-save-prompt__text">
          Useful? Bookmark {toolName} or copy the link so you can return anytime — free, no signup.
        </p>
        {bookmarkHint ? <p className="kdc-save-prompt__hint">{bookmarkHint}</p> : null}
        <div className="kdc-save-prompt__actions">
          <button type="button" className="kdc-save-prompt__btn" onClick={showBookmarkTip}>
            Bookmark this tool
          </button>
          <button type="button" className="kdc-save-prompt__btn kdc-save-prompt__btn--primary" onClick={() => void copyLink()}>
            {copied ? 'Link copied' : 'Share this tool'}
          </button>
          <button type="button" className="kdc-save-prompt__dismiss" onClick={dismiss} aria-label="Dismiss">
            Not now
          </button>
        </div>
      </div>
    </aside>
  );
}
