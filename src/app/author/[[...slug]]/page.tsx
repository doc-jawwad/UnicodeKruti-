import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/** Block legacy WP author archives (/author/admin/, etc.) from search indexes. */
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
