import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { ImageTile } from '@/components/image-tile';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';
import { mapCollectionsResponseRoStaticPaths, mapPaintingResponseToPainting } from '@/lib/mappers';
import { useState } from 'react';

import { ImagePreview } from '@/components/image-preview';

interface DrawingsPageProps {
  paintings: Artwork[];
}

export default function PaintingsPage({ paintings }: DrawingsPageProps) {
  const [image, setImage] = useState<Artwork>();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const togglePreview = () => setPreviewVisible((prevState) => !prevState);

  const handleShowPreview = (img: Artwork) => {
    setImageLoading(true);
    setImage(img);
    togglePreview();
  };

  const handleNextClick = () => {
    setImageLoading(true);
    const index = paintings.findIndex(({ id }) => id === image?.id);
    const nextIndex = index + 1;
    const nextImage = paintings[nextIndex] ?? paintings[0];
    setImage(nextImage);
  };

  const handlePrevClick = () => {
    setImageLoading(true);
    const index = paintings.findIndex(({ id }) => id === image?.id);
    const prevIndex = index - 1;
    const prevImage = paintings[prevIndex] ?? paintings[paintings.length - 1];
    setImage(prevImage);
  };

  return (
    <>
      <ul className="grid  gap-4 justify-center p-[initial] grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {paintings.map((painting) => (
          <ImageTile key={painting.id} image={painting} onClick={handleShowPreview} />
        ))}
      </ul>
      <ImagePreview
        image={image}
        visible={previewVisible}
        onClickOutside={togglePreview}
        onNextClick={handleNextClick}
        onPreviousClick={handlePrevClick}
        onLoadingComplete={() => setImageLoading(false)}
        imageLoading={imageLoading}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const collectionId = ctx?.params?.collectionId;
  console.log('START');
  const { data } = await authAxios().get(
    `${API_URL}/painting-collections/${collectionId}?populate[paintings][populate][0]=media_file`,
  );
  console.log(data);
  const paintings = mapPaintingResponseToPainting(data?.data?.attributes?.paintings);

  return {
    props: {
      paintings,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await authAxios().get(`${API_URL}/painting-collections`);
  console.log(data);
  const collections = mapCollectionsResponseRoStaticPaths(data.data);
  console.log(collections);
  return {
    paths: collections,
    fallback: true,
  };
};
