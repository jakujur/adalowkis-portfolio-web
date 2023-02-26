import { PropsWithChildren } from 'react';
import { NAVIGATION_ROUTES } from '@/consts/navigation-routes';
import Link from 'next/link';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <div className="flex gap-9">
        {NAVIGATION_ROUTES.map((route) => (
          <Link href={route.path} key={route.path}>
            <button type="button">{route.name}</button>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center w-full">{children}</div>
    </div>
  );
}
