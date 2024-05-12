import { useCountryListQuery, useStateListQuery } from '@lib/hooks/location';

const LandingPage = () => {
  const {
    isError: isFetchCountryListError,
    data: countryListData,
    error: countryListFetchErrorObj,
  } = useCountryListQuery();

  const {
    isError: isFetchStateListError,
    data: stateListData,
    error: stateListFetchErrorObj,
  } = useStateListQuery(10);

  // [TODO]: UI Improvements - Will use dropdown UI for both cases on the separate PR.
  return (
    <>
      <h1>Country List Data:</h1>
      <pre data-testid="dummy-pre-country">
        {JSON.stringify(
          isFetchCountryListError
            ? (countryListFetchErrorObj as Error)?.toString()
            : countryListData || []
        )}
      </pre>

      <h1>State List Data:</h1>
      <pre data-testid="dummy-pre-state">
        {JSON.stringify(
          isFetchStateListError
            ? (stateListFetchErrorObj as Error)?.toString()
            : stateListData || []
        )}
      </pre>
    </>
  );
};

export default LandingPage;
