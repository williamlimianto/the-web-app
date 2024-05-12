const BASE_PATH = {
  // NOTE: Planned to put fallback value as production API URL,
  //       but since the repo is public, will omit it here.
  //       Please change the fallback value whenever needed.
  INTERNAL: process?.env?.NEXT_PUBLIC_API_INTERNAL_BASE_PATH || '',
}

export const API_ENDPOINT = {
  COUNTRY_LIST: `${BASE_PATH.INTERNAL}/v1/countries`
}