import { BASE_URL } from 'config/urls';
import { useFetch } from 'utils/sdk';

export const usePart = (id) => useFetch(id, `${BASE_URL}/part/${id}`);

export const usePartList = () => useFetch(undefined, `${BASE_URL}/part`, []);
