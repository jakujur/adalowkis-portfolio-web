import { useEffect, useState } from 'react';
import { useCallbackRef } from '@/hooks/use-callback-ref';

export const useHover = <T extends HTMLElement>() => {
  const { ref: refCurrent, handleRef: ref } = useCallbackRef<T>();
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    refCurrent?.addEventListener('mouseover', handleMouseOver);
    refCurrent?.addEventListener('mouseout', handleMouseOut);

    return () => {
      refCurrent?.removeEventListener('mouseover', handleMouseOver);
      refCurrent?.removeEventListener('mouseout', handleMouseOut);
    };
  }, [refCurrent]);

  return { ref, isHovered };
};
