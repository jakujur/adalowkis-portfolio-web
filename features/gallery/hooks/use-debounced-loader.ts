import { useEffect, useState } from 'react';

export const useDebouncedLoader = (debounce: number, loadingState?: boolean) => {
  const [isLoaderVisible, setIsLoaderVisible] = useState<boolean>(false);

  useEffect(() => {
    // set loader with timeout
    const timeout = setTimeout(() => {
      if (loadingState) {
        setIsLoaderVisible(true);
      }
    }, debounce);

    // unset loader immediately
    if (!loadingState) {
      setIsLoaderVisible(false);
    }
    return () => clearTimeout(timeout);
  }, [debounce, loadingState]);

  return { isLoaderVisible };
};
