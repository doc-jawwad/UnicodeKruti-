/**
 * GEO Section 5.4 + 5.5: normalize references + Hindi lang markup on WP HTML pages.
 */
import fs from 'fs';

const REL = 'noopener noreferrer nofollow';

const REFS_BLOCK = (id, className, items) => `
<!-- ========== REFERENCES ========== -->
    <section class="${className}" id="${id}" aria-label="References">
        <div class="container">
            <h2 class="section-heading">References</h2>
            <ol class="references-list content-numbered-list">
                ${items
                  .map(
                    (r) =>
                      `<li>${r.label} <a href="${r.href}" target="_blank" rel="${REL}">${r.text}</a></li>`,
                  )
                  .join('\n                ')}
            </ol>
        </div>
    </section>
`;

const CORE = [
  {
    label: 'The Unicode Standard, Version 15.1. Unicode Consortium.',
    href: 'https://www.unicode.org/versions/Unicode15.1.0/',
    text: 'unicode.org/versions/Unicode15.1.0/',
  },
  {
    label:
      'Official Language Act, 1963. Department of Official Language, Ministry of Home Affairs.',
    href: 'https://rajbhasha.gov.in',
    text: 'rajbhasha.gov.in',
  },
  {
    label: 'CPCT Guidelines. Madhya Pradesh Professional Examination Board.',
    href: 'https://peb.mp.gov.in',
    text: 'peb.mp.gov.in',
  },
  {
    label:
      'Digital India Programme. Ministry of Electronics and Information Technology.',
    href: 'https://meity.gov.in',
    text: 'meity.gov.in',
  },
  {
    label: 'Bureau of Indian Standards. Hindi / Devanagari keyboard standards.',
    href: 'https://www.bis.gov.in',
    text: 'bis.gov.in',
  },
  {
    label: 'GSMA Intelligence Mobile Economy India Report, 2024.',
    href: 'https://www.gsma.com/mobileeconomy/india/',
    text: 'gsma.com',
  },
];

