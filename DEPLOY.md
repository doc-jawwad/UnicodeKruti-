# DNS cutover: Hostinger → Vercel

## Before cutover

1. Confirm production preview on `*.vercel.app` works for all three converters.
2. Confirm footer legal pages open (no 404s).
3. Confirm `https://<preview>/sitemap.xml` lists all routes.
4. Set env vars in Vercel (GA, Clarity, GSC, Bing).

## DNS (Hostinger / registrar)

For apex `unicodekruti.com`:

- Prefer Vercel’s documented A record / ALIAS for apex domains.
- Point `www` CNAME to Vercel DNS target shown in the Domains panel.

Wait for propagation (often minutes, up to 48h).

## After cutover

1. Visit `https://unicodekruti.com` — certificate should be valid.
2. HTTP should redirect to HTTPS automatically.
3. Test converter paste/copy on mobile.
4. Google Search Console → Sitemaps → submit `/sitemap.xml`.
5. Bing Webmaster Tools → submit the same sitemap.
6. Validate one converter URL in Google Rich Results Test.
7. When stable for several days, disable or park Hostinger WordPress hosting.

## Rollback

If needed, point DNS A/CNAME back to Hostinger until the Next.js issue is fixed. Keep the WP site offline-ready until cutover is confirmed.
