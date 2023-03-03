import { useCallback, useState } from 'react';

// used to handle stateful usages of Refs
export const useCallbackRef = <T extends HTMLElement | null>() => {
  const [ref, setRef] = useState<T>();

  const handleRef = useCallback((node: T) => {
    setRef(node);
  }, []);

  return { ref, handleRef };
};
