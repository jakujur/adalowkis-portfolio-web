import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';

interface OthersPageProps {
  bio: any;
}

export default function BioPage({ bio }: OthersPageProps) {
  if (!bio) return null;

  return (
    <div className="flex flex-col items-center justify-center py-2">
      {JSON.stringify(bio, null, '\t')}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await authAxios().get(`${API_URL}/bio?populate=*`);
  const bio = data.data.attributes;

  return {
    props: {
      bio,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