function fixExistingReferences(html) {
  html = html.replace(
    /<section([^>]*\bid=["']references(?:-section)?["'][^>]*)>/gi,
    (full, attrs) => {
      if (/aria-label=/.test(attrs)) return full;
      return `<section${attrs} aria-label="References">`;
    },
  );
  html = html.replace(
    /(<section[^>]*(?:id=["']references(?:-section)?["']|aria-label=["']References["'])[\s\S]*?)(<ul\b[^>]*>)([\s\S]*?)(<\/ul>)/gi,
    (m, a, _ul, mid) => {
      if (/<ol[\s>]/.test(m.split('</section>')[0])) return m;
      return `${a}<ol class="references-list content-numbered-list">${mid}</ol>`;
    },
  );
  html = html.replace(
    /<a([^>]*href=["']https?:\/\/(?:www\.)?(?:unicode\.org|peb\.mp\.gov\.in|rajbhasha\.gov\.in|bis\.gov\.in|meity\.gov\.in|gsma\.com)[^"']*["'][^>]*)>/gi,
    (_full, attrs) => {
      let a = attrs;
      if (!/target=/.test(a)) a += ' target="_blank"';
      if (/rel=/.test(a)) a = a.replace(/rel=["'][^"']*["']/, `rel="${REL}"`);
      else a += ` rel="${REL}"`;
      return `<a${a}>`;
    },
  );
  return html;
}

function wrapDevanagariOutsideHi(html) {
  let inHi = false;
  let inScript = false;
  return html.replace(/(<[^>]+>)|([^<]+)/g, (token, tag, text) => {
    if (tag) {
      if (/^<script\b/i.test(tag)) inScript = true;
      if (/^<\/script>/i.test(tag)) inScript = false;
      if (/^<section\b/i.test(tag)) {
        inHi = /\blang=["']hi["']/i.test(tag);
      }
      if (/^<\/section>/i.test(tag)) inHi = false;
      if (/^<(?:span|details)\b/i.test(tag) && /\blang=["']hi["']/i.test(tag)) {
        inHi = true;
      }
      if (/^<\/(?:span|details)>/i.test(tag)) {
        /* keep section-level inHi */
      }
      return tag;
    }
    if (!text || inHi || inScript || !/[\u0900-\u097F]/.test(text)) return text;
    if (/lang=["']hi["']/.test(text)) return text;
    return text.replace(/([\u0900-\u097F][\u0900-\u097F\u093C-\u094D\s]*)/g, (run) => {
      const trimmed = run.trim();
      if (!trimmed) return run;
      if (run.includes('lang="hi"')) return run;
      return run.replace(trimmed, `<span lang="hi" dir="ltr">${trimmed}</span>`);
    });
  });
}

function insertRefsBeforeRelated(html, items, id, className) {
  if (/id=["']references/.test(html)) return html;
  const block = REFS_BLOCK(id, className, items);
  const related = html.search(/id=["']related/);
  if (related > 0) {
    const sec = html.lastIndexOf('<section', related);
    return html.slice(0, sec) + block + '\n\n' + html.slice(sec);
  }
  return html + '\n' + block;
}

// home
{
  let html = fs.readFileSync('src/content/wp-html/home.html', 'utf8');
  html = html.replace(
    /<section class="content-block section-alt" id="hindi-section">/,
    '<section class="content-block section-alt" id="hindi-section" lang="hi" dir="ltr" aria-label="Section in Hindi">',
  );
  html = html.replace(
    /<details class="faq-item">\s*<summary>([^<]*[\u0900-\u097F][^<]*)<\/summary>/g,
    '<details class="faq-item" lang="hi" dir="ltr">\n                <summary>$1</summary>',
  );
  html = html.replace(
    /<!-- ========== REFERENCES ========== -->[\s\S]*?<\/section>\n\n\n<!-- ========== KEY TAKEAWAYS/,
    `${REFS_BLOCK('references-section', 'content-block section-alt', CORE)}\n\n<!-- ========== KEY TAKEAWAYS`,
  );
  html = fixExistingReferences(html);
  html = wrapDevanagariOutsideHi(html);
  fs.writeFileSync('src/content/wp-html/home.html', html);
  console.log('home OK');
}

// k2u
{
  let html = fs.readFileSync(
    'src/content/wp-html/krutidev-to-unicode-converter.html',
    'utf8',
  );
  html = html.replace(
    /<!-- ========== REFERENCES ========== -->[\s\S]*?<\/section>\s*$/,
    REFS_BLOCK('references-section', 'content-block section-dark', CORE),
  );
  html = html.replace(
    /<details class="faq-item" itemscope itemprop="mainEntity" itemtype="https:\/\/schema\.org\/Question">\s*<summary([^>]*)>([^<]*[\u0900-\u097F][^<]*)<\/summary>/g,
    '<details class="faq-item" lang="hi" dir="ltr" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">\n                    <summary$1>$2</summary>',
  );
  html = fixExistingReferences(html);
  html = wrapDevanagariOutsideHi(html);
  fs.writeFileSync('src/content/wp-html/krutidev-to-unicode-converter.html', html);
  console.log('k2u OK');
}

// k10
{
  let html = fs.readFileSync(
    'src/content/wp-html/krutidev-10-to-unicode-converter.html',
    'utf8',
  );
  html = html.replace(
    /<section class="content-block section-alt" id="faq-hindi" lang="hi"/,
    '<section class="content-block section-alt" id="faq-hindi" lang="hi" dir="ltr" aria-label="Section in Hindi"',
  );
  html = insertRefsBeforeRelated(html, CORE.slice(0, 4), 'references', 'content-block section-dark');
  html = fixExistingReferences(html);
  html = wrapDevanagariOutsideHi(html);
  fs.writeFileSync('src/content/wp-html/krutidev-10-to-unicode-converter.html', html);
  console.log('k10 OK');
}

// k010
{
  let html = fs.readFileSync(
    'src/content/wp-html/krutidev-010-to-unicode-converter.html',
    'utf8',
  );
  html = insertRefsBeforeRelated(
    html,
    CORE.slice(0, 4),
    'references',
    'content-block section-alt',
  );
  html = fixExistingReferences(html);
  html = wrapDevanagariOutsideHi(html);
  fs.writeFileSync('src/content/wp-html/krutidev-010-to-unicode-converter.html', html);
  console.log('k010 OK');
}

console.log('Done');
