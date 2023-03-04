import Link from 'next/link';
import { Collection } from '@/types/collection';
import { CollectionTile } from '@/components/collection-tile';

interface CollectionViewProps {
  collections: Collection[];
}

export function CollectionView({ collections }: CollectionViewProps) {
  return (
    <div className="grid  gap-4 justify-center p-[initial] grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {collections.map(({ id, coverImage, name }) => (
        <Link
          href={{
            pathname: '/paintings/collection/[collectionId]',
            query: { collectionId: `${id}` },
          }}
          as={`/paintings/collection/${id}`}
          key={id}
        >
          <CollectionTile coverImage={coverImage} name={name} />
        </Link>
      ))}
    </div>
  );
}
