# UKR-032 Bidirectional Competitor Clipboard Audit

- **Captured at:** 2026-10-16T18:27:25.784Z
- **Batch label:** batch1-uni30
- **Baseline main:** 79fc2b086968a794c223bc73eb555347e4c604f1
- **PR branch head (pre-push):** see git
- **Engine changes:** none (audit only)
- **Equality rule:** exact string compare; no NFC/trim before match decision
- **Clipboard rule:** textarea never substituted as clipboard evidence

## Counts

| Scope | Tested | Matched | Mismatched | Skipped/unverified | Errors | Match% of verified |
|---|---:|---:|---:|---:|---:|---:|
| Batch total | 33 | 28 | 5 | 0 | 0 | 84.8% |
| uni-to-kd | 33 | 28 | 5 | 0 | 0 | 84.8% |

Corpus size for context: **207** input-only cases (not all necessarily tested in this batch).

## By category

| Category | Tested | Matched | Mismatched | Skipped | Match% verified |
|---|---:|---:|---:|---:|---:|
| uni-to-kd/core-hindi | 5 | 5 | 0 | 0 | 100.0% |
| uni-to-kd/matras | 5 | 5 | 0 | 0 | 100.0% |
| uni-to-kd/reph-conjunct | 5 | 4 | 1 | 0 | 80.0% |
| uni-to-kd/digits-punctuation | 5 | 5 | 0 | 0 | 100.0% |
| uni-to-kd/nukta-zwj | 5 | 1 | 4 | 0 | 20.0% |
| uni-to-kd/whitespace-and-english | 5 | 5 | 0 | 0 | 100.0% |
| uni-to-kd/negative-control | 3 | 3 | 0 | 0 | 100.0% |

## Top discrepancies

### AUD151 (P2) — uni-to-kd / reph-conjunct

- Input: `"त्र्"`
- Competitor clipboard: `"r~ "` — `U+0072 U+007E U+0020`
- UnicodeKruti clipboard: `"«"` — `U+00AB`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+00AB vs competitor U+0072

### AUD179 (P3) — uni-to-kd / nukta-zwj

- Input: `"क़"`
- Competitor clipboard: `"d"` — `U+0064`
- UnicodeKruti clipboard: `"d+"` — `U+0064 U+002B`
- Reproduced ×2 confirmed: **true**
- First diff index 1: ours U+002B vs competitor null

### AUD180 (P3) — uni-to-kd / nukta-zwj

- Input: `"ग़"`
- Competitor clipboard: `"x"` — `U+0078`
- UnicodeKruti clipboard: `"x+"` — `U+0078 U+002B`
- Reproduced ×2 confirmed: **true**
- First diff index 1: ours U+002B vs competitor null

### AUD181 (P3) — uni-to-kd / nukta-zwj

- Input: `"ज़"`
- Competitor clipboard: `"t"` — `U+0074`
- UnicodeKruti clipboard: `"t+"` — `U+0074 U+002B`
- Reproduced ×2 confirmed: **true**
- First diff index 1: ours U+002B vs competitor null

### AUD182 (P3) — uni-to-kd / nukta-zwj

- Input: `"फ़"`
- Competitor clipboard: `"Q"` — `U+0051`
- UnicodeKruti clipboard: `"Q+"` — `U+0051 U+002B`
- Reproduced ×2 confirmed: **true**
- First diff index 1: ours U+002B vs competitor null

## Recommended next fixes

Do **not** change the engine in this PR. For each confirmed P1/P2 mismatch, open a minimal follow-up PR with competitor clipboard golden + negative controls for shipped UKR-020..030 cases.
