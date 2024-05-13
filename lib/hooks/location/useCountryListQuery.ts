import { useQuery } from 'react-query';
import { fetch } from '@lib/fetch';
import { FetchResponse } from '@lib/fetch/types';
import { Country } from '@lib/types/location';
import { API_ENDPOINT } from '@lib/config/api';

export const useCountryListQuery = () => {
  return useQuery('countryList', async () => {
    const origin = window.location.origin;
    const responseObj = await fetch<FetchResponse<Country[] | null>>(
      `${origin}${API_ENDPOINT.API_ROUTES.COUNTRY_LIST}`,
      {}
    );
    const responseData = responseObj?.data;

    return responseData?.data || ([] as Country[]);
  });
};
