import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { ImageTile } from '@/components/image-tile';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';
import { mapArtworkResponseToArtwork } from '@/lib/mappers';
import { useState } from 'react';
import { Image as ImageType } from '@/types/image';

import { ImagePreview } from '@/components/image-preview';

interface DrawingsPageProps {
  drawings: Artwork[];
}

export default function DrawingsPage({ drawings }: DrawingsPageProps) {
  const [image, setImage] = useState<ImageType>();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  const togglePreview = () => setPreviewVisible((prevState) => !prevState);
  const handleShowPreview = (img: ImageType) => {
    setImage(img);
    togglePreview();
  };

  const handleNextClick = () => {
    const index = drawings.findIndex((drawing) => drawing.image.large.url === image?.url);
    const nextIndex = index + 1;
    const nextImage = drawings[nextIndex]?.image?.large ?? drawings[0].image.large;
    setImage(nextImage);
  };

  const handlePrevClick = () => {
    const index = drawings.findIndex((drawing) => drawing.image.large.url === image?.url);
    const prevIndex = index - 1;
    const prevImage =
      drawings[prevIndex]?.image?.large ?? drawings[drawings.length - 1].image.large;
    setImage(prevImage);
  };

  return (
    <>
      <ul className="grid  gap-4 justify-center p-[initial] grid-cols-1 xs:grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(224px,max-content))] lg:grid-cols-[repeat(auto-fit,minmax(288px,max-content))]">
        {drawings.map((drawing) => (
          <ImageTile
            key={drawing.id}
            description={drawing.description}
            previewUrl={drawing.image.small.url}
            title={drawing.title}
            image={drawing.image.large}
            onClick={handleShowPreview}
          />
        ))}
      </ul>
      <ImagePreview
        image={image}
        visible={previewVisible}
        onClickOutside={togglePreview}
        onNextClick={handleNextClick}
        onPreviousClick={handlePrevClick}
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
