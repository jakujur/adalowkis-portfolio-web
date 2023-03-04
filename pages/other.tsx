import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import { mapArtworkResponseToArtwork } from '@/utils/mappers';
import { GalleryView } from '@/features/gallery';

interface OthersPageProps {
  artworks?: Artwork[];
}

export default function OthersPage({ artworks }: OthersPageProps) {
  if (!artworks) return null;

  return <GalleryView artworks={artworks} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await authAxios().get(`${API_URL}/artworks?populate=*`);
  const artworks = mapArtworkResponseToArtwork(data.data);

  return {
    props: {
      artworks,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
