/**
 * Unit tests for analytics latch / gating rules.
 * Usage: npx tsx scripts/analytics-latches.test.ts
 */
import {
  CONVERSION_COMPLETE_SETTLE_MS,
  createAnalyticsLatches,
} from '../src/lib/analytics/latches';
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

/** Deterministic fake timers for settle/debounce tests. */
function createFakeTimers() {
  let now = 0;
  let nextId = 1;
  const pending = new Map<
    number,
    { fn: () => void; at: number }
  >();

  return {
    now: () => now,
    setTimeout(handler: () => void, timeout = 0) {
      const id = nextId++;
      pending.set(id, { fn: handler, at: now + timeout });
      return id as unknown as ReturnType<typeof globalThis.setTimeout>;
    },
    clearTimeout(id: ReturnType<typeof globalThis.setTimeout>) {
      pending.delete(id as unknown as number);
    },
    advance(ms: number) {
      now += ms;
      const due = [...pending.entries()]
        .filter(([, t]) => t.at <= now)
        .sort((a, b) => a[1].at - b[1].at);
      for (const [id, t] of due) {
        if (!pending.has(id)) continue;
        pending.delete(id);
        t.fn();
      }
    },
    pendingCount: () => pending.size,
  };
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

// --- conversion_complete requires genuine tool_start (immediate latch) ---
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
    '1. normal typing → conversion_complete after settle (latch)',
  );
  assert(
    L.noteConversionComplete('abc') === false,
    'G. repeated identical output → no duplicate completion',
  );
  assert(
    L.noteConversionComplete('abcd') === false,
    'output change after completion in same fill cycle → no second completion',
  );
  assert(
    L.getState().conversionCompleted === true,
    'fill cycle marks conversionCompleted after one settle',
  );
}

// --- example load: example_used only; auto convert does not complete ---
{
  const L = createAnalyticsLatches();
  assert(
    L.noteUserInput('', 'EXAMPLE_SRC', 'example') === false,
    'D. example load → no tool_start',
  );
  assert(
    L.noteConversionComplete('EXAMPLE_OUT') === false,
    'D. example load → no standalone conversion_complete',
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
    'E. history restore → no tool_start',
  );
  assert(
    L.noteConversionComplete('HIST_OUT') === false,
    'E. history restore → no standalone conversion_complete',
  );
}

// --- example, then genuine typing ---
{
  const L = createAnalyticsLatches();
  L.noteUserInput('', 'EXAMPLE_SRC', 'example');
  L.noteConversionComplete('EXAMPLE_OUT'); // must not count
  assert(
    L.noteUserInput('EXAMPLE_SRC', 'EXAMPLE_SRC!', 'user') === true,
    'F. example, then genuine typing → tool_start',
  );
  assert(
    L.noteConversionComplete('NEW_OUT') === true,
    'F. example, then genuine typing → conversion_complete',
  );
}

