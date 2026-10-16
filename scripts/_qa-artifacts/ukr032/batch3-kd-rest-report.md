# UKR-032 Bidirectional Competitor Clipboard Audit

- **Captured at:** 2026-10-16T18:37:34.390Z
- **Batch label:** batch3-kd-rest
- **Baseline main:** 79fc2b086968a794c223bc73eb555347e4c604f1
- **PR branch head (pre-push):** see git
- **Engine changes:** none (audit only)
- **Equality rule:** exact string compare; no NFC/trim before match decision
- **Clipboard rule:** textarea never substituted as clipboard evidence

## Counts

| Scope | Tested | Matched | Mismatched | Skipped/unverified | Errors | Match% of verified |
|---|---:|---:|---:|---:|---:|---:|
| Batch total | 60 | 54 | 6 | 0 | 0 | 90.0% |
| kd-to-uni | 60 | 54 | 6 | 0 | 0 | 90.0% |

Corpus size for context: **207** input-only cases (not all necessarily tested in this batch).

## By category

| Category | Tested | Matched | Mismatched | Skipped | Match% verified |
|---|---:|---:|---:|---:|---:|
| kd-to-uni/punctuation | 9 | 9 | 0 | 0 | 100.0% |
| kd-to-uni/nukta-half-conjunct | 12 | 11 | 1 | 0 | 91.7% |
| kd-to-uni/whitespace-boundaries | 7 | 4 | 3 | 0 | 57.1% |
| kd-to-uni/mixed-and-unsupported | 4 | 3 | 1 | 0 | 75.0% |
| kd-to-uni/core | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/matra-ikar | 7 | 7 | 0 | 0 | 100.0% |
| kd-to-uni/reph-rakar | 8 | 8 | 0 | 0 | 100.0% |
| kd-to-uni/visarga-digits | 9 | 8 | 1 | 0 | 88.9% |

## Top discrepancies

### AUD056 (P2) — kd-to-uni / visarga-digits

- Input: `"0  %"`
- Competitor clipboard: `"0 :"` — `U+0030 U+0020 U+003A`
- UnicodeKruti clipboard: `"0:"` — `U+0030 U+003A`
- Reproduced ×2 confirmed: **true**
- First diff index 1: ours U+003A vs competitor U+0020

### AUD119 (P3) — kd-to-uni / mixed-and-unsupported

- Input: `"Z Z; Zk"`
- Competitor clipboard: `"Z Zय Zा"` — `U+005A U+0020 U+005A U+092F U+0020 U+005A U+093E`
- UnicodeKruti clipboard: `"Z Zर्य ा"` — `U+005A U+0020 U+005A U+0930 U+094D U+092F U+0020 U+093E`
- Reproduced ×2 confirmed: **true**
- First diff index 3: ours U+0930 vs competitor U+092F

### AUD107 (P3) — kd-to-uni / whitespace-boundaries

- Input: `"d\nZ"`
- Competitor clipboard: `"कर्\r\n"` — `U+0915 U+0930 U+094D U+000D U+000A`
- UnicodeKruti clipboard: `"क\r\nZ"` — `U+0915 U+000D U+000A U+005A`
- Reproduced ×2 confirmed: **true**
- First diff index 1: ours U+000D vs competitor U+0930

### AUD108 (P3) — kd-to-uni / whitespace-boundaries

- Input: `"d \nZ"`
- Competitor clipboard: `"क र्\r\n"` — `U+0915 U+0020 U+0930 U+094D U+000D U+000A`
- UnicodeKruti clipboard: `"क \r\nZ"` — `U+0915 U+0020 U+000D U+000A U+005A`
- Reproduced ×2 confirmed: **true**
- First diff index 2: ours U+000D vs competitor U+0930

### AUD109 (P3) — kd-to-uni / whitespace-boundaries

- Input: `"d \r\nZ"`
- Competitor clipboard: `"क र्\r\n"` — `U+0915 U+0020 U+0930 U+094D U+000D U+000A`
- UnicodeKruti clipboard: `"क \r\nZ"` — `U+0915 U+0020 U+000D U+000A U+005A`
- Reproduced ×2 confirmed: **true**
- First diff index 2: ours U+000D vs competitor U+0930

### AUD084 (P2-nukta-composition) — kd-to-uni / nukta-half-conjunct

- Input: `"[+"`
- Competitor clipboard: `"ख़्"` — `U+0959 U+094D`
- UnicodeKruti clipboard: `"ख़्"` — `U+0916 U+093C U+094D`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+0916 vs competitor U+0959

## Recommended next fixes

Do **not** change the engine in this PR. For each confirmed P1/P2 mismatch, open a minimal follow-up PR with competitor clipboard golden + negative controls for shipped UKR-020..030 cases.
