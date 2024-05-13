const BASE_PATH = {
  API_ROUTES: '/api',
  // NOTE: 
  // 1. INTERNAL cannot be accessed from client side.
  //    (Only server side for security measure)
  // 2. Planned to put fallback value as production API URL,
  //    but since the repo is public, will omit it here.
  //    Please change the fallback value whenever needed.
  INTERNAL: process?.env?.API_INTERNAL_BASE_PATH || '',
};

export const API_ENDPOINT = {
  API_ROUTES: {
    COUNTRY_LIST: `${BASE_PATH.API_ROUTES}/country-list`,
    STATE_LIST: `${BASE_PATH.API_ROUTES}/state-list`,
  },
  INTERNAL: {
    COUNTRY_LIST: `${BASE_PATH.INTERNAL}/v1/countries`,
  },
};
