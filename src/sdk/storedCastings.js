import { BASE_URL } from 'config/urls';
import { callUrl, get, post, patch, remove, useFetch } from 'utils/sdk';

const OBJECT_API_URL = (id) => `${BASE_URL}/stored-castings/${id}`;
const LIST_OBJECTS_API_URL = `${BASE_URL}/stored-castings`;

const GET_URL = (id) => OBJECT_API_URL(id);
const LIST_URL = LIST_OBJECTS_API_URL;
const CREATE_URL = LIST_OBJECTS_API_URL;
const UPDATE_URL = (id) => OBJECT_API_URL(id);
const DELETE_URL = (id) => OBJECT_API_URL(id);

export const fetchStoredCastings = (id) => callUrl(get, GET_URL(id));
export const fetchStoredCastingsList = (filters) =>
  callUrl(get, LIST_URL, filters);
export const createStoredCastings = (data) => callUrl(post, CREATE_URL, data);
export const updateStoredCastings = (id, data) =>
  callUrl(patch, UPDATE_URL(id), data);
export const deleteStoredCastings = (id) => callUrl(remove, DELETE_URL(id));

// ---- Hooks ----

export const useStoredCastings = (id) =>
  useFetch(fetchStoredCastings, undefined, id);
export const useStoredCastingsList = (filters) =>
  useFetch(fetchStoredCastingsList, [], filters); // Key for useRefreshable
