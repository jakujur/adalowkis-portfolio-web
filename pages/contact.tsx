import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';

interface OthersPageProps {
  links: any;
}

export default function BioPage({ links }: OthersPageProps) {
  if (!links) return null;

  return (
    <div className="flex flex-col items-center justify-center py-2">
      {JSON.stringify(links, null, '\t')}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await authAxios().get(`${API_URL}/links?populate=*`);
  const links = data.data;

  return {
    props: {
      links,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
