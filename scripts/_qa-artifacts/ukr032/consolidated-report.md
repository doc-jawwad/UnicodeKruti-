# UKR-032 — Consolidated Bidirectional Competitor Clipboard Audit

- **Generated:** 2026-10-16T18:44:43.086Z
- **Competitor:** https://www.krutidevunicodeconverter.com/ (+ unicode-to-krutidev-converter.php)
- **UnicodeKruti:** production K2U + homepage U2K
- **Method:** Playwright Edge; **Copy To Clipboard** / **Copy result** only
- **Equality:** exact code-point compare (no NFC/trim)
- **Engine changes in this PR:** none

## Headline counts

| Scope | Tested | Matched | Mismatched | Skipped | Errors | Match% of verified |
|---|---:|---:|---:|---:|---:|---:|
| All unique cases | 207 | 176 | 31 | 0 | 0 | 85.0% |
| kd-to-uni | 120 | 106 | 14 | 0 | 0 | 88.3% |
| uni-to-kd | 87 | 70 | 17 | 0 | 0 | 80.5% |

Denominator: **207** unique live clipboard comparisons (corpus has 207 input-only seeds; negative controls included when not already in corpus).

## Negative controls (shipped UKR-020…030)

Checked **18** known goldens inside the 207-case matrix: matched **18**, mismatched **0**, missing **0**.

| Label | Direction | Input | Status |
|---|---|---|---|
| UKR-028 RZ; | kd-to-uni | `"RZ;"` | **match** |
| UKR-022/028 R;Z | kd-to-uni | `"R;Z"` | **match** |
| UKR-022/028 R;kZ | kd-to-uni | `"R;kZ"` | **match** |
| UKR-028 foHkkx Z | kd-to-uni | `"foHkkx Z"` | **match** |
| UKR-028 d % | kd-to-uni | `"d %"` | **match** |
| UKR-028 d% | kd-to-uni | `"d%"` | **match** |
| UKR-024 fd k | kd-to-uni | `"fd k"` | **match** |
| UKR-030 Z; | kd-to-uni | `"Z;"` | **match** |
| UKR-030 1% | kd-to-uni | `"1%"` | **match** |
| UKR-030 1 % | kd-to-uni | `"1 %"` | **match** |
| UKR-030 bare Z | kd-to-uni | `"Z"` | **match** |
| UKR-023 pkS | kd-to-uni | `"pkS"` | **match** |
| UKR-020 emdash | kd-to-uni | `"—"` | **match** |
| UKR-021 endash | kd-to-uni | `"–"` | **match** |
| UKR-022 त्र्य | uni-to-kd | `"त्र्य"` | **match** |
| UKR-023 चै | uni-to-kd | `"चै"` | **match** |
| UKR-020 कृ | uni-to-kd | `"कृ"` | **match** |
| UKR-021 दृ | uni-to-kd | `"दृ"` | **match** |

## Mismatch classes

| Class | Count |
|---|---:|
| nukta-composition | 8 |
| nukta-encode-drop | 7 |
| reph-encoding-style | 4 |
| joiner-zwj-zwnj | 3 |
| reph-across-newline | 3 |
| punctuation-encode-alias | 2 |
| lossy-half-conjunct-alias | 1 |
| mixed-latin-kd-reph | 1 |
| bare-z-sequence | 1 |
| spaced-percent-collapse | 1 |

## Top discrepancies (fix backlog)

### AUD119 — P2 / bare-z-sequence

- Direction/category: `kd-to-uni` / `mixed-and-unsupported`
- Input: `"Z Z; Zk"`
- Competitor: `"Z Zय Zा"` — `U+005A U+0020 U+005A U+092F U+0020 U+005A U+093E`
- UnicodeKruti: `"Z Zर्य ा"` — `U+005A U+0020 U+005A U+0930 U+094D U+092F U+0020 U+093E`
- Reproduced ×2: **true**
- Note: Multiple unattached Z tokens; competitor keeps later Z literal, ours may reph-attach

### AUD151 — P2 / lossy-half-conjunct-alias

