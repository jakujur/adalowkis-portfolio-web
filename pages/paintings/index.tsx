import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';

interface OthersPageProps {
  collections: any;
}

export default function OthersPage({ collections }: OthersPageProps) {
  console.log(collections);
  return collections.map((collection: any) => (
    <div key={collection.id}>{collection.attributes.name}</div>
  ));
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await authAxios().get(`${API_URL}/painting-collections?populate[cover_image]=*`);
  const collections = data.data;

  return {
    props: {
      collections,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
