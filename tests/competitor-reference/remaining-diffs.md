# Remaining competitor conversion differences

Captured against https://www.krutidevunicodeconverter.com/.

## Resolved

| Issue | Competitor | Fix |
|-------|------------|-----|
| UKR-020 कृ | `—` (U+2014) | `\u0915\u0943` → `\u2014` |
| UKR-021 दृ / दृश्य | `–';` (U+2013 …) | `\u0926\u0943` → `\u2013` |
| UKR-022 त्र्य | `R;Z` | Encode/decode `\u0924\u094d\u0930\u094d\u092f` ↔ `R;Z`; `त्र्या` ↔ `R;kZ`. `«` stays त्र् only. |
| UKR-023 चै | `pkS` | Encode `\u091a\u0948` → `pkS`; decode `pkS` → चै. चौ still encodes `pkS` (lossy). Global `ै`→`S` unchanged (कै=`dS`). |
| UKR-024 KD whitespace | `fd k` → `कि ा` | Preserve U+0020 before detached matra; PR #24 deployed and user live clipboard verified. |

See `uni-to-kd-kr-cluster.json`, `uni-to-kd-dr-cluster.json`, `uni-to-kd-trya-cluster.json`, `uni-to-kd-chai-cluster.json`.

## Still open — live clipboard recheck required (GitHub Issue #28)

The following values are **historical captures** from the 2026-10-16 UKR-024 investigation, **not newly retested** after the UKR-024 deployment. Do not modify conversion logic without fresh competitor-vs-live clipboard code points.

| KD input | Competitor (historical) | UnicodeKruti (historical, may now differ) | Investigation |
|----------|-------------------------|-------------------------------------------|---------------|
| `RZ;` | `तर््य` | `र्तय` | Unusual reph/virama ordering; preserve valid `R;Z` → `त्र्य` |
| `foHkkx Z` | `विभार्ग ` | `विभाग ` | Trailing whitespace before the reph marker; exact U+0020 matters |
| `d %` | `क:` (U+003A) | `कः` (historical, before UKR-024) | Contextual percent/visarga; current output may contain detached mark and space |

Tracking: https://github.com/doc-jawwad/UnicodeKruti-/issues/28

## KD → Unicode spaces — UKR-024 resolved

`fd k` → `कि ा` (U+0915 U+093F U+0020 U+093E) now matches the competitor. PR #24 was merged on 2026-10-16 and live clipboard verified by the site owner. The detached vowel sign is intentional competitor parity; do not reintroduce the removed whitespace-collapsing rule.

## Round-trip / lossy implications (UKR-023)

- `चै` ↔ `pkS` round-trips cleanly (competitor-aligned).
- `चौ` → `pkS` → `चै` is **irreversible**; do not invent a distinct KD spelling for चौ.
- Legacy `pS` still decodes to `चै` but is no longer the canonical Uni→KD of चै.
- Controls verified: `कै`=`dS`, `कौ`=`dkS`, `जै`=`tS`, `जौ`=`tkS` — collapse is च-only.
- कृ / दृ / त्र्य / त्र्या ligatures unchanged.

## Regression risk

Low: longest-match `\u091a\u0948` encode + `pkS` decode retarget only; global `ै`/`औ`/`kS`/`S` untouched.
