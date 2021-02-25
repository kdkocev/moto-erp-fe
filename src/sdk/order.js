import { BASE_URL } from 'config/urls';
import { useFetch, post, patch, callUrl, remove } from 'utils/sdk';

export const useOrder = (id, refreshKey) =>
  useFetch(id, `${BASE_URL}/order/${id}`, undefined, refreshKey);

export const useOrderList = (refreshKey) =>
  useFetch(undefined, `${BASE_URL}/order`, [], refreshKey);

export const createOrder = (data) => callUrl(post, `${BASE_URL}/order`, data);

export const updateOrder = (id, data) =>
  callUrl(patch, `${BASE_URL}/order/${id}`, data);

export const deleteOrder = (id) => callUrl(remove, `${BASE_URL}/order/${id}`);
