import { Artwork } from '@/types/artwork';
import { useState } from 'react';
import { ImageTile } from '@/components/image-tile';
import { ImagePreview } from '@/components/image-preview';

interface GalleryViewProps {
  artworks: Artwork[];
}

export function GalleryView({ artworks }: GalleryViewProps) {
  const [image, setImage] = useState<Artwork>();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const togglePreview = () => setPreviewVisible((prevState) => !prevState);

  const handleShowPreview = (artworkId: string) => {
    setImageLoading(true);
    setImage(artworks.find(({ id }) => id === artworkId));
    togglePreview();
  };

  const handleNextClick = () => {
    const index = artworks.findIndex(({ id }) => id === image?.id);
    const nextIndex = index + 1;
    const nextImage = artworks[nextIndex] ?? artworks[0];
    if (nextImage !== image) {
      setImage(nextImage);
      setImageLoading(true);
    }
  };

  const handlePrevClick = () => {
    const index = artworks.findIndex(({ id }) => id === image?.id);
    const prevIndex = index - 1;
    const prevImage = artworks[prevIndex] ?? artworks[artworks.length - 1];
    if (prevImage !== image) {
      setImage(prevImage);
      setImageLoading(true);
    }
  };

  return (
    <>
      <ul className="grid  gap-4 justify-center p-[initial] grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {artworks.map((artwork) => (
          <ImageTile
            key={artwork.id}
            id={artwork.id}
            image={artwork.coverImage}
            title={artwork.title}
            description={artwork.description}
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
