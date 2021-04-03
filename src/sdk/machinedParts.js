import { BASE_URL } from 'config/urls';
import { callUrl, get, post, patch, remove, useFetch } from 'utils/sdk';

const OBJECT_API_URL = (id) => `${BASE_URL}/machined-parts/${id}`;
const LIST_OBJECTS_API_URL = `${BASE_URL}/machined-parts`;

const GET_URL = (id) => OBJECT_API_URL(id);
const LIST_URL = LIST_OBJECTS_API_URL;
const CREATE_URL = LIST_OBJECTS_API_URL;
const UPDATE_URL = (id) => OBJECT_API_URL(id);
const DELETE_URL = (id) => OBJECT_API_URL(id);

export const fetchMachinedParts = (id) => callUrl(get, GET_URL(id));
export const fetchMachinedPartsList = (filters) =>
  callUrl(get, LIST_URL, filters);
export const createMachinedParts = (data) => callUrl(post, CREATE_URL, data);
export const updateMachinedParts = (id, data) =>
  callUrl(patch, UPDATE_URL(id), data);
export const deleteMachinedParts = (id) => callUrl(remove, DELETE_URL(id));

// ---- Hooks ----

export const useMachinedParts = (id) =>
  useFetch(fetchMachinedParts, undefined, id);
export const useMachinedPartsList = (filters) =>
  useFetch(fetchMachinedPartsList, [], filters); // Key for useRefreshable
