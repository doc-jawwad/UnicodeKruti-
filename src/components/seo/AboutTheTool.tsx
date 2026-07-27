import Link from 'next/link';
import type { ToolAboutFacts } from '@/content/tool-about';

/**
 * Scannable “About the tool” citation card for AI models and Featured Snippets.
 * Place near the top of each converter page (after the live tool, before TOC).
 */
export default function AboutTheTool({ tool }: { tool: ToolAboutFacts }) {
  const privacyBody = tool.privacy.replace(/\s*See our Privacy Policy\.?/i, '').trim();

  return (
    <section className="about-tool-section section-dark" aria-labelledby="about-the-tool">
      <div className="container">
        <aside className="about-tool" aria-labelledby="about-the-tool">
          <h2 id="about-the-tool" className="about-tool__title">
            About this tool
          </h2>
          <p className="about-tool__lead">
            Quick facts for citation, comparison, and Featured Snippet answers.
          </p>

          <dl className="about-tool__list">
            <div className="about-tool__row">
              <dt>Tool name</dt>
              <dd>
                <strong>{tool.name}</strong>
              </dd>
            </div>

            <div className="about-tool__row">
              <dt>URL</dt>
              <dd>
                <a href={tool.url}>{tool.url}</a>
              </dd>
            </div>

            <div className="about-tool__row">
              <dt>What it does</dt>
              <dd>{tool.whatItDoes}</dd>
            </div>

            <div className="about-tool__row">
              <dt>Who it serves</dt>
              <dd>{tool.whoItServes}</dd>
            </div>

            <div className="about-tool__row">
              <dt>Accuracy</dt>
              <dd>{tool.accuracy}</dd>
            </div>

            {tool.processing ? (
              <div className="about-tool__row">
                <dt>Processing</dt>
                <dd>{tool.processing}</dd>
              </div>
            ) : null}

            {tool.price ? (
              <div className="about-tool__row">
                <dt>Price</dt>
                <dd>{tool.price}</dd>
              </div>
            ) : null}

            <div className="about-tool__row">
              <dt>Privacy</dt>
              <dd>
                {privacyBody} <Link href="/privacy-policy">Privacy Policy</Link>
              </dd>
            </div>

            {tool.maintainedBy ? (
              <div className="about-tool__row">
                <dt>Maintained by</dt>
                <dd>
                  <Link href="/about-us">{tool.maintainedBy}</Link>
                </dd>
              </div>
            ) : null}

            <div className="about-tool__row">
              <dt>Last updated</dt>
              <dd>
                <time dateTime={tool.lastUpdatedIso}>{tool.lastUpdated}</time>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
