const BASE_BACKEND_URL = process.env.REACT_APP_BASE_BACKEND_URL;

export const BASE_URL = `${BASE_BACKEND_URL}/api`;
export const LOGIN_URL = '/login';
export const ORDER_LIST_URL = '/orders';
export const ORDER_DETAIL_URL = '/order/:id';
export const ORDER_ADD_NEW_URL = '/orders/add';

export const PART_LIST_URL = '/parts';
export const PART_DETAIL_URL = '/part/:id';
export const PART_ADD_NEW_URL = '/parts/add';

export const CASTING_LIST_URL = '/castings';
export const CASTING_DETAIL_URL = '/casting/:id';
export const CASTING_ADD_NEW_URL = '/castings/add';
