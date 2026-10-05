/**
 * Pure latch rules for converter analytics.
 * Kept free of gtag / DOM so unit tests can exercise gating without React.
 */

import type { InputOrigin } from './types';

export type AnalyticsLatches = {
  /**
   * Genuine tool_start: typing / paste / upload.
   * - Classic: empty → non-empty.
   * - After example/history fill (no start yet): first genuine edit of the filled tool.
   * Example and history origins never start. Once until clear.
   */
  noteUserInput: (prev: string, next: string, origin: InputOrigin) => boolean;
  /**
   * Non-empty trimmed output different from last counted.
   * Only when this fill cycle already has a genuine tool_start.
   */
  noteConversionComplete: (output: string) => boolean;
  /** Script mismatch warning once per continuous episode. */
  noteScriptWarning: (active: boolean) => boolean;
  /** Clear resets tool_start latch and last-output marker (and script episode). */
  resetOnClear: () => void;
  /** Test/introspection helpers. */
  getState: () => {
    toolStarted: boolean;
    lastCountedOutput: string;
    scriptEpisodeActive: boolean;
  };
};

export function createAnalyticsLatches(): AnalyticsLatches {
  let toolStarted = false;
  let lastCountedOutput = '';
  let scriptEpisodeActive = false;

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

    noteConversionComplete(output) {
      // Completion rate = conversion_complete / tool_start — never inflate numerator.
      if (!toolStarted) return false;
      const trimmed = output.trim();
      if (!trimmed) return false;
      if (trimmed === lastCountedOutput) return false;
      lastCountedOutput = trimmed;
      return true;
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
      toolStarted = false;
      lastCountedOutput = '';
      scriptEpisodeActive = false;
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
