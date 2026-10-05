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

type Clock = {
  schedule: (callback: () => void, ms: number) => number;
  cancel: (id: number) => void;
  advance: (ms: number) => void;
  pending: () => number;
};

function createClock(): Clock {
  let now = 0;
  let seq = 1;
  const items: { id: number; at: number; cb: () => void }[] = [];

  return {
    schedule(callback, ms) {
      const id = seq++;
      items.push({ id, at: now + ms, cb: callback });
      return id;
    },
    cancel(id) {
      const index = items.findIndex((item) => item.id === id);
      if (index >= 0) items.splice(index, 1);
    },
    advance(ms) {
      now += ms;
      for (;;) {
        let nextIndex = -1;
        for (let i = 0; i < items.length; i++) {
          const candidate = items[i];
          if (candidate.at > now) continue;
          if (nextIndex === -1) {
            nextIndex = i;
            continue;
          }
          const current = items[nextIndex];
          if (
            candidate.at < current.at ||
            (candidate.at === current.at && candidate.id < current.id)
          ) {
            nextIndex = i;
          }
        }
        if (nextIndex === -1) break;
        const [next] = items.splice(nextIndex, 1);
        next.cb();
      }
    },
    pending() {
      return items.length;
    },
  };
}

function createTestLatches(clock: Clock = createClock()) {
  const completions: string[] = [];
  const latches = createAnalyticsLatches({ timers: clock });
  return {
    clock,
    latches,
    completions,
    note(output: string) {
      const trimmed = output.trim();
      return latches.noteConversionComplete(output, () => {
        completions.push(trimmed);
      });
    },
  };
}

function countEvents(name: string) {
  return __getAnalyticsQueueForTests().filter((event) => event.name === name)
    .length;
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

// --- conversion_complete requires genuine tool_start and a settled output ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  note('abc');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 0,
    'no completion when the fill cycle has no genuine tool_start',
  );
  note('');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 0,
    'conversion_complete does not fire on empty output',
  );
  note('   ');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 0,
    'conversion_complete does not fire on whitespace-only output',
  );

  assert(
    L.noteUserInput('', 'src', 'user') === true,
    '1. normal typing → tool_start',
  );
  assert(note('abc') === false, 'completion stays pending until the output settles');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS - 1);
  assert(completions.length === 0, 'completion does not fire before the settle interval');
  clock.advance(1);
  assert(
    completions.length === 1 && completions[0] === 'abc',
    '1. normal typing → conversion_complete after settle',
  );
  note('abc');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1,
    'conversion_complete does not fire on unchanged output',
  );
  note('abcd');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS - 1);
  assert(completions.length === 1, 'changed output does not complete before it settles');
  clock.advance(1);
  assert(
    completions.length === 2 && completions[1] === 'abcd',
    'conversion_complete fires when trimmed output changes (after tool_start)',
  );
  assert(
    L.getState().lastCountedOutput === 'abcd',
    'last counted output updates only when a completion commits',
  );
}

// --- example load: example_used only; auto convert does not complete ---
{
  __resetAnalyticsForTests();
  const { latches: L, clock, note, completions } = createTestLatches();
  track('example_used', { tool_name: 'unicode_to_krutidev' });
  assert(
    L.noteUserInput('', 'EXAMPLE_SRC', 'example') === false,
    '2. example load → no tool_start',
  );
  note('EXAMPLE_OUT');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 0,
    '3. example load + automatic conversion → no conversion_complete',
  );
  assert(
    L.getState().toolStarted === false &&
      L.getState().lastCountedOutput === '',
    'example alone leaves latches unset (no padded starts)',
  );
  assert(
    countEvents('example_used') === 1 &&
      countEvents('tool_start') === 0 &&
      countEvents('conversion_complete') === 0,
    'D. example load → example_used; no tool_start; no standalone conversion_complete',
  );
  __resetAnalyticsForTests();
}

// --- history restore + automatic conversion ---
{
  __resetAnalyticsForTests();
  const { latches: L, clock, note, completions } = createTestLatches();
  assert(
    L.noteUserInput('', 'HIST_SRC', 'other') === false,
    'history restore → no tool_start',
  );
  note('HIST_OUT');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 0,
    '4. history restore + automatic conversion → no conversion_complete',
  );
  assert(
    countEvents('tool_start') === 0 && countEvents('conversion_complete') === 0,
    'E. history restore → no standalone tool_start; no standalone conversion_complete',
  );
  __resetAnalyticsForTests();
}

