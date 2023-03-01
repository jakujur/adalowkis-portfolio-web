import { useCallback, useEffect, useState } from 'react';

export const useImagePreviewScale = (ref?: HTMLImageElement) => {
  const [scale, setScale] = useState(1);

  const handleResize = useCallback(() => {
    if (ref) {
      const { innerHeight: windowHeight } = window;
      const { offsetHeight: imageHeight } = ref;
      const maxHeight = windowHeight - 200;
      if (maxHeight < imageHeight) {
        return setScale(maxHeight / imageHeight);
      }
    }
    return null;
  }, [ref]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize, ref]);

  useEffect(() => {
    ref?.addEventListener('load', handleResize);
    return () => ref?.removeEventListener('load', handleResize);
  }, [handleResize, ref]);

  return { scale };
};
