import { BASE_URL } from 'config/urls';
import { callUrl, get, post, patch, remove, useFetch } from 'utils/sdk';

const OBJECT_API_URL = (id) => `${BASE_URL}/casting/${id}`;
const LIST_OBJECTS_API_URL = `${BASE_URL}/casting`;

const GET_URL = (id) => OBJECT_API_URL(id);
const LIST_URL = LIST_OBJECTS_API_URL;
const CREATE_URL = LIST_OBJECTS_API_URL;
const UPDATE_URL = (id) => OBJECT_API_URL(id);
const DELETE_URL = (id) => OBJECT_API_URL(id);

export const fetchCasting = (id) => callUrl(get, GET_URL(id));
export const fetchCastingList = () => callUrl(get, LIST_URL);
export const createCasting = (data) => callUrl(post, CREATE_URL, data);
export const updateCasting = (id, data) => callUrl(patch, UPDATE_URL(id), data);
export const deleteCasting = (id) => callUrl(remove, DELETE_URL(id));

// ---- Hooks ----

export const useCasting = (id) => useFetch(fetchCasting, undefined, id);
export const useCastingList = (key) => useFetch(fetchCastingList, [], key); // Key for useRefreshable
