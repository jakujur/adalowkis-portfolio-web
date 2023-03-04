import { authAxios } from '@/utils/api';
import { API_URL } from '@/consts/env-variables';
import { mapLinksResponseToLinks } from '../utils';

export const getLinks = async () => {
  const { data } = await authAxios().get(`${API_URL}/links?populate=*`);
  return mapLinksResponseToLinks(data.data);
};
