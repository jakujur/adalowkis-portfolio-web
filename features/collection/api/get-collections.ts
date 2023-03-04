import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import { mapCollectionResponseToCollection } from '../utils';

export const getCollections = async (route: string) => {
  const { data } = await authAxios().get(`${API_URL}/${route}?populate[cover_image]=*`);

  return mapCollectionResponseToCollection(data.data);
};
