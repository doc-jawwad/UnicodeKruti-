<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UnicodeKruti — Agent Rules for Future Pages & Posts

Site: **unicodekruti.com** (`unicodekruti-next/`). Brand accent: `#ff6600`. Expert / E-E-A-T person: **Akshay Verma** (link cites to `/about-us`).

When adding a **new tool page**, **legal/about page**, or **blog post**, follow this file. Prefer matching an existing live page of the same type over inventing a new pattern.

---

## Absolute constraints

1. **Do not reverse** the `/krutidev-to-unicode-converter` canonical (short `/krutidev-to-unicode` 308s here — this path stays the K2U hub).
2. **No false product claims.** Converter maps **010 / 10** (same mapping). Do **not** claim KrutiDev **055** conversion unless a real 055 engine ships. Font **download** of 055 TTF is fine.
3. **Browser-only conversion** claims must stay true: text never uploaded; no server-side convert API for user paste.
4. **Do not invent blog URLs** that soft-404. If a post is not live, link to a live section (`#…`) or omit; hard `/blog/...` only when the post ships.
5. **Commit / push only when the user asks.**
6. Build with webpack when needed: `npx next build --webpack` (project has a webpack config; bare Turbopack build may fail).

---

## Keyword ownership (no cannibalization)

Authoritative map: `src/content/keyword-map.ts`.

| Path | Owns primary KW |
|------|-----------------|
| `/` | unicode to krutidev converter |
| `/krutidev-to-unicode-converter` | krutidev to unicode converter |
| `/krutidev-10-to-unicode-converter` | krutidev 10 / kurtidev10 → unicode |
| `/krutidev-010-to-unicode-converter` | krutidev 010 → unicode |
| `/unicode-to-krutidev-10-converter` | unicode to krutidev 10 |
| `/font-download` | krutidev font download |

**Rules for every new page/post:**

- Add a row to `KEYWORD_MAP` with a **unique `primaryKw`** (run `findPrimaryKwCollisions()` mentally / in code — must stay empty).
- Secondary KWs may overlap; primaries must not.
- Title + H1 must reinforce **this page’s** primary, not a sibling’s.

---

## SEO metadata (every public URL)

### Title tag

- **Query-specific**, not generic (“Free Online Tool” alone is not enough).
- Differentiate clusters: audience, version (010/10), direction (U→KD vs KD→U), or use-case (CPCT, DTP, font install).
- Rough target: ~50–65 characters; primary KW near the front.
- Examples of the pattern:
  - Home: `Unicode to KrutiDev Converter — Mangal, Nirmala UI, CPCT & UP Govt`
  - K2U: `KrutiDev to Unicode Converter — Free, 99.9% Accurate, Browser-Only`
  - U2K10: `Unicode to KrutiDev 10 Converter — For Exam Candidates & DTP`
  - Font: `KrutiDev Font Download Free — 010, 055, Windows & Mac TTF`

Use `buildPageMetadata({ title, description, path, hreflangHi? })` from `src/lib/seo/metadata.ts`.

### Meta description

- **Why choose this page**, not a how-to paste tutorial.
- Differentiated vs siblings (proof points, audience, version, direction).
- ~150–160 characters when possible.
- Pattern: outcome + differentiator + trust (accuracy / browser-only / exams) + free/no signup if true.

### Canonical & robots

- Canonical via `buildPageMetadata` (homepage trailing slash; other paths no trailing slash).
- Default: `index, follow` unless the page is intentionally noindex.

### Sitemap

- Register in `ALL_ROUTES` in `src/lib/site.ts` (`priority`, `changeFrequency`).
- Bump `CONTENT_LASTMOD` in `src/app/sitemap.ts` when content meaningfully changes.
- Typical tool priority ~0.8–1.0; about/contact ~0.6–0.7.

---

## Page anatomy (tool / converter pages)

Prefer App Router **Server Components**. Match siblings:

