/**
 * Unit tests for analytics latch / gating rules.
 * Usage: npx tsx scripts/analytics-latches.test.ts
 */
import { createAnalyticsLatches } from '../src/lib/analytics/latches';
import {
  __getAnalyticsQueueForTests,
  __isAnalyticsReadyForTests,
  __resetAnalyticsForTests,
  canEmitCopyResult,
  canEmitFontDownloadResult,
  canEmitSwapDirection,
  flushAnalyticsQueue,
  resolveToolNameFromPath,
  track,
} from '../src/lib/analytics/track';

let failed = 0;
let passed = 0;

function assert(ok: boolean, label: string, detail?: string) {
  if (ok) passed++;
  else failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  if (!ok && detail) console.log(`  ${detail}`);
}

console.log('=== Analytics latch & gate rules ===\n');

// --- tool_start / example ---
{
  const L = createAnalyticsLatches();
  assert(
    L.noteUserInput('', 'नमस्ते', 'example') === false,
    'example does not create tool_start',
  );
  assert(
    L.getState().toolStarted === false,
    'example leaves tool_start latch unset',
  );
  assert(
    L.noteUserInput('', 'नमस्ते', 'user') === true,
    'first real input fires tool_start once',
  );
  assert(
    L.noteUserInput('नमस्ते', 'नमस्ते भारत', 'user') === false,
    'second keystroke does not fire tool_start',
  );
  L.resetOnClear();
  assert(
    L.getState().toolStarted === false && L.getState().lastCountedOutput === '',
    'Clear resets the tool_start latch and last-output marker',
  );
  assert(
    L.noteUserInput('', 'फिर', 'user') === true,
    'after Clear, next empty→non-empty user input fires tool_start again',
  );
}

// --- conversion_complete requires genuine tool_start ---
{
  const L = createAnalyticsLatches();
  assert(
    L.noteConversionComplete('abc') === false,
    'no completion when the fill cycle has no genuine tool_start',
  );
  assert(
    L.noteConversionComplete('') === false,
    'conversion_complete does not fire on empty output',
  );
  assert(
    L.noteConversionComplete('   ') === false,
    'conversion_complete does not fire on whitespace-only output',
  );

  assert(
    L.noteUserInput('', 'src', 'user') === true,
    '1. normal typing → tool_start',
  );
  assert(
    L.noteConversionComplete('abc') === true,
    '1. normal typing → conversion_complete after settle',
  );
  assert(
    L.noteConversionComplete('abc') === false,
    'conversion_complete does not fire on unchanged output',
  );
  assert(
    L.noteConversionComplete('abcd') === true,
    'conversion_complete fires when trimmed output changes (after tool_start)',
  );
}

// --- example load: example_used only; auto convert does not complete ---
{
  const L = createAnalyticsLatches();
  assert(
    L.noteUserInput('', 'EXAMPLE_SRC', 'example') === false,
    '2. example load → no tool_start',
  );
  assert(
    L.noteConversionComplete('EXAMPLE_OUT') === false,
    '3. example load + automatic conversion → no conversion_complete',
  );
  assert(
    L.getState().toolStarted === false &&
      L.getState().lastCountedOutput === '',
    'example alone leaves latches unset (no padded starts)',
  );
}

// --- history restore + automatic conversion ---
{
  const L = createAnalyticsLatches();
  assert(
    L.noteUserInput('', 'HIST_SRC', 'other') === false,
    'history restore → no tool_start',
  );
  assert(
    L.noteConversionComplete('HIST_OUT') === false,
    '4. history restore + automatic conversion → no conversion_complete',
  );
}

// --- example, then genuine typing ---
{
  const L = createAnalyticsLatches();
  L.noteUserInput('', 'EXAMPLE_SRC', 'example');
  L.noteConversionComplete('EXAMPLE_OUT'); // must not count
  assert(
    L.noteUserInput('EXAMPLE_SRC', 'EXAMPLE_SRC!', 'user') === true,
    '5. example, then genuine typing → tool_start',
  );
  assert(
    L.noteConversionComplete('NEW_OUT') === true,
    '5. example, then genuine typing → conversion_complete',
  );
}

