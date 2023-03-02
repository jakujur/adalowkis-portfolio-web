import { Artwork, MediaObject } from '@/types/artwork';
import { Image } from '@/types/image';
import { Collection } from '@/types/collection';

export const mapArtworkResponseToArtwork = (artworks: any): Artwork[] =>
  artworks?.map((artwork: any) => ({
    id: artwork.id,
    description: artwork.attributes?.description ?? null,
    title: artwork.attributes?.name ?? null,
    image: {
      small: {
        url: artwork.attributes?.media_file?.data?.attributes?.formats?.small?.url ?? null,
        height: artwork.attributes?.media_file?.data?.attributes?.formats?.small?.height ?? null,
        width: artwork.attributes?.media_file?.data?.attributes?.formats?.small?.width ?? null,
      },
      large: {
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
    },
  }));

export const mapPaintingResponseToPainting = (paintings: any): Artwork[] =>
  paintings?.map((painting: any) => ({
    id: painting.id,
    description: painting.description ?? null,
    title: painting.name ?? null,
    image: {
      small: {
        url: painting.media_file?.data?.attributes?.formats?.small?.url ?? null,
        height: painting.media_file?.data?.attributes?.formats?.small?.height ?? null,
        width: painting.media_file?.data?.attributes?.formats?.small?.width ?? null,
      },
      large: {
        url:
          painting.media_file?.data?.attributes?.formats?.large?.url ??
          painting.media_file?.data?.attributes?.formats?.medium?.url ??
          null,
        height:
          painting.media_file?.data?.attributes?.formats?.large?.height ??
          painting.media_file?.data?.attributes?.formats?.medium?.height ??
          null,
        width:
          painting.media_file?.data?.attributes?.formats?.large?.width ??
          painting.media_file?.data?.attributes?.formats?.medium?.width ??
          null,
      },
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
  collections?.map((collection: any) => ({ params: { collectionId: collection?.id?.toString() } }));

export const mapArtworkToImageMediaObject = (artwork: Artwork): MediaObject<Image> => ({
  title: artwork.title ?? null,
  description: artwork.description ?? null,
  mediaFile: {
    url: artwork.image.large.url ?? null,
    height: artwork.image.large.height ?? null,
    width: artwork.image.large.width ?? null,
  },
});
