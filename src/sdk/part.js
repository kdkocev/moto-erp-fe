import { BASE_URL } from 'config/urls';
import { useFetch, callUrl, post, patch, remove } from 'utils/sdk';

export const usePart = (id, refreshKey) =>
  useFetch(id, `${BASE_URL}/part/${id}`, undefined, refreshKey);

export const usePartList = (refreshKey) =>
  useFetch(undefined, `${BASE_URL}/part`, [], refreshKey);

export const createPart = (data) => callUrl(post, `${BASE_URL}/part`, data);

export const updatePart = (id, data) =>
  callUrl(patch, `${BASE_URL}/part/${id}`, data);

export const deletePart = (id) => callUrl(remove, `${BASE_URL}/part/${id}`);
