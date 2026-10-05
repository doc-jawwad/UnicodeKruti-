/**
 * Pure latch rules for converter analytics.
 * Kept free of gtag / DOM so unit tests can exercise gating without React.
 *
 * conversion_complete is not emitted on every output change. A genuine
 * tool_start still opens the fill cycle, and a completion is committed only
 * after the converted output has stayed settled for CONVERSION_COMPLETE_SETTLE_MS.
 */

import type { InputOrigin } from './types';

/**
 * Pause after the latest converted output before one conversion_complete.
 * Longer than the converter's ~50ms render debounce so keystrokes coalesce,
 * and shorter than a deliberate stop.
 */
export const CONVERSION_COMPLETE_SETTLE_MS = 800;

export type AnalyticsLatchTimers = {
  schedule: (callback: () => void, ms: number) => number;
  cancel: (id: number) => void;
};

export type AnalyticsLatches = {
  /**
   * Genuine tool_start: typing / paste / upload.
   * - Classic: empty → non-empty.
   * - After example/history fill (no start yet): first genuine edit of the filled tool.
   * Example and history origins never start. Once until clear.
   * A text change, or an example/history fill, cancels a pending completion
   * so an abandoned intermediate result cannot settle.
   */
  noteUserInput: (prev: string, next: string, origin: InputOrigin) => boolean;
  /**
   * Schedule conversion_complete for a settled, non-empty output.
   * Only when this fill cycle already has a genuine tool_start and the
   * latest input origin is the user (example and history fills never settle).
   * Returns true only when a completion is committed immediately (settleMs <= 0).
   * Otherwise the completion is pending and onSettled runs once after the pause.
   * onSettled receives no text — callers already hold lengths for metadata.
   */
  noteConversionComplete: (output: string, onSettled?: () => void) => boolean;
  /** Script mismatch warning once per continuous episode. */
  noteScriptWarning: (active: boolean) => boolean;
  /** Clear resets tool_start latch, last-output marker, pending completion, and script episode. */
  resetOnClear: () => void;
  /** Test/introspection helpers. */
  getState: () => {
    toolStarted: boolean;
    lastCountedOutput: string;
    scriptEpisodeActive: boolean;
  };
};

const defaultTimers: AnalyticsLatchTimers = {
  schedule(callback, ms) {
    // DOM types use number; @types/node uses Timeout. Callers only pass the id back.
    return setTimeout(callback, ms) as unknown as number;
  },
  cancel(id) {
    clearTimeout(id);
  },
};

export function createAnalyticsLatches(options?: {
  settleMs?: number;
  timers?: AnalyticsLatchTimers;
}): AnalyticsLatches {
  const settleMs = options?.settleMs ?? CONVERSION_COMPLETE_SETTLE_MS;
  const timers = options?.timers ?? defaultTimers;

  let toolStarted = false;
  let lastCountedOutput = '';
  let scriptEpisodeActive = false;
  let latestOrigin: InputOrigin | null = null;
  let pendingTimer: number | null = null;
  let pendingOutput = '';
  let pendingEmit: (() => void) | null = null;

  const clearPending = () => {
    if (pendingTimer !== null) {
      timers.cancel(pendingTimer);
      pendingTimer = null;
    }
    pendingOutput = '';
    pendingEmit = null;
  };

  const commitPending = () => {
    pendingTimer = null;
    const settled = pendingOutput;
    const emit = pendingEmit;
    pendingOutput = '';
    pendingEmit = null;
    if (
      latestOrigin !== 'user' ||
      !toolStarted ||
      !settled ||
      settled === lastCountedOutput
    ) {
      return false;
    }
    lastCountedOutput = settled;
    emit?.();
    return true;
  };

  return {
    noteUserInput(prev, next, origin) {
      latestOrigin = origin;
      // Keystrokes replace an in-flight result. Example and history fills
      // must not let that result, or their own output, settle as a completion.
      if (next !== prev || origin !== 'user') clearPending();
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

    noteConversionComplete(output, onSettled) {
      // Completion rate = conversion_complete / tool_start — never inflate numerator.
      const trimmed = output.trim();
      if (latestOrigin !== 'user' || !toolStarted || !trimmed) {
        clearPending();
        return false;
      }
      if (trimmed === lastCountedOutput) {
        clearPending();
        return false;
      }

      // Same unsettled result (duplicate effect run): keep the existing pause.
      if (pendingTimer !== null && trimmed === pendingOutput) {
        if (onSettled) pendingEmit = onSettled;
        return false;
      }

      clearPending();
      pendingOutput = trimmed;
      pendingEmit = onSettled ?? null;

      if (settleMs <= 0) {
        return commitPending();
      }

      pendingTimer = timers.schedule(() => {
        commitPending();
      }, settleMs);
      return false;
    },

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
      clearPending();
      toolStarted = false;
      lastCountedOutput = '';
      scriptEpisodeActive = false;
      latestOrigin = null;
    },

    getState() {
      return {
        toolStarted,
        lastCountedOutput,
        scriptEpisodeActive,
      };
    },
  };
}
