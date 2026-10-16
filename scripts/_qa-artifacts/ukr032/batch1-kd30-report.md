# UKR-032 Bidirectional Competitor Clipboard Audit

- **Captured at:** 2026-10-16T18:24:29.407Z
- **Batch label:** batch1-kd30
- **Baseline main:** 79fc2b086968a794c223bc73eb555347e4c604f1
- **PR branch head (pre-push):** see git
- **Engine changes:** none (audit only)
- **Equality rule:** exact string compare; no NFC/trim before match decision
- **Clipboard rule:** textarea never substituted as clipboard evidence

## Counts

| Scope | Tested | Matched | Mismatched | Skipped/unverified | Errors | Match% of verified |
|---|---:|---:|---:|---:|---:|---:|
| Batch total | 39 | 35 | 4 | 0 | 0 | 89.7% |
| kd-to-uni | 39 | 35 | 4 | 0 | 0 | 89.7% |

Corpus size for context: **207** input-only cases (not all necessarily tested in this batch).

## By category

| Category | Tested | Matched | Mismatched | Skipped | Match% verified |
|---|---:|---:|---:|---:|---:|
| kd-to-uni/core | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/matra-ikar | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/reph-rakar | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/visarga-digits | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/punctuation | 4 | 4 | 0 | 0 | 100.0% |
| kd-to-uni/nukta-half-conjunct | 4 | 0 | 4 | 0 | 0.0% |
| kd-to-uni/whitespace-boundaries | 3 | 3 | 0 | 0 | 100.0% |
| kd-to-uni/mixed-and-unsupported | 3 | 3 | 0 | 0 | 100.0% |
| kd-to-uni/negative-control | 9 | 9 | 0 | 0 | 100.0% |

## Top discrepancies

### AUD077 (P2-nukta-composition) — kd-to-uni / nukta-half-conjunct

- Input: `"d+"`
- Competitor clipboard: `"क़"` — `U+0958`
- UnicodeKruti clipboard: `"क़"` — `U+0915 U+093C`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+0915 vs competitor U+0958

### AUD078 (P2-nukta-composition) — kd-to-uni / nukta-half-conjunct

- Input: `"x+"`
- Competitor clipboard: `"ग़"` — `U+095A`
- UnicodeKruti clipboard: `"ग़"` — `U+0917 U+093C`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+0917 vs competitor U+095A

### AUD079 (P2-nukta-composition) — kd-to-uni / nukta-half-conjunct

- Input: `"t+"`
- Competitor clipboard: `"ज़"` — `U+095B`
- UnicodeKruti clipboard: `"ज़"` — `U+091C U+093C`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+091C vs competitor U+095B

### AUD080 (P2-nukta-composition) — kd-to-uni / nukta-half-conjunct

- Input: `"M+"`
- Competitor clipboard: `"ड़"` — `U+095C`
- UnicodeKruti clipboard: `"ड़"` — `U+0921 U+093C`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+0921 vs competitor U+095C

## Recommended next fixes

Do **not** change the engine in this PR. For each confirmed P1/P2 mismatch, open a minimal follow-up PR with competitor clipboard golden + negative controls for shipped UKR-020..030 cases.
