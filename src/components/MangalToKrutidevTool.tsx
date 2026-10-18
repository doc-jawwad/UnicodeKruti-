'use client';

import ConverterApp from '@/components/converter/ConverterApp';

/**
 * Page-locked Unicode → KrutiDev 010 tool for the Mangal landing page.
 * Conversion is entirely client-side via ConverterApp / engine (no forked mapping).
 */
export default function MangalToKrutidevTool() {
  return (
    <div className="mangal-tool" style={{ minHeight: 420 }}>
      <ConverterApp
        mode="uni-to-kd"
        variant="010"
        lockMode
        ctaHref="/krutidev-to-unicode-converter"
        ctaText="Have KrutiDev text that needs to become Unicode? Convert KrutiDev to Unicode"
        exampleSource="नमस्ते भारत"
        exampleHint="नमस्ते भारत"
        unicodeLabel="Unicode (Mangal)"
        historyTitleAs="p"
      />
    </div>
  );
}
