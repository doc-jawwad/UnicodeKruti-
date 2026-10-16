# Remaining competitor conversion differences

Captured against https://www.krutidevunicodeconverter.com/.

## Resolved

| Issue | Competitor | Fix |
|-------|------------|-----|
| UKR-020 कृ | `—` (U+2014) | `\u0915\u0943` → `\u2014` |
| UKR-021 दृ / दृश्य | `–';` (U+2013 …) | `\u0926\u0943` → `\u2013` |
| UKR-022 त्र्य | `R;Z` | Encode/decode `\u0924\u094d\u0930\u094d\u092f` ↔ `R;Z`; `त्र्या` ↔ `R;kZ`. `«` stays त्र् only. |

See `uni-to-kd-kr-cluster.json`, `uni-to-kd-dr-cluster.json`, `uni-to-kd-trya-cluster.json`.

## Still open (not in UKR-022)

| Unicode / KD | Competitor | Ours | Notes |
|--------------|------------|------|-------|
| चै | `pkS` | `pS` | Competitor collapses चै/चौ to `pkS` (lossy); we keep distinct `pS` / `pkS` |
| चौ | `pkS` | `pkS` | Match |
| KD `RZ;` | `तर््य` | `र्तय` | Odd KD order; not emitted by Uni→KD of त्र्य |

## KD → Unicode (space-before-matra)

Competitor example: KD `fd k` → Unicode `कि ा` (detached matra after space).

Ours should continue to treat space as a word boundary unless a dedicated follow-up issue approves matching that lossy behavior.

## Round-trip implications

- `त्र्य` ↔ `R;Z` and `त्र्या` ↔ `R;kZ` round-trip cleanly (competitor-aligned).
- Legacy `«` still decodes to `त्र्` only (same as competitor).
- कृ / दृ ligatures unchanged.

## Regression risk

Low: explicit longest-match keys only; global `ृ`, Z-reph walk-back, and other conjuncts untouched.
