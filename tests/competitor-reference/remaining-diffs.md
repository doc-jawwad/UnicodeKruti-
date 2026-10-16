# Remaining competitor conversion differences

Captured against https://www.krutidevunicodeconverter.com/.

## Resolved

| Issue | Competitor | Fix |
|-------|------------|-----|
| UKR-020 कृ | `—` (U+2014) | `\u0915\u0943` → `\u2014` |
| UKR-021 दृ / दृश्य | `–';` (U+2013 …) | `\u0926\u0943` → `\u2013` |
| UKR-022 त्र्य | `R;Z` | Encode/decode `\u0924\u094d\u0930\u094d\u092f` ↔ `R;Z`; `त्र्या` ↔ `R;kZ`. `«` stays त्र् only. |
| UKR-023 चै | `pkS` | Encode `\u091a\u0948` → `pkS`; decode `pkS` → चै. चौ still encodes `pkS` (lossy). Global `ै`→`S` unchanged (कै=`dS`). |
| UKR-024 KD whitespace | `fd k` → `कि ा` | Preserve U+0020 before detached matra; PR #24 deployed and user live clipboard verified. |
| UKR-028 `RZ;` | `तर््य` | Longest-match `RZ;` → U+0924 U+0930 U+094D U+094D U+092F; preserve र+्+् in cleanup. `R;Z` → `त्र्य` unchanged. |
| UKR-028 `foHkkx Z` | `विभार्ग ` | `applyZReph` skips U+0020 when scanning back; spaces remain (trailing). |
| UKR-028 `d %` | `क:` (U+003A) | Spaced visarga → ASCII colon (` +ः` → `:`). Unspaced `d%` → `कः` unchanged. |

See `uni-to-kd-kr-cluster.json`, `uni-to-kd-dr-cluster.json`, `uni-to-kd-trya-cluster.json`, `uni-to-kd-chai-cluster.json`.
Golden KD→Uni fixtures: `tests/krutidev010/reverse_bugs/cases.json` REV29–REV38.

## Live clipboard verification (Issue #28) — 2026-10-16

Method: Playwright Edge (Chromium-based); competitor Copy button + our `#krutidev-output` Copy; code points from clipboard JSON (`scripts/_ukr028-live-capture.mjs` → `scripts/_qa-artifacts/ukr028/live-capture.json`).

| KD input | Competitor | Ours after UKR-028 | Match |
|----------|------------|--------------------|-------|
| `RZ;` | तर््य (U+0924 U+0930 U+094D U+094D U+092F) | same | yes |
| `R;Z` | त्र्य | त्र्य | yes (control) |
| `R;kZ` | त्र्या | त्र्या | yes (control) |
| `foHkkx Z` | विभार्ग␠ | same | yes |
| `foHkkxZ` | विभार्ग | विभार्ग | yes (control) |
| `d %` | क: (U+0915 U+003A) | same | yes |
| `d%` | कः | कः | yes (control) |
| `fd k` | कि ा | कि ा | yes (control) |
| `ln~ Hkko` | सद् भाव | सद् भाव | yes (control) |
| `—` / `–` / `pkS` | कृ / दृ / चै | same | yes (controls) |

### Still differing (out of UKR-028 target scope)

| KD input | Competitor | Ours | Notes |
|----------|------------|------|-------|
| `Z;` | `Zय` (U+005A U+092F) | `य` | Draft UKR-030 fix: preserve unattached literal `Z`; hosted reph remains unchanged |
| `1%` | `1ः` (U+0031 U+0903) | `1:` | Draft UKR-030 fix: leave ASCII digit + visarga intact |
| `1 %` | `1:` | `1:` | Existing contextual spaced-% control, not a mismatch |

**UKR-030 draft (not yet deployed):** `src/lib/converter/engine.ts` now retains unattached `Z` and avoids ASCII digit+visarga colon normalization, with exact REV39–REV41 fixtures. Validate competitor clipboard and controls (all ASCII digits, standalone/leading `Z`, reph, spacing) before merging. This table records the **production mismatch at sprint start**, not the new draft output.

Do **not** claim full conversion parity from this sample.

## KD → Unicode spaces — UKR-024 resolved

`fd k` → `कि ा` (U+0915 U+093F U+0020 U+093E) now matches the competitor. PR #24 was merged on 2026-10-16 and live clipboard verified by the site owner. The detached vowel sign is intentional competitor parity; do not reintroduce the removed whitespace-collapsing rule.

## Round-trip / lossy implications (UKR-023)

- `चै` ↔ `pkS` round-trips cleanly (competitor-aligned).
- `चौ` → `pkS` → `चै` is **irreversible**; do not invent a distinct KD spelling for चौ.
- Legacy `pS` still decodes to `चै` but is no longer the canonical Uni→KD of चै.
- Controls verified: `कै`=`dS`, `कौ`=`dkS`, `जै`=`tS`, `जौ`=`tkS` — collapse is च-only.
- कृ / दृ / त्र्य / त्र्या ligatures unchanged.

## Regression risk

UKR-028: longest-match `RZ;` + narrow cleanup/reph tweaks only. `R;Z`, UKR-024 spaces, and unspaced `%` / `foHkkxZ` protected by golden fixtures.