// --- history restore, then genuine typing ---
{
  const L = createAnalyticsLatches();
  L.noteUserInput('', 'HIST_SRC', 'other');
  L.noteConversionComplete('HIST_OUT'); // must not count
  assert(
    L.noteUserInput('HIST_SRC', 'HIST_SRC edited', 'user') === true,
    '6. history restore, then genuine typing → tool_start',
  );
  assert(
    L.noteConversionComplete('HIST_OUT_2') === true,
    '6. history restore, then genuine typing → conversion_complete',
  );
}

// --- Clear resets; next genuine input starts again ---
{
  const L = createAnalyticsLatches();
  L.noteUserInput('', 'a', 'user');
  L.noteConversionComplete('A');
  L.resetOnClear();
  assert(
    L.getState().toolStarted === false &&
      L.getState().lastCountedOutput === '',
    '7. Clear resets the state',
  );
  assert(
    L.noteConversionComplete('A') === false,
    '7. after Clear, prior output cannot complete without a new start',
  );
  assert(
    L.noteUserInput('', 'b', 'user') === true,
    '8. after Clear, genuine typing creates a new tool_start',
  );
  assert(
    L.noteConversionComplete('B') === true,
    '8. after Clear + new start, conversion_complete can fire again',
  );
}

// --- script warning episode ---
{
  const L = createAnalyticsLatches();
  assert(
    L.noteScriptWarning(true) === true,
    'unexpected_script fires once at episode start',
  );
  assert(
    L.noteScriptWarning(true) === false,
    'unexpected_script does not re-fire in same episode',
  );
  L.noteScriptWarning(false);
  assert(
    L.noteScriptWarning(true) === true,
    'unexpected_script can fire again after episode ends',
  );
}

// --- copy / swap / font gates ---
assert(canEmitCopyResult(true) === true, 'copy_result allowed after successful write');
assert(canEmitCopyResult(false) === false, 'copy_result blocked when write fails');
assert(
  canEmitSwapDirection(false) === true,
  'swap_direction allowed when lockMode is false',
);
assert(
  canEmitSwapDirection(true) === false,
  'swap_direction does not fire when lockMode returns early',
);
assert(
  canEmitFontDownloadResult({
    resOk: true,
    blobReceived: true,
    usedFallback: false,
  }) === true,
  'font download_result after res.ok and blob',
);
assert(
  canEmitFontDownloadResult({
    resOk: false,
    blobReceived: false,
    usedFallback: true,
  }) === false,
  'font download does not fire on the fallback click',
);

// --- tool name path resolution ---
assert(
  resolveToolNameFromPath('/') === 'unicode_to_krutidev',
  'homepage tool_name',
);
assert(
  resolveToolNameFromPath('/krutidev-to-unicode-converter/') ===
    'krutidev_to_unicode',
  'K2U tool_name (trailing slash)',
);
assert(
  resolveToolNameFromPath('/krutidev-010-to-unicode-converter') ===
    'krutidev_010_to_unicode',
  'K010 tool_name distinct from K2U',
);
assert(
  resolveToolNameFromPath('/nirmala-ui-to-krutidev-converter') ===
    'nirmala_ui_to_krutidev',
  'Nirmala tool_name',
);

// --- queue / flush (no second page_view) ---
{
  __resetAnalyticsForTests();
  const calls: unknown[][] = [];
  (globalThis as { window?: unknown }).window = {
    gtag: (...args: unknown[]) => {
      calls.push(args);
    },
  };

  track('tool_start', { tool_name: 'unicode_to_krutidev' });
  assert(
    __getAnalyticsQueueForTests().length === 1,
    'events queue while gtag not ready',
  );
  assert(__isAnalyticsReadyForTests() === false, 'ready flag false before flush');

  flushAnalyticsQueue();
  assert(__isAnalyticsReadyForTests() === true, 'ready flag true after flush');
  assert(
    __getAnalyticsQueueForTests().length === 0,
    'queue empty after flush',
  );
  assert(
    calls.length === 1 &&
      calls[0][0] === 'event' &&
      calls[0][1] === 'tool_start',
    'flush sends gtag(event) only — not page_view or config',
    JSON.stringify(calls),
  );

  track('copy_result', { tool_name: 'unicode_to_krutidev' });
  assert(
    calls.length === 2 && calls[1][0] === 'event' && calls[1][1] === 'copy_result',
    'post-flush track sends immediately via gtag(event)',
  );

  __resetAnalyticsForTests();
  delete (globalThis as { window?: unknown }).window;
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
