/**
 * Merge UKR-032 batch raw JSON files into one consolidated audit report.
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join('scripts', '_qa-artifacts', 'ukr032');
mkdirSync(OUT, { recursive: true });

const files = readdirSync(OUT)
  .filter((f) => f.endsWith('-raw.json') && !f.includes('partial'))
  .sort();

const byKey = new Map();
const batchMeta = [];

for (const f of files) {
  const data = JSON.parse(readFileSync(join(OUT, f), 'utf8'));
  batchMeta.push({
    file: f,
    batchLabel: data.meta?.batchLabel,
    capturedAt: data.meta?.capturedAt,
    count: data.observations?.length ?? 0,
  });
  for (const o of data.observations || []) {
    const key = `${o.case.direction}\0${o.case.input}\0${o.id}`;
    // Prefer observations that include reproductions / later batches
    const prev = byKey.get(key);
    if (
      !prev ||
      (o.reproductions && !prev.reproductions) ||
      (o.status === 'mismatch' && prev.status !== 'mismatch')
    ) {
      byKey.set(key, { ...o, _batch: f });
    }
  }
}

function refineSeverity(o) {
  if (o.status !== 'mismatch') return null;
  const inp = o.case.input;
  const cat = o.case.category || '';
  const comp = o.competitor?.clipboard ?? '';
  const ours = o.ours?.clipboard ?? '';
  const dir = o.case.direction;

  const nuktaPre = /[\u0958-\u095F]/;
  const nuktaComb = /\u093C/;
  if (
    (nuktaPre.test(comp) && nuktaComb.test(ours)) ||
    (nuktaPre.test(ours) && nuktaComb.test(comp))
  ) {
    return {
      severity: 'P2',
      class: 'nukta-composition',
      note: 'Precomposed nukta letter (U+0958–095F) vs base+nukta (U+093C); usually display-equivalent',
    };
  }

  // Uni→KD: competitor drops combining nukta (+) for several letters
  if (
    dir === 'uni-to-kd' &&
    nuktaComb.test(inp) &&
    ours.includes('+') &&
    !comp.includes('+')
  ) {
    return {
      severity: 'P2',
      class: 'nukta-encode-drop',
      note: 'Competitor Uni→KD drops + nukta marker for this letter; ours keeps d+/x+/…',
    };
  }

  // Explicit र+् vs Z-reph / shr+rakar ligature style
  if (
    dir === 'uni-to-kd' &&
    (/j~/.test(comp) ||
      /Z/.test(ours + comp) ||
      /Üz|';Z/.test(ours + comp)) &&
    /र्|्र|र्य|र्क|र्ग|श्र्य|श्र/.test(inp)
  ) {
    return {
      severity: 'P2',
      class: 'reph-encoding-style',
      note: 'Competitor often encodes reph as j~+C or JZ; ours uses Z / Üz / rakar ligatures',
    };
  }

  if (/[\u200C\u200D]/.test(inp) || /zwj|zwnj/i.test(cat)) {
    return {
      severity: 'P3',
      class: 'joiner-zwj-zwnj',
      note: 'ZWJ/ZWNJ present; competitor preserves joiner bytes more literally',
    };
  }

  if (dir === 'kd-to-uni' && /\\n|\\r|\n|\r/.test(JSON.stringify(inp)) && /Z/.test(inp)) {
    return {
      severity: 'P2',
      class: 'reph-across-newline',
      note: 'Competitor attaches Z-reph across newline; ours leaves literal Z after break',
    };
  }

  if (inp === 'ABC dk;Z XYZ') {
    return {
      severity: 'P2',
      class: 'mixed-latin-kd-reph',
      note: 'Latin letters treated as KD glyphs; reph/order differs on trailing Latin cluster',
    };
  }

  if (dir === 'kd-to-uni' && /^Z(\s+Z)/.test(inp)) {
    return {
      severity: 'P2',
      class: 'bare-z-sequence',
      note: 'Multiple unattached Z tokens; competitor keeps later Z literal, ours may reph-attach',
    };
  }

  if (dir === 'uni-to-kd' && (inp.includes('/') || inp.includes('+'))) {
    return {
      severity: 'P2',
      class: 'punctuation-encode-alias',
      note: 'Slash/plus Unicode→KD map differs (competitor keeps ASCII /+; ours Remington @ $)',
    };
  }

  if (dir === 'kd-to-uni' && /^\d+\s+%/.test(inp)) {
    return {
      severity: 'P2',
      class: 'spaced-percent-collapse',
      note: 'Multi-space before %: competitor keeps a space before colon; ours collapses',
    };
  }

  if (dir === 'uni-to-kd' && inp === 'त्र्') {
    return {
      severity: 'P2',
      class: 'lossy-half-conjunct-alias',
      note: 'Incomplete त्र्: competitor r~[space]; ours « (decode-only ligature)',
    };
  }

  if (inp.length >= 6 && !/[+~]/.test(inp)) {
    return {
      severity: 'P1',
      class: 'phrase-level',
      note: 'Affects multi-character / phrase output',
    };
  }

  return {
    severity: 'P2',
    class: 'contextual',
    note: 'Verified clipboard mismatch; review before engine change',
  };
}

const observations = [...byKey.values()];
// Dedupe negative controls overlapping corpus by preferring corpus id when same input
const deduped = [];
const seenInputDir = new Map();
for (const o of observations) {
  const k = o.case.direction + '\0' + o.case.input;
  const prev = seenInputDir.get(k);
  if (!prev) {
    seenInputDir.set(k, o);
    deduped.push(o);
  } else if (String(o.id).startsWith('AUD') && String(prev.id).startsWith('NEG')) {
    // replace
    const idx = deduped.indexOf(prev);
    deduped[idx] = o;
    seenInputDir.set(k, o);
  }
}

const enriched = deduped.map((o) => {
  const clf = refineSeverity(o);
  return {
    ...o,
    severity: clf?.severity ?? o.severity,
    mismatchClass: clf?.class ?? null,
    severityNote: clf?.note ?? null,
  };
});

function bucket() {
  return { tested: 0, matched: 0, mismatched: 0, skipped: 0, errors: 0 };
}
function addRates(b) {
  const verified = b.matched + b.mismatched;
  const pct = (n, d) => (d ? `${((100 * n) / d).toFixed(1)}%` : 'n/a');
  return {
    ...b,
    verified,
    matchRateOfVerified: pct(b.matched, verified),
    mismatchRateOfVerified: pct(b.mismatched, verified),
    matchRateOfTested: pct(b.matched, b.tested),
  };
}

const totals = bucket();
const byDirection = {};
const byCategory = {};
const byClass = {};

for (const o of enriched) {
  const d = (byDirection[o.case.direction] ??= bucket());
  const c = (byCategory[`${o.case.direction}/${o.case.category}`] ??= bucket());
  for (const b of [totals, d, c]) {
    b.tested++;
    if (o.status === 'match') b.matched++;
    else if (o.status === 'mismatch') b.mismatched++;
    else if (o.status === 'error') b.errors++;
    else b.skipped++;
  }
  if (o.status === 'mismatch') {
    const cls = o.mismatchClass || 'unclassified';
    byClass[cls] = (byClass[cls] || 0) + 1;
  }
}

const mismatches = enriched
  .filter((o) => o.status === 'mismatch')
  .map((o) => ({
    id: o.id,
    direction: o.case.direction,
    category: o.case.category,
    input: o.case.input,
    inputJson: JSON.stringify(o.case.input),
    competitor: o.competitor.clipboard,
    competitorJson: JSON.stringify(o.competitor.clipboard),
    competitorCps: o.competitor.codePoints,
    ours: o.ours.clipboard,
    oursJson: JSON.stringify(o.ours.clipboard),
    oursCps: o.ours.codePoints,
    severity: o.severity,
    mismatchClass: o.mismatchClass,
    severityNote: o.severityNote,
    reproducedConfirmed: o.reproducedConfirmed ?? null,
    fieldMatchesClipboard: {
      competitor: o.competitor.fieldMatchesClipboard,
      ours: o.ours.fieldMatchesClipboard,
    },
    sources: {
      competitor: o.competitor.source,
      ours: o.ours.source,
    },
  }));

/** Inputs that must stay matched after UKR-020…030 (checked against corpus results). */
const NEGATIVE_CONTROL_INPUTS = [
  { direction: 'kd-to-uni', input: 'RZ;', label: 'UKR-028 RZ;' },
  { direction: 'kd-to-uni', input: 'R;Z', label: 'UKR-022/028 R;Z' },
  { direction: 'kd-to-uni', input: 'R;kZ', label: 'UKR-022/028 R;kZ' },
  { direction: 'kd-to-uni', input: 'foHkkx Z', label: 'UKR-028 foHkkx Z' },
  { direction: 'kd-to-uni', input: 'd %', label: 'UKR-028 d %' },
  { direction: 'kd-to-uni', input: 'd%', label: 'UKR-028 d%' },
  { direction: 'kd-to-uni', input: 'fd k', label: 'UKR-024 fd k' },
  { direction: 'kd-to-uni', input: 'Z;', label: 'UKR-030 Z;' },
  { direction: 'kd-to-uni', input: '1%', label: 'UKR-030 1%' },
  { direction: 'kd-to-uni', input: '1 %', label: 'UKR-030 1 %' },
  { direction: 'kd-to-uni', input: 'Z', label: 'UKR-030 bare Z' },
  { direction: 'kd-to-uni', input: 'pkS', label: 'UKR-023 pkS' },
  { direction: 'kd-to-uni', input: '\u2014', label: 'UKR-020 emdash' },
  { direction: 'kd-to-uni', input: '\u2013', label: 'UKR-021 endash' },
  { direction: 'uni-to-kd', input: 'त्र्य', label: 'UKR-022 त्र्य' },
  { direction: 'uni-to-kd', input: 'चै', label: 'UKR-023 चै' },
  { direction: 'uni-to-kd', input: 'कृ', label: 'UKR-020 कृ' },
  { direction: 'uni-to-kd', input: 'दृ', label: 'UKR-021 दृ' },
];

