import { BASE_URL } from 'config/urls';
import { useFetch, callUrl, post, patch } from 'utils/sdk';

export const useCasting = (id) => useFetch(id, `${BASE_URL}/casting/${id}`);

export const useCastingList = () =>
  useFetch(undefined, `${BASE_URL}/casting`, []);

export const createCasting = (data) =>
  callUrl(post, `${BASE_URL}/casting`, data);

export const updateCasting = (id, data) =>
  callUrl(patch, `${BASE_URL}/casting/${id}`, data);
