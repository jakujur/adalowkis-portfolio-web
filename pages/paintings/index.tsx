import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import { mapCollectionResponseToCollection } from '@/utils/mappers';
import { Collection } from '@/types/collection';
import { CollectionView } from '@/features/collection';

interface OthersPageProps {
  collections?: Collection[];
}

export default function OthersPage({ collections }: OthersPageProps) {
  if (!collections) return null;

  return <CollectionView collections={collections} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await authAxios().get(`${API_URL}/painting-collections?populate[cover_image]=*`);
  const collections = mapCollectionResponseToCollection(data.data);

  return {
    props: {
      collections,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
