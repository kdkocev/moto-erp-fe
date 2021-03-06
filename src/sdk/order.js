import { BASE_URL } from 'config/urls';
import { callUrl, get, post, patch, remove, useFetch } from 'utils/sdk';

const OBJECT_API_URL = (id) => `${BASE_URL}/order/${id}`;
const LIST_OBJECTS_API_URL = `${BASE_URL}/order`;

const GET_URL = (id) => OBJECT_API_URL(id);
const LIST_URL = LIST_OBJECTS_API_URL;
const CREATE_URL = LIST_OBJECTS_API_URL;
const UPDATE_URL = (id) => OBJECT_API_URL(id);
const DELETE_URL = (id) => OBJECT_API_URL(id);

export const fetchOrder = (id) => callUrl(get, GET_URL(id));
export const fetchOrderList = () => callUrl(get, LIST_URL);
export const createOrder = (data) => callUrl(post, CREATE_URL, data);
export const updateOrder = (id, data) => callUrl(patch, UPDATE_URL(id), data);
export const deleteOrder = (id) => callUrl(remove, DELETE_URL(id));

// ---- Hooks ----

export const useOrder = (id) => useFetch(fetchOrder, undefined, id);
export const useOrderList = (key) => useFetch(fetchOrderList, [], key); // Key for useRefreshable