const negControls = NEGATIVE_CONTROL_INPUTS.map((n) => {
  const hit = enriched.find(
    (o) => o.case.direction === n.direction && o.case.input === n.input,
  );
  return {
    ...n,
    id: hit?.id ?? null,
    status: hit?.status ?? 'missing-from-audit',
    match: hit?.match ?? null,
  };
});

// Prefer one exemplar per mismatch class, then fill remaining by severity/class
const top = [];
const seenClass = new Set();
const ranked = [...mismatches].sort((a, b) => {
  const rank = { P1: 0, P2: 1, P3: 2 };
  const ra = rank[a.severity] ?? 9;
  const rb = rank[b.severity] ?? 9;
  if (ra !== rb) return ra - rb;
  return String(a.mismatchClass).localeCompare(String(b.mismatchClass));
});
for (const m of ranked) {
  if (!seenClass.has(m.mismatchClass)) {
    top.push(m);
    seenClass.add(m.mismatchClass);
  }
}
for (const m of ranked) {
  if (top.length >= 12) break;
  if (!top.includes(m)) top.push(m);
}

const summary = {
  corpusSampleCount: 207,
  uniqueObservations: enriched.length,
  batches: batchMeta,
  totals: addRates(totals),
  byDirection: Object.fromEntries(
    Object.entries(byDirection).map(([k, v]) => [k, addRates(v)]),
  ),
  byCategory: Object.fromEntries(
    Object.entries(byCategory).map(([k, v]) => [k, addRates(v)]),
  ),
  mismatchClassCounts: byClass,
  mismatchCount: mismatches.length,
  mismatches,
  topDiscrepancies: top.slice(0, 12),
  negativeControls: {
    tested: negControls.filter((o) => o.status !== 'missing-from-audit').length,
    matched: negControls.filter((o) => o.status === 'match').length,
    mismatched: negControls.filter((o) => o.status === 'mismatch').length,
    missing: negControls.filter((o) => o.status === 'missing-from-audit').length,
    cases: negControls,
  },
};

