'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  NAV_LINKS,
  NAV_VERSIONS,
  SITE_NAME,
} from '@/lib/site';
import PwaInstallButton from '@/components/layout/PwaInstallButton';

export default function SiteHeader() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const navToggleRef = useRef<HTMLButtonElement>(null);
  const versionsTriggerRef = useRef<HTMLButtonElement>(null);

  const versionsActive = NAV_VERSIONS.some((v) => pathname === v.href);

  // Reset overlays when the route changes (render-time adjust; avoids effect setState).
  const [routePath, setRoutePath] = useState(pathname);
  if (pathname !== routePath) {
    setRoutePath(pathname);
    setNavOpen(false);
    setVersionsOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
    return () => document.body.classList.remove('nav-open');
  }, [navOpen]);

  useEffect(() => {
    if (!navOpen && !versionsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (navOpen) {
        setNavOpen(false);
        navToggleRef.current?.focus();
      }
      if (versionsOpen) {
        setVersionsOpen(false);
        if (!navOpen) versionsTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navOpen, versionsOpen]);

  return (
    <header className="site-header" id="site-header">
      <div className="container header-container">
        <Link href="/" className="logo" aria-label={`${SITE_NAME} home`}>
          <Image
            src="/images/logo-40.webp"
            alt="UnicodeKruti Logo"
            width={34}
            height={34}
            priority
            sizes="34px"
            style={{ width: 34, height: 34 }}
          />
          <span className="logo-text" style={{ color: 'var(--text-primary)', fontWeight: 800 }}>
            Unicode<span style={{ color: 'var(--primary)' }}>Kruti</span>
          </span>
        </Link>

        <button
          ref={navToggleRef}
          type="button"
          className="nav-toggle"
          id="nav-toggle"
          aria-label={navOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={navOpen}
          aria-controls="main-nav"
          onClick={() => setNavOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`main-nav${navOpen ? ' open' : ''}`}
          id="main-nav"
          aria-label="Primary Menu"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                className={pathname === link.href ? 'current-menu-item' : undefined}
              >
                <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined} onClick={() => setNavOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              className={`menu-item-has-children${versionsActive ? ' current-menu-item' : ''}${versionsOpen ? ' dropdown-active open' : ''}`}
            >
              <button
                ref={versionsTriggerRef}
                type="button"
                className="dropdown-trigger"
                aria-expanded={versionsOpen}
                aria-controls="nav-versions"
                onClick={() => setVersionsOpen((v) => !v)}
              >
                Other KrutiDev Tools <span className="kdc-chevron" aria-hidden="true" />
              </button>
              <ul className="sub-menu" id="nav-versions">
                {NAV_VERSIONS.map((link) => (
                  <li
                    key={link.href}
                    className={pathname === link.href ? 'current-menu-item' : undefined}
                  >
                    <Link href={link.href} aria-current={pathname === link.href ? 'page' : undefined} onClick={() => setNavOpen(false)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className={pathname === '/mangal-to-krutidev-converter/' ? 'current-menu-item' : undefined}>
              <Link href="/mangal-to-krutidev-converter/" aria-current={pathname === '/mangal-to-krutidev-converter/' ? 'page' : undefined} onClick={() => setNavOpen(false)}>
                Mangal Converter
              </Link>
            </li>
            <li className={pathname === '/krutidev-keyboard-layout/' ? 'current-menu-item' : undefined}>
              <Link
                href="/krutidev-keyboard-layout/"
                className="nav-keyboard-btn"
                aria-current={pathname === '/krutidev-keyboard-layout/' ? 'page' : undefined}
                onClick={() => setNavOpen(false)}
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10" />
                </svg>
                <span>KrutiDev Keyboard</span>
              </Link>
            </li>
            <li className="nav-btn-item">
              <Link href="/font-download/" className="nav-btn" onClick={() => setNavOpen(false)}>
                Download Fonts
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions-trailing">
          <PwaInstallButton />
        </div>

      </div>
    </header>
  );
}
