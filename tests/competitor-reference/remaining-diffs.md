# UKR-020 — Remaining competitor conversion differences

Captured against https://www.krutidevunicodeconverter.com/ on **2026-10-16**.  
These are **not** fixed in the UKR-020 PR (कृ → — only).

## Uni → KD

| Unicode | Competitor KD | Ours (post-UKR-020) | Notes |
|---------|---------------|---------------------|-------|
| दृश्य | `–';` (U+2013 …) | `n`; | Encoder lacks दृ → en-dash ligature (decode of U+2013 → दृ already exists) |
| त्र्य | `R;Z` | `«` | Competitor expands; ours uses त्र्य ligature « which currently KD→Uni becomes `त्र्` (lossy) |
| चै | `pkS` | `pS` | Competitor collapses चै/चौ to `pkS` (lossy); we keep distinct `pS` / `pkS` |
| चौ | `pkS` | `pkS` | Match |

## KD → Unicode (space-before-matra)

Competitor example: KD `fd k` → Unicode `कि ा` (detached matra after space).

This is a lossy / unusual KD→Uni behavior on the competitor. Ours should continue to treat space as a word boundary and not attach the following matra across space unless a dedicated follow-up issue approves matching that lossy behavior.

## Round-trip implications of UKR-020

- Unicode `कृ*` ↔ KD `—*` round-trips cleanly.
- Legacy KD `d` / `d`f"k` still **decodes** to `कृ` / `कृषि`.
- Encoding Unicode after decoding legacy `d`` yields `—` (competitor form), not `d``. That is intentional Uni→KD alignment, not a decode regression.

## Regression risk

Low for non-कृ syllables: `गृह`, `हृदय`, `वृक्ष` already matched competitor and use consonant+` or dedicated ligatures. Global `\u0943` → `` ` `` is unchanged.
