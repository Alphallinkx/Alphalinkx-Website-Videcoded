'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter, useParams as useNextParams } from 'next/navigation';

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to?: string;
  href?: string;
  replace?: boolean;
  scroll?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, href, children, ...props }, ref) => {
  const destination = href || to || '/';
  return (
    <NextLink ref={ref} href={destination} {...props}>
      {children}
    </NextLink>
  );
});
Link.displayName = 'Link';

export function useLocation() {
  const pathname = usePathname() || '/';
  const [search, setSearch] = useState('');
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearch(window.location.search);
      setHash(window.location.hash);

      const handleLocationChange = () => {
        setSearch(window.location.search);
        setHash(window.location.hash);
      };

      window.addEventListener('popstate', handleLocationChange);
      window.addEventListener('hashchange', handleLocationChange);
      return () => {
        window.removeEventListener('popstate', handleLocationChange);
        window.removeEventListener('hashchange', handleLocationChange);
      };
    }
  }, [pathname]);

  return {
    pathname,
    search,
    hash,
    state: null,
    key: 'default',
  };
}

export function useNavigate() {
  const router = useRouter();
  return (to: string | number) => {
    if (typeof to === 'number') {
      if (to === -1) router.back();
      else if (to === 1) router.forward();
    } else {
      router.push(String(to));
    }
  };
}

export function useParams<T extends Record<string, string | string[]>>() {
  return (useNextParams() || {}) as T;
}

export const BrowserRouter: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const Router = BrowserRouter;
export const Routes: React.FC<{ children?: React.ReactNode; location?: any }> = ({ children }) => <>{children}</>;
export const Route: React.FC<{ path?: string; element?: React.ReactNode }> = ({ element }) => <>{element}</>;
export const Outlet: React.FC = () => null;