// --- example, then genuine typing ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  L.noteUserInput('', 'EXAMPLE_SRC', 'example');
  note('EXAMPLE_OUT'); // must not count
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    L.noteUserInput('EXAMPLE_SRC', 'EXAMPLE_SRC!', 'user') === true,
    '5. example, then genuine typing → tool_start',
  );
  note('NEW_OUT');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS - 1);
  assert(completions.length === 0, '5. example output never becomes a late completion');
  clock.advance(1);
  assert(
    completions.length === 1 && completions[0] === 'NEW_OUT',
    '5. example, then genuine typing → conversion_complete',
  );
}

// --- history restore, then genuine typing ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  L.noteUserInput('', 'HIST_SRC', 'other');
  note('HIST_OUT'); // must not count
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    L.noteUserInput('HIST_SRC', 'HIST_SRC edited', 'user') === true,
    '6. history restore, then genuine typing → tool_start',
  );
  note('HIST_OUT_2');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1 && completions[0] === 'HIST_OUT_2',
    '6. history restore, then genuine typing → conversion_complete',
  );
}

// --- Clear resets; next genuine input starts again ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  L.noteUserInput('', 'a', 'user');
  note('A');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  L.resetOnClear();
  assert(
    L.getState().toolStarted === false &&
      L.getState().lastCountedOutput === '',
    '7. Clear resets the state',
  );
  note('A');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1,
    '7. after Clear, prior output cannot complete without a new start',
  );
  assert(
    L.noteUserInput('', 'b', 'user') === true,
    '8. after Clear, genuine typing creates a new tool_start',
  );
  note('B');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 2 && completions[1] === 'B',
    '8. after Clear + new start, conversion_complete can fire again',
  );
}

// --- A. rapid typing settles once ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  let input = '';
  let starts = 0;
  for (const ch of ['h', 'e', 'l', 'l', 'o', 'x']) {
    const next = input + ch;
    if (L.noteUserInput(input, next, 'user')) starts++;
    input = next;
    note(input);
    clock.advance(60);
  }
  assert(starts === 1, 'A. several quick characters → one tool_start');
  assert(
    completions.length === 0,
    'A. quick characters do not complete once per character',
  );
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1 && completions[0] === 'hellox',
    'A. one conversion_complete after the final output settles',
  );
}

// --- B. pause, then continue: one completion per settled result ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  let input = '';
  let starts = 0;
  const type = (ch: string, gapMs: number) => {
    const next = input + ch;
    if (L.noteUserInput(input, next, 'user')) starts++;
    input = next;
    note(`out:${input}`);
    clock.advance(gapMs);
  };
  type('h', 70);
  type('e', 70);
  type('l', 70);
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    starts === 1 && completions.length === 1 && completions[0] === 'out:hel',
    'B. first pause emits one completion for that settled result',
  );
  type('l', 70);
  type('o', 70);
  assert(
    completions.length === 1 && starts === 1,
    'B. continuing the same fill cycle does not start again or complete early',
  );
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 2 && completions[1] === 'out:hello',
    'B. the next settled change emits one more completion (existing latch)',
  );
}

// --- C. clear cancels a pending completion ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  L.noteUserInput('', 'h', 'user');
  note('H');
  clock.advance(100);
  L.noteUserInput('h', 'he', 'user');
  note('HE');
  assert(clock.pending() === 1, 'C. a completion is pending while the user is typing');
  L.resetOnClear();
  assert(
    L.getState().toolStarted === false && L.getState().lastCountedOutput === '',
    'C. Clear resets analytics state',
  );
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS * 2);
  note('HE');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 0 && clock.pending() === 0,
    'C. typing then Clear cancels the pending completion',
  );
}

