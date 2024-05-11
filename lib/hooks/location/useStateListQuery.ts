import { useQuery } from 'react-query';
import { getStateList } from '@lib/services/location';

export const useStateListQuery = (countryId: number | null) => {
  return useQuery(
    ['stateList', countryId],
    async () => {
      return countryId
        ? await getStateList(countryId)
        : Promise.reject(
            'Impossible case here, already handled by enabled property below'
          );
    },
    {
      enabled: !!countryId,
    }
  );
};
