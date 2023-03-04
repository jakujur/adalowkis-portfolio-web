import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Collection } from '@/types/collection';
import { CollectionView, getCollections } from '@/features/collection';

interface OthersPageProps {
  collections?: Collection[];
}

export default function OthersPage({ collections }: OthersPageProps) {
  if (!collections) return null;

  return <CollectionView collections={collections} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const collections = await getCollections('painting-collections');

  return {
    props: {
      collections,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
