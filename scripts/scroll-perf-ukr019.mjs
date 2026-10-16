/**
 * UKR-019 scroll performance verification.
 *
 * Modes:
 *   --ab http://127.0.0.1:3019/     Same-origin A/B: inject main-era glass blur vs fixed CSS
 *   --before URL --after URL        Cross-URL comparison (prod vs local)
 *   --url URL --header-probe        Header blur on/off delta on fixed CSS
 */
import { chromium } from 'playwright';

const args = process.argv.slice(2);
function flag(name, fallback = null) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
}
const has = (name) => args.includes(name);

const BEFORE = flag('--before', null);
const AFTER = flag('--after', null);
const AB = flag('--ab', null);
const SINGLE = flag('--url', null);
const RUNS = Number(flag('--runs', '3'));
const HEADER_PROBE = has('--header-probe');

const LEGACY_GLASS_CSS = `
.glass-card {
  background: rgba(255,255,255,0.7) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
}
.quick-answer-box {
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  background: linear-gradient(135deg, rgba(217,79,0,0.03) 0%, rgba(255,255,255,0.95) 100%) !important;
}
`;

const HEADER_OFF_CSS = `
.site-header {
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  background: var(--bg-card, #ffffff) !important;
}
`;

const SCENARIOS = [
  { id: 'desk-empty-outside', vp: { width: 1280, height: 800 }, mobile: false, cpu: 6, overTextarea: false, populate: false },
  { id: 'desk-empty-inside', vp: { width: 1280, height: 800 }, mobile: false, cpu: 6, overTextarea: true, populate: false },
  { id: 'desk-filled-outside', vp: { width: 1280, height: 800 }, mobile: false, cpu: 6, overTextarea: false, populate: true },
  { id: 'desk-filled-inside', vp: { width: 1280, height: 800 }, mobile: false, cpu: 6, overTextarea: true, populate: true },
  { id: 'mob-empty-outside', vp: { width: 390, height: 844 }, mobile: true, cpu: 4, overTextarea: false, populate: false },
  { id: 'mob-empty-inside', vp: { width: 390, height: 844 }, mobile: true, cpu: 4, overTextarea: true, populate: false },
  { id: 'mob-filled-outside', vp: { width: 390, height: 844 }, mobile: true, cpu: 4, overTextarea: false, populate: true },
  { id: 'mob-filled-inside', vp: { width: 390, height: 844 }, mobile: true, cpu: 4, overTextarea: true, populate: true },
];

async function measureOnce(browser, url, scenario, injectCss = null) {
  const ctx = await browser.newContext({
    viewport: scenario.vp,
    isMobile: scenario.mobile,
    hasTouch: scenario.mobile,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: scenario.cpu });

  await page.addInitScript(() => {
    window.__lt = [];
    window.__ltMax = 0;
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          window.__lt.push(e.duration);
          if (e.duration > window.__ltMax) window.__ltMax = e.duration;
        }
      }).observe({ type: 'longtask', buffered: true });
    } catch {}
  });

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForSelector('#krutidev-input', { timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1500);
  if (injectCss) await page.addStyleTag({ content: injectCss });

  if (scenario.populate) {
    const sample = 'भारत एक विशाल देश है। '.repeat(120);
    try {
      await page.fill('#krutidev-input', sample);
      await page.waitForTimeout(500);
    } catch {}
  }

  const box = await page.locator('#krutidev-input').boundingBox().catch(() => null);
  await page.evaluate(() => {
    window.__lt = [];
    window.__ltMax = 0;
    window.__f = [];
    let last = performance.now();
    const tick = (now) => {
      window.__f.push(now - last);
      last = now;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);

  const x = scenario.overTextarea && box ? box.x + box.width / 2 : 8;
  const y =
    scenario.overTextarea && box
      ? box.y + Math.min(48, box.height / 2)
      : Math.min(420, scenario.vp.height - 40);
  await page.mouse.move(x, Math.max(y, 8));

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const steps = Math.min(120, Math.max(40, Math.floor(total / 140)));
  const delta = 110;

  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, delta);
    await page.waitForTimeout(16);
  }
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, -delta);
    await page.waitForTimeout(16);
  }

  await page.waitForTimeout(200);
  const result = await page.evaluate(() => {
    const frames = window.__f.slice(8).sort((a, b) => a - b);
    const n = frames.length || 1;
    const avg = frames.reduce((a, b) => a + b, 0) / n;
    const p95 = frames[Math.floor(n * 0.95)] ?? frames[n - 1];
    const dropped = frames.filter((x) => x > 25).length;
    return {
      frames: n,
      avgMs: +avg.toFixed(2),
      p95Ms: +(p95 ?? 0).toFixed(2),
      maxFrameMs: Math.round(frames[n - 1] ?? 0),
      droppedFrames: dropped,
      longTasks: window.__lt.length,
      maxLongTaskMs: Math.round(window.__ltMax || 0),
      longTaskTotalMs: Math.round(window.__lt.reduce((a, b) => a + b, 0)),
    };
  });

  await ctx.close();
  return result;
}

