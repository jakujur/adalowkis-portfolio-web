import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

import React from 'react';
import { extractLocale } from 'lib/translation-helpers';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Image
        src="https://adalowkis-artwork.s3.eu-central-1.amazonaws.com/large_IMG_4029_f19aaf5a5b.jpeg"
        width={1000}
        height={1000}
        alt="welcome"
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => ({
  props: {
    ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
  },
});
