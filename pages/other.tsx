import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { GalleryView, getArtworks } from '@/features/gallery';

interface OthersPageProps {
  artworks?: Artwork[];
}

export default function OthersPage({ artworks }: OthersPageProps) {
  if (!artworks) return null;

  return <GalleryView artworks={artworks} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const artworks = await getArtworks('artworks');

  return {
    props: {
      artworks,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
