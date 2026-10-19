import Link from 'next/link';

/** Shared shortcuts: one full keyboard reference, no duplicate popup or JS listeners. */
export default function FloatingWidgets() {
  return (
    <div id="floating-widgets-bar" className="floating-widgets-bar" role="group" aria-label="Quick links">
      <div id="floating-download-widget">
        <Link
          href="/font-download/"
          id="floating-download-trigger"
          title="Download Kruti Dev fonts"
          aria-label="Open Kruti Dev font downloads"
        >
          <span id="floating-download-label" className="floating-download-label" aria-hidden="true">
            Download KrutiDev Font
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </Link>
      </div>

      <div id="floating-kbd-widget">
        <Link
          href="/krutidev-keyboard-layout/"
          id="floating-kbd-trigger"
          title="Open Kruti Dev keyboard layout"
          aria-label="Open Kruti Dev keyboard layout page"
        >
          <span id="floating-kbd-label" className="floating-kbd-label" aria-hidden="true">
            KrutiDev Keyboard
          </span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
            <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
