import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { GalleryView, getArtworksCollection } from '@/features/gallery';
import { getCollectionsPaths } from '@/features/collection';

interface DrawingsPageProps {
  paintings?: Artwork[];
}

export default function PaintingsPage({ paintings }: DrawingsPageProps) {
  if (!paintings) return null;

  return <GalleryView artworks={paintings} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const collectionId = ctx?.params?.collectionId as string;
  const paintings = await getArtworksCollection('painting-collections', collectionId);

  return {
    props: {
      paintings,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const collectionsPaths = await getCollectionsPaths('painting-collections');

  return {
    paths: collectionsPaths,
    fallback: true,
  };
};
