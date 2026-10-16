# UKR-032 Bidirectional Competitor Clipboard Audit

- **Captured at:** 2026-10-16T18:33:15.336Z
- **Batch label:** batch2-uni30
- **Baseline main:** 79fc2b086968a794c223bc73eb555347e4c604f1
- **PR branch head (pre-push):** see git
- **Engine changes:** none (audit only)
- **Equality rule:** exact string compare; no NFC/trim before match decision
- **Clipboard rule:** textarea never substituted as clipboard evidence

## Counts

| Scope | Tested | Matched | Mismatched | Skipped/unverified | Errors | Match% of verified |
|---|---:|---:|---:|---:|---:|---:|
| Batch total | 30 | 24 | 6 | 0 | 0 | 80.0% |
| uni-to-kd | 30 | 24 | 6 | 0 | 0 | 80.0% |

Corpus size for context: **207** input-only cases (not all necessarily tested in this batch).

## By category

| Category | Tested | Matched | Mismatched | Skipped | Match% verified |
|---|---:|---:|---:|---:|---:|
| uni-to-kd/core-hindi | 5 | 5 | 0 | 0 | 100.0% |
| uni-to-kd/matras | 5 | 5 | 0 | 0 | 100.0% |
| uni-to-kd/reph-conjunct | 5 | 3 | 2 | 0 | 60.0% |
| uni-to-kd/digits-punctuation | 5 | 5 | 0 | 0 | 100.0% |
| uni-to-kd/nukta-zwj | 5 | 3 | 2 | 0 | 60.0% |
| uni-to-kd/whitespace-and-english | 5 | 3 | 2 | 0 | 60.0% |

## Top discrepancies

### AUD156 (P2) — uni-to-kd / reph-conjunct

- Input: `"र्य"`
- Competitor clipboard: `"j~;"` — `U+006A U+007E U+003B`
- UnicodeKruti clipboard: `";Z"` — `U+003B U+005A`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+003B vs competitor U+006A

### AUD157 (P2) — uni-to-kd / reph-conjunct

- Input: `"र्क"`
- Competitor clipboard: `"j~d"` — `U+006A U+007E U+0064`
- UnicodeKruti clipboard: `"dZ"` — `U+0064 U+005A`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+0064 vs competitor U+006A

### AUD185 (P3) — uni-to-kd / nukta-zwj

- Input: `"य़"`
- Competitor clipboard: `";"` — `U+003B`
- UnicodeKruti clipboard: `";+"` — `U+003B U+002B`
- Reproduced ×2 confirmed: **true**
- First diff index 1: ours U+002B vs competitor null

### AUD204 (P3) — uni-to-kd / whitespace-and-english

- Input: `"दफ़्तर (दिल्ली)"`
- Competitor clipboard: `"n¶rj ¼fnYyh½"` — `U+006E U+00B6 U+0072 U+006A U+0020 U+00BC U+0066 U+006E U+0059 U+0079 U+0068 U+00BD`
- UnicodeKruti clipboard: `"n¶+rj ¼fnYyh½"` — `U+006E U+00B6 U+002B U+0072 U+006A U+0020 U+00BC U+0066 U+006E U+0059 U+0079 U+0068 U+00BD`
- Reproduced ×2 confirmed: **true**
- First diff index 2: ours U+002B vs competitor U+0072

### AUD188 (P3) — uni-to-kd / nukta-zwj

- Input: `"क्‍ष"`
- Competitor clipboard: `"D‍\"k"` — `U+0044 U+200D U+0022 U+006B`
- UnicodeKruti clipboard: `"{k"` — `U+007B U+006B`
- Reproduced ×2 confirmed: **true**
- First diff index 0: ours U+007B vs competitor U+0044

### AUD205 (P3) — uni-to-kd / whitespace-and-english

- Input: `"अंग्रेज़ी English"`
- Competitor clipboard: `"vaxzsth English"` — `U+0076 U+0061 U+0078 U+007A U+0073 U+0074 U+0068 U+0020 U+0045 U+006E U+0067 U+006C U+0069 U+0073 U+0068`
- UnicodeKruti clipboard: `"vaxzst+h English"` — `U+0076 U+0061 U+0078 U+007A U+0073 U+0074 U+002B U+0068 U+0020 U+0045 U+006E U+0067 U+006C U+0069 U+0073 U+0068`
- Reproduced ×2 confirmed: **true**
- First diff index 6: ours U+002B vs competitor U+0068

## Recommended next fixes

Do **not** change the engine in this PR. For each confirmed P1/P2 mismatch, open a minimal follow-up PR with competitor clipboard golden + negative controls for shipped UKR-020..030 cases.
