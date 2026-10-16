# UKR-035A QA report — competitor reph encoding

**Branch:** `fix/ukr035-standalone-reph-encoding`  
**Issue:** #36 · **PR:** #37  
**Engine change:** replace whitespace-token overrides with competitor `unikruti.js` leading-`र्` quirk (`while (pohr > 0)`).

## Phase 1 — Live clipboard (exact code points, no NFC/trim)

Local production build (`http://127.0.0.1:3017`) vs https://www.krutidevunicodeconverter.com/

### Uni → KD

| Case | Competitor | Ours | Match |
|------|------------|------|-------|
| र्य | `j~;` | `j~;` | yes |
| र्क | `j~d` | `j~d` | yes |
| र्ग | `j~x` | `j~x` | yes |
| श्र्य | `';Z` | `';Z` | yes |
| र्य र्क र्ग श्र्य | `j~; j~d j~x J~;` | same | yes |
| कार्य र्य | `dk;Z ;Z` | same | yes |
| र्य, | `j~;]` | same | yes |
| धर्म / कार्य / कार्यक्रम / त्र्य | controls | same | yes |

**11/11 matched.**

### KD → Uni (reverse + UKR-020…030)

| Input | Competitor | Ours | Match |
|-------|------------|------|-------|
| j~; / j~d / j~x | र्य / र्क / र्ग | same | yes |
| `';Z` | श्र्य | श्र्य | yes (**not lossy**) |
| Üz | श््र (broken) | श्र्य | intentional DIFF — legacy alias better than competitor |
| R;Z, fd k, Z;, pkS, —, –, RZ;, foHkkx Z, d %, 1% | controls | same | yes |

**14/15 matched** (Üz legacy-only intentional).

## Phase 2 — Lossiness

- **श्र्य ↔ `';Z`:** round-trips after adding decode ligature `';Z` → श्र्य.
- **`J~;`:** decodes to श्र्य (phrase form when leading-`र्` suppresses moves).
- **Üz:** still decodes to श्र्य (ours); competitor Üz→श््र — do not treat competitor Üz as golden.

## Phase 3 — Tests

| Command | Result |
|---------|--------|
| `npm run test:converter` | **PASS** — 1026 + autodetect + 211 fixtures + 122 Updesh + 113 live-validate + 102 audit |
| `npx tsc --noEmit` | **PASS** |
| ESLint (touched files) | **PASS** |
| `npm run build` | **PASS** |
| Playwright main U2K/K2U vs competitor | **11/11 + 14/15** (see above) |
| Playwright Updesh | see `updesh-pw.json` |

## Implementation note

Root cause in competitor `js/unikruti.js`: reph relocation uses `while (pohr > 0)`, so strings **starting with `र्`** never relocate reph → literal `र+्+C` → `j~C`. Embedded `र्` (कार्य, धर्म, तर्क) still becomes trailing ASCII `Z`. Whitespace-token overrides were the wrong model (`कार्य र्य` / `र्य,` failed).

## Remaining differences (out of scope)

- Competitor Üz decode quirk (we keep useful legacy alias)
- Other UKR-032 classes (nukta, punctuation `/`/`+`, ZWJ, newline-reph) — Issue #35
