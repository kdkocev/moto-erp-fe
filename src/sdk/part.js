import { BASE_URL } from 'config/urls';
import { callUrl, get, post, patch, remove, useFetch } from 'utils/sdk';

const OBJECT_API_URL = (id) => `${BASE_URL}/part/${id}`;
const LIST_OBJECTS_API_URL = `${BASE_URL}/part`;

const GET_URL = (id) => OBJECT_API_URL(id);
const LIST_URL = LIST_OBJECTS_API_URL;
const CREATE_URL = LIST_OBJECTS_API_URL;
const UPDATE_URL = (id) => OBJECT_API_URL(id);
const DELETE_URL = (id) => OBJECT_API_URL(id);

export const fetchPart = (id) => callUrl(get, GET_URL(id));
export const fetchPartList = () => callUrl(get, LIST_URL);
export const createPart = (data) => callUrl(post, CREATE_URL, data);
export const updatePart = (id, data) => callUrl(patch, UPDATE_URL(id), data);
export const deletePart = (id) => callUrl(remove, DELETE_URL(id));

// ---- Hooks ----

export const usePart = (id) => useFetch(fetchPart, undefined, id);
export const usePartList = (key) => useFetch(fetchPartList, [], key); // Key for useRefreshable