// --- history restore, then genuine typing ---
{
  const L = createAnalyticsLatches();
  L.noteUserInput('', 'HIST_SRC', 'other');
  L.noteConversionComplete('HIST_OUT'); // must not count
  assert(
    L.noteUserInput('HIST_SRC', 'HIST_SRC edited', 'user') === true,
    'F. history restore, then genuine typing → tool_start',
  );
  assert(
    L.noteConversionComplete('HIST_OUT_2') === true,
    'F. history restore, then genuine typing → conversion_complete',
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
      L.getState().lastCountedOutput === '' &&
      L.getState().conversionCompleted === false,
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

// --- A/H: rapid typing → one completion after settle ---
{
  const fake = createFakeTimers();
  const L = createAnalyticsLatches({
    settleMs: CONVERSION_COMPLETE_SETTLE_MS,
    timers: {
      setTimeout: fake.setTimeout,
      clearTimeout: fake.clearTimeout,
    },
  });
  const completions: string[] = [];

  assert(L.noteUserInput('', 'h', 'user') === true, 'A. first char → tool_start');
  L.scheduleConversionComplete('H', (o) => completions.push(o));
  fake.advance(200);
  L.scheduleConversionComplete('HE', (o) => completions.push(o));
  fake.advance(200);
  L.scheduleConversionComplete('HEL', (o) => completions.push(o));
  fake.advance(200);
  L.scheduleConversionComplete('HELL', (o) => completions.push(o));
  fake.advance(200);
  L.scheduleConversionComplete('HELLO', (o) => completions.push(o));
  fake.advance(200);
  L.scheduleConversionComplete('HELLOX', (o) => completions.push(o));

  assert(
    completions.length === 0,
    'A/H. no conversion_complete while still typing (before settle)',
  );
  assert(
    L.getState().hasPendingCompletion === true,
    'A. pending settle timer exists after last keystroke',
  );

  fake.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1 && completions[0] === 'HELLOX',
    'A/H. exactly one conversion_complete for final settled output',
    JSON.stringify(completions),
  );
}

// --- B: pause to settle, then continue typing ---
{
  const fake = createFakeTimers();
  const L = createAnalyticsLatches({
    settleMs: CONVERSION_COMPLETE_SETTLE_MS,
    timers: {
      setTimeout: fake.setTimeout,
      clearTimeout: fake.clearTimeout,
    },
  });
  const completions: string[] = [];

  L.noteUserInput('', 'hi', 'user');
  L.scheduleConversionComplete('HI', (o) => completions.push(o));
  fake.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1 && completions[0] === 'HI',
    'B. first pause → one conversion_complete',
  );

  // Same fill cycle continues; further settled changes must not spam.
  L.scheduleConversionComplete('HIX', (o) => completions.push(o));
  fake.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1,
    'B. continue typing after completion → no second conversion_complete in same cycle',
    JSON.stringify(completions),
  );
}

// --- C: typing then Clear cancels pending completion ---
{
  const fake = createFakeTimers();
  const L = createAnalyticsLatches({
    settleMs: CONVERSION_COMPLETE_SETTLE_MS,
    timers: {
      setTimeout: fake.setTimeout,
      clearTimeout: fake.clearTimeout,
    },
  });
  const completions: string[] = [];

  L.noteUserInput('', 'ab', 'user');
  L.scheduleConversionComplete('AB', (o) => completions.push(o));
  assert(L.getState().hasPendingCompletion === true, 'C. pending before Clear');
  L.resetOnClear();
  assert(
    L.getState().hasPendingCompletion === false,
    'C. Clear cancels pending completion timer',
  );
  fake.advance(CONVERSION_COMPLETE_SETTLE_MS + 50);
  assert(
    completions.length === 0,
    'C. no conversion_complete after Clear',
  );
}

// --- effect cleanup cancels pending without ending the fill cycle ---
{
  const fake = createFakeTimers();
  const L = createAnalyticsLatches({
    settleMs: CONVERSION_COMPLETE_SETTLE_MS,
    timers: {
      setTimeout: fake.setTimeout,
      clearTimeout: fake.clearTimeout,
    },
  });
  const completions: string[] = [];

  L.noteUserInput('', 'ab', 'user');
  L.scheduleConversionComplete('AB', (o) => completions.push(o));
  L.cancelPendingConversionComplete();
  fake.advance(CONVERSION_COMPLETE_SETTLE_MS + 50);
  assert(
    completions.length === 0 && L.getState().toolStarted === true,
    'effect cleanup cancels pending completion without resetting tool_start',
  );
}

// --- schedule is a no-op without tool_start (example/history paths) ---
{
  const fake = createFakeTimers();
  const L = createAnalyticsLatches({
    settleMs: 100,
    timers: {
      setTimeout: fake.setTimeout,
      clearTimeout: fake.clearTimeout,
    },
  });
  const completions: string[] = [];
  L.noteUserInput('', 'EX', 'example');
  L.scheduleConversionComplete('EX_OUT', (o) => completions.push(o));
  fake.advance(500);
  assert(
    completions.length === 0 && L.getState().hasPendingCompletion === false,
    'D. schedule after example alone never pending / never completes',
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
