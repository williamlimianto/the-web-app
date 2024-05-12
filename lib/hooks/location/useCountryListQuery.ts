import { useQuery } from 'react-query';
import { getCountryList } from '@lib/services/location';

export const useCountryListQuery = () => {
  return useQuery('countryList', getCountryList);
};
