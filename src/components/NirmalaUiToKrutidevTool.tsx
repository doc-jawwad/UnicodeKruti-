'use client';

import ConverterApp from '@/components/converter/ConverterApp';
import Link from 'next/link';

/**
 * Page-locked Unicode → KrutiDev 010 tool (Nirmala UI / Mangal / Kokila intent).
 * Conversion is entirely client-side via ConverterApp / engine.
 */
export default function NirmalaUiToKrutidevTool() {
  return (
    <div className="nirmala-tool" style={{ minHeight: 420 }}>
      <p className="u2k10-version-lock" role="status">
        Need KrutiDev 10?{' '}
        <Link href="/unicode-to-krutidev-10-converter">Click here</Link>
      </p>

      <ConverterApp
        mode="uni-to-kd"
        variant="010"
        lockMode
        ctaHref="/krutidev-to-unicode-converter"
        ctaText="Have KrutiDev text that needs to become Unicode? Convert KrutiDev to Unicode"
        exampleSource="नमस्ते भारत"
        exampleHint="नमस्ते भारत"
        unicodeLabel="Unicode (Nirmala UI)"
        belowBoxes={
          <ul className="nirmala-support-list" aria-label="Supported conversions">
            <li>Nirmala UI to KrutiDev 010</li>
            <li>Kokila to KrutiDev 010</li>
            <li>Mangal to KrutiDev 010</li>
            <li>All Unicode Devanagari to KrutiDev 010</li>
          </ul>
        }
      />

      <div className="u2k10-tool-ctas">
        <p>
          Already have KrutiDev ASCII that looks like English letters? Use the{' '}
          <Link href="/krutidev-to-unicode-converter">
            KrutiDev to Unicode converter
          </Link>{' '}
          for the reverse direction.
        </p>
        <p>
          Prefer the generic Unicode hub? Open the{' '}
          <Link href="/">Unicode to KrutiDev converter</Link> on the homepage.
        </p>
      </div>

      <div className="stats-bar u2k10-stats" aria-label="Tool stats">
        <div className="stat-item">
          <span className="stat-value">SIL-aligned</span>
          <span className="stat-label">Remington 010 / 10 corpus</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">Browser-only</span>
          <span className="stat-label">Text stays on your device</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">All devices</span>
          <span className="stat-label">Android, iPhone &amp; desktops</span>
        </div>
      </div>
    </div>
  );
}
