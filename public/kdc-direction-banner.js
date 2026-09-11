// kdc-direction-banner.js
// Fix: show a visible banner when auto-detect silently flips the converter direction
// Drop into Next.js as: <Script src="/kdc-direction-banner.js" strategy="afterInteractive" />

(function () {
  'use strict';

  function init() {
    // Don't double-inject
    if (document.getElementById('kdc-direction-banner')) return;

    const mainGrid = document.querySelector('.kdc-main-grid');
    const sourceCard = document.getElementById('kdc-source-card');
    if (!mainGrid || !sourceCard) return;

    const titleEl = sourceCard.querySelector('.kdc-card-title span');
    if (!titleEl) return;

    // ── Styles ────────────────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
      #kdc-direction-banner {
        display: none;
        align-items: center;
        gap: 10px;
        background: #fff7ed;
        border: 1.5px solid #f97316;
        border-radius: 8px;
        padding: 10px 14px;
        margin-bottom: 12px;
        font-size: 13.5px;
        color: #7c2d12;
        animation: kdcBannerIn 0.22s ease;
      }
      #kdc-direction-banner.visible { display: flex; }
      @keyframes kdcBannerIn {
        from { opacity: 0; transform: translateY(-5px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      #kdc-direction-banner .kdc-b-icon { font-size: 16px; flex-shrink: 0; }
      #kdc-direction-banner .kdc-b-msg  { flex: 1; font-weight: 500; line-height: 1.4; }
      #kdc-direction-banner .kdc-b-dir  { font-weight: 700; color: #ea580c; }
      #kdc-direction-banner .kdc-b-undo {
        background: #ea580c; color: #fff; border: none;
        border-radius: 6px; padding: 4px 14px;
        font-size: 12.5px; font-weight: 600; cursor: pointer;
        white-space: nowrap; transition: background .15s;
      }
      #kdc-direction-banner .kdc-b-undo:hover { background: #c2410c; }
      #kdc-direction-banner .kdc-b-close {
        background: none; border: none; color: #9a3412;
        font-size: 18px; cursor: pointer; padding: 0 0 0 4px;
        line-height: 1; opacity: .7;
      }
      #kdc-direction-banner .kdc-b-close:hover { opacity: 1; }
    `;
    document.head.appendChild(style);

    // ── Banner HTML ───────────────────────────────────────────
    const banner = document.createElement('div');
    banner.id = 'kdc-direction-banner';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = `
      <span class="kdc-b-icon" aria-hidden="true">&#128260;</span>
      <span class="kdc-b-msg">
        Direction auto-switched to <span class="kdc-b-dir" id="kdc-b-dir-text"></span>
      </span>
      <button type="button" class="kdc-b-undo" id="kdc-b-undo">Undo</button>
      <button type="button" class="kdc-b-close" id="kdc-b-close" aria-label="Dismiss">&times;</button>
    `;
    mainGrid.parentElement.insertBefore(banner, mainGrid);

    // ── Helpers ───────────────────────────────────────────────
    const show = (dir) => {
      document.getElementById('kdc-b-dir-text').textContent = dir;
      banner.classList.add('visible');
    };
    const hide = () => banner.classList.remove('visible');

    // ── Undo: disable auto-detect → swap back ─────────────────
    document.getElementById('kdc-b-undo').addEventListener('click', () => {
      const cb = document.querySelector('input[aria-label="Auto-detect encoding"]');
      if (cb && cb.checked) cb.click(); // turn off so swap sticks
      const swap = document.querySelector('.kdc-swap-btn');
      if (swap) swap.click();
      hide();
    });

    document.getElementById('kdc-b-close').addEventListener('click', hide);

    // ── Watch source-card title for direction changes ─────────
    let lastTitle = titleEl.textContent.trim();

    const obs = new MutationObserver(() => {
      const cur = titleEl.textContent.trim();
      if (cur === lastTitle) return;
      lastTitle = cur;
      const dir = /KrutiDev/i.test(cur)
        ? 'KrutiDev → Unicode (Mangal)'
        : 'Unicode (Mangal) → KrutiDev';
      show(dir);
    });

    obs.observe(titleEl, { characterData: true, childList: true, subtree: true });
    const cardTitle = sourceCard.querySelector('.kdc-card-title');
    if (cardTitle) {
      obs.observe(cardTitle, { childList: true, subtree: true });
    }
  }

  // Wait for React hydration — poll until the widget is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 500));
  } else {
    setTimeout(init, 500);
  }
})();