| Piece | Convention |
|-------|------------|
| Route | `src/app/<slug>/page.tsx` |
| Meta + FAQ/HowTo copy | `src/content/<slug>.ts` (or existing `home` / `k2u` / `k10` / `k010` / `u2k10`) |
| JSON-LD | Dedicated `*-schemas.ts` **or** `buildConverterSchema(...)` |
| Body | WP HTML in `src/content/wp-html/<slug>.html` **or** React body (e.g. `U2K10PageBody`, font-download, about-us) |
| Dates | `ContentDates` + `datePublished` / `dateModified` (ISO `YYYY-MM-DD`); refresh ~90 days |
| Converter mount | Shortcode / `ClientConverter` / lazy tool — reuse engine; do not fork mapping tables |

### Required on-page blocks (AEO / GEO)

1. **H1** — unique variation of primary KW (not identical to every other page).
2. **TL;DR** — `id="tldr-block"`, `itemProp="speakable"`, `role="note"`, `aria-label="Quick summary"` (~40–55 words, answer-first).
3. **Answer-first H2s** — first sentence answers the heading; then detail.
4. **HowTo** — steps in HTML **and** schema must match.
5. **FAQs** — SSR `details`/`summary` (`.faq-item`); ≥8 where the brief requires; schema FAQ text must match visible answers.
6. **Key takeaways** — `<aside id="key-takeaways" aria-label="Key takeaways">` before or near FAQ when used on siblings.
7. **Expert quote** — Akshay Verma; cite links to `/about-us` (use `Link`).
8. **References** — 3–6 authoritative externals; `target="_blank"` `rel="noopener noreferrer"` (dofollow) for trusted high-authority hosts (Unicode Consortium, `.gov.in`, `.nic.in`, BIS, Microsoft docs, GSMA). Use `externalLinkRel()` from `src/lib/seo/external-links.ts`. Keep `nofollow` only for untrusted / UGC / affiliate externals. Prefer shared `CORE_REFERENCES` / `referencesSectionHtml` when fitting.
9. **Hindi block** (when page has substantial HI content) — wrap `lang="hi"` `dir="ltr"`; set `hreflangHi: true` on metadata.
10. **About the tool** — reuse `AboutTheTool` / `TOOL_ABOUT` / shortcode path; don’t invent a third about-tool system.
11. **Breadcrumbs** — `Breadcrumbs` component + BreadcrumbList in schema; never invent wrong hierarchy (tool pages: Home → Page).

### Internal links

- App/React pages: **`next/link` `Link` only** for internal URLs (see `/about-us`).
- WP HTML bodies: normal `<a href="/...">` is OK (normalized by `wp-html.ts`).
- Never `rel="nofollow"` on internal links.
- Cross-link related tools without stealing primary KW intent.

---

## Schema / JSON-LD

- Inject via `JsonLd` (`src/components/seo/JsonLd.tsx`). Accepts object **or** array.
- **Converter tools:** `buildConverterSchema` (Organization, WebSite, Person, WebPage, SoftwareApplication/WebApplication, HowTo, FAQPage, ItemList TOC, BreadcrumbList). Homepage may set `includeSitelinks: true` (SiteNavigationElement list) — **homepage only** unless product asks otherwise.
- **About:** five standalone nodes as a **JSON array** (Person, Organization, AboutPage, BreadcrumbList, FAQPage) — see `src/content/about-us-schemas.ts`.
- **Font download / U2K10:** follow existing `*-schemas.ts` files; keep `@graph` consistent with on-page copy.
- Entity consistency: Akshay Verma job title string, Organization `sameAs` from `FOOTER.social`, accuracy claims only where verified copy exists.
- Speakable: `cssSelector: ['#tldr-block']` (and `h1` when siblings already do).

Do **not** invent Review/AggregateRating stars without a real review program.

---

## Blog posts (when `/blog/...` goes live)

Until the blog router exists, do not add nav/sitemap entries that 404.

When implementing posts, require:

