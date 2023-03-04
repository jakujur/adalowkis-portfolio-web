import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import { mapArtworksResponseToArtworks } from '../utils';

export const getArtworks = async (route: string) => {
  const { data } = await authAxios().get(`${API_URL}/${route}?populate=*`);
  return mapArtworksResponseToArtworks(data.data);
};
