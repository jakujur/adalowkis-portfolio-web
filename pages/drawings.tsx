import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { ImageTile } from '@/components/image-tile';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';
import { mapArtworkResponseToArtwork } from '@/lib/mappers';
import { useState } from 'react';

import { ImagePreview } from '@/components/image-preview';

interface DrawingsPageProps {
  drawings?: Artwork[];
}

export default function DrawingsPage({ drawings }: DrawingsPageProps) {
  const [image, setImage] = useState<Artwork>();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  if (!drawings) return null;

  const togglePreview = () => setPreviewVisible((prevState) => !prevState);

  const handleShowPreview = (img: Artwork) => {
    setImageLoading(true);
    setImage(img);
    togglePreview();
  };

  const handleNextClick = () => {
    setImageLoading(true);
    const index = drawings.findIndex(({ id }) => id === image?.id);
    const nextIndex = index + 1;
    const nextImage = drawings[nextIndex] ?? drawings[0];
    setImage(nextImage);
  };

  const handlePrevClick = () => {
    setImageLoading(true);
    const index = drawings.findIndex(({ id }) => id === image?.id);
    const prevIndex = index - 1;
    const prevImage = drawings[prevIndex] ?? drawings[drawings.length - 1];
    setImage(prevImage);
  };

  return (
    <>
      <ul className="grid  gap-4 justify-center p-[initial] grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {drawings.map((drawing) => (
          <ImageTile key={drawing.id} image={drawing} onClick={handleShowPreview} />
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
  const { data } = await authAxios().get(`${API_URL}/drawings?populate=*`);
  const drawings = mapArtworkResponseToArtwork(data.data);

  return {
    props: {
      drawings,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
