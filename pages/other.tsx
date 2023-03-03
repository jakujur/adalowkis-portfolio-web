import { extractLocale } from '@/lib/translation-helpers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { Artwork } from '@/types/artwork';
import { authAxios } from '@/lib/api-helpers';
import { API_URL } from '@/consts/env-variables';
import { mapArtworkResponseToArtwork } from '@/lib/mappers';
import { useState } from 'react';
import { ImageTile } from '@/components/image-tile';
import { ImagePreview } from '@/components/image-preview';

interface OthersPageProps {
  drawings: Artwork[];
}

export default function OthersPage({ drawings }: OthersPageProps) {
  const [image, setImage] = useState<Artwork>();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  if (!drawings) return null;

  const togglePreview = () => setPreviewVisible((prevState) => !prevState);

  const handleShowPreview = (id: string) => {
    setImageLoading(true);
    setImage(drawings.find((drawing) => drawing.id === id));
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
          <ImageTile
            key={drawing.id}
            id={drawing.id}
            image={drawing.coverImage}
            title={drawing.title}
            description={drawing.description}
            onClick={handleShowPreview}
          />
        ))}
      </ul>
      {image && (
        <ImagePreview
          image={image?.previewImage}
          title={image?.title}
          format={image?.format}
          description={image?.description}
          visible={previewVisible}
          onClickOutside={togglePreview}
          onNextClick={handleNextClick}
          onPreviousClick={handlePrevClick}
          onLoadingComplete={() => setImageLoading(false)}
          imageLoading={imageLoading}
        />
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await authAxios().get(`${API_URL}/artworks?populate=*`);
  const drawings = mapArtworkResponseToArtwork(data.data);

  return {
    props: {
      drawings,
      ...(await serverSideTranslations(extractLocale(ctx), ['common'])),
    },
  };
};
