# UKR-032 Bidirectional Competitor Clipboard Audit

- **Captured at:** 2026-10-16T18:30:06.266Z
- **Batch label:** batch2-kd30
- **Baseline main:** 79fc2b086968a794c223bc73eb555347e4c604f1
- **PR branch head (pre-push):** see git
- **Engine changes:** none (audit only)
- **Equality rule:** exact string compare; no NFC/trim before match decision
- **Clipboard rule:** textarea never substituted as clipboard evidence

## Counts

| Scope | Tested | Matched | Mismatched | Skipped/unverified | Errors | Match% of verified |
|---|---:|---:|---:|---:|---:|---:|
| Batch total | 30 | 26 | 4 | 0 | 0 | 86.7% |
| kd-to-uni | 30 | 26 | 4 | 0 | 0 | 86.7% |

Corpus size for context: **207** input-only cases (not all necessarily tested in this batch).

## By category

| Category | Tested | Matched | Mismatched | Skipped | Match% verified |
|---|---:|---:|---:|---:|---:|
| kd-to-uni/whitespace-boundaries | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/mixed-and-unsupported | 4 | 3 | 1 | 0 | 75.0% |
| kd-to-uni/core | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/matra-ikar | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/reph-rakar | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/visarga-digits | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/punctuation | 3 | 3 | 0 | 0 | 100.0% |
| kd-to-uni/nukta-half-conjunct | 3 | 0 | 3 | 0 | 0.0% |

## Top discrepancies

### AUD115 (P3) — kd-to-uni / mixed-and-unsupported

- Input: `"ABC dk;Z XYZ"`
- Competitor clipboard: `"।ठब् कार्य ग्लर््"` — `U+0964 U+0920 U+092C U+094D U+0020 U+0915 U+093E U+0930 U+094D U+092F U+0020 U+0917 U+094D U+0932 U+0930 U+094D U+094D`
- UnicodeKruti clipboard: `"।ठब् कार्य र्ग्ल"` — `U+0964 U+0920 U+092C U+094D U+0020 U+0915 U+093E U+0930 U+094D U+092F U+0020 U+0930 U+094D U+0917 U+094D U+0932`
- Reproduced ×2 confirmed: **true**
- First diff index 11: ours U+0930 vs competitor U+0917

### AUD081 (P2-nukta-composition) — kd-to-uni / nukta-half-conjunct

- Input: `"<+"`
- Competitor clipboard: `"ढ़"` — `U+095D`
- UnicodeKruti clipboard: `"ढ़"` — `U+0922 U+093C`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+0922 vs competitor U+095D

### AUD082 (P2-nukta-composition) — kd-to-uni / nukta-half-conjunct

- Input: `"Q+"`
- Competitor clipboard: `"फ़"` — `U+095E`
- UnicodeKruti clipboard: `"फ़"` — `U+092B U+093C`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+092B vs competitor U+095E

### AUD083 (P2-nukta-composition) — kd-to-uni / nukta-half-conjunct

- Input: `";+"`
- Competitor clipboard: `"य़"` — `U+095F`
- UnicodeKruti clipboard: `"य़"` — `U+092F U+093C`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+092F vs competitor U+095F

## Recommended next fixes

Do **not** change the engine in this PR. For each confirmed P1/P2 mismatch, open a minimal follow-up PR with competitor clipboard golden + negative controls for shipped UKR-020..030 cases.
