import { STRAPI_ACCESS_TOKEN } from '@/consts/env-variables';
import axios from 'axios';

export const authAxios = () =>
  axios.create({
    headers: { Authorization: `Bearer ${STRAPI_ACCESS_TOKEN}` },
  });
