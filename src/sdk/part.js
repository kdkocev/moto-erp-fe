import { BASE_URL } from 'config/urls';
import { useFetch, callUrl, post, patch } from 'utils/sdk';

export const usePart = (id) => useFetch(id, `${BASE_URL}/part/${id}`);

export const usePartList = () => useFetch(undefined, `${BASE_URL}/part`, []);

export const createPart = (data) => callUrl(post, `${BASE_URL}/part`, data);

export const updatePart = (id, data) =>
  callUrl(patch, `${BASE_URL}/part/${id}`, data);
