import { API_HEADER } from '@lib/config/api';

export const constructFetchArgs: (initArg: RequestInit) => RequestInit = (
  initArg
) => {
  const xAPIKey = process?.env?.NEXT_PUBLIC_API_HEADER_X_API_KEY ?? '';

  return {
    ...(initArg || {}),
    headers: {
      ...(initArg?.headers || {}),
      ...(xAPIKey ? { [API_HEADER.X_API_KEY]: xAPIKey } : {}),
    },
  };
};
