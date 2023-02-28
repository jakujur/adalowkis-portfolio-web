import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import React from 'react';
import '@/styles/globals.css';
import { Layout } from '@/components/layout';
import { useRouter } from 'next/router';
import { NavigationRouteName } from '@/consts/navigation-routes';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const route = router.pathname.split('/')[1] as NavigationRouteName;

  return (
    <Layout activeRoute={route}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
