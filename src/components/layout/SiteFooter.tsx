import Link from 'next/link';
import { FOOTER, SITE_NAME } from '@/lib/site';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <span className="logo__text">
                Unicode<span>Kruti</span>
              </span>
            </Link>
            <p className="footer-desc">{FOOTER.blurb}</p>
            <a
              href={FOOTER.fontDownloadHref}
              download="KrutiDev010.ttf"
              className="btn-primary footer-btn"
            >
              KrutiDev Font Download
            </a>
          </div>

          <div className="footer-links">
            <h3>Pages</h3>
            <ul>
              {FOOTER.pages.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h3>Legal</h3>
            <ul>
              {FOOTER.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {FOOTER.social.length > 0 ? (
            <div className="footer-links">
              <h3>Follow Us</h3>
              <div className="footer-social-circles">
                {FOOTER.social.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="social-circle"
                  >
                    {item.label.slice(0, 1)}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="footer-links">
              <h3>Resources</h3>
              <ul>
                <li>
                  <a href={FOOTER.fontDownloadHref} download="KrutiDev010.ttf">
                    Download KrutiDev Font
                  </a>
                </li>
                <li>
                  <Link href="/sitemap">HTML Sitemap</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {SITE_NAME}.com. All rights reserved.
          </p>
          <div className="footer-legal-inline">
            {FOOTER.bottomLegal.map((link, index) => (
              <span key={link.href}>
                {index > 0 ? <span className="separator">•</span> : null}
                <Link href={link.href}>{link.label}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
