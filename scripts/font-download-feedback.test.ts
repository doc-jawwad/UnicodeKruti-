/**
 * Focused regression: font-download button feedback must not claim a verified save
 * on the unconfirmed fallback path. Analytics latch stays false for fallback.
 *
 * Run: npx tsx scripts/font-download-feedback.test.ts
 */
import assert from 'node:assert/strict';
import { canEmitFontDownloadResult } from '../src/lib/analytics/track';
import { FONT_DOWNLOAD_FEEDBACK } from '../src/components/font-download/font-download-feedback';

function ok(cond: boolean, msg: string) {
  assert.equal(cond, true, msg);
  console.log('PASS ', msg);
}

ok(
  FONT_DOWNLOAD_FEEDBACK.idle === 'Download',
  'idle label is Download',
);
ok(
  FONT_DOWNLOAD_FEEDBACK.loading === 'Downloading…',
  'loading label is Downloading…',
);
ok(
  FONT_DOWNLOAD_FEEDBACK.started === 'Download started',
  'success path uses Download started (not Downloaded!)',
);
ok(
  FONT_DOWNLOAD_FEEDBACK.fallback === 'Trying browser download…',
  'fallback uses non-confirming Trying browser download…',
);
ok(
  !Object.values(FONT_DOWNLOAD_FEEDBACK).some((v) => /downloaded!/i.test(v)),
  'no label claims Downloaded!',
);
ok(
  canEmitFontDownloadResult({
    resOk: true,
    blobReceived: true,
    usedFallback: false,
  }) === true,
  'analytics: primary blob path may emit download_result',
);
ok(
  canEmitFontDownloadResult({
    resOk: false,
    blobReceived: false,
    usedFallback: true,
  }) === false,
  'analytics: fallback must not emit download_result',
);

console.log('\nfont-download-feedback: all passed');
