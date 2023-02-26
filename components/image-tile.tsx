import Image from 'next/image';

interface ImageTileProps {
  href: string;
  image: string;
  onClick: (href: string) => void;
  title: string;
  description: string;
}

export function ImageTile({ title, description, href, onClick, image }: ImageTileProps) {
  const handleClick = () => onClick(href);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full" onClick={handleClick}>
      <Image
        src={image}
        width={150}
        height={150}
        alt="Ada Lowkis"
        className="object-cover w-full h-full"
      />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-xl">{description}</p>
      </div>
    </div>
  );
}
