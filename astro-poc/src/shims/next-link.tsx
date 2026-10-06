import type { AnchorHTMLAttributes, ReactNode } from 'react';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
  replace?: boolean;
  prefetch?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  legacyBehavior?: boolean;
};

/** Minimal next/link shim for Astro React islands. */
export default function Link({
  href,
  children,
  replace: _replace,
  prefetch: _prefetch,
  scroll: _scroll,
  shallow: _shallow,
  passHref: _passHref,
  legacyBehavior: _legacy,
  ...rest
}: LinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
