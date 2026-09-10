import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * Fallback for /author/* if middleware remap is skipped.
 * Canonical behaviour: 308 → /about-us/ via authorRemapDestination.
 */
export const metadata: Metadata = {
  title: 'Author archive',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function AuthorArchivePage() {
  notFound();
}
