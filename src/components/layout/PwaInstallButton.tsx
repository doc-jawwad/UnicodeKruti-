'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { track } from '@/lib/analytics/track';
import { shouldSuppressPwaNotice } from '@/lib/pwa/install-notice';

type PromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};
type Platform = 'ios' | 'android' | 'desktop' | 'other';
type EntryPoint = 'header' | 'notice';
const DISMISSED = 'uk_pwa_notice_dismissed_at_v1';
const SEEN = 'uk_pwa_notice_shown_session_v1';
const INSTALLED = 'uk_pwa_installed_v1';
const PREVIOUS_IOS_DISMISSAL = 'uk_ios_a2hs_dismissed_v1';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  const ipad = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/.test(ua) || ipad) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/(Windows|Macintosh|Linux)/.test(ua) && /(Chrome|Chromium|Edg)\//.test(ua)) return 'desktop';
  return 'other';
}
function standalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
}
function editing() {
  return document.activeElement instanceof HTMLElement &&
    document.activeElement.matches('input, textarea, [contenteditable="true"], [role="textbox"]');
}
function footerShortcutVisible() {
  if (window.innerWidth > 768) return false;
  const node = document.getElementById('floating-widgets-bar');
  if (!node) return false;
  const rect = node.getBoundingClientRect();
  return rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0;
}