1. Unique `primaryKw` in `keyword-map.ts` (or a blog-specific map that is still collision-checked).
2. Query-specific title + why-choose meta description.
3. Canonical `/blog/<slug>` (no trailing slash).
4. `Article` or `BlogPosting` JSON-LD + BreadcrumbList (`Home → Blog → Post` or `Home → Post` per final IA).
5. `author` / `reviewedBy` → Akshay Verma / `/about-us`.
6. `datePublished` / `dateModified` + visible `ContentDates`.
7. TL;DR `#tldr-block` + speakable.
8. Internal links to the **correct** tool for intent (U→KD home vs K2U hub vs 010/10/font) — never send “download font” intent only to a converter.
9. External references: dofollow (`noopener noreferrer`) for trusted authority hosts; `nofollow` only for untrusted externals.
10. Register in sitemap when published; update `public/llms.txt` tool/article list when posts are live.
11. Match site visual language (theme.css / editorial sections); no one-off purple/cream AI-default landing kits unless redesign is requested.

Suggested first posts (from existing internal link targets — ship before hard-linking sitewide):

- `/blog/what-is-kruti-dev-font`
- `/blog/kruti-dev-hindi-typing-chart-pdf`
- `/blog/krutidev-for-government-exams`

---

## Accessibility & UX (ship with the page)

- Page `lang`: site uses `en-IN`; Hindi sections `lang="hi"`.
- Skip link → `#main-content`; primary content in `<main>` where the layout supports it.
- Converter: existing ARIA / live regions / focus patterns in `ConverterApp` — don’t regress.
- Focus: visible `:focus-visible` (do not remove global focus styles).
- Contrast: prefer accessible tokens (`--primary-accessible`, `--text-dim`) for small text.
- Loading: tool skeletons; copy button “Copied!”; form send states; `role="alert"` for inline errors.
- Print: rely on existing print CSS; don’t break it with `display:none !important` on main content.

---

## Security & trust copy

- Privacy claims must match `privacy-policy` (no text stored/transmitted for conversion; name analytics honestly, e.g. Clarity).
- HTTPS only in links; no mixed content.
- Do not weaken security headers in `next.config.ts` without an explicit request.

---

## Dead code / cleanup discipline

- Do not reintroduce orphaned page shells (`*PageContent.tsx` pattern deleted in Phase 2) unless that page’s live route actually imports them.
- Prefer one content source of truth (HTML **or** React body), not both for the same URL.
- Before deleting symbols/CSS: grep for consumers; keep anything still referenced (e.g. `.kdc-toast--error`).

---

## Checklist — new page or post

Copy and tick mentally before marking done:

- [ ] Unique primary KW added to keyword map  
- [ ] Title query-specific; meta description “why choose”  
- [ ] Canonical + sitemap entry  
- [ ] H1 + `#tldr-block` speakable  
- [ ] FAQs SSR + FAQPage schema synced  
- [ ] HowTo synced (if applicable)  
- [ ] Breadcrumbs UI + schema  
- [ ] ContentDates  
- [ ] Expert cite → `/about-us`  
- [ ] References (trusted external dofollow; untrusted nofollow)  
- [ ] Internal links use correct tool URLs  
- [ ] No false 055-conversion / blog 404 claims  
- [ ] `tsc --noEmit` clean; `next build --webpack` when verifying production  

---

## Key paths (quick index)

| Concern | Path |
|---------|------|
| Keyword map | `src/content/keyword-map.ts` |
| Metadata helper | `src/lib/seo/metadata.ts` |
| Converter schema builder | `src/components/seo/schema.ts` |
| Site nav / footer / routes | `src/lib/site.ts` |
| WP HTML normalize + mounts | `src/lib/wp-html.ts` |
| About page reference impl | `src/app/about-us/page.tsx` |
| Font download reference impl | `src/app/font-download/page.tsx` |
| U2K10 React body | `src/components/pages/u2k10/U2K10PageBody.tsx` |
| llms.txt | `public/llms.txt` |
| Converter CSS | `src/components/converter/converter.css` |
| Global / theme CSS | `src/app/globals.css`, `src/app/theme.css` |
