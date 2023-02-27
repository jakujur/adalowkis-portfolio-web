import React, { PropsWithChildren } from 'react';
import { NAVIGATION_ROUTES } from '@/consts/navigation-routes';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export function Layout({ children }: PropsWithChildren) {
  const { t } = useTranslation('common');

  return (
    <main className="flex flex-col align-center justify-center width-full text-center m-auto px-24 pb-32 max-w-[1400px]">
      <Link href="/">
        <p className="font-light text-5xl uppercase">{t('home-header')}</p>
      </Link>
      <nav className="flex gap-9 align-center justify-center mb-24">
        {NAVIGATION_ROUTES.map((route) => (
          <Link href={route.path} key={route.path}>
            <button type="button">{route.name}</button>
          </Link>
        ))}
      </nav>
      <div>{children}</div>
    </main>
  );
}
