import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';
import { mapCollectionResponseToCollection } from '@/lib/mappers';
import { Collection } from '@/types/collection';

interface OthersPageProps {
  collections: Collection[];
}

export default function OthersPage({ collections }: OthersPageProps) {
  return collections.map((collection: Collection) => (
    <div key={collection.id}>{collection?.name}</div>
  ));
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
