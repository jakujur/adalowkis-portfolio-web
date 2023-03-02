import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';
import { mapCollectionResponseToCollection } from '@/lib/mappers';
import { Collection } from '@/types/collection';
import { CollectionTile } from '@/components/collection-tile';
import Link from 'next/link';

interface OthersPageProps {
  collections: Collection[];
}

export default function OthersPage({ collections }: OthersPageProps) {
  return (
    <ul className="grid  gap-4 justify-center p-[initial] grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {collections.map(({ id, coverImage, name }) => (
        <Link href={`/paintings/collection/${id}`} key={id}>
          <CollectionTile coverImage={coverImage} name={name} />
        </Link>
      ))}
    </ul>
  );
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
