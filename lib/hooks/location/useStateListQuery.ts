import { useQuery } from 'react-query';
import { FetchResponse } from '@lib/fetch/types';
import { fetch } from '@lib/fetch';
import { State } from '@lib/types/location';
import { API_ENDPOINT } from '@lib/config/api';

export const useStateListQuery = (countryId: number | null) => {
  return useQuery(
    ['stateList', countryId],
    async () => {
      const origin = window.location.origin;
      const responseObj = await fetch<FetchResponse<State[] | null>>(
        `${origin}${API_ENDPOINT.API_ROUTES.STATE_LIST}/${countryId}`,
        {}
      );

      const responseData = responseObj?.data;

      return responseData?.data || ([] as State[]);
    },
    {
      enabled: !!countryId,
    }
  );
};
