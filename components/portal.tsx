import {
  useRef,
  useEffect,
  useState,
  ReactNode,
  PropsWithChildren,
  MouseEventHandler,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  open: ReactNode;
  onClickOutside: MouseEventHandler<HTMLElement>;
}

export function Portal({ children, open, onClickOutside }: PropsWithChildren<PortalProps>) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#modal-portal');
    setMounted(true);
  }, []);

  const shouldShowPortal = open && mounted && ref.current;

  if (!shouldShowPortal || !ref.current) {
    return null;
  }

  return createPortal(
    <>
      <div
        onClick={onClickOutside}
        className="fixed right-0 top-0 top-0 w-8 h-8 bg-black opacity-70 z-10 hover:opacity-100"
        role="presentation"
      >
        <div>
          <div className="h-8 w-8 relative rounded-4 after:absolute after:content-['\d7'] after:text-4xl after:text-white after:font-light after:leading-[25px] after:text-center after:inset-0 cursor-pointer" />
        </div>
      </div>
      <div
        className="w-full h-full fixed flex left-0 right-0 bottom-0 overflow-y-hidden bg-white items-center justify-between"
        onClick={onClickOutside}
        role="presentation"
      >
        {children}
      </div>
    </>,
    ref.current,
  );
}
