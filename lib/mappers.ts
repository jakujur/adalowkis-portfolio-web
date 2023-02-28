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
        url: artwork.attributes?.media_file?.data?.attributes?.formats?.large?.url ?? null,
        height: artwork.attributes?.media_file?.data?.attributes?.formats?.large?.height ?? null,
        width: artwork.attributes?.media_file?.data?.attributes?.formats?.large?.width ?? null,
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

export const mapArtworkToImageMediaObject = (artwork: Artwork): MediaObject<Image> => ({
  title: artwork.title ?? null,
  description: artwork.description ?? null,
  mediaFile: {
    url: artwork.image.large.url ?? null,
    height: artwork.image.large.height ?? null,
    width: artwork.image.large.width ?? null,
  },
});
