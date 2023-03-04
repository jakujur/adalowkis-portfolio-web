import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import { mapArtworkCollectionResponseToArtworks } from '../utils';

export const getArtworksCollection = async (route: string, collectionId?: string) => {
  if (!collectionId) return [];

  const { data } = await authAxios().get(`${API_URL}/${route}/${collectionId}`, {
    params: {
      populate: {
        paintings: {
          populate: ['media_file'],
        },
      },
    },
  });

  return mapArtworkCollectionResponseToArtworks(data?.data?.attributes?.paintings);
};
