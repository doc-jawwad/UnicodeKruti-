# Remaining competitor conversion differences

Captured against https://www.krutidevunicodeconverter.com/.

## Resolved

| Issue | Competitor | Fix |
|-------|------------|-----|
| UKR-020 कृ | `—` (U+2014) | `\u0915\u0943` → `\u2014` |
| UKR-021 दृ / दृश्य | `–';` (U+2013 …) | `\u0926\u0943` → `\u2013` |
| UKR-022 त्र्य | `R;Z` | Encode/decode `\u0924\u094d\u0930\u094d\u092f` ↔ `R;Z`; `त्र्या` ↔ `R;kZ`. `«` stays त्र् only. |
| UKR-023 चै | `pkS` | Encode `\u091a\u0948` → `pkS`; decode `pkS` → चै. चौ still encodes `pkS` (lossy). Global `ै`→`S` unchanged (कै=`dS`). |

See `uni-to-kd-kr-cluster.json`, `uni-to-kd-dr-cluster.json`, `uni-to-kd-trya-cluster.json`, `uni-to-kd-chai-cluster.json`.

## Still open

| Unicode / KD | Competitor | Ours | Notes |
|--------------|------------|------|-------|
| KD `RZ;` | `तर््य` | `र्तय` | Odd KD order; not emitted by Uni→KD of त्र्य |

## KD → Unicode (space-before-matra)

Competitor example: KD `fd k` → Unicode `कि ा` (detached matra after space).

Ours should continue to treat space as a word boundary unless a dedicated follow-up issue approves matching that lossy behavior.

## Round-trip / lossy implications (UKR-023)

- `चै` ↔ `pkS` round-trips cleanly (competitor-aligned).
- `चौ` → `pkS` → `चै` is **irreversible**; do not invent a distinct KD spelling for चौ.
- Legacy `pS` still decodes to `चै` but is no longer the canonical Uni→KD of चै.
- Controls verified: `कै`=`dS`, `कौ`=`dkS`, `जै`=`tS`, `जौ`=`tkS` — collapse is च-only.
- कृ / दृ / त्र्य / त्र्या ligatures unchanged.

## Regression risk

Low: longest-match `\u091a\u0948` encode + `pkS` decode retarget only; global `ै`/`औ`/`kS`/`S` untouched.
