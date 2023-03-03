import { Artwork } from '@/types/artwork';
import { Collection } from '@/types/collection';

const mapImageResponseToArtwork = (artwork: any): Artwork => ({
  id: artwork.id,
  description: artwork.attributes?.description ?? null,
  title: artwork.attributes?.name ?? null,
  format: 'image',
  coverImage: {
    url: artwork.attributes?.media_file?.data?.attributes?.formats?.small?.url ?? null,
    height: artwork.attributes?.media_file?.data?.attributes?.formats?.small?.height ?? null,
    width: artwork.attributes?.media_file?.data?.attributes?.formats?.small?.width ?? null,
  },
  previewImage: {
    url:
      artwork.attributes?.media_file?.data?.attributes?.formats?.large?.url ??
      artwork.attributes?.media_file?.data?.attributes?.formats?.medium?.url ??
      null,
    height:
      artwork.attributes?.media_file?.data?.attributes?.formats?.large?.height ??
      artwork.attributes?.media_file?.data?.attributes?.formats?.medium?.height ??
      null,
    width:
      artwork.attributes?.media_file?.data?.attributes?.formats?.large?.width ??
      artwork.attributes?.media_file?.data?.attributes?.formats?.medium?.width ??
      null,
  },
});

const mapVideoResponseToArtwork = (artwork: any): Artwork => ({
  id: artwork.id,
  description: artwork.attributes?.description ?? null,
  title: artwork.attributes?.name ?? null,
  format: 'video',
  coverImage: {
    url: artwork.attributes?.cover_image?.data?.attributes?.formats?.small?.url ?? null,
    height: artwork.attributes?.cover_image?.data?.attributes?.formats?.small?.height ?? null,
    width: artwork.attributes?.cover_image?.data?.attributes?.formats?.small?.width ?? null,
  },
  previewImage: {
    url:
      artwork.attributes?.media_file?.data?.attributes?.url ??
      artwork.attributes?.media_file?.data?.attributes?.url ??
      null,
  },
});

export const mapArtworkResponseToArtwork = (artworks: any): Artwork[] =>
  artworks?.map((artwork: any) => {
    if (artwork.attributes?.media_file?.data?.attributes?.mime?.includes('video')) {
      return mapVideoResponseToArtwork(artwork);
    }
    return mapImageResponseToArtwork(artwork);
  });

export const mapPaintingsResponseToPaintings = (paintings: any): Artwork[] =>
  paintings?.map((painting: any) => ({
    id: painting.id,
    description: painting.description ?? null,
    title: painting.name ?? null,
    coverImage: {
      url: painting?.media_file?.data?.attributes?.formats?.small?.url ?? null,
      height: painting?.media_file?.data?.attributes?.formats?.small?.height ?? null,
      width: painting?.media_file?.data?.attributes?.formats?.small?.width ?? null,
    },
    previewImage: {
      url:
        painting?.media_file?.data?.attributes?.formats?.large?.url ??
        painting?.media_file?.data?.attributes?.formats?.medium?.url ??
        null,
      height:
        painting?.media_file?.data?.attributes?.formats?.large?.height ??
        painting?.media_file?.data?.attributes?.formats?.medium?.height ??
        null,
      width:
        painting?.media_file?.data?.attributes?.formats?.large?.width ??
        painting?.media_file?.data?.attributes?.formats?.medium?.width ??
        null,
    },
  }));

export const mapCollectionResponseToCollection = (collections: any): Collection[] =>
  collections.map((collection: any) => ({
    id: collection.id ?? null,
    name: collection.attributes?.name ?? null,
    description: collection.attributes?.description ?? null,
    coverImage: collection.attributes?.cover_image?.data?.attributes?.formats?.small?.url ?? null,
  }));

interface CollectionStaticPaths {
  params: {
    collectionId: string;
  };
}

export const mapCollectionsResponseRoStaticPaths = (collections: any): CollectionStaticPaths[] =>
  collections?.map(({ id }: { id: string }) => ({ params: { collectionId: id?.toString() } }));
