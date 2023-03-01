import Image from 'next/image';
import { Artwork } from '@/types/artwork';

interface ImageTileProps {
  image: Artwork;
  onClick: (args: Artwork) => void;
  priority?: boolean;
}

export function ImageTile({ image, onClick, priority }: ImageTileProps) {
  const handleClick = () => onClick(image);

  return (
    <li className="group relative w-full aspect-square" onClick={handleClick} role="presentation">
      {image.image.small.url && (
        <Image
          src={image.image.small.url}
          alt={image.title}
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
          <h2 className="text-2xl font-bold">{image.title}</h2>
          <p className="text-xl">{image.description}</p>
        </div>
      </div>
    </li>
  );
}
