# UnicodeKruti — Astro + Cloudflare Workers POC

Branch: `feat/astro-cloudflare-poc`  
Workers preview: `https://unicodekruti-astro-poc.docjawwadahmad.workers.dev`  
Production (unchanged): `https://unicodekruti.com` on Vercel / Next.js

## 1. POC architecture

```
astro-poc/
  Astro SSG (trailingSlash: always)
  + @astrojs/react islands (converter host only)
  + Cloudflare Worker (seo-edge.ts) + Workers Assets (dist/)
```

- Ordinary pages are **static HTML** at build time.
- Converter interactivity is a **client-only React island** that portals into Astro-rendered WP HTML mounts.
- Edge SEO (slash / legacy 308 / hard 404) lives in a **thin Worker** with `run_worker_first: true`.

## 2. Files/components reused

| Source | Use |
|--------|-----|
| `src/content/home.ts`, `k2u.ts`, `about-us-schemas.ts` | Meta + FAQ + schema inputs |
| `src/content/wp-html/home.html`, `krutidev-to-unicode-converter.html` | Page bodies |
| `src/lib/wp-html.ts` (`renderWpHtml`) | Shortcode → mount HTML |
| `src/components/seo/schema.ts` | JSON-LD |
| `src/components/converter/*` + `src/lib/converter/*` | Converter engine + UI |
| `src/components/seo/Analytics.tsx`, `RelatedTools` | Analytics + related tools |
| `src/lib/site-redirects.ts` patterns (subset in Worker) | Edge rules |
| `public/*` (synced) | Fonts, OG, icons, pdf worker |

## 3. Components rebuilt in Astro

- `BaseLayout.astro` — title/canonical/OG/Twitter/JSON-LD
- `SiteHeader.astro` / `SiteFooter.astro` — static chrome (+ tiny nav script)
- `about-us` page body as static React→HTML (`AboutUsBody.tsx`, no client hydration)
- `404.astro`, `sitemap.xml.ts`, `robots.txt.ts`

## 4. React islands used

| Island | Hydration | Role |
|--------|-----------|------|
| `ConverterHostIsland` | `client:only="react"` | Portals `ClientConverter` / `RelatedTools` into `.kdc-wp-mount` |
| `Analytics` | `client:idle` | GA4 + Clarity (same IDs / behavior) |

**Not** used as page-wide React: WP HTML is `set:html` in Astro so H1/body are crawlable without JS.

Next shims: `next/link`, `next/navigation`, `next/dynamic`, `next/image`, `next/script`.

## 5. Edge routing implementation

Worker: `src/worker/seo-edge.ts`  
Config: `wrangler.jsonc` (`html_handling: force-trailing-slash`, `not_found_handling: 404-page`, `run_worker_first: true`)

| Behavior | Mechanism |
|----------|-----------|
| `/foo` → `/foo/` | Worker 308 (+ CF html_handling) |
| www → apex | Worker 308 (skipped on `*.workers.dev`) |
| Legacy (e.g. `/krutidev-to-unicode`, `/about`, `/home`) | Worker 308 |
| `/wp-admin`, `/blog/*` unknown | 404 + `X-Robots-Tag: noindex, nofollow` |
| Static files | `ASSETS` binding |

`public/_headers` copies CSP-lite security / cache headers into the asset bundle.

## 6. SEO parity results

Offline check (`scripts/offline-seo-parity.test.ts`) against source-of-truth:

| Page | Title / description / canonical / robots / OG / Twitter / JSON-LD / H1 |
|------|------------------------------------------------------------------------|
| `/` | **PASS** |
| `/krutidev-to-unicode-converter/` | **PASS** |
| `/about-us/` | **PASS** |
| `robots.txt` | **PASS** (Allow:/, sitemap, no root block) |
| `sitemap.xml` | **PASS** (3 POC URLs, trailing-slash form) |

Live Workers preview titles verified via fetch for home / K2U / about.

## 7. Redirect matrix

Against local `wrangler dev` (`http://127.0.0.1:8787`):

