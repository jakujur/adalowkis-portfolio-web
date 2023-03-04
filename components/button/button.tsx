import { PropsWithChildren } from 'react';
import { useHover } from '@/components/button/hooks/use-hover';

interface ButtonProps {
  onClick?: () => void;
  active?: boolean;
}

export function Button({ children, onClick, active }: PropsWithChildren<ButtonProps>) {
  const { ref, isHovered } = useHover<HTMLButtonElement>();
  const isActive = active || isHovered;
  const activeStyle = isActive ? 'bg-black text-white' : 'bg-white text-black';

  return (
    <button
      ref={ref}
      className={`px-2.5 py-2 w-full h-11 border-black border-2 ${activeStyle} sm:w-24 md:w-32 lg:w-44`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
