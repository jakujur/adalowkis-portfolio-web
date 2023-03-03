import Image from 'next/image';
import { Image as ImageType } from '@/types/image';

interface ImageTileProps {
  id: string;
  image: ImageType;
  title: string;
  description: string;
  onClick: (id: string) => void;
  priority?: boolean;
}

export function ImageTile({ id, image, title, description, onClick, priority }: ImageTileProps) {
  const handleClick = () => onClick(id);

  return (
    <li className="group relative w-full aspect-square" onClick={handleClick} role="presentation">
      {image?.url && (
        <Image
          src={image.url}
          alt={title}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          fill
          className="object-cover border-2 w-full h-auto"
          priority={priority}
        />
      )}
      <div className="p-2 absolute top-0 bottom-0 left-0 right-0 h-full w-full bg-black bg-opacity-60 cursor-pointer invisible group-hover:visible">
        <div className="p-4 h-full border-2 border-white text-white text-xl">
          <h2 className="text-2xl font-light">{title}</h2>
          <p className="pt-4 text-sm font-extralight">{description}</p>
        </div>
      </div>
    </li>
  );
}
