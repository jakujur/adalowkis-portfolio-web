import { Artwork } from '@/types/artwork';

export const mapArtworkResponseToArtwork = (artworks: any): Artwork =>
  artworks.map((artwork: any) => ({
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

export const mapCollectionResponseToCollection = (collections: any): any =>
  collections.map((collection: any) => ({
    id: collection.id,
    name: collection.attributes?.name,
    description: collection.attributes?.description,
    artworks: mapArtworkResponseToArtwork(collection.attributes?.artworks),
  }));
