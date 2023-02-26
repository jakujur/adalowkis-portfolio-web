import { Artwork } from '@/types/artwork';

export const mapArtworkResponseToArtwork = (artworks: any): Artwork =>
  artworks.map((artwork: any) => ({
    id: artwork.id,
    description: artwork.attributes?.description,
    title: artwork.attributes?.name,
    image: {
      urlSmall: artwork.attributes?.media_file?.data?.attributes?.formats?.small?.url,
      urlLarge: artwork.attributes?.media_file?.data?.attributes?.formats?.large?.url,
    },
  }));
