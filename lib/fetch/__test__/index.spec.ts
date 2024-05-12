import { generateFetchSpyOn } from '@lib/mocks/fetch/generateFetchSpyOn';
import { fetch } from '..';

describe('fetch', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should able to return result properly for Success case', async () => {
    const fetchSpyOn = generateFetchSpyOn({
      mockOk: true,
      mockStatus: 200,
      mockStatusText: 'Success',
      mockJson: { dummyResponse1: '123' },
    });

    const expected = await fetch('/dummy-endpoint', {});

    expect(fetchSpyOn).toHaveBeenCalled();
    expect(expected).toStrictEqual({
      data: {
        dummyResponse1: '123',
      },
      message: 'Success',
      ok: true,
      status: 200,
    });
  });

  it('should able to return result properly for Fail case', async () => {
    const fetchSpyOn = generateFetchSpyOn({
      mockOk: false,
      mockStatus: 404,
      mockStatusText: 'Data not found',
    });

    const expected = await fetch('/dummy-endpoint', {});

    expect(fetchSpyOn).toHaveBeenCalled();
    expect(expected).toStrictEqual({
      data: null,
      message: 'Data not found',
      ok: false,
      status: 404,
    });
  });

  it('should still able to return result properly for somehow broken response of Success case', async () => {
    const fetchSpyOn = generateFetchSpyOn({
      mockOk: true,
      mockStatus: null as unknown as number,
      mockStatusText: '',
      mockJson: { dummyResponse1: '123' },
    });

    const expected = await fetch('/dummy-endpoint', {});

    expect(fetchSpyOn).toHaveBeenCalled();
    expect(expected).toStrictEqual({
      data: {
        dummyResponse1: '123',
      },
      message: 'Success',
      ok: true,
      status: 200,
    });
  });

  it('should able to return result properly for somehow broken response of Fail case', async () => {
    const fetchSpyOn = generateFetchSpyOn({
      mockOk: false,
      mockStatus: null as unknown as number,
      mockStatusText: '',
    });

    const expected = await fetch('/dummy-endpoint', {});

    expect(fetchSpyOn).toHaveBeenCalled();
    expect(expected).toStrictEqual({
      data: null,
      message: 'Internal Server Error',
      ok: false,
      status: 500,
    });
  });
});
