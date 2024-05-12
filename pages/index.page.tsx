import { useState } from 'react';
import Head from 'next/head';
import DropdownInput from '@components/Form/DropdownInput';
import { useCountryListQuery, useStateListQuery } from '@lib/hooks/location';
import {
  INFO_REMARK_TEXT_LOADING,
  PLACEHOLDER_TEXT_DROPDOWN_INPUT_COUNTRY_LIST,
  PLACEHOLDER_TEXT_DROPDOWN_INPUT_STATE_LIST,
} from './constants';
import styles from './index.module.css';

const LandingPage = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<number>(0);
  const [selectedStateId, setSelectedStateId] = useState<number>(0);
  const {
    isLoading: isFetchCountryListLoading,
    data: countryListData,
    error: countryListFetchErrorObj,
  } = useCountryListQuery();
  const {
    isLoading: isFetchStateListLoading,
    data: stateListData,
    error: stateListFetchErrorObj,
  } = useStateListQuery(selectedCountryId);

  const handleDropdownInputCountryChange = ({
    selectedValue,
  }: {
    selectedValue: number;
  }) => {
    setSelectedCountryId(selectedValue);
    setSelectedStateId(0);
  };

  const handleDropdownInputStateChange = ({
    selectedValue,
  }: {
    selectedValue: number;
  }) => {
    setSelectedStateId(selectedValue);
  };

  return (
    <>
      <Head>
        <title>The Web App - A Simple Web Appplication in the town!</title>
        <meta
          name="description"
          content="The Web App is a Simple Web Appplication in the town created by fellow passioniate engineer."
        />
      </Head>

      <div className={styles.dropdown_input_wrapper}>
        <DropdownInput
          rootClassname={styles.dropdown_input}
          placeholderText={PLACEHOLDER_TEXT_DROPDOWN_INPUT_COUNTRY_LIST}
          infoRemarkText={
            isFetchCountryListLoading ? INFO_REMARK_TEXT_LOADING : ''
          }
          errorRemarkText={(countryListFetchErrorObj as Error)?.toString()}
          disabled={
            isFetchCountryListLoading || !(countryListData || []).length
          }
          value={selectedCountryId}
          options={(countryListData || []).map((itemObj) => {
            return {
              value: itemObj?.id,
              label: itemObj?.value,
            };
          })}
          onChange={handleDropdownInputCountryChange}
        ></DropdownInput>
      </div>

      <div className={styles.dropdown_input_wrapper}>
        <DropdownInput
          rootClassname={styles.dropdown_input}
          placeholderText={PLACEHOLDER_TEXT_DROPDOWN_INPUT_STATE_LIST}
          infoRemarkText={
            isFetchStateListLoading ? INFO_REMARK_TEXT_LOADING : ''
          }
          errorRemarkText={(stateListFetchErrorObj as Error)?.toString()}
          disabled={isFetchStateListLoading || !(stateListData || []).length}
          value={selectedStateId}
          options={(stateListData || []).map((itemObj) => {
            return {
              value: itemObj?.id,
              label: itemObj?.value,
            };
          })}
          onChange={handleDropdownInputStateChange}
        ></DropdownInput>
      </div>
    </>
  );
};

export default LandingPage;
