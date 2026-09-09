export function usePathname(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname;
}

export function useRouter() {
  return {
    push: (url: string) => {
      if (typeof window !== 'undefined') window.location.href = url;
    },
    replace: (url: string) => {
      if (typeof window !== 'undefined') window.location.replace(url);
    },
    back: () => {
      if (typeof window !== 'undefined') window.history.back();
    },
    forward: () => {
      if (typeof window !== 'undefined') window.history.forward();
    },
    refresh: () => {
      if (typeof window !== 'undefined') window.location.reload();
    },
  };
}

export function notFound(): never {
  const err = new Error('404 Not Found');
  (err as any).digest = 'NEXT_NOT_FOUND';
  throw err;
}
