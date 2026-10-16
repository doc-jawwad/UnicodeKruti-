# UKR-032 audit artifacts

Bidirectional live clipboard parity vs https://www.krutidevunicodeconverter.com/

## How to re-run

```bash
# Discover DOM / smoke clipboard
node scripts/_ukr032-discover.mjs

# Batch (~30 per direction by default; stratified)
node scripts/_ukr032-bidirectional-audit.mjs --limit=30 --direction=both --batch-label=batchN

# One direction / expand
node scripts/_ukr032-bidirectional-audit.mjs --limit=30 --offset=30 --direction=kd-to-uni --batch-label=batchN-kd --no-negative-controls

# Merge batches → consolidated-report.md
node scripts/_ukr032-merge-report.mjs
```

## Evidence rules

- Match decisions use **clipboard** text only (`source: live-*-clipboard`).
- Textarea `field` is recorded for diagnosis; it is **never** silently substituted as clipboard evidence.
- Equality is exact (no NFC / trim) before classifying a mismatch.

## Key outputs

| File | Purpose |
|------|---------|
| `consolidated-report.md` | Human summary + top discrepancies |
| `consolidated-summary.json` | Machine counts + full mismatch list |
| `consolidated-observations.json` | All unique observations |
| `batch*-raw.json` | Per-batch raw clipboard evidence |
| `discover.json` | Competitor / UK DOM smoke |

Mirrored into `tests/competitor-reference/ukr032-audit-report.md` and `ukr032-audit-summary.json` for the PR.
