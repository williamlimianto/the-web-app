import { NextApiRequest, NextApiResponse } from 'next';
import { createRequest, createResponse } from 'node-mocks-http';
import { generateFetchSpyOn } from '@lib/mocks/fetch/generateFetchSpyOn';
import { Country } from '@lib/types/location';
import handler from '../country-list.page';

describe('API Routes - Country List', () => {
  const MOCK_RESPONSE_DATA: Country[] = [
    {
      id: 1,
      value: 'Australia',
    },
    {
      id: 2,
      value: 'Indonesia',
    },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should able to return result properly', async () => {
    generateFetchSpyOn<Country[]>({
      mockOk: true,
      mockStatus: 200,
      mockStatusText: 'Success',
      mockJson: MOCK_RESPONSE_DATA,
    });
    const mockReq = createRequest<NextApiRequest>({
      method: 'GET',
    });
    const mockRes = createResponse<NextApiResponse>();

    await handler(mockReq, mockRes);
    const responseStatusCode = mockRes?._getStatusCode();
    const responseData = (await mockRes._getJSONData())?.data;

    expect(responseStatusCode).toEqual(200);
    expect(responseData).toEqual(MOCK_RESPONSE_DATA);
  });

  it('should still able to return result with invalid HTTP method', async () => {
    const mockReq = createRequest<NextApiRequest>({
      method: 'POST',
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
    });
    const mockRes = createResponse<NextApiResponse>();

    await handler(mockReq, mockRes);
    const responseStatusCode = mockRes?._getStatusCode();
    const responseStatusMessage = (await mockRes._getJSONData())?.message;

    expect(responseStatusCode).toEqual(500);
    expect(responseStatusMessage).toEqual('Error: INTERNAL SERVER ERROR');
  });
});
