'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { NAV_LINKS, SITE_NAME } from '@/lib/site';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" id="site-header">
      <div className="container header-container">
        <Link href="/" className="logo" aria-label={SITE_NAME} onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.webp"
            alt="UnicodeKruti Logo"
            width={36}
            height={36}
            priority
            style={{ height: 36, width: 'auto', borderRadius: 4, objectFit: 'contain' }}
          />
          <span>
            Unicode<span style={{ color: 'var(--primary)' }}>Kruti</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          id="nav-toggle"
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
          id="main-nav"
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
    </header>
  );
}
