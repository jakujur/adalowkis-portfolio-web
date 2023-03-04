import { Artwork } from '@/types/artwork';

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
  format: artwork.attributes?.media_file?.data?.attributes?.mime ?? null,
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

export const mapArtworksResponseToArtworks = (artworks: any): Artwork[] =>
  artworks?.map((artwork: any) => {
    if (artwork.attributes?.media_file?.data?.attributes?.mime?.includes('video')) {
      return mapVideoResponseToArtwork(artwork);
    }
    return mapImageResponseToArtwork(artwork);
  });
