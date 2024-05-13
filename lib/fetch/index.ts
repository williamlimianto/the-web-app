import { API_RESPONSE_FALLBACK } from '@lib/config/api';
import { FetchResponse } from './types';

const apiFetch: <T>(
  endpoint: string,
  initArg: RequestInit
) => Promise<FetchResponse<T | null>> = async (endpoint, initArg) => {
  const responseObj = await fetch(endpoint, initArg);
  const responseStatus = responseObj?.status;
  const responseStatusText = responseObj?.statusText;

  const isSuccessResponse = responseObj?.ok;
  const hasNoResponseStatus = !!responseObj?.status;

  if (isSuccessResponse) {
    return {
      ok: isSuccessResponse,
      status: responseStatus ?? API_RESPONSE_FALLBACK.SUCCESS.status,
      message: responseStatusText || API_RESPONSE_FALLBACK.SUCCESS.message,
      data: await responseObj.json(),
    };
  }

  return {
    ok: isSuccessResponse,
    status: hasNoResponseStatus
      ? responseStatus
      : API_RESPONSE_FALLBACK.INTERNAL_SERVER_ERROR.status,
    message: hasNoResponseStatus
      ? responseStatusText
      : API_RESPONSE_FALLBACK.INTERNAL_SERVER_ERROR.message,
    data: null,
  };
};

export { apiFetch as fetch };
