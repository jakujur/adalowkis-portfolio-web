import { Portal } from '@/components/portal';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { useImagePreviewScale } from '@/hooks/use-preview-scale';
import { useCallbackRef } from '@/hooks/use-callback-ref';
import { Loader } from '@/components/loader';
import { useDebouncedLoader } from '@/hooks/use-debounced-loader';
import { ArtworkFormat } from '@/types/artwork';
import { Image as ImageType } from '@/types/image';

interface ImagePreviewProps {
  image: ImageType;
  title: string;
  description: string;
  visible: boolean;
  onClickOutside: () => void;
  onNextClick?: () => void;
  onPreviousClick?: () => void;
  onLoadingComplete?: () => void;
  imageLoading?: boolean;
  format?: ArtworkFormat;
}

const shouldHandleClickOutsideElement = (
  event: MouseEvent<HTMLElement>,
  ref?: HTMLElement | null,
) => ref && !ref.contains(event.target as HTMLElement);

export function ImagePreview({
  image,
  title,
  description,
  format,
  visible,
  onClickOutside,
  onPreviousClick,
  onNextClick,
  onLoadingComplete,
  imageLoading,
}: ImagePreviewProps) {
  const { ref: imageRef, handleRef: handleImageRef } = useCallbackRef<
    HTMLImageElement | HTMLVideoElement | null
  >();
  const { ref: previousButtonRef, handleRef: handlePreviousButtonRef } =
    useCallbackRef<HTMLImageElement>();
  const { ref: nextButtonRef, handleRef: handleNextButtonRef } = useCallbackRef<HTMLImageElement>();
  const { scale: imageScale } = useImagePreviewScale(imageRef);
  const { isLoaderVisible } = useDebouncedLoader(250, imageLoading);

  const isVideo = format === 'video';

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

  if (!image) return null;

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
      {isVideo ? (
        <video ref={handleImageRef} width="100%" autoPlay muted>
          <source src={image.url} type="video/mp4" />
        </video>
      ) : (
        <div>
          <Image
            ref={handleImageRef}
            src={image.url}
            width={image.width}
            height={image.height}
            alt={title}
            sizes="(max-width: 768px) 50vw,
                (max-width: 1200px) 75vw,
                100vw"
            onLoadingComplete={onLoadingComplete}
            className={`border-8 border-white shadow-2xl ${imageLoading && 'invisible'}`}
            style={{ transform: `scale(${imageScale})` }}
          />
          {isLoaderVisible && imageLoading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              <Loader />
            </div>
          )}
        </div>
      )}
      <p className="absolute bottom-5 left-0 right-0 mx-auto px-3 py-1.5 font-extralight text-sm text-white text-center bg-black w-max">
        {title} / {description}
      </p>
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