// --- F. genuine typing after example and after history ---
{
  __resetAnalyticsForTests();
  const { latches: L, clock, completions } = createTestLatches();
  const settleTrack = (output: string, inputChars: number) => {
    L.noteConversionComplete(output, () => {
      completions.push(output.trim());
      track('conversion_complete', {
        tool_name: 'unicode_to_krutidev',
        input_chars: inputChars,
        output_chars: output.trim().length,
      });
    });
  };

  track('example_used', { tool_name: 'unicode_to_krutidev' });
  L.noteUserInput('', 'EXAMPLE_SRC', 'example');
  settleTrack('EXAMPLE_OUT', 11);
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);

  if (L.noteUserInput('EXAMPLE_SRC', 'EXAMPLE_SRC!', 'user')) {
    track('tool_start', { tool_name: 'unicode_to_krutidev' });
  }
  settleTrack('NEW_OUT', 12);
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);

  const exampleCycle = __getAnalyticsQueueForTests().map((event) => event.name);
  assert(
    exampleCycle.join(',') === 'example_used,tool_start,conversion_complete',
    'F. genuine typing after example follows the normal start/completion cycle',
    exampleCycle.join(','),
  );
  const completed = __getAnalyticsQueueForTests().find(
    (event) => event.name === 'conversion_complete',
  );
  assert(
    completed?.params.input_chars === 12 &&
      completed.params.output_chars === 'NEW_OUT'.length &&
      !JSON.stringify(completed.params).includes('EXAMPLE') &&
      !JSON.stringify(completed.params).includes('NEW_OUT'),
    'F. completion metadata is lengths only',
  );

  __resetAnalyticsForTests();
  const history = createTestLatches();
  history.latches.noteUserInput('', 'HIST_SRC', 'other');
  history.note('HIST_OUT');
  history.clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  const started = history.latches.noteUserInput('HIST_SRC', 'HIST_SRC!', 'user');
  history.note('HIST_EDITED');
  history.clock.advance(CONVERSION_COMPLETE_SETTLE_MS - 1);
  assert(
    started === true && history.completions.length === 0,
    'F. history restore does not complete before the later edit settles',
  );
  history.clock.advance(1);
  assert(
    history.completions.length === 1 && history.completions[0] === 'HIST_EDITED',
    'F. genuine typing after history restore completes once for that edit',
  );
  __resetAnalyticsForTests();
}

// --- G. repeated identical settled output ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  L.noteUserInput('', 'src', 'user');
  note('abc');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS - 1);
  note('abc');
  clock.advance(1);
  assert(
    completions.length === 1 && clock.pending() === 0,
    'G. a duplicate notification does not postpone or double the settled result',
  );
  note('abc');
  note(' abc ');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1 && L.getState().lastCountedOutput === 'abc',
    'G. repeated identical trimmed output does not complete again',
  );
}

// --- H. only the final changed output settles ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  L.noteUserInput('', 'a', 'user');
  for (const output of ['a', 'ab', 'abc', 'abcd', 'abcde']) {
    note(output);
    clock.advance(40);
  }
  assert(completions.length === 0, 'H. repeated output changes emit nothing while typing');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1 && completions[0] === 'abcde',
    'H. only the final settled output produces conversion_complete',
  );
}

// --- example / history during an open cycle do not complete on their own ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  L.noteUserInput('', 'hello', 'user');
  note('HELLO');
  clock.advance(100);
  assert(
    L.noteUserInput('hello', 'EXAMPLE_SRC', 'example') === false,
    'example during an open cycle does not fire tool_start',
  );
  note('EXAMPLE_OUT');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS * 2);
  assert(
    completions.length === 0,
    'example during an open cycle does not create conversion_complete',
  );
  assert(
    L.noteUserInput('EXAMPLE_SRC', 'EXAMPLE_SRC!', 'user') === false,
    'editing after example keeps the original tool_start cycle',
  );
  note('EDITED');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1 && completions[0] === 'EDITED',
    'F. typing after an in-cycle example still completes once',
  );
}
{
  const { latches: L, clock, note, completions } = createTestLatches();
  L.noteUserInput('', 'hello', 'user');
  note('HELLO');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(completions.length === 1, 'user result settled before history restore');
  L.noteUserInput('hello', 'HIST_SRC', 'other');
  note('HIST_OUT');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS * 2);
  assert(
    completions.length === 1 && L.getState().toolStarted === true,
    'E. history restore does not add tool_start or conversion_complete',
  );
  L.noteUserInput('HIST_SRC', 'HIST_SRC!', 'user');
  note('HIST_EDITED');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 2 && completions[1] === 'HIST_EDITED',
    'F. typing after an in-cycle history restore completes for the edit',
  );
}

// --- resume typing cancels the abandoned intermediate completion ---
{
  const { latches: L, clock, note, completions } = createTestLatches();
  L.noteUserInput('', 'h', 'user');
  note('H');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS - 10);
  assert(L.noteUserInput('h', 'he', 'user') === false, 'resume stays in the same tool_start cycle');
  clock.advance(50);
  assert(
    completions.length === 0 && clock.pending() === 0,
    'resuming before settle cancels the abandoned completion',
  );
  note('HE');
  clock.advance(CONVERSION_COMPLETE_SETTLE_MS);
  assert(
    completions.length === 1 && completions[0] === 'HE',
    'the later settled result completes once',
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
