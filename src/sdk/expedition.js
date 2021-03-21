import { BASE_URL } from 'config/urls';
import { callUrl, get, post, useFetch } from 'utils/sdk';

const LIST_OBJECTS_API_URL = `${BASE_URL}/expedition`;

const LIST_URL = LIST_OBJECTS_API_URL;
const CREATE_URL = LIST_OBJECTS_API_URL;

export const fetchExpeditionList = (filters) => callUrl(get, LIST_URL, filters);
export const createExpedition = (data) => callUrl(post, CREATE_URL, data);

// ---- Hooks ----

export const useExpeditionList = (filters) =>
  useFetch(fetchExpeditionList, [], filters); // Key for useRefreshable
