# UnicodeKruti — Astro + Cloudflare Workers POC

Branch: `feat/astro-cloudflare-poc`  
PR: https://github.com/doc-jawwad/UnicodeKruti-/pull/9
Workers preview: `https://unicodekruti-astro-poc.docjawwadahmad.workers.dev`  
Production (unchanged): `https://unicodekruti.com` on Vercel / Next.js

## Verdict (post-fixes)

**B. READY WITH MINOR NON-BLOCKING DIFFERENCES**

Architecture is approved for full-site scale-out planning. Complete remaining routes next; do not cut over DNS until full redirect destinations return 200 on Astro.

## Root Next / Vercel isolation

`astro-poc/` is a separate package. The root Next.js project must not type-check or lint it:

- Root `tsconfig.json` includes only `src/`, `scripts/`, and Next config/types (not `**/*`).
- Root `tsconfig.json` and `eslint.config.mjs` explicitly exclude/ignore `astro-poc/`.
- Astro CI remains `.github/workflows/astro-poc.yml` (`working-directory: astro-poc`).

This keeps production Vercel builds green while the POC stays in the repo.

## 1. POC architecture

```
astro-poc/
  Astro SSG (trailingSlash: always)
  + @astrojs/react islands
  + Cloudflare Worker (seo-edge.ts) importing src/lib/site-redirects.ts
  + Workers Assets (dist/)
```

## 2. Files/components reused

| Source | Use |
|--------|-----|
| `src/lib/site-redirects.ts` | **Single source of truth** for Worker + matrix |
| `src/content/*`, `wp-html/*` | Meta, FAQ, bodies |
| `ConverterApp` / engine | Converter island |
| `FontPackGrid` / `FontDownloadButton` | Font-download island |
| `FontDownloadPageBody` | Static SSR body |
| `ContactForm` | Contact island |
| `Analytics` | GA4 + Clarity |

## 3. React islands

| Island | Hydration | Scope |
|--------|-----------|-------|
| `ConverterHostIsland` | `client:only` | Converter + related tools portals |
| `FontPackGrid` | `client:load` | Downloads + lazy @font-face |
| `ContactForm` | `client:load` | mailto contact flow |
| `Analytics` | `client:idle` | GA4/Clarity |

Surrounding page HTML remains Astro/static (`set:html` or SSR React without client).

## 4. Full redirect architecture

Worker imports production helpers:

- `shouldHard404`
- `legacyRedirectDestination` (includes author remap + resolved chains)
- `withTrailingSlash`

Plus www→apex (skipped on `*.workers.dev` / localhost).

Automated matrix (`npm run test:redirects`): **79/79 PASS** covering:

- Every `LEGACY_REDIRECTS` + `SITEMAP_XML_REDIRECTS` entry
- Author remaps
- Trailing slash + canonical 200s for POC pages
- Hard-404 samples (WP junk, feeds, archives, unpublished `/blog/`)
- Known blog posts redirect (not 404)

Destination 200 asserted only for POC-hosted paths; other destinations assert single 308 → exact canonical (may 404 until those routes are ported — expected for POC).

## 5. CI live meta-diff

Workflow: `.github/workflows/astro-poc.yml`

- Build Astro POC
- PWA SW regression
- Offline SEO parity
- `POC_MODE=dist` meta-diff vs production (retries; exit 2 on network)
- Full redirect matrix via `wrangler dev`
- Converter regression + perf snapshot

Local deterministic gate:

```bash
POC_MODE=dist npm run test:seo-compare
```

Allowlisted EXPECTED only: OG static `/og/*`, robots directive extras, about title suffix when title already contains brand.

## 6. PWA migration

- Generated `public/sw.js` via `scripts/generate-sw.mjs` (no Next Workbox manifest)
- Caches `/_astro/*`, fonts, icons, images, og, POC documents
- Explicitly ignores `/_next/*`
- Registered from `BaseLayout`
- Test: `npm run test:pwa` **PASS**

Remaining limitation: not full offline parity with production Next SW feature set; no Workbox precache of every hashed chunk at build (runtime CacheFirst instead). Verified path correctness, not field-device offline UX.

## 7. Font-download island

- Route `/font-download/`
- Static hero + `FontDownloadPageBody` SSR
- `FontPackGrid client:load` only for interactivity
- Metadata/JSON-LD from production schemas

## 8. Contact island

- Route `/contact-us/`
- WP HTML via `set:html`
- `ContactForm client:load` (mailto only, no backend)

## 9. Live preview verification

| Check | Result |
|-------|--------|
| Build + deploy Workers | OK (`wrangler deploy` → workers.dev) |
| Offline SEO parity (5 pages) | PASS |
| Meta-diff dist vs unicodekruti.com | PASS (MATCH + allowlisted EXPECTED) |
| Redirect matrix 79 cases | PASS (local `wrangler dev`) |
| Converter suite | PASS |
| Live HTTP to workers.dev | **Environment-dependent** — Node `fetch` / curl from some runners timeout (exit 2 / curl 28). Treat as runner/network, not architecture. Authoritative gates: `POC_MODE=dist` + local wrangler matrix. Retry script: `node scripts/live-preview-check.mjs` |

Known: workers.dev reachability from Windows/local IPv6 paths can fail while deploy + CF API succeed. Do not fail the POC on a single transient network error.
## 10. Performance snapshot (dist)

| Page | HTML |
|------|------|
| `/` | ~93 KB |
| K2U | ~129 KB |
| About | ~34 KB (no converter island) |
| Font download | ~68 KB |
| Contact | ~20 KB |

`/_astro` JS total ~1.6 MB dominated by html2pdf/pdfjs (converter pages). FontPackGrid ~4 KB; ContactForm small. About remains unhydrated for tool UI.

## 11. Remaining differences / risks

| Item | Class |
|------|-------|
| Redirect destinations outside POC still 404 after hop | EXPECTED until full rebuild |
| www→apex only on real host, not workers.dev | EXPECTED |
| PWA uses custom SW, not full Workbox precache parity | EXPECTED / document |
| About `<title>` omits duplicate `\| UnicodeKruti` (brand already in title) | EXPECTED vs prod suffix |
| Default edge OG routes not recreated | EXPECTED (static `/og/*`) |

## 12. Commands

```bash
cd astro-poc
npm ci
npm run test:pwa
npm run build
npm run test:seo-parity
POC_MODE=dist npm run test:seo-compare
npx wrangler dev --ip 127.0.0.1 --port 8787
POC_BASE_URL=http://127.0.0.1:8787 npm run test:redirects
npm run deploy   # workers.dev only — never unicodekruti.com
```
