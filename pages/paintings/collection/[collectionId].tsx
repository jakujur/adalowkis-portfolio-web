import { extractLocale } from '@/utils/translation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import {
  mapCollectionsResponseRoStaticPaths,
  mapPaintingsResponseToPaintings,
} from '@/utils/mappers';
import { GalleryView } from '@/features/gallery';

interface DrawingsPageProps {
  paintings?: Artwork[];
}

export default function PaintingsPage({ paintings }: DrawingsPageProps) {
  if (!paintings) return null;

  return <GalleryView artworks={paintings} />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const collectionId = ctx?.params?.collectionId;
  const { data } = await authAxios().get(
    `${API_URL}/painting-collections/${collectionId}?populate[paintings][populate][0]=media_file`,
  );
  const paintings = mapPaintingsResponseToPaintings(data?.data?.attributes?.paintings);

  return {
    props: {
      paintings,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await authAxios().get(`${API_URL}/painting-collections`);
  const collections = mapCollectionsResponseRoStaticPaths(data.data);

  return {
    paths: collections,
    fallback: true,
  };
};
