import Image from 'next/image';

interface ImageTileProps {
  id: string;
  name: string;
  coverImage: string;
  onClick: (id: string) => void;
}

export function CollectionTile({ id, name, coverImage, onClick }: ImageTileProps) {
  const handleClick = () => onClick(id);

  return (
    <li className="relative w-full aspect-square" onClick={handleClick} role="presentation">
      {coverImage && (
        <Image
          src={coverImage}
          alt={coverImage}
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          fill
          className="object-cover border-2 w-full h-auto"
        />
      )}
      <div className="p-2 absolute top-0 bottom-0 left-0 right-0 h-full w-full bg-black bg-opacity-60 cursor-pointer opacity-1 hover:opacity-0">
        <div className="p-4 h-full border-2 border-white text-white text-xl">
          <h2 className="text-2xl font-bold">{name}</h2>
        </div>
      </div>
    </li>
  );
}
