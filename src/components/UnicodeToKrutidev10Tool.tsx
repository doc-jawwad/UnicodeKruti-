'use client';

import ConverterApp from '@/components/converter/ConverterApp';
import Link from 'next/link';

/**
 * Page-locked Unicode → KrutiDev 10 tool.
 * Conversion is entirely client-side via ConverterApp / engine.
 */
export default function UnicodeToKrutidev10Tool() {
  return (
    <div className="u2k10-tool" style={{ minHeight: 420 }}>
      <p className="u2k10-version-lock" role="status">
        Version is set to <strong>KrutiDev 10</strong>. Need KrutiDev 010 for a
        government portal? Use the{' '}
        <Link href="/">Mangal to KrutiDev 010 converter</Link> instead.
      </p>

      <ConverterApp
        mode="uni-to-kd"
        variant="10"
        lockMode
        ctaHref="/krutidev-10-to-unicode-converter"
        ctaText="Have KrutiDev 10 text that needs to become Unicode? Convert Kurtidev10 to Unicode"
        exampleSource="नमस्ते भारत"
        exampleHint="नमस्ते भारत"
      />

      <div className="u2k10-tool-ctas">
        <p>
          Have KrutiDev 10 text that needs to become Unicode? Use the{' '}
          <Link href="/krutidev-10-to-unicode-converter">
            Kurtidev10 to Unicode converter
          </Link>{' '}
          for that direction.
        </p>
        <p>
          Need KrutiDev 010 labelling? Open the{' '}
          <Link href="/">Unicode Hindi to KrutiDev 010 tool</Link>.
        </p>
      </div>

      <div className="stats-bar u2k10-stats" aria-label="Tool stats">
        <div className="stat-item">
          <span className="stat-value">99.7%</span>
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
