# Kruti Dev 010 keyboard layout PDF

Builds `public/downloads/kruti-dev-010-keyboard-layout-a4.pdf` from
`src/lib/keyboard-map.ts` (same source as the page tables and widget).

Labels use **Noto Sans / Noto Sans Devanagari** (SIL OFL 1.1) from
`scripts/keyboard-pdf/fonts/`. No Kruti Dev or Mangal font is embedded.

## Prerequisites

Declared in the project `devDependencies`:

- `tsx` — runs the TypeScript build script
- `playwright` — headless Chromium PDF print

One-time Chromium download (not shipped in npm):

```bash
npx playwright install chromium
```

## Build command

From the project root (`UnicodeKruti-keyboard` / `unicodekruti-next`):

```bash
npm install
npx playwright install chromium
npm run build:keyboard-pdf
```

Optional: point at an existing Playwright install:

```bash
# Windows PowerShell
$env:PLAYWRIGHT_MODULE = "C:\path\to\playwright"
npm run build:keyboard-pdf
```

## Output checks

- Two A4 landscape pages (Normal, then Shift)
- Selectable Unicode Devanagari text
- Font licences: `OFL-NotoSans.txt`, `OFL-NotoSansDevanagari.txt`
