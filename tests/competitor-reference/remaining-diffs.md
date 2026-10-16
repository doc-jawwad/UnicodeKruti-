# Remaining competitor conversion differences

Captured against https://www.krutidevunicodeconverter.com/.

## Resolved

| Issue | Competitor | Fix |
|-------|------------|-----|
| UKR-020 कृ | `—` (U+2014) | `\u0915\u0943` → `\u2014` |
| UKR-021 दृ / दृश्य | `–';` (U+2013 …) | `\u0926\u0943` → `\u2013` (Copy To Clipboard reconfirmed 2026-10-16) |

See `uni-to-kd-kr-cluster.json` and `uni-to-kd-dr-cluster.json`.

## Still open (not in UKR-021)

| Unicode | Competitor KD | Ours | Notes |
|---------|---------------|------|-------|
| त्र्य | `R;Z` | `«` | Competitor expands; ours uses त्र्य ligature « which currently KD→Uni becomes `त्र्` (lossy) |
| चै | `pkS` | `pS` | Competitor collapses चै/चौ to `pkS` (lossy); we keep distinct `pS` / `pkS` |
| चौ | `pkS` | `pkS` | Match |

## KD → Unicode (space-before-matra)

Competitor example: KD `fd k` → Unicode `कि ा` (detached matra after space).

This is a lossy / unusual KD→Uni behavior on the competitor. Ours should continue to treat space as a word boundary unless a dedicated follow-up issue approves matching that lossy behavior.

## Round-trip implications

- Unicode `कृ*` ↔ KD `—*`, Unicode `दृ*` ↔ KD `–*` round-trip cleanly.
- Legacy KD `d\`` / `n\`` still **decode** to `कृ` / `दृ`.
- Uni re-encode after decoding those legacy forms yields competitor ligatures (`—` / `–`), not `d\`` / `n\``.

## Regression risk

Low for other syllables: `गृह`, `हृदय`, `वृक्ष` use consonant+` or dedicated ligatures. Global `\u0943` → `` ` `` is unchanged.
