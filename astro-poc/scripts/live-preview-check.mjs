const base =
  process.env.POC_BASE_URL ||
  'https://unicodekruti-astro-poc.docjawwadahmad.workers.dev';

const urls = [
  '/',
  '/krutidev-to-unicode-converter/',
  '/about-us/',
  '/font-download/',
  '/contact-us/',
  '/robots.txt',
  '/sitemap.xml',
  '/blog/',
  '/wp-admin/',
  '/krutidev-to-unicode',
  '/author/akshay-verma/',
];

let failures = 0;
let networkErrors = 0;

for (const u of urls) {
  try {
    const r = await fetch(base + u, {
      redirect: 'manual',
      signal: AbortSignal.timeout(25000),
    });
    const loc = r.headers.get('location') || '';
    let title = '';
    if (r.status === 200 && (u === '/' || u.endsWith('/')) && !u.includes('.')) {
      const t = await r.text();
      const m = t.match(/<title>([^<]+)<\/title>/i);
      title = m ? m[1].slice(0, 90) : '';
    }
    console.log(`${r.status} ${u}${loc ? ' -> ' + loc : ''}${title ? ' | ' + title : ''}`);

    const expect200 = [
      '/',
      '/krutidev-to-unicode-converter/',
      '/about-us/',
      '/font-download/',
      '/contact-us/',
      '/robots.txt',
      '/sitemap.xml',
    ];
    const expect404 = ['/blog/', '/wp-admin/'];
    const expect308 = ['/krutidev-to-unicode', '/author/akshay-verma/'];

    if (expect200.includes(u) && r.status !== 200) {
      console.error(`  FAIL expected 200`);
      failures++;
    }
    if (expect404.includes(u) && r.status !== 404) {
      console.error(`  FAIL expected 404`);
      failures++;
    }
    if (expect308.includes(u) && r.status !== 308) {
      console.error(`  FAIL expected 308`);
      failures++;
    }
  } catch (e) {
    networkErrors++;
    console.log(`NETWORK ${u}: ${e.message}`);
  }
}

console.log(`\nFailures: ${failures}, Network errors: ${networkErrors}`);
if (failures > 0) process.exit(1);
if (networkErrors > 0) process.exit(2);