| Case | Result |
|------|--------|
| `/` → 200 | PASS |
| `/krutidev-to-unicode-converter` → `/…/` (≤1 hop) | PASS |
| `/about-us` → `/about-us/` | PASS |
| `/krutidev-to-unicode` → K2U canonical | PASS |
| `/about` → `/about-us/` | PASS |
| `/home` → `/` | PASS |
| `/wp-admin/` → 404 + noindex | PASS |
| `/blog/does-not-exist/` → 404 + noindex | PASS |

No multi-hop chains observed in the matrix.

## 8. Converter results

- Parent `npm run test:converter` (from `astro-poc`): **PASS** (engine unchanged).
- Production `ConverterApp` reused via island + Next shims.
- Browser smoke on preview: converter markup/skeleton mounts present; full UI requires JS (expected).

## 9. Analytics results

- Same `Analytics` component + default GA (`G-YVDR26LEM8`) / Clarity (`xjq5psm0fo`).
- Events still emit from converter latches when island loads.
- Host-independent; no Vercel Analytics SDK.

## 10. PWA findings

- Production SW (`public/sw.js` / Workbox) **not** migrated.
- Current SW caches `/_next/static` and `/_next/image` — **incompatible** with Astro `/_astro/*` asset paths.
- POC does **not** claim PWA parity.
- Full rebuild must regenerate Workbox for `/_astro/` and drop `/_next/image` rules.

## 11. Performance comparison

| Signal | Observation |
|--------|-------------|
| HTML | Home ~95 KB, K2U ~132 KB, About ~34 KB (static, includes body) |
| Hydrated components | Converter host + Analytics only (not full page React) |
| JS | Converter chunks still large (engine + html2pdf/pdfjs) — expected for tool pages |
| Content pages | About ships without converter island → less client JS |
| Lighthouse / CWV | Not automated in CI here; local/preview qualitative only |

Do **not** treat chunk size as a proven % win vs Next until full Lighthouse on both hosts.

## 12. Known differences

| Item | Class | Notes |
|------|-------|-------|
| Default edge OG `/opengraph-image` vs static `/og/*` | EXPECTED | POC uses static featured OG (same as page metadata) |
| Header/search UX simplified vs Next `SiteHeader` | EXPECTED | Nav + versions only; full search not ported |
| Floating widgets / PWA install not on POC | EXPECTED | Out of POC scope |
| Worker legacy table is a **subset** of production | EXPECTED | Enough to prove pattern |
| www→apex untested on workers.dev | EXPECTED | Logic present; needs custom domain to verify |
| `next/image` → plain `<img>` | EXPECTED | No runtime optimizer |
| Network SEO compare script may timeout from some runners | NEEDS DECISION | Use offline parity + manual preview |

## 13. Remaining migration work

- Port remaining ~14 routes
- Full legacy redirect + hard-404 table parity
- Full header (search), floating widgets, contact form, font-download islands
- PWA Workbox rebuild
- CSP parity with production `next.config` headers
- Automated live PROD↔POC HTML diff in CI
- Cutover plan: preview → GSC checks → DNS → Vercel rollback window

## 14. Risks

- SEO regression if any page uses `client:only` for primary HTML again
- Incomplete redirect table at cutover
- Large converter JS remains either way
- Dual-stack drift while Next stays on Vercel

## 15. Recommendation

**POC PASS WITH FIXES** — architecture proven (SSG + island + Worker edge + SEO parity on 3 pages). Before full rebuild:

1. Expand redirect table to full production set in Worker tests.
2. Add live PROD↔POC meta diff in CI (or document offline gate as required).
3. Port one more interactive page (e.g. font-download) as a second island sample.
4. Keep Vercel/Next production until full route parity + GSC-safe cutover.

### Commands

```bash
cd astro-poc
npm install
npm run build
npx wrangler deploy          # isolated workers.dev only
npx wrangler dev --port 8787
npm run test:redirects       # POC_BASE_URL=http://127.0.0.1:8787
npx tsx scripts/offline-seo-parity.test.ts
npm run test:converter
```
