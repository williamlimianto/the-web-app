import { NextApiRequest, NextApiResponse } from 'next';
import { API_ENDPOINT } from '@lib/config/api';
import { fetch } from '@lib/fetch';
import { FetchResponse } from '@lib/fetch/types';
import { State } from '@lib/types/location';
import { constructFetchArgs } from '../helpers';

const fetchGetStateList: (countryId: number) => Promise<FetchResponse<State[] | null>> = async (
  countryId
) => {
  const apiResponse = await fetch<State[]>(
    `${API_ENDPOINT.INTERNAL.COUNTRY_LIST}/${countryId}/states`,
    constructFetchArgs({})
  );

  if (apiResponse?.ok) {
    return apiResponse;
  }

  throw new Error(apiResponse?.message || '');
};


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqMethod = (req?.method || '').toUpperCase();
  const countryIdParam = req?.query?.countryId;
  const countryId = Number(Array.isArray(countryIdParam)
    ? countryIdParam[0]
    : countryIdParam);

  try {
    if (Number.isNaN(countryId)) {
      return res.status(400).json({ status: 400, message: 'Invalid Request' });
    }

    if (reqMethod === 'GET') {
      const responseData = await fetchGetStateList(countryId);

      return res.status(200).json(responseData);
    }

    throw new Error('Invalid HTTP Method');
  } catch (err) {
    res.status(500).json({ status: 500, message: (err as Error)?.toString() });
  }
};

export default handler;
