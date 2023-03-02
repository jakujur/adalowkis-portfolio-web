import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';
import { mapArtworkResponseToArtwork } from '@/lib/mappers';

interface OthersPageProps {
  artworks: Artwork[];
}

export default function OthersPage({ artworks }: OthersPageProps) {
  if (!artworks) return null;

  return artworks.map((artwork) => <div key={artwork.id}>{artwork.title}</div>);
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
