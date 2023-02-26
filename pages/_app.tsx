import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import React from 'react';
import '@/styles/globals.css';
import { Layout } from '@/components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default appWithTranslation(MyApp);
