import { NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { generateFetchSpyOn } from '@lib/mocks/fetch/generateFetchSpyOn';
import { State } from '@lib/types/location';
import handler from '../state-list/[countryId].page';

describe('API Routes - State List', () => {
  const MOCK_RESPONSE_DATA: State[] = [
    {
      id: 1,
      value: 'Brisbane',
    },
    {
      id: 2,
      value: 'Melbourne',
    },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should able to return result properly', async () => {
    generateFetchSpyOn<State[]>({
      mockOk: true,
      mockStatus: 200,
      mockStatusText: 'Success',
      mockJson: MOCK_RESPONSE_DATA,
    });
    const mockReq = createRequest<NextApiRequest>({
      method: 'GET',
      query: {
        countryId: '1',
      },
    });
    const mockRes = createResponse<NextApiResponse>();

    await handler(mockReq, mockRes);
    const responseStatusCode = mockRes?._getStatusCode();
    const responseData = (await mockRes._getJSONData())?.data;

    expect(responseStatusCode).toEqual(200);
    expect(responseData).toEqual(MOCK_RESPONSE_DATA);
  });

  it('should still able to return result with invalid countryId', async () => {
    const mockReq = createRequest<NextApiRequest>({
      method: 'POST',
      query: {
        countryId: '1b',
      },
    });
    const mockRes = createResponse<NextApiResponse>();

    await handler(mockReq, mockRes);
    const responseStatusCode = mockRes?._getStatusCode();
    const responseStatusMessage = (await mockRes._getJSONData())?.message;

    expect(responseStatusCode).toEqual(400);
    expect(responseStatusMessage).toEqual('Invalid Request');
  });

  it('should still able to return result with invalid HTTP method', async () => {
    const mockReq = createRequest<NextApiRequest>({
      method: 'POST',
      query: {
        countryId: '1',
      },
    });
    const mockRes = createResponse<NextApiResponse>();

    await handler(mockReq, mockRes);
    const responseStatusCode = mockRes?._getStatusCode();
    const responseStatusMessage = (await mockRes._getJSONData())?.message;

    expect(responseStatusCode).toEqual(500);
    expect(responseStatusMessage).toEqual('Error: Invalid HTTP Method');
  });

  it('should still able to return result with Error API call', async () => {
    generateFetchSpyOn({
      mockOk: false,
      mockStatus: 500,
      mockStatusText: 'INTERNAL SERVER ERROR',
      mockJson: null,
    });
    const mockReq = createRequest<NextApiRequest>({
      method: 'GET',
      query: {
        countryId: '1',
      },
    });
    const mockRes = createResponse<NextApiResponse>();

    await handler(mockReq, mockRes);
    const responseStatusCode = mockRes?._getStatusCode();
    const responseStatusMessage = (await mockRes._getJSONData())?.message;

    expect(responseStatusCode).toEqual(500);
    expect(responseStatusMessage).toEqual('Error: INTERNAL SERVER ERROR');
  });
});
