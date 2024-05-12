import { API_ENDPOINT } from '@lib/config/api';
import { fetch } from '@lib/fetch';
import type { Country, State } from '@lib/types/location';

export const getCountryList: () => Promise<Country[]> = async () => {
  const apiResponse = await fetch<Country[]>(API_ENDPOINT.COUNTRY_LIST, {});

  if (apiResponse?.ok) {
    return apiResponse.data || [];
  }

  throw new Error(apiResponse?.message || '');
};

export const getStateList: (countryId: number) => Promise<Country[]> = async (
  countryId
) => {
  const apiResponse = await fetch<State[]>(
    `${API_ENDPOINT.COUNTRY_LIST}/${countryId}/states`,
    {}
  );

  if (apiResponse?.ok) {
    return apiResponse.data || [];
  }

  throw new Error(apiResponse?.message || '');
};