function medianBy(runs, key) {
  const sorted = [...runs].sort((a, b) => a[key] - b[key]);
  return sorted[Math.floor(sorted.length / 2)];
}

async function runScenario(browser, url, scenario, label, injectCss = null) {
  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    runs.push(await measureOnce(browser, url, scenario, injectCss));
  }
  const med = medianBy(runs, 'droppedFrames');
  return {
    label,
    scenario: scenario.id,
    median: med,
    runs: runs.map((r) => ({
      avg: r.avgMs,
      p95: r.p95Ms,
      dropped: r.droppedFrames,
      maxLT: r.maxLongTaskMs,
    })),
  };
}

function printResult(r) {
  const m = r.median;
  console.log(
    `${r.label.padEnd(10)} ${r.scenario.padEnd(22)} avg=${m.avgMs.toFixed(1)}ms  p95=${m.p95Ms.toFixed(1)}ms  dropped=${m.droppedFrames}  maxLT=${m.maxLongTaskMs}ms  (runs dropped: ${r.runs.map((x) => x.dropped).join('/')})`,
  );
}

const browser = await chromium.launch({ channel: 'msedge', headless: true });

try {
  if (HEADER_PROBE) {
    const url = SINGLE || AB || AFTER || 'http://127.0.0.1:3019/';
    console.log(`\n=== Header blur probe @ ${url} (${RUNS} runs/median) ===\n`);
    for (const id of ['desk-filled-outside', 'mob-filled-outside']) {
      const scenario = SCENARIOS.find((s) => s.id === id);
      const withBlur = await runScenario(browser, url, scenario, 'headerON');
      const noBlur = await runScenario(browser, url, scenario, 'headerOFF', HEADER_OFF_CSS);
      printResult(withBlur);
      printResult(noBlur);
      console.log(
        `  → dropped delta (ON-OFF): ${withBlur.median.droppedFrames - noBlur.median.droppedFrames}; p95 delta: ${(withBlur.median.p95Ms - noBlur.median.p95Ms).toFixed(1)}ms\n`,
      );
    }
  } else if (AB) {
    console.log(`\n=== UKR-019 same-origin A/B @ ${AB} (${RUNS} runs, median by dropped) ===`);
    console.log('BEFORE = inject main-era .glass-card/.quick-answer-box backdrop-filter');
    console.log('AFTER  = fixed CSS (no glass/quick-answer blur)\n');
    for (const scenario of SCENARIOS) {
      const before = await runScenario(browser, AB, scenario, 'BEFORE', LEGACY_GLASS_CSS);
      const after = await runScenario(browser, AB, scenario, 'AFTER', null);
      printResult(before);
      printResult(after);
      const dDrop = before.median.droppedFrames - after.median.droppedFrames;
      const dP95 = +(before.median.p95Ms - after.median.p95Ms).toFixed(1);
      const dAvg = +(before.median.avgMs - after.median.avgMs).toFixed(1);
      const dLT = before.median.maxLongTaskMs - after.median.maxLongTaskMs;
      console.log(`  Δ improved: avg ${dAvg}ms, p95 ${dP95}ms, dropped ${dDrop}, maxLT ${dLT}ms\n`);
    }
  } else if (BEFORE && AFTER) {
    console.log(`\n=== UKR-019 before/after URLs (${RUNS} runs) ===`);
    console.log(`BEFORE: ${BEFORE}`);
    console.log(`AFTER:  ${AFTER}\n`);
    for (const scenario of SCENARIOS) {
      const before = await runScenario(browser, BEFORE, scenario, 'BEFORE');
      const after = await runScenario(browser, AFTER, scenario, 'AFTER');
      printResult(before);
      printResult(after);
      const dDrop = before.median.droppedFrames - after.median.droppedFrames;
      const dP95 = +(before.median.p95Ms - after.median.p95Ms).toFixed(1);
      const dAvg = +(before.median.avgMs - after.median.avgMs).toFixed(1);
      console.log(`  Δ improved: avg ${dAvg}ms, p95 ${dP95}ms, dropped ${dDrop}\n`);
    }
  } else {
    const url = SINGLE || 'http://127.0.0.1:3019/';
    console.log(`\n=== Single URL scroll metrics @ ${url} ===\n`);
    for (const scenario of SCENARIOS) {
      printResult(await runScenario(browser, url, scenario, 'RUN'));
    }
  }
} finally {
  await browser.close();
}
