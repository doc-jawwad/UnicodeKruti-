import type { ReactNode } from 'react';

/** Minimal segment layout so `blog/not-found.tsx` can apply under /blog/*. */
export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
