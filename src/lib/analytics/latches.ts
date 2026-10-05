/**
 * Pure latch rules for converter analytics.
 * Kept free of gtag / DOM so unit tests can exercise gating without React.
 */

import type { InputOrigin } from './types';

export type AnalyticsLatches = {
  /** Empty → non-empty via typing/paste/upload only; once until clear. */
  noteUserInput: (prev: string, next: string, origin: InputOrigin) => boolean;
  /** Non-empty trimmed output different from last counted; not empty. */
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
      if (prev.trim() !== '') return false;
      if (next.trim() === '') return false;
      toolStarted = true;
      return true;
    },

    noteConversionComplete(output) {
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
