'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NAV_LINKS, SITE_NAME } from '@/lib/site';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo__text">
            Unicode<span>Kruti</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`main-nav${open ? ' open' : ''}`}
          aria-label="Primary"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="nav-btn-item">
              <a
                href="/fonts/KrutiDev010.ttf"
                download="KrutiDev010.ttf"
                className="nav-btn"
              >
                KrutiDev Font Download
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <span className="sr-only">{SITE_NAME}</span>
    </header>
  );
}
