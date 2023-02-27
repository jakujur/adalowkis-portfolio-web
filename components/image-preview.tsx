import { Portal } from '@/components/portal';
import Image from 'next/image';
import { Image as ImageType } from '@/types/image';
import { RefObject, useRef, MouseEvent } from 'react';

interface ImagePreviewProps {
  image?: ImageType;
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
      <p
        ref={previousButtonRef}
        onClick={onPreviousClick}
        className="p-4 md:p-16 cursor-pointer"
        role="presentation"
      >
        <div className="p-4 border-b-4 border-l-4  border-black inline-block rotate-45" />
      </p>
      {image && (
        <Image
          ref={imageRef}
          src={image.url}
          width={image.width}
          height={image.height}
          alt="Image view"
          sizes="100vw"
          className="border-8 border-white shadow-2xl"
        />
      )}
      <p
        ref={nextButtonRef}
        onClick={onNextClick}
        className="p-4 md:p-16 cursor-pointer"
        role="presentation"
      >
        <div className="p-4 border-t-4 border-r-4  border-black inline-block rotate-45" />
      </p>
    </Portal>
  );
}
