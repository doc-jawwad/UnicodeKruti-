import type { ToolAboutFacts } from '@/content/tool-about';

/** SSR HTML for WP shortcode pages (same structure as AboutTheTool). */
export function renderAboutTheToolHtml(tool: ToolAboutFacts): string {
  const headingId = `about-tool-heading-${tool.id}`;
  const privacyBody = tool.privacy.replace(/\s*See our Privacy Policy\.?/i, '').trim();

  const optionalRows = [
    tool.processing
      ? `<div class="about-tool__row"><dt>Processing</dt><dd>${escapeHtml(tool.processing)}</dd></div>`
      : '',
    tool.price
      ? `<div class="about-tool__row"><dt>Price</dt><dd>${escapeHtml(tool.price)}</dd></div>`
      : '',
    tool.maintainedBy
      ? `<div class="about-tool__row"><dt>Maintained by</dt><dd><a href="/about-us">${escapeHtml(tool.maintainedBy)}</a></dd></div>`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  return `
<section class="about-tool-section section-dark" id="about-the-tool" aria-labelledby="${headingId}">
  <div class="container">
    <aside class="about-tool" aria-labelledby="${headingId}">
      <h2 id="${headingId}" class="about-tool__title">About this tool</h2>
      <p class="about-tool__lead">Quick facts for citation, comparison, and Featured Snippet answers.</p>
      <dl class="about-tool__list">
        <div class="about-tool__row"><dt>Tool name</dt><dd><strong>${escapeHtml(tool.name)}</strong></dd></div>
        <div class="about-tool__row"><dt>URL</dt><dd><a href="${escapeHtml(tool.url)}">${escapeHtml(tool.url)}</a></dd></div>
        <div class="about-tool__row"><dt>What it does</dt><dd>${escapeHtml(tool.whatItDoes)}</dd></div>
        <div class="about-tool__row"><dt>Who it serves</dt><dd>${escapeHtml(tool.whoItServes)}</dd></div>
        <div class="about-tool__row"><dt>Accuracy</dt><dd>${escapeHtml(tool.accuracy)}</dd></div>
        ${optionalRows}
        <div class="about-tool__row"><dt>Privacy</dt><dd>${escapeHtml(privacyBody)} <a href="/privacy-policy">Privacy Policy</a></dd></div>
        <div class="about-tool__row"><dt>Last updated</dt><dd><time datetime="${escapeHtml(tool.lastUpdatedIso)}">${escapeHtml(tool.lastUpdated)}</time></dd></div>
      </dl>
    </aside>
  </div>
</section>`.trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
