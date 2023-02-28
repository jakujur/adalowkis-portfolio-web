import { Image as ImageType } from '@/types/image';
import Image from 'next/image';
import { MediaObject } from '@/types/artwork';

interface ImageTileProps {
  image: ImageType;
  previewUrl: string;
  onClick: (args: MediaObject<ImageType>) => void;
  title: string;
  description: string;
  priority?: boolean;
}

export function ImageTile({
  title,
  description,
  image,
  onClick,
  previewUrl,
  priority,
}: ImageTileProps) {
  const handleClick = () => onClick({ mediaFile: image, title, description });

  return (
    <li className="group relative w-full aspect-square" onClick={handleClick} role="presentation">
      <Image
        src={previewUrl}
        alt={title}
        fill
        sizes="20vw"
        className="object-cover border-2"
        priority={priority}
      />
      <div className="p-2 absolute top-0 bottom-0 left-0 right-0 h-full w-full bg-black bg-opacity-60 cursor-pointer invisible group-hover:visible">
        <div className="p-4 h-full border-2 border-white text-white text-xl">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-xl">{description}</p>
        </div>
      </div>
    </li>
  );
}
