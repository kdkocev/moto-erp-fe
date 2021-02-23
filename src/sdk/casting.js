import { BASE_URL } from 'config/urls';
import { useFetch } from 'utils/sdk';

export const useCasting = (id) => useFetch(id, `${BASE_URL}/casting/${id}`);

export const useCastingList = () =>
  useFetch(undefined, `${BASE_URL}/casting`, []);
