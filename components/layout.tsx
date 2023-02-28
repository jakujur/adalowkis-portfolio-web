import React, { PropsWithChildren } from 'react';
import { NAVIGATION_ROUTES, NavigationRouteName } from '@/consts/navigation-routes';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Button } from '@/components/button';
import Head from 'next/head';

interface LayoutProps {
  activeRoute?: NavigationRouteName;
}

export function Layout({ children, activeRoute }: PropsWithChildren<LayoutProps>) {
  const { t } = useTranslation('common');
  const locationString = activeRoute && ` - ${t(activeRoute)}`;

  return (
    <>
      <Head>
        <title>Ada Lowkis{locationString}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/nav-icon.ico" />
      </Head>
      <main className="p-8 flex flex-col align-center justify-center width-full m-auto pb-32 max-w-[770px] md:max-w-[1138px] lg:max-w-[1394px]">
        <Link href="/">
          <p className="mt-4 mb-8 font-light text-4xl uppercase sm:text-5xl sm:mt-20 sm:mb-14">
            {t('home-header')}
          </p>
        </Link>
        <nav className="flex flex-col gap-3 align-center mb-16 sm:flex-row sm:gap-9 sm:mb-24">
          {NAVIGATION_ROUTES.map((route) => (
            <Link href={route.path} key={route.path}>
              <Button active={activeRoute === route.name}>{t(route.name)}</Button>
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </main>
    </>
  );
}