- Direction/category: `uni-to-kd` / `reph-conjunct`
- Input: `"त्र्"`
- Competitor: `"r~ "` — `U+0072 U+007E U+0020`
- UnicodeKruti: `"«"` — `U+00AB`
- Reproduced ×2: **true**
- Note: Incomplete त्र्: competitor r~[space]; ours « (decode-only ligature)

### AUD115 — P2 / mixed-latin-kd-reph

- Direction/category: `kd-to-uni` / `mixed-and-unsupported`
- Input: `"ABC dk;Z XYZ"`
- Competitor: `"।ठब् कार्य ग्लर््"` — `U+0964 U+0920 U+092C U+094D U+0020 U+0915 U+093E U+0930 U+094D U+092F U+0020 U+0917 U+094D U+0932 U+0930 U+094D U+094D`
- UnicodeKruti: `"।ठब् कार्य र्ग्ल"` — `U+0964 U+0920 U+092C U+094D U+0020 U+0915 U+093E U+0930 U+094D U+092F U+0020 U+0930 U+094D U+0917 U+094D U+0932`
- Reproduced ×2: **true**
- Note: Latin letters treated as KD glyphs; reph/order differs on trailing Latin cluster

### AUD077 — P2 / nukta-composition

- Direction/category: `kd-to-uni` / `nukta-half-conjunct`
- Input: `"d+"`
- Competitor: `"क़"` — `U+0958`
- UnicodeKruti: `"क़"` — `U+0915 U+093C`
- Reproduced ×2: **true**
- Note: Precomposed nukta letter (U+0958–095F) vs base+nukta (U+093C); usually display-equivalent

### AUD179 — P2 / nukta-encode-drop

- Direction/category: `uni-to-kd` / `nukta-zwj`
- Input: `"क़"`
- Competitor: `"d"` — `U+0064`
- UnicodeKruti: `"d+"` — `U+0064 U+002B`
- Reproduced ×2: **true**
- Note: Competitor Uni→KD drops + nukta marker for this letter; ours keeps d+/x+/…

### AUD177 — P2 / punctuation-encode-alias

- Direction/category: `uni-to-kd` / `digits-punctuation`
- Input: `"क/ख"`
- Competitor: `"d/[k"` — `U+0064 U+002F U+005B U+006B`
- UnicodeKruti: `"d@[k"` — `U+0064 U+0040 U+005B U+006B`
- Reproduced ×2: **true**
- Note: Slash/plus Unicode→KD map differs (competitor keeps ASCII /+; ours Remington @ $)

### AUD107 — P2 / reph-across-newline

- Direction/category: `kd-to-uni` / `whitespace-boundaries`
- Input: `"d\nZ"`
- Competitor: `"कर्\r\n"` — `U+0915 U+0930 U+094D U+000D U+000A`
- UnicodeKruti: `"क\r\nZ"` — `U+0915 U+000D U+000A U+005A`
- Reproduced ×2: **true**
- Note: Competitor attaches Z-reph across newline; ours leaves literal Z after break

### AUD156 — P2 / reph-encoding-style

- Direction/category: `uni-to-kd` / `reph-conjunct`
- Input: `"र्य"`
- Competitor: `"j~;"` — `U+006A U+007E U+003B`
- UnicodeKruti: `";Z"` — `U+003B U+005A`
- Reproduced ×2: **true**
- Note: Competitor often encodes reph as j~+C or JZ; ours uses Z / Üz / rakar ligatures

### AUD056 — P2 / spaced-percent-collapse

- Direction/category: `kd-to-uni` / `visarga-digits`
- Input: `"0  %"`
- Competitor: `"0 :"` — `U+0030 U+0020 U+003A`
- UnicodeKruti: `"0:"` — `U+0030 U+003A`
- Reproduced ×2: **true**
- Note: Multi-space before %: competitor keeps a space before colon; ours collapses

### AUD188 — P3 / joiner-zwj-zwnj

- Direction/category: `uni-to-kd` / `nukta-zwj`
- Input: `"क्‍ष"`
- Competitor: `"D‍\"k"` — `U+0044 U+200D U+0022 U+006B`
- UnicodeKruti: `"{k"` — `U+007B U+006B`
- Reproduced ×2: **true**
- Note: ZWJ/ZWNJ present; competitor preserves joiner bytes more literally

