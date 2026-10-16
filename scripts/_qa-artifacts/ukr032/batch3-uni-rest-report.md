# UKR-032 Bidirectional Competitor Clipboard Audit

- **Captured at:** 2026-10-16T18:40:28.151Z
- **Batch label:** batch3-uni-rest
- **Baseline main:** 79fc2b086968a794c223bc73eb555347e4c604f1
- **PR branch head (pre-push):** see git
- **Engine changes:** none (audit only)
- **Equality rule:** exact string compare; no NFC/trim before match decision
- **Clipboard rule:** textarea never substituted as clipboard evidence

## Counts

| Scope | Tested | Matched | Mismatched | Skipped/unverified | Errors | Match% of verified |
|---|---:|---:|---:|---:|---:|---:|
| Batch total | 27 | 21 | 6 | 0 | 0 | 77.8% |
| uni-to-kd | 27 | 21 | 6 | 0 | 0 | 77.8% |

Corpus size for context: **207** input-only cases (not all necessarily tested in this batch).

## By category

| Category | Tested | Matched | Mismatched | Skipped | Match% verified |
|---|---:|---:|---:|---:|---:|
| uni-to-kd/core-hindi | 1 | 1 | 0 | 0 | 100.0% |
| uni-to-kd/matras | 6 | 6 | 0 | 0 | 100.0% |
| uni-to-kd/reph-conjunct | 6 | 4 | 2 | 0 | 66.7% |
| uni-to-kd/digits-punctuation | 5 | 3 | 2 | 0 | 60.0% |
| uni-to-kd/nukta-zwj | 7 | 5 | 2 | 0 | 71.4% |
| uni-to-kd/whitespace-and-english | 2 | 2 | 0 | 0 | 100.0% |

## Top discrepancies

### AUD158 (P2) — uni-to-kd / reph-conjunct

- Input: `"र्ग"`
- Competitor clipboard: `"j~x"` — `U+006A U+007E U+0078`
- UnicodeKruti clipboard: `"xZ"` — `U+0078 U+005A`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+0078 vs competitor U+006A

### AUD161 (P2) — uni-to-kd / reph-conjunct

- Input: `"श्र्य"`
- Competitor clipboard: `"';Z"` — `U+0027 U+003B U+005A`
- UnicodeKruti clipboard: `"Üz"` — `U+00DC U+007A`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+00DC vs competitor U+0027

### AUD177 (P2) — uni-to-kd / digits-punctuation

- Input: `"क/ख"`
- Competitor clipboard: `"d/[k"` — `U+0064 U+002F U+005B U+006B`
- UnicodeKruti clipboard: `"d@[k"` — `U+0064 U+0040 U+005B U+006B`
- Reproduced ×2 confirmed: **true**
- First diff index 1: ours U+0040 vs competitor U+002F

### AUD178 (P2) — uni-to-kd / digits-punctuation

- Input: `"क+ख"`
- Competitor clipboard: `"d+[k"` — `U+0064 U+002B U+005B U+006B`
- UnicodeKruti clipboard: `"d$[k"` — `U+0064 U+0024 U+005B U+006B`
- Reproduced ×2 confirmed: **true**
- First diff index 1: ours U+0024 vs competitor U+002B

### AUD189 (P3) — uni-to-kd / nukta-zwj

- Input: `"क्‌ष"`
- Competitor clipboard: `"D‌\"k"` — `U+0044 U+200C U+0022 U+006B`
- UnicodeKruti clipboard: `"{k"` — `U+007B U+006B`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+007B vs competitor U+0044

### AUD190 (P3) — uni-to-kd / nukta-zwj

- Input: `"क् ष"`
- Competitor clipboard: `"d~ \"k"` — `U+0064 U+007E U+0020 U+0022 U+006B`
- UnicodeKruti clipboard: `"D \"k"` — `U+0044 U+0020 U+0022 U+006B`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+0044 vs competitor U+0064

## Recommended next fixes

Do **not** change the engine in this PR. For each confirmed P1/P2 mismatch, open a minimal follow-up PR with competitor clipboard golden + negative controls for shipped UKR-020..030 cases.
