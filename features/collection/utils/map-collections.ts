import { Collection } from '@/types/collection';

export const mapCollectionResponseToCollection = (collections: any): Collection[] =>
  collections.map((collection: any) => ({
    id: collection.id ?? null,
    name: collection.attributes?.name ?? null,
    description: collection.attributes?.description ?? null,
    coverImage: collection.attributes?.cover_image?.data?.attributes?.formats?.small?.url ?? null,
  }));
