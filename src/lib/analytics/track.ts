/**
 * GA4 event helper for UnicodeKruti.
 * Queues events until Analytics.tsx finishes gtag('config'), then flushes once.
 * Never sends a second page_view — only gtag('event', …).
 */

import type {
  AnalyticsEventName,
  AnalyticsParams,
  AnalyticsVariant,
  ConversionDirection,
  ToolName,
} from './types';
import type { ConverterMode, ConverterVariant } from '@/lib/converter/engine';
import type { UpdeshConverterDirection } from '@/lib/hooks/useUpdeshConverter';

type QueuedEvent = {
  name: AnalyticsEventName;
  params: AnalyticsParams;
};

type GtagFn = (...args: unknown[]) => void;

let ready = false;
let queue: QueuedEvent[] = [];

function getGtag(): GtagFn | undefined {
  if (typeof window === 'undefined') return undefined;
  const g = window as Window & { gtag?: GtagFn };
  return typeof g.gtag === 'function' ? g.gtag : undefined;
}

/** Emit a custom GA4 event, or queue until flushAnalyticsQueue(). */
export function track(name: AnalyticsEventName, params: AnalyticsParams): void {
  if (ready) {
    const gtag = getGtag();
    if (gtag) {
      gtag('event', name, params);
      return;
    }
  }
  queue.push({ name, params });
}

/**
 * Mark analytics ready and send any queued events via gtag('event') only.
 * Call immediately after the existing gtag('config') — do not send page_view.
 */
export function flushAnalyticsQueue(): void {
  ready = true;
  const gtag = getGtag();
  if (!gtag || queue.length === 0) {
    queue = [];
    return;
  }
  const pending = queue;
  queue = [];
  for (const item of pending) {
    gtag('event', item.name, item.params);
  }
}

/** Test helper — reset module queue/ready state. */
export function __resetAnalyticsForTests(): void {
  ready = false;
  queue = [];
}

/** Test helper — inspect queue without flushing. */
export function __getAnalyticsQueueForTests(): ReadonlyArray<QueuedEvent> {
  return queue;
}

/** Test helper — whether flush has been called. */
export function __isAnalyticsReadyForTests(): boolean {
  return ready;
}

export function normalizePathname(pathname: string): string {
  if (!pathname) return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function resolveToolNameFromPath(pathname: string): ToolName | null {
  switch (normalizePathname(pathname)) {
    case '/':
      return 'unicode_to_krutidev';
    case '/krutidev-to-unicode-converter':
      return 'krutidev_to_unicode';
    case '/krutidev-10-to-unicode-converter':
      return 'krutidev_10_to_unicode';
    case '/krutidev-010-to-unicode-converter':
      return 'krutidev_010_to_unicode';
    case '/unicode-to-krutidev-10-converter':
      return 'unicode_to_krutidev_10';
    case '/nirmala-ui-to-krutidev-converter':
      return 'nirmala_ui_to_krutidev';
    case '/updesh-converter':
      return 'updesh_converter';
    case '/font-download':
      return 'font_download';
    default:
      return null;
  }
}

export function resolveConverterToolName(
  pathname: string,
  opts: {
    mode: ConverterMode;
    variant: ConverterVariant;
    unicodeLabel?: string;
  },
): ToolName {
  const fromPath = resolveToolNameFromPath(pathname);
  if (fromPath) return fromPath;
  if (opts.unicodeLabel?.toLowerCase().includes('nirmala')) {
    return 'nirmala_ui_to_krutidev';
  }
  if (opts.mode === 'kd-to-uni' && opts.variant === '10') {
    return 'krutidev_10_to_unicode';
  }
  if (opts.mode === 'uni-to-kd' && opts.variant === '10') {
    return 'unicode_to_krutidev_10';
  }
  if (opts.mode === 'kd-to-uni') return 'krutidev_to_unicode';
  return 'unicode_to_krutidev';
}

export function conversionDirectionFromMode(
  mode: ConverterMode,
): ConversionDirection {
  return mode === 'kd-to-uni' ? 'kd_to_uni' : 'uni_to_kd';
}

export function conversionDirectionFromUpdesh(
  direction: UpdeshConverterDirection,
): ConversionDirection {
  return direction === 'unicode-to-updesh'
    ? 'unicode_to_updesh'
    : 'updesh_to_unicode';
}

export function variantParam(variant: ConverterVariant): AnalyticsVariant {
  return variant;
}

export function converterEventParams(
  pathname: string,
  opts: {
    mode: ConverterMode;
    variant: ConverterVariant;
    unicodeLabel?: string;
  },
): AnalyticsParams {
  return {
    tool_name: resolveConverterToolName(pathname, opts),
    conversion_direction: conversionDirectionFromMode(opts.mode),
    variant: variantParam(opts.variant),
  };
}

export function updeshEventParams(
  direction: UpdeshConverterDirection,
): AnalyticsParams {
  return {
    tool_name: 'updesh_converter',
    conversion_direction: conversionDirectionFromUpdesh(direction),
    variant: 'updesh',
  };
}

/** swap_direction only when handleSwap actually changes direction. */
export function canEmitSwapDirection(lockMode: boolean): boolean {
  return !lockMode;
}

/** copy_result only after clipboard write succeeds. */
export function canEmitCopyResult(clipboardWriteOk: boolean): boolean {
  return clipboardWriteOk;
}

/**
 * Font download_result only after res.ok and a blob.
 * Fallback click that still shows "Downloaded" does not count.
 */
export function canEmitFontDownloadResult(opts: {
  resOk: boolean;
  blobReceived: boolean;
  usedFallback: boolean;
}): boolean {
  return opts.resOk && opts.blobReceived && !opts.usedFallback;
}

export type {
  AnalyticsEventName,
  AnalyticsParams,
  AnalyticsVariant,
  ConversionDirection,
  DownloadKind,
  InputOrigin,
  ToolName,
  ValidationErrorType,
} from './types';
