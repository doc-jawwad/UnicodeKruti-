/**
 * Replace main English FAQ accordion bodies from TS arrays (schema ↔ HTML sync).
 */
import fs from 'fs';

function parseFaqs(file, exportName) {
  const s = fs.readFileSync(file, 'utf8');
  const start = s.indexOf(`export const ${exportName} = [`);
  if (start < 0) throw new Error(`missing ${exportName}`);
  let i = start + `export const ${exportName} = [`.length;
  let depth = 1;
  let end = i;
  while (end < s.length && depth > 0) {
    if (s[end] === '[') depth++;
    if (s[end] === ']') depth--;
    end++;
  }
  const block = s.slice(i, end - 1);
  const items = [];
  const re = /question:\s*'((?:\\'|[^'])*)'[\s\S]*?answer:\s*'((?:\\'|[^'])*)'/g;
  let m;
  while ((m = re.exec(block))) {
    items.push({
      q: m[1].replace(/\\'/g, "'"),
      a: m[2].replace(/\\'/g, "'"),
    });
  }
  return items;
}

function escapeHtml(t) {
  return t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildDetails(faqs, variant) {
  return faqs
    .map(({ q, a }) => {
      if (variant === 'k2u' || variant === 'k10') {
        return `                <details class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <summary class="faq-summary--md" itemprop="name">${escapeHtml(q)}</summary>
                    <div class="faq-content faq-content--padded" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p class="faq-answer--md" itemprop="text">${escapeHtml(a)}</p>
                    </div>
                </details>`;
      }
      if (variant === 'k010') {
        return `                <details class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                    <summary itemprop="name">${escapeHtml(q)}</summary>
                    <div class="faq-content" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                        <p itemprop="text">${escapeHtml(a)}</p>
                    </div>
                </details>`;
      }
      // home
      return `            <details class="faq-item">
                <summary>${escapeHtml(q)}</summary>
                <div class="faq-content">
                    <p>${escapeHtml(a)}</p>
                </div>
            </details>`;
    })
    .join('\n\n');
}

function replaceBetween(html, startMarker, endMarker, replacement) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start);
  if (start < 0 || end < 0) throw new Error(`markers not found: ${startMarker} / ${endMarker}`);
  return html.slice(0, start + startMarker.length) + '\n' + replacement + '\n' + html.slice(end);
}

// --- home: English FAQ details only (before Hindi) ---
{
  const faqs = parseFaqs('src/content/home.ts', 'homeFaqs');
  let html = fs.readFileSync('src/content/wp-html/home.html', 'utf8');
  const startMarker = '<div class="faq-accordion">';
  const endMarker = '<details class="faq-item">\n                <summary>यूनिकोड से कृतिदेव कनवर्टर क्या है?</summary>';
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start < 0 || end < 0) throw new Error('home markers');
  html =
    html.slice(0, start + startMarker.length) +
    '\n' +
    buildDetails(faqs, 'home') +
    '\n\n            ' +
    html.slice(end);
  fs.writeFileSync('src/content/wp-html/home.html', html);
  console.log('home OK', faqs.length);
}

// --- k2u ---
{
  const faqs = parseFaqs('src/content/k2u.ts', 'k2uFaqs');
  let html = fs.readFileSync('src/content/wp-html/krutidev-to-unicode-converter.html', 'utf8');
  const startMarker = '<div class="faq-accordion faq-accordion--main">';
  // find first English FAQ details after main accordion
  const idx = html.indexOf(startMarker);
  if (idx < 0) throw new Error('k2u start');
  // find hindi section after
  const hindi = html.indexOf('id="faq-hindi"', idx);
  // find the accordion close before hindi - actually hindi is separate section
  // Replace from first details with software question through last English details before hindi section
  const firstQ = html.indexOf('<summary class="faq-summary--md" itemprop="name">Is there any software that can convert KrutiDev to Unicode?</summary>');
  const hindiDetails = html.indexOf('<summary class="faq-summary--md" itemprop="name">कृतिदेव को यूनिकोड में कैसे बदलें?</summary>');
  if (firstQ < 0 || hindiDetails < 0) throw new Error('k2u FAQ bounds');
  // back up to opening <details of first
  const firstDetails = html.lastIndexOf('<details', firstQ);
  const hindiDetailsOpen = html.lastIndexOf('<details', hindiDetails);
  html =
    html.slice(0, firstDetails) +
    buildDetails(faqs, 'k2u') +
    '\n\n                ' +
    html.slice(hindiDetailsOpen);
  fs.writeFileSync('src/content/wp-html/krutidev-to-unicode-converter.html', html);
  console.log('k2u OK', faqs.length);
}

// --- k10 ---
{
  const faqs = parseFaqs('src/content/k10.ts', 'k10Faqs');
  let html = fs.readFileSync('src/content/wp-html/krutidev-10-to-unicode-converter.html', 'utf8');
  const firstQ = html.indexOf('<summary class="faq-summary--md" itemprop="name">Is KrutiDev 10 the same as KrutiDev 010?</summary>');
  const hindiDetails = html.indexOf('id="faq-hindi"');
  if (firstQ < 0 || hindiDetails < 0) throw new Error('k10 FAQ bounds');
  const firstDetails = html.lastIndexOf('<details', firstQ);
  // end at closing of accordion before hindi section - find </div> of accordion
  const accordionEnd = html.lastIndexOf('</div>', hindiDetails);
  // find start of accordion content after heading - replace from first details to before accordion end's parent
  // simpler: replace until hindi section's previous section end
  const beforeHindi = html.lastIndexOf('</section>', hindiDetails);
  // find last </details> before beforeHindi
  const lastDetailsClose = html.lastIndexOf('</details>', beforeHindi);
  html =
    html.slice(0, firstDetails) +
    buildDetails(faqs, 'k10') +
    '\n\n            ' +
    html.slice(lastDetailsClose + '</details>'.length);
  fs.writeFileSync('src/content/wp-html/krutidev-10-to-unicode-converter.html', html);
  console.log('k10 OK', faqs.length);
}

// --- k010 ---
{
  const faqs = parseFaqs('src/content/k010.ts', 'k010Faqs');
  let html = fs.readFileSync('src/content/wp-html/krutidev-010-to-unicode-converter.html', 'utf8');
  const firstQ = html.indexOf('<summary itemprop="name">How do I convert KrutiDev 010 to Unicode Mangal for online government portal submission?</summary>');
  if (firstQ < 0) throw new Error('k010 first');
  const firstDetails = html.lastIndexOf('<details', firstQ);
  const accordionClose = html.indexOf('</div>\n        </div>\n    </section>', firstDetails);
  // find last </details> in faq section
  const sectionEnd = html.indexOf('id="key-takeaways"');
  const lastDetailsClose = html.lastIndexOf('</details>', sectionEnd > 0 ? sectionEnd : html.length);
  html =
    html.slice(0, firstDetails) +
    buildDetails(faqs, 'k010') +
    '\n' +
    html.slice(lastDetailsClose + '</details>'.length);
  fs.writeFileSync('src/content/wp-html/krutidev-010-to-unicode-converter.html', html);
  console.log('k010 OK', faqs.length);
}
