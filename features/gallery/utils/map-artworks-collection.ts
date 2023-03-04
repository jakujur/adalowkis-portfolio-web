import { Artwork } from '@/types/artwork';

export const mapArtworkCollectionResponseToArtworks = (paintings: any): Artwork[] =>
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
