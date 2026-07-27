import Image from 'next/image';
import Link from 'next/link';
import { FOOTER, SITE_NAME } from '@/lib/site';
import SocialIcon from '@/components/layout/SocialIcon';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer saffron-footer-glow">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo" aria-label={`${SITE_NAME} home`}>
              <Image
                src="/images/logo.webp"
                alt="UnicodeKruti Logo"
                width={32}
                height={32}
                style={{ height: 32, width: 'auto', borderRadius: 4, objectFit: 'contain' }}
              />
              <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>
                Unicode<span style={{ color: 'var(--primary)' }}>Kruti</span>
              </span>
            </Link>
            <p className="footer-desc">{FOOTER.blurb}</p>
            <div className="footer-buttons-row">
              <Link href="/font-download" className="btn-primary footer-btn">
                KrutiDev Font Download
              </Link>
            </div>
          </div>

          <div className="footer-links-duo">
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
          </div>

          <div className="footer-links">
            <h3>Follow Us</h3>
            <div className="footer-social-circles">
              {FOOTER.social.map((item) => (
                <a
                  key={item.network}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="social-circle"
                >
                  <SocialIcon network={item.network} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-flex">
            <p>
              &copy; {year} {SITE_NAME}.com. All rights reserved.
            </p>
            <div className="footer-legal-inline">
              {FOOTER.bottomLegal.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? <span className="separator">&bull;</span> : null}
                  <Link href={link.href}>{link.label}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
