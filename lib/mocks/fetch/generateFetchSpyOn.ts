export const generateFetchSpyOn = <T>({
  mockOk,
  mockStatus,
  mockStatusText,
  mockJson,
}: {
  mockOk: boolean;
  mockStatus: number;
  mockStatusText: string;
  mockJson?: T;
}) => {
  const fetchSpyOn = jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      ok: mockOk,
      json: async () => Promise.resolve(mockJson),
      status: mockStatus,
      statusText: mockStatusText,
    } as Response)
  );

  return fetchSpyOn;
};
