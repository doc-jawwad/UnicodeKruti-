/**
 * Pure latch rules for converter analytics.
 * Kept free of gtag / DOM so unit tests can exercise gating without React.
 *
 * conversion_complete is once per genuine tool_start fill cycle, and only after
 * the output has settled (debounce). Intermediate keystroke conversions do not count.
 */

import type { InputOrigin } from './types';

/** Pause after the last conversion output update before counting a completion. */
export const CONVERSION_COMPLETE_SETTLE_MS = 1000;

export type AnalyticsLatchTimerFns = {
  setTimeout: (
    handler: () => void,
    timeout?: number,
  ) => ReturnType<typeof globalThis.setTimeout>;
  clearTimeout: (id: ReturnType<typeof globalThis.setTimeout>) => void;
};

export type AnalyticsLatchOptions = {
  settleMs?: number;
  timers?: Partial<AnalyticsLatchTimerFns>;
};

export type AnalyticsLatches = {
  /**
   * Genuine tool_start: typing / paste / upload.
   * - Classic: empty → non-empty.
   * - After example/history fill (no start yet): first genuine edit of the filled tool.
   * Example and history origins never start. Once until clear.
   */
  noteUserInput: (prev: string, next: string, origin: InputOrigin) => boolean;
  /**
   * Immediate latch check (used by settle timer). Prefer scheduleConversionComplete
   * from UI code. Non-empty trimmed output; only when this fill cycle already has a
   * genuine tool_start and has not yet counted a completion.
   */
  noteConversionComplete: (output: string) => boolean;
  /**
   * Debounce: cancel any pending completion and, if eligible, schedule one fire
   * after settleMs. Resuming typing (new schedule / cancel) drops abandoned states.
   */
  scheduleConversionComplete: (
    output: string,
    onComplete: (settledOutput: string) => void,
  ) => void;
  /** Cancel a pending settle timer without resetting tool_start. */
  cancelPendingConversionComplete: () => void;
  /** Script mismatch warning once per continuous episode. */
  noteScriptWarning: (active: boolean) => boolean;
  /** Clear resets tool_start latch, last-output marker, completed flag, and timer. */
  resetOnClear: () => void;
  /** Test/introspection helpers. */
  getState: () => {
    toolStarted: boolean;
    lastCountedOutput: string;
    scriptEpisodeActive: boolean;
    conversionCompleted: boolean;
    hasPendingCompletion: boolean;
  };
};

export function createAnalyticsLatches(
  options: AnalyticsLatchOptions = {},
): AnalyticsLatches {
  const settleMs = options.settleMs ?? CONVERSION_COMPLETE_SETTLE_MS;
  const setT =
    options.timers?.setTimeout ??
    ((handler: () => void, timeout?: number) =>
      globalThis.setTimeout(handler, timeout));
  const clearT =
    options.timers?.clearTimeout ??
    ((id: ReturnType<typeof globalThis.setTimeout>) =>
      globalThis.clearTimeout(id));

  let toolStarted = false;
  let lastCountedOutput = '';
  let conversionCompleted = false;
  let scriptEpisodeActive = false;
  let pendingTimer: ReturnType<typeof globalThis.setTimeout> | null = null;
  let pendingOutput = '';

  function cancelPendingConversionComplete() {
    if (pendingTimer != null) {
      clearT(pendingTimer);
      pendingTimer = null;
    }
    pendingOutput = '';
  }

  function noteConversionComplete(output: string): boolean {
    // Completion rate = conversion_complete / tool_start — never inflate numerator.
    if (!toolStarted) return false;
    // One settled completion per fill cycle (until Clear).
    if (conversionCompleted) return false;
    const trimmed = output.trim();
    if (!trimmed) return false;
    if (trimmed === lastCountedOutput) return false;
    lastCountedOutput = trimmed;
    conversionCompleted = true;
    return true;
  }

  return {
    noteUserInput(prev, next, origin) {
      if (origin !== 'user') return false;
      if (toolStarted) return false;
      if (next === prev) return false;

      const prevEmpty = prev.trim() === '';
      const nextEmpty = next.trim() === '';

      // Typing / paste / upload into an empty tool.
      if (prevEmpty && !nextEmpty) {
        toolStarted = true;
        return true;
      }

      // First genuine edit after example/history filled the tool without a start.
      if (!prevEmpty && !nextEmpty) {
        toolStarted = true;
        return true;
      }

      return false;
    },

    noteConversionComplete,

    scheduleConversionComplete(output, onComplete) {
      cancelPendingConversionComplete();
      const trimmed = output.trim();
      if (!trimmed || !toolStarted || conversionCompleted) return;

      pendingOutput = trimmed;
      pendingTimer = setT(() => {
        pendingTimer = null;
        const settled = pendingOutput;
        pendingOutput = '';
        if (noteConversionComplete(settled)) {
          onComplete(settled);
        }
      }, settleMs);
    },

    cancelPendingConversionComplete,

    noteScriptWarning(active) {
      if (!active) {
        scriptEpisodeActive = false;
        return false;
      }
      if (scriptEpisodeActive) return false;
      scriptEpisodeActive = true;
      return true;
    },

    resetOnClear() {
      cancelPendingConversionComplete();
      toolStarted = false;
      lastCountedOutput = '';
      conversionCompleted = false;
      scriptEpisodeActive = false;
    },

    getState() {
      return {
        toolStarted,
        lastCountedOutput,
        scriptEpisodeActive,
        conversionCompleted,
        hasPendingCompletion: pendingTimer != null,
      };
    },
  };
}
