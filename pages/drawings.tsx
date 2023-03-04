import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import { mapArtworkResponseToArtwork } from '@/utils/mappers';
import { GalleryView } from '@/features/gallery';

interface DrawingsPageProps {
  drawings?: Artwork[];
}

export default function DrawingsPage({ drawings }: DrawingsPageProps) {
  if (!drawings) return null;

  return <GalleryView artworks={drawings} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await authAxios().get(`${API_URL}/drawings?populate=*`);
  const drawings = mapArtworkResponseToArtwork(data.data);

  return {
    props: {
      drawings,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
