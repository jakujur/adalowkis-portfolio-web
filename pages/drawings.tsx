import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { ImageTile } from '@/components/image-tile';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';
import { mapArtworkResponseToArtwork } from '@/lib/mappers';

interface DrawingsPageProps {
  drawings: Artwork[];
}

export default function DrawingsPage({ drawings }: DrawingsPageProps) {
  return drawings.map((drawing) => (
    <ImageTile
      key={drawing.id}
      description={drawing.description}
      image={drawing.image.urlSmall}
      title={drawing.title}
      href={drawing.image.urlLarge}
      onClick={() => null}
    />
  ));
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
