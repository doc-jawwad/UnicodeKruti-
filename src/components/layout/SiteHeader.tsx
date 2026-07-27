'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import {
  FONT_DOWNLOAD_HREF,
  NAV_LINKS,
  NAV_VERSIONS,
  SITE_NAME,
} from '@/lib/site';

export default function SiteHeader() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [versionsOpen, setVersionsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const versionsActive = NAV_VERSIONS.some((v) => pathname === v.href);

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
    return () => document.body.classList.remove('nav-open');
  }, [navOpen]);

  useEffect(() => {
    document.body.classList.toggle('search-active', searchOpen);
    return () => document.body.classList.remove('search-active');
  }, [searchOpen]);

  useEffect(() => {
    setNavOpen(false);
    setSearchOpen(false);
    setVersionsOpen(false);
  }, [pathname]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const hit =
      ALL_SEARCH.find((r) => r.haystack.includes(q)) ||
      ALL_SEARCH.find((r) => q.split(/\s+/).every((w) => r.haystack.includes(w)));
    window.location.href = hit?.href || '/sitemap';
  };

  return (
    <header className="site-header" id="site-header">
      <div className="container header-container">
        <Link href="/" className="logo" aria-label={`${SITE_NAME} home`}>
          <Image
            src="/images/logo.webp"
            alt="UnicodeKruti Logo"
            width={36}
            height={36}
            priority
            style={{ height: 36, width: 'auto', borderRadius: 4, objectFit: 'contain' }}
          />
          <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>
            Unicode<span style={{ color: 'var(--primary)' }}>Kruti</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          id="nav-toggle"
          aria-label="Toggle navigation"
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
                <Link href={link.href} onClick={() => setNavOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li
              className={`menu-item-has-children${versionsActive ? ' current-menu-item' : ''}${versionsOpen ? ' dropdown-active open' : ''}`}
            >
              <a
                href="#"
                className="dropdown-trigger"
                aria-expanded={versionsOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setVersionsOpen((v) => !v);
                }}
              >
                Versions <span className="kdc-chevron" aria-hidden="true" />
              </a>
              <ul className="sub-menu">
                {NAV_VERSIONS.map((link) => (
                  <li
                    key={link.href}
                    className={pathname === link.href ? 'current-menu-item' : undefined}
                  >
                    <Link href={link.href} onClick={() => setNavOpen(false)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-btn-item">
              <a
                href={FONT_DOWNLOAD_HREF}
                download="KrutiDev010.ttf"
                className="nav-btn"
              >
                KrutiDev Font Download
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-search-container" id="header-search-container">
          <form
            role="search"
            className="header-search-form"
            id="header-search-form"
            onSubmit={onSearch}
          >
            <label htmlFor="search-field" className="screen-reader-text">
              Search
            </label>
            <input
              type="search"
              className="search-field"
              id="search-field"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="search-submit-btn" aria-label="Submit Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          <button
            type="button"
            className="search-btn-icon"
            id="search-btn-icon"
            aria-label="Open Search"
            style={{ display: searchOpen ? 'none' : undefined }}
            onClick={() => setSearchOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>

          <button
            type="button"
            className="search-close-icon"
            id="search-close-icon"
            aria-label="Close Search"
            style={{ display: searchOpen ? undefined : 'none' }}
            onClick={() => setSearchOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

const ALL_SEARCH = [
  { href: '/', haystack: 'unicode to krutidev converter home hindi' },
  { href: '/unicode-to-krutidev-10-converter', haystack: 'unicode to krutidev 10 kurtidev10 mangal converter' },
  { href: '/krutidev-to-unicode', haystack: 'krutidev to unicode converter' },
  { href: '/krutidev-010-to-unicode-converter', haystack: 'krutidev 010 to unicode converter' },
  { href: '/krutidev-10-to-unicode-converter', haystack: 'krutidev 10 kurtidev10 to unicode converter' },
  { href: '/about-us', haystack: 'about us' },
  { href: '/contact-us', haystack: 'contact us' },
  { href: '/privacy-policy', haystack: 'privacy policy' },
  { href: '/cookie-policy', haystack: 'cookie policy' },
  { href: '/disclaimer', haystack: 'disclaimer' },
  { href: '/dmca-policy', haystack: 'dmca policy' },
  { href: '/terms-conditions', haystack: 'terms conditions' },
  { href: '/sitemap', haystack: 'sitemap' },
  { href: '/fonts/KrutiDev010.ttf', haystack: 'font download krutidev 010 ttf' },
];
