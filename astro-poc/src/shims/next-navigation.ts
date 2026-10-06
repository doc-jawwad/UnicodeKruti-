/** Minimal next/navigation shim — pathname from the browser location. */
export function usePathname(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname || '/';
}

export function useRouter() {
  return {
    push: (href: string) => {
      window.location.href = href;
    },
    replace: (href: string) => {
      window.location.replace(href);
    },
    back: () => window.history.back(),
    prefetch: async () => {},
  };
}

export function notFound(): never {
  throw new Error('NEXT_HTTP_ERROR_FALLBACK;404');
}

export function redirect(url: string): never {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
  throw new Error(`REDIRECT:${url}`);
}
