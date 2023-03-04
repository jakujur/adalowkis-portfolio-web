import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import { Bio } from '@/types/bio';

interface OthersPageProps {
  bio: Bio;
}

export default function BioPage({ bio }: OthersPageProps) {
  if (!bio) return null;

  return <div className="flex flex-col items-center justify-center py-2">{bio.bio}</div>;
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
