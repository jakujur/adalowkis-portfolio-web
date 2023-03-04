interface CollectionStaticPaths {
  params: {
    collectionId: string;
  };
}

export const mapCollectionsResponseRoStaticPaths = (collections: any): CollectionStaticPaths[] =>
  collections?.map(({ id }: { id: string }) => ({ params: { collectionId: id?.toString() } }));
