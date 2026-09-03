/**
 * useUpdeshConverter — client-side Unicode ↔ Updesh conversion hook.
 *
 * Updesh is a KrutiDev-compatible Remington-layout font used in Uttar Pradesh
 * government offices and UP district courts. It uses the same ASCII ↔ Devanagari
 * character table as KrutiDev 010 (sihaari / i-matra reorder, halant conjuncts,
 * anusvara / anunasika / visarga, and standard Hindi compounds क्ष त्र ज्ञ श्र).
 *
 * Encoding standard: KrutiDev 010 / Updesh (identical mapping). Conversion runs
 * entirely in the browser via the shared engine — no API or server action.
 */

'use client';

import { startTransition, useEffect, useState } from 'react';
import {
  KrutiDevConverter,
  countChars,
  countWords,
} from '@/lib/converter/engine';

export type UpdeshConverterDirection =
  | 'unicode-to-updesh'
  | 'updesh-to-unicode';

export type UseUpdeshConverterResult = {
  outputText: string;
  wordCount: number;
  charCount: number;
  isConverting: boolean;
};

/**
 * Map direction onto the shared KrutiDev 010 engine (Updesh ≡ KrutiDev 010).
 * Forward path uses UNI→KDC + sihaari/reph reorder; reverse uses KDC→UNI.
 */
function convertUpdesh(
  input: string,
  direction: UpdeshConverterDirection
): string {
  if (!input) return '';
  if (direction === 'unicode-to-updesh') {
    return KrutiDevConverter.toKrutiDev(input);
  }
  return KrutiDevConverter.toUnicode(input);
}

/**
 * Convert Unicode Devanagari ↔ Updesh (KrutiDev 010 ASCII) on the client.
 *
 * @param input - Source text to convert
 * @param direction - Conversion direction
 */
export function useUpdeshConverter(
  input: string,
  direction: UpdeshConverterDirection
): UseUpdeshConverterResult {
  const [outputText, setOutputText] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsConverting(true);

    // Keep typing responsive; defer heavy conversion (same pattern as ConverterApp).
    const delay = input.length > 4000 ? 120 : 50;
    const timer = window.setTimeout(() => {
      startTransition(() => {
        if (cancelled) return;
        setOutputText(convertUpdesh(input, direction));
        setIsConverting(false);
      });
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [input, direction]);

  return {
    outputText,
    wordCount: countWords(outputText),
    charCount: countChars(outputText),
    isConverting,
  };
}
