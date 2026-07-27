'use client';

import { useCallback, useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const IOS_DISMISS_KEY = 'uk_ios_a2hs_dismissed_v1';

function isIosDevice() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(ua);
  const iPadOs = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
  return iOS || iPadOs;
}

function isStandaloneDisplay() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

/**
 * Android Chrome: triggers deferred beforeinstallprompt.
 * iOS Safari: shows Add to Home Screen instructions (no programmatic install API).
 */
export default function PwaInstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosBanner, setShowIosBanner] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (isStandaloneDisplay()) {
      setInstalled(true);
      return;
    }

    setIsIos(isIosDevice());

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
      setShowIosBanner(false);
    };

    window.addEventListener('beforeinstallprompt', onBip);
    window.addEventListener('appinstalled', onInstalled);

    if (isIosDevice()) {
      try {
        if (localStorage.getItem(IOS_DISMISS_KEY) !== '1') {
          setShowIosBanner(true);
        }
      } catch {
        setShowIosBanner(true);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBip);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const installAndroid = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    try {
      await deferred.userChoice;
    } catch {
      /* ignore */
    }
    setDeferred(null);
  }, [deferred]);

  const dismissIos = useCallback(() => {
    setShowIosBanner(false);
    try {
      localStorage.setItem(IOS_DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  if (!ready || installed) return null;
  if (!deferred && !isIos) return null;

  return (
    <>
      {deferred ? (
        <button
          type="button"
          className="pwa-install-btn"
          onClick={() => void installAndroid()}
          aria-label="Install UnicodeKruti app"
        >
          Install App
        </button>
      ) : null}

      {!deferred && isIos ? (
        <button
          type="button"
          className="pwa-install-btn pwa-install-btn--ghost"
          onClick={() => setShowIosBanner(true)}
          aria-label="How to install UnicodeKruti on iPhone"
        >
          Install App
        </button>
      ) : null}

      {showIosBanner && isIos ? (
        <div className="pwa-ios-banner" role="dialog" aria-label="Add UnicodeKruti to Home Screen">
          <div className="pwa-ios-banner__inner">
            <p className="pwa-ios-banner__title">Install UnicodeKruti on iPhone / iPad</p>
            <ol className="pwa-ios-banner__steps">
              <li>
                Tap the <strong>Share</strong> button in Safari
              </li>
              <li>
                Scroll and tap <strong>Add to Home Screen</strong>
              </li>
              <li>
                Tap <strong>Add</strong> to install
              </li>
            </ol>
            <button type="button" className="pwa-ios-banner__dismiss" onClick={dismissIos}>
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
