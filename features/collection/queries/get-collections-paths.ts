import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import { mapCollectionsResponseRoStaticPaths } from '../utils';

export const getCollectionsPaths = async (route: string) => {
  const { data } = await authAxios().get(`${API_URL}/${route}`);
  return mapCollectionsResponseRoStaticPaths(data.data);
};
