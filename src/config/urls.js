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

export const EXPEDITION_LIST_URL = '/expeditions';
export const EXPEDITION_DETAIL_URL = '/expedition/:id';
export const EXPEDITION_ADD_NEW_URL = '/expeditions/add';

export const STORED_CASTINGS_LIST_URL = '/stored-castings';
export const STORED_CASTINGS_DETAIL_URL = '/stored-casting/:id';
export const STORED_CASTINGS_ADD_NEW_URL = '/stored-castings/add';

export const MACHINED_PARTS_LIST_URL = '/machined-parts';
export const MACHINED_PARTS_DETAIL_URL = '/machined-part/:id';
export const MACHINED_PARTS_ADD_NEW_URL = '/machined-parts/add';
