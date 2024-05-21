import { constructFetchArgs } from '../helpers';

describe('API Routes - Helpers', () => {
  describe('constructFetchArgs', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      process.env = { ...OLD_ENV };
      process.env.API_HEADER_X_API_KEY = 'dummyKey';
    });

    afterAll(() => {
      process.env = OLD_ENV;
    });

    it('should able to return result properly', () => {
      const dummyInitArg: RequestInit = {
        headers: {
          dummy1: '123',
        },
        body: JSON.stringify({ dummy2: '234' }),
      };
      const expected = constructFetchArgs(dummyInitArg);

      expect(expected).toStrictEqual({
        body: '{"dummy2":"234"}',
        headers: { 'X-API-Key': 'dummyKey', dummy1: '123' },
      });
    });

    it('should still able to return result properly with invalid initArg', () => {
      const expected = constructFetchArgs(null as unknown as RequestInit);

      expect(expected).toStrictEqual({
        headers: { 'X-API-Key': 'dummyKey' },
      });
    });

    it('should still able to return result properly with invalid env', () => {
      process.env = { ...OLD_ENV };
      const expected = constructFetchArgs(null as unknown as RequestInit);

      expect(expected).toStrictEqual({
        headers: {},
      });
    });
  });
});
