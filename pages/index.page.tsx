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
      <pre>
        {JSON.stringify(
          isFetchCountryListError
            ? countryListFetchErrorObj
            : countryListData || []
        )}
      </pre>

      <h1>State List Data:</h1>
      <pre>
        {JSON.stringify(
          isFetchStateListError ? stateListFetchErrorObj : stateListData || []
        )}
      </pre>
    </>
  );
};

export default LandingPage;
