import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { GalleryView, getArtworks } from '@/features/gallery';

interface DrawingsPageProps {
  drawings?: Artwork[];
}

export default function DrawingsPage({ drawings }: DrawingsPageProps) {
  if (!drawings) return null;

  return <GalleryView artworks={drawings} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const drawings = await getArtworks('drawings');

  return {
    props: {
      drawings,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
