import { BASE_URL } from 'config/urls';
import { useFetch, callUrl, post, patch, remove } from 'utils/sdk';

export const useCasting = (id, refreshKey) =>
  useFetch(id, `${BASE_URL}/casting/${id}`, undefined, refreshKey);

export const useCastingList = (refreshKey) =>
  useFetch(undefined, `${BASE_URL}/casting`, [], refreshKey);

export const createCasting = (data) =>
  callUrl(post, `${BASE_URL}/casting`, data);

export const updateCasting = (id, data) =>
  callUrl(patch, `${BASE_URL}/casting/${id}`, data);

export const deleteCasting = (id) =>
  callUrl(remove, `${BASE_URL}/casting/${id}`);
