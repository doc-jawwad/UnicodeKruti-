/** Shared authoritative references (3–6) for GEO citation sections. */
export type SiteReference = { label: string; href: string; text: string };

export const CORE_REFERENCES: SiteReference[] = [
  {
    label: 'The Unicode Standard, Version 15.1. Unicode Consortium.',
    href: 'https://www.unicode.org/versions/Unicode15.1.0/',
    text: 'unicode.org/versions/Unicode15.1.0/',
  },
  {
    label: 'Official Language Act, 1963. Department of Official Language, Ministry of Home Affairs.',
    href: 'https://rajbhasha.gov.in',
    text: 'rajbhasha.gov.in',
  },
  {
    label: 'CPCT Guidelines. Madhya Pradesh Professional Examination Board.',
    href: 'https://peb.mp.gov.in',
    text: 'peb.mp.gov.in',
  },
  {
    label: 'Digital India Programme. Ministry of Electronics and Information Technology.',
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

/** SSR-safe HTML for WP pages — 3–6 refs, ol + aria-label, nofollow external links. */
export function referencesSectionHtml(
  refs: SiteReference[] = CORE_REFERENCES.slice(0, 5),
  { id = 'references', className = 'content-block section-alt' } = {},
): string {
  const items = refs
    .slice(0, 6)
    .map(
      (r) =>
        `<li>${r.label} <a href="${r.href}" target="_blank" rel="noopener noreferrer nofollow">${r.text}</a></li>`,
    )
    .join('\n                ');
  return `
<!-- ========== REFERENCES ========== -->
    <section class="${className}" id="${id}" aria-label="References">
        <div class="container">
            <h2 class="section-heading">References</h2>
            <ol class="references-list content-numbered-list">
                ${items}
            </ol>
        </div>
    </section>
`;
}
