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
        Output is set to <strong>KrutiDev 010</strong>. Need KrutiDev 10
        labelling for exam practice? Use the{' '}
        <Link href="/unicode-to-krutidev-10-converter">
          Unicode to KrutiDev 10 converter
        </Link>{' '}
        — same mapping, different label.
      </p>

      <ConverterApp
        mode="uni-to-kd"
        variant="010"
        lockMode
        ctaHref="/krutidev-to-unicode-converter"
        ctaText="Have KrutiDev text that needs to become Unicode? Convert KrutiDev to Unicode"
        exampleSource="नमस्ते भारत"
        exampleHint="नमस्ते भारत"
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
          <span className="stat-value">99.9%</span>
          <span className="stat-label">Accuracy on standard Devanagari</span>
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