### AUD078 — P2 / nukta-composition

- Direction/category: `kd-to-uni` / `nukta-half-conjunct`
- Input: `"x+"`
- Competitor: `"ग़"` — `U+095A`
- UnicodeKruti: `"ग़"` — `U+0917 U+093C`
- Reproduced ×2: **true**
- Note: Precomposed nukta letter (U+0958–095F) vs base+nukta (U+093C); usually display-equivalent

### AUD079 — P2 / nukta-composition

- Direction/category: `kd-to-uni` / `nukta-half-conjunct`
- Input: `"t+"`
- Competitor: `"ज़"` — `U+095B`
- UnicodeKruti: `"ज़"` — `U+091C U+093C`
- Reproduced ×2: **true**
- Note: Precomposed nukta letter (U+0958–095F) vs base+nukta (U+093C); usually display-equivalent

## Clipboard versus text-field newline normalization

11 of 207 observations have LF (U+000A) in textarea values but CRLF (U+000D U+000A) in both sites' actual copied clipboard strings. These 11 are **not unverified**: both clipboard sources were present and code-point compared directly. This is browser clipboard line-ending handling; it does not by itself indicate a conversion error.

## Recommended next fixes (separate PRs — not this audit)

1. **Nukta KD→Uni composition (P2):** competitor copies precomposed U+0958–095F while ours copies base+U+093C (usually visually equivalent). **NFC decomposes U+0958–095F rather than composing them**; the existing decoder calls `.normalize('NFC')`, so an explicit precomposed mapping would not survive that step. First choose the product compatibility policy; any exact-byte override needs tightly scoped handling plus regression controls, not a generic NFC call.
2. **Nukta Uni→KD drop (P2):** competitor often emits `d`/`x`/`t`/`Q` without `+` for क़/ग़/ज़/फ़; decide intentional lossy vs parity. Note `ड़`/`ढ़` still keep `M+`/`<+` on both sides.
3. **Reph Uni→KD style (P2):** `र्य`/`र्क`/`र्ग` → competitor `j~;`/`j~d`/`j~x` vs ours `;Z`/`dZ`/`xZ`. High impact on round-trips; needs careful golden design.
4. **Reph across newline (P2):** `d\nZ` family — competitor attaches reph; ours preserves literal `Z` after break.
5. **Punctuation Uni→KD (P2):** `/` and `+` → competitor keeps ASCII; ours Remington `@`/`$` (plus conflicts with nukta marker).
6. **ZWJ/ZWNJ क्ष (P3):** competitor preserves joiners; ours normalizes to `{k`.
7. **Do not regress** UKR-020…030 controls (`RZ;`, `R;Z`, `foHkkx Z`, `d %`, `fd k`, `Z;`, `1%`, `pkS`, `—`, `–`, `त्र्य`, `चै`, `कृ`, `दृ`).

## By category

| Category | Tested | Matched | Mismatched | Match% verified |
|---|---:|---:|---:|---:|
| kd-to-uni/core | 12 | 12 | 0 | 100.0% |
| kd-to-uni/matra-ikar | 15 | 15 | 0 | 100.0% |
| kd-to-uni/mixed-and-unsupported | 11 | 9 | 2 | 81.8% |
| kd-to-uni/nukta-half-conjunct | 19 | 11 | 8 | 57.9% |
| kd-to-uni/punctuation | 16 | 16 | 0 | 100.0% |
| kd-to-uni/reph-rakar | 16 | 16 | 0 | 100.0% |
| kd-to-uni/visarga-digits | 17 | 16 | 1 | 94.1% |
| kd-to-uni/whitespace-boundaries | 14 | 11 | 3 | 78.6% |
| uni-to-kd/core-hindi | 11 | 11 | 0 | 100.0% |
| uni-to-kd/digits-punctuation | 15 | 13 | 2 | 86.7% |
| uni-to-kd/matras | 16 | 16 | 0 | 100.0% |
| uni-to-kd/nukta-zwj | 17 | 9 | 8 | 52.9% |
| uni-to-kd/reph-conjunct | 16 | 11 | 5 | 68.8% |
| uni-to-kd/whitespace-and-english | 12 | 10 | 2 | 83.3% |
