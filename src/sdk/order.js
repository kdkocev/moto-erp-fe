import { BASE_URL } from 'config/urls';
import { useFetch, post, patch, callUrl } from 'utils/sdk';

export const useOrder = (id) => useFetch(id, `${BASE_URL}/order/${id}`);

export const useOrderList = () => useFetch(undefined, `${BASE_URL}/order`, []);

export const createOrder = (data) => callUrl(post, `${BASE_URL}/order`, data);

export const updateOrder = (id, data) =>
  callUrl(patch, `${BASE_URL}/order/${id}`, data);
