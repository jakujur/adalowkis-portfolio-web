import { useEffect, useState } from 'react';

export const useImagePreviewScale = (ref?: HTMLElement | null) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (ref) {
        const { innerHeight: windowHeight } = window;
        const { offsetHeight: imageHeight } = ref;
        const maxHeight = windowHeight - 200;
        if (maxHeight < imageHeight) {
          return setScale(maxHeight / imageHeight);
        }
      }
      return null;
    };

    window.addEventListener('resize', handleResize);
    ref?.addEventListener('load', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ref?.removeEventListener('load', handleResize);
    };
  }, [ref]);

  return { scale };
};