const md = [];
md.push('# UKR-032 — Consolidated Bidirectional Competitor Clipboard Audit');
md.push('');
md.push(`- **Generated:** ${new Date().toISOString()}`);
md.push(`- **Competitor:** https://www.krutidevunicodeconverter.com/ (+ unicode-to-krutidev-converter.php)`);
md.push(`- **UnicodeKruti:** production K2U + homepage U2K`);
md.push(`- **Method:** Playwright Edge; **Copy To Clipboard** / **Copy result** only`);
md.push(`- **Equality:** exact code-point compare (no NFC/trim)`);
md.push(`- **Engine changes in this PR:** none`);
md.push('');
md.push('## Headline counts');
md.push('');
md.push('| Scope | Tested | Matched | Mismatched | Skipped | Errors | Match% of verified |');
md.push('|---|---:|---:|---:|---:|---:|---:|');
const row = (label, b) =>
  `| ${label} | ${b.tested} | ${b.matched} | ${b.mismatched} | ${b.skipped} | ${b.errors} | ${b.matchRateOfVerified} |`;
md.push(row('All unique cases', summary.totals));
for (const [k, v] of Object.entries(summary.byDirection)) md.push(row(k, v));
md.push('');
md.push(
  `Denominator: **${summary.totals.tested}** unique live clipboard comparisons (corpus has 207 input-only seeds; negative controls included when not already in corpus).`,
);
md.push('');
md.push('## Negative controls (shipped UKR-020…030)');
md.push('');
md.push(
  `Checked **${summary.negativeControls.tested}** known goldens inside the 207-case matrix: matched **${summary.negativeControls.matched}**, mismatched **${summary.negativeControls.mismatched}**, missing **${summary.negativeControls.missing}**.`,
);
md.push('');
md.push('| Label | Direction | Input | Status |');
md.push('|---|---|---|---|');
for (const n of summary.negativeControls.cases) {
  md.push(
    `| ${n.label} | ${n.direction} | \`${JSON.stringify(n.input)}\` | **${n.status}** |`,
  );
}
md.push('');
md.push('## Mismatch classes');
md.push('');
md.push('| Class | Count |');
md.push('|---|---:|');
for (const [k, n] of Object.entries(summary.mismatchClassCounts).sort(
  (a, b) => b[1] - a[1],
)) {
  md.push(`| ${k} | ${n} |`);
}
md.push('');
md.push('## Top discrepancies (fix backlog)');
md.push('');
for (const d of summary.topDiscrepancies) {
  md.push(`### ${d.id} — ${d.severity} / ${d.mismatchClass}`);
  md.push('');
  md.push(`- Direction/category: \`${d.direction}\` / \`${d.category}\``);
  md.push(`- Input: \`${d.inputJson}\``);
  md.push(
    `- Competitor: \`${d.competitorJson}\` — \`${(d.competitorCps || []).join(' ')}\``,
  );
  md.push(
    `- UnicodeKruti: \`${d.oursJson}\` — \`${(d.oursCps || []).join(' ')}\``,
  );
  md.push(`- Reproduced ×2: **${d.reproducedConfirmed}**`);
  md.push(`- Note: ${d.severityNote}`);
  md.push('');
}
md.push('## Recommended next fixes (separate PRs — not this audit)');
md.push('');
md.push('1. **Nukta KD→Uni composition (P2):** optionally NFC-map base+nukta → U+0958–095F to match competitor clipboard bytes (display usually identical). Protect decode goldens.');
md.push('2. **Nukta Uni→KD drop (P2):** competitor often emits `d`/`x`/`t`/`Q` without `+` for क़/ग़/ज़/फ़; decide intentional lossy vs parity. Note `ड़`/`ढ़` still keep `M+`/`<+` on both sides.');
md.push('3. **Reph Uni→KD style (P2):** `र्य`/`र्क`/`र्ग` → competitor `j~;`/`j~d`/`j~x` vs ours `;Z`/`dZ`/`xZ`. High impact on round-trips; needs careful golden design.');
md.push('4. **Reph across newline (P2):** `d\\nZ` family — competitor attaches reph; ours preserves literal `Z` after break.');
md.push('5. **Punctuation Uni→KD (P2):** `/` and `+` → competitor keeps ASCII; ours Remington `@`/`$` (plus conflicts with nukta marker).');
md.push('6. **ZWJ/ZWNJ क्ष (P3):** competitor preserves joiners; ours normalizes to `{k`.');
md.push('7. **Do not regress** UKR-020…030 controls (`RZ;`, `R;Z`, `foHkkx Z`, `d %`, `fd k`, `Z;`, `1%`, `pkS`, `—`, `–`, `त्र्य`, `चै`, `कृ`, `दृ`).');
md.push('');
md.push('## By category');
md.push('');
md.push('| Category | Tested | Matched | Mismatched | Match% verified |');
md.push('|---|---:|---:|---:|---:|');
for (const [k, v] of Object.entries(summary.byCategory).sort()) {
  md.push(
    `| ${k} | ${v.tested} | ${v.matched} | ${v.mismatched} | ${v.matchRateOfVerified} |`,
  );
}
md.push('');

writeFileSync(join(OUT, 'consolidated-summary.json'), JSON.stringify(summary, null, 2));
writeFileSync(join(OUT, 'consolidated-report.md'), md.join('\n'));
writeFileSync(join(OUT, 'latest-summary.json'), JSON.stringify(summary, null, 2));
writeFileSync(join(OUT, 'latest-report.md'), md.join('\n'));
writeFileSync(
  join(OUT, 'consolidated-observations.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      batches: batchMeta,
      observations: enriched,
    },
    null,
    2,
  ),
);

console.log(JSON.stringify({ totals: summary.totals, byDirection: summary.byDirection, mismatchClassCounts: byClass, top: summary.topDiscrepancies.map(t => t.id) }, null, 2));
console.log('Wrote consolidated-report.md');
