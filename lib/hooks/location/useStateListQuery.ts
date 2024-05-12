import { useQuery } from 'react-query';
import { getStateList } from '@lib/services/location';

export const useStateListQuery = (countryId: number | null) => {
  return useQuery(
    ['stateList', countryId],
    async () => {
      // NOTE: eslint exception added here to satisfy ESLint warning.
      //       (Since the value cannot be null, already handled by 'enabled' property below)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return await getStateList(countryId!);
    },
    {
      enabled: !!countryId,
    }
  );
};
