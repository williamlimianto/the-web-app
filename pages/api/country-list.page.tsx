import { API_ENDPOINT } from '@lib/config/api';
import { fetch } from '@lib/fetch';
import { FetchResponse } from '@lib/fetch/types';
import type { Country } from '@lib/types/location';
import { NextApiRequest, NextApiResponse } from 'next';
import { constructFetchArgs } from './helpers';

const fetchGetCountryList: () => Promise<
  FetchResponse<Country[] | null>
> = async () => {
  const apiResponse = await fetch<Country[]>(
    API_ENDPOINT.INTERNAL.COUNTRY_LIST,
    constructFetchArgs({})
  );

  if (apiResponse?.ok) {
    return apiResponse;
  }

  throw new Error(apiResponse?.message || '');
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqMethod = (req.method || '').toUpperCase();

  try {
    if (reqMethod === 'GET') {
      const responseData = await fetchGetCountryList();

      if (responseData) {
        return res.status(200).json(responseData);
      }

      return res.status(500).json(responseData);
    }

    throw new Error('Invalid HTTP Method');
  } catch (err) {
    res.status(500).json({ status: 500, message: (err as Error)?.toString() });
  }
};

export default handler;
