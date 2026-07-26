# UnicodeKruti Next.js (Vercel)

Free Unicode ↔ KrutiDev converters rebuilt from the WordPress site as a Next.js App Router app for Vercel.

## Local development

```bash
cd unicodekruti-next
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and fill:

- `NEXT_PUBLIC_GA_ID` — Google Analytics 4
- `NEXT_PUBLIC_CLARITY_ID` — Microsoft Clarity
- `NEXT_PUBLIC_GSC_VERIFICATION` — Google Search Console
- `NEXT_PUBLIC_BING_VERIFICATION` — Bing Webmaster Tools

## Deploy to Vercel

1. Push this folder to a GitHub repository (recommended: separate from WordPress).
2. Import the repo in [Vercel](https://vercel.com).
3. Framework preset: **Next.js**. Root directory: `unicodekruti-next` if monorepo.
4. Add the env vars above in Vercel Project Settings.
5. Deploy Production.
6. Add domain `unicodekruti.com` (and `www` if used) in Vercel Domains.
7. At Hostinger / registrar DNS:
   - Apex: A/ALIAS to Vercel, or use Vercel nameservers
   - `www`: CNAME to `cname.vercel-dns.com`
8. After DNS propagates: HTTPS + HSTS are automatic.
9. In Google Search Console and Bing: resubmit `https://unicodekruti.com/sitemap.xml`.

## Routes

| Path | Page |
|------|------|
| `/` | Unicode → KrutiDev |
| `/krutidev-to-unicode` | KrutiDev → Unicode |
| `/krutidev-10-to-unicode-converter` | KrutiDev 10 → Unicode |
| `/sitemap` | HTML sitemap |
| `/sitemap.xml` | XML sitemap |
| `/robots.txt` | Robots |
| Legal pages | About, Contact, Privacy, Cookie, Disclaimer, DMCA, Terms |

## Editing (vibe coding)

- Converter engine: `src/lib/converter/engine.ts`
- Converter UI: `src/components/converter/ConverterApp.tsx`
- Page copy: `src/content/*.ts` + `src/components/pages/*`
- SEO schema: `src/components/seo/schema.ts`
- Site chrome: `src/components/layout/*`

## DNS cutover checklist

- [ ] Preview deploy converter works (Unicode ↔ KrutiDev)
- [ ] Mobile nav + footer links work
- [ ] `/sitemap.xml` and `/robots.txt` respond
- [ ] Canonical URLs use `https://unicodekruti.com`
- [ ] Custom domain SSL active on Vercel
- [ ] GSC + Bing sitemap resubmitted
- [ ] Keep Hostinger WP until traffic is verified, then park/retire
