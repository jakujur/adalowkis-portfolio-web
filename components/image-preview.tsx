import { Portal } from '@/components/portal';
import Image from 'next/image';
import { RefObject, useRef, MouseEvent } from 'react';
import { Artwork } from '@/types/artwork';

interface ImagePreviewProps {
  image?: Artwork;
  visible: boolean;
  onClickOutside: () => void;
  onNextClick?: () => void;
  onPreviousClick?: () => void;
}

const shouldHandleClickOutsideElement = (
  event: MouseEvent<HTMLElement>,
  ref: RefObject<HTMLElement>,
) => ref?.current && !ref.current.contains(event.target as HTMLElement);

export function ImagePreview({
  image,
  visible,
  onClickOutside,
  onPreviousClick,
  onNextClick,
}: ImagePreviewProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const previousButtonRef = useRef<HTMLDivElement>(null);
  const nextButtonRef = useRef<HTMLDivElement>(null);

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
        ref={previousButtonRef}
        onClick={onPreviousClick}
        className="p-4 md:p-16 cursor-pointer"
        role="presentation"
      >
        <div className="p-4 border-b-4 border-l-4  border-black inline-block rotate-45" />
      </div>
      {image && (
        <div>
          <Image
            ref={imageRef}
            src={image.image.large.url}
            blurDataURL={image.image.small.url}
            width={image.image.large.width}
            height={image.image.large.height}
            alt={image.title}
            sizes="100vw"
            className="border-8 border-white shadow-2xl"
          />
          <p className="absolute bottom-5 left-0 right-0 mx-auto px-3 py-1.5 font-extralight text-sm text-white text-center bg-black w-max">
            {image.title} / {image.description}
          </p>
        </div>
      )}
      <div
        ref={nextButtonRef}
        onClick={onNextClick}
        className="p-4 md:p-16 cursor-pointer"
        role="presentation"
      >
        <div className="p-4 border-t-4 border-r-4  border-black inline-block rotate-45" />
      </div>
    </Portal>
  );
}
