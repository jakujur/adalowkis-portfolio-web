import { Portal } from '@/components/portal';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { Artwork } from '@/types/artwork';
import { useImagePreviewScale } from '@/hooks/use-preview-scale';
import { useCallbackRef } from '@/hooks/use-callback-ref';

interface ImagePreviewProps {
  image?: Artwork;
  visible: boolean;
  onClickOutside: () => void;
  onNextClick?: () => void;
  onPreviousClick?: () => void;
  onLoadingComplete?: () => void;
  imageLoading?: boolean;
}

const shouldHandleClickOutsideElement = (event: MouseEvent<HTMLElement>, ref?: HTMLElement) =>
  ref && !ref.contains(event.target as HTMLElement);

export function ImagePreview({
  image,
  visible,
  onClickOutside,
  onPreviousClick,
  onNextClick,
  onLoadingComplete,
  imageLoading,
}: ImagePreviewProps) {
  const { ref: imageRef, handleRef: handleImageRef } = useCallbackRef<HTMLImageElement>();
  const { ref: previousButtonRef, handleRef: handlePreviousButtonRef } =
    useCallbackRef<HTMLImageElement>();
  const { ref: nextButtonRef, handleRef: handleNextButtonRef } = useCallbackRef<HTMLImageElement>();
  const { scale: imageScale } = useImagePreviewScale(imageRef);

  const handleOutsideClick = (event: MouseEvent<HTMLElement>) => {
    const shouldPerformAction =
      shouldHandleClickOutsideElement(event, imageRef) &&
      shouldHandleClickOutsideElement(event, previousButtonRef) &&
      shouldHandleClickOutsideElement(event, nextButtonRef);

    if (shouldPerformAction) {
      return onClickOutside();
    }
    return null;
  };

  return (
    <Portal open={visible} onClickOutside={handleOutsideClick}>
      <div
        ref={handlePreviousButtonRef}
        onClick={onPreviousClick}
        className="p-4 md:p-16 cursor-pointer"
        role="presentation"
      >
        <div className="p-4 border-b-4 border-l-4  border-black inline-block rotate-45" />
      </div>
      {image?.image.large.url && (
        <div>
          <Image
            ref={handleImageRef}
            src={image.image.large.url}
            placeholder="blur"
            blurDataURL={image.image.small.url}
            width={image.image.large.width}
            height={image.image.large.height}
            alt={image.title}
            sizes="(max-width: 768px) 50vw,
                (max-width: 1200px) 75vw,
                100vw"
            onLoadingComplete={onLoadingComplete}
            className={`border-8 border-white shadow-2xl ${imageLoading && 'invisible'}`}
            style={{ transform: `scale(${imageScale})` }}
          />
          <p className="absolute bottom-5 left-0 right-0 mx-auto px-3 py-1.5 font-extralight text-sm text-white text-center bg-black w-max">
            {image.title} / {image.description}
          </p>
        </div>
      )}
      <div
        ref={handleNextButtonRef}
        onClick={onNextClick}
        className="p-4 md:p-16 cursor-pointer"
        role="presentation"
      >
        <div className="p-4 border-t-4 border-r-4  border-black inline-block rotate-45" />
      </div>
    </Portal>
  );
}
