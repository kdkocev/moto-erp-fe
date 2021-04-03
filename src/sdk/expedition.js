import { BASE_URL } from 'config/urls';
import { callUrl, get, post, patch, remove, useFetch } from 'utils/sdk';

const OBJECT_API_URL = (id) => `${BASE_URL}/expedition/${id}`;
const LIST_OBJECTS_API_URL = `${BASE_URL}/expedition`;

const GET_URL = (id) => OBJECT_API_URL(id);
const LIST_URL = LIST_OBJECTS_API_URL;
const CREATE_URL = LIST_OBJECTS_API_URL;
const UPDATE_URL = (id) => OBJECT_API_URL(id);
const DELETE_URL = (id) => OBJECT_API_URL(id);

export const fetchExpedition = (id) => callUrl(get, GET_URL(id));
export const fetchExpeditionList = (filters) => callUrl(get, LIST_URL, filters);
export const createExpedition = (data) => callUrl(post, CREATE_URL, data);
export const updateExpedition = (id, data) =>
  callUrl(patch, UPDATE_URL(id), data);
export const deleteExpedition = (id) => callUrl(remove, DELETE_URL(id));

// ---- Hooks ----

export const useExpedition = (id) => useFetch(fetchExpedition, undefined, id);
export const useExpeditionList = (filters) =>
  useFetch(fetchExpeditionList, [], filters); // Key for useRefreshable
