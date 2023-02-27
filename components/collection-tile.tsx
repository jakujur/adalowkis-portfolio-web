import Image from 'next/image';

interface CollectionTileProps {
  href: string;
  image: string;
  onClick: (href: string) => void;
  title: string;
}

export function CollectionTile({ title, href, onClick, image }: CollectionTileProps) {
  const handleClick = () => onClick(href);

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full"
      onClick={handleClick}
      role="presentation"
    >
      <Image
        src={image}
        width={150}
        height={150}
        alt="Ada Lowkis"
        className="object-cover w-full h-full"
      />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </div>
  );
}