/** Shared header control + optional engagement notice; no automatic install prompts. */
export default function PwaInstallButton() {
  const [ready, setReady] = useState(false);
  const [platform, setPlatform] = useState<Platform>('other');
  const [promptEvent, setPromptEvent] = useState<PromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [qualified, setQualified] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [instructions, setInstructions] = useState(false);
  const [busy, setBusy] = useState(false);
  const suppressRef = useRef(false);
  const seenRef = useRef(false);
  const completedRef = useRef(false);

  const event = useCallback((
    name: 'pwa_notice_shown' | 'pwa_notice_dismissed' | 'pwa_install_clicked',
    source: EntryPoint,
  ) => {
    track(name, { tool_name: 'pwa_install', pwa_platform: platform, pwa_source: source });
  }, [platform]);

  const snooze = useCallback(() => {
    suppressRef.current = true;
    setNoticeOpen(false);
    try { localStorage.setItem(DISMISSED, String(Date.now())); } catch { /* blocked storage */ }
  }, []);

  const dismiss = useCallback(() => {
    if (noticeOpen) event('pwa_notice_dismissed', 'notice');
    snooze();
  }, [event, noticeOpen, snooze]);

  useEffect(() => {
    const p = detectPlatform();
    setPlatform(p);
    setReady(true);
    if (standalone()) { setInstalled(true); return; }
    try {
      if (localStorage.getItem(INSTALLED) === '1') { setInstalled(true); return; }
      if (localStorage.getItem(PREVIOUS_IOS_DISMISSAL) === '1') {
        localStorage.setItem(DISMISSED, String(Date.now()));
        localStorage.removeItem(PREVIOUS_IOS_DISMISSAL);
      }
      const at = localStorage.getItem(DISMISSED);
      suppressRef.current = shouldSuppressPwaNotice(at ? Number(at) : null, Date.now());
      seenRef.current = sessionStorage.getItem(SEEN) === '1';
    } catch { /* storage can be unavailable */ }

    const onPrompt = (e: Event) => { e.preventDefault(); setPromptEvent(e as PromptEvent); };
    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
      setNoticeOpen(false);
      setInstructions(false);
      setBusy(false);
      try { localStorage.setItem(INSTALLED, '1'); } catch { /* storage unavailable */ }
      track('pwa_install_confirmed', { tool_name: 'pwa_install', pwa_platform: p, pwa_source: 'browser' });
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  useEffect(() => {
    let activeMs = 0;
    let lastTick = Date.now();
    let lastInteraction = 0;
    const onInteraction = () => {
      lastInteraction = Date.now();
      if (editing()) setNoticeOpen(false);
    };
    const onFocusIn = () => { if (editing()) setNoticeOpen(false); };
    const onScroll = () => { if (footerShortcutVisible()) setNoticeOpen(false); };
    const onConversion = () => { completedRef.current = true; };
    const tick = () => {
      const now = Date.now();
      if (document.visibilityState === 'visible' &&
          lastInteraction !== 0 && now - lastInteraction <= 12000) {
        activeMs += Math.min(now - lastTick, 2000);
      }
      lastTick = now;
      if (activeMs >= 30000) completedRef.current = true;
      if (completedRef.current && document.visibilityState === 'visible' &&
          now - lastInteraction >= 4000 && !editing() && !footerShortcutVisible()) {
        setQualified(true);
      }
    };
    window.addEventListener('pointerdown', onInteraction, { passive: true });
    window.addEventListener('keydown', onInteraction);
    document.addEventListener('focusin', onFocusIn);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('unicodekruti:conversion-complete', onConversion);
    const timer = window.setInterval(tick, 1500);
    return () => {
      window.removeEventListener('pointerdown', onInteraction);
      window.removeEventListener('keydown', onInteraction);
      document.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('unicodekruti:conversion-complete', onConversion);
      window.clearInterval(timer);
    };
  }, []);

  const eligible = Boolean(promptEvent) || platform === 'ios' || platform === 'desktop';

  useEffect(() => {
    if (!ready || installed || !eligible || !qualified || suppressRef.current || seenRef.current) return;
    if (editing() || footerShortcutVisible() || document.visibilityState !== 'visible') return;
    seenRef.current = true;
    setNoticeOpen(true);
    try { sessionStorage.setItem(SEEN, '1'); } catch { /* blocked storage */ }
    event('pwa_notice_shown', 'notice');
  }, [ready, installed, eligible, qualified, event]);

  const startInstall = useCallback(async (source: EntryPoint) => {
    if (installed || busy) return;
    event('pwa_install_clicked', source);
    setNoticeOpen(false);
    seenRef.current = true;
    try { sessionStorage.setItem(SEEN, '1'); } catch { /* blocked storage */ }
    if (!promptEvent) { setInstructions(true); return; }
    setBusy(true);
    try {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === 'dismissed') snooze();
    } catch {
      setInstructions(true);
    } finally {
      setPromptEvent(null);
      setBusy(false);
    }
  }, [busy, installed, event, promptEvent, snooze]);

  useEffect(() => {
    if (!instructions) return;
    const onEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setInstructions(false); };
    window.addEventListener('keydown', onEscape);
    document.getElementById('uk-pwa-guide-close')?.focus();
    return () => window.removeEventListener('keydown', onEscape);
  }, [instructions]);

  if (!ready || installed) return null;

  const overlays = (
    <>
      {noticeOpen && eligible && !instructions && (
        <aside className="uk-pwa-notice" role="region" aria-label="Install UnicodeKruti app">
          <button type="button" className="uk-pwa-notice__close" onClick={dismiss} aria-label="Dismiss install suggestion">×</button>
          <div className="uk-pwa-notice__content">
            <Image src="/icons/icon-192x192.png" alt="" width={48} height={48} className="uk-pwa-notice__icon" />
            <div>
              <p className="uk-pwa-notice__title">Use UnicodeKruti like an app</p>
              <p className="uk-pwa-notice__desc">Quick access to Hindi converters and keyboard tools from your home screen.</p>
            </div>
          </div>
          <div className="uk-pwa-notice__actions">
            <button type="button" className="uk-pwa-notice__install" disabled={busy} onClick={() => void startInstall('notice')}>
              {promptEvent ? 'Install Free App' : platform === 'ios' ? 'Add to Home Screen' : 'How to Install'}
            </button>
            <button type="button" className="uk-pwa-notice__later" onClick={dismiss}>Not now</button>
          </div>
        </aside>
      )}
      {instructions && (
        <div className="uk-pwa-guide-backdrop">
          <section className="uk-pwa-guide" role="dialog" aria-modal="true" aria-labelledby="uk-pwa-guide-title">
            <button type="button" id="uk-pwa-guide-close" className="uk-pwa-notice__close" onClick={() => setInstructions(false)} aria-label="Close installation instructions">×</button>
            <h2 id="uk-pwa-guide-title">Add UnicodeKruti to your device</h2>
            {platform === 'ios' ? (
              <ol>
                <li>Open this website in Safari.</li>
                <li>Tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.</li>
                <li>Tap <strong>Add</strong> to finish.</li>
              </ol>
            ) : (
              <ol>
                <li>Open your browser menu (usually <strong>⋮</strong> or <strong>⋯</strong>).</li>
                <li>Choose <strong>Install UnicodeKruti</strong>, <strong>Install page as app</strong>, or <strong>Apps → Install this site as an app</strong> (wording varies).</li>
                <li>Confirm the installation.</li>
              </ol>
            )}
            <button type="button" className="uk-pwa-guide__done" onClick={() => { setInstructions(false); snooze(); }}>Got it</button>
          </section>
        </div>
      )}
    </>
  );

  return (
    <>
      {eligible && (
        <button type="button" className="pwa-install-btn" disabled={busy} aria-label="Install UnicodeKruti app" onClick={() => void startInstall('header')}>
          Install App
        </button>
      )}
      {createPortal(overlays, document.body)}
    </>
  );
}
