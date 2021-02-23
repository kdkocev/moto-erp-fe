import { BASE_URL } from 'config/urls';
import { useFetch } from 'utils/sdk';

export const useOrder = (id) => useFetch(id, `${BASE_URL}/order/${id}`);

export const useOrderList = () => useFetch(undefined, `${BASE_URL}/order`, []);
