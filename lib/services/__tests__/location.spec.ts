import { generateFetchSpyOn } from '@lib/mocks/fetch/generateFetchSpyOn';
import type { Country, State } from '@lib/types/location';
import { getCountryList, getStateList } from '../location';

describe('services - location', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getCountryList', () => {
    it('should able to return result properly for Success case', async () => {
      const mockData: Country[] = [
        { id: 1, value: 'Indonesia' },
        { id: 2, value: 'Australia' },
      ];
      const fetchSpyOn = generateFetchSpyOn({
        mockOk: true,
        mockStatus: 200,
        mockStatusText: 'Success',
        mockJson: mockData,
      });
      const expected = await getCountryList();

      expect(fetchSpyOn).toHaveBeenCalled();
      expect(expected).toStrictEqual(mockData);
    });

    it('should able to return result properly for Failed case', async () => {
      generateFetchSpyOn({
        mockOk: false,
        mockStatus: 404,
        mockStatusText: 'Data not found',
      });

      expect(async () => {
        await getCountryList();
      }).rejects.toThrowError();
    });

    it('should still able to return result properly for somehow broken response of Success case', async () => {
      const fetchSpyOn = generateFetchSpyOn({
        mockOk: true,
        mockStatus: 200,
        mockStatusText: 'Success',
        mockJson: null as unknown as Country[],
      });
      const expected = await getCountryList();

      expect(fetchSpyOn).toHaveBeenCalled();
      expect(expected).toStrictEqual([]);
    });

    it('should still able to return result properly for somehow broken response of Failed case', async () => {
      generateFetchSpyOn({
        mockOk: false,
        mockStatus: 500,
        mockStatusText: '',
      });

      expect(async () => {
        await getCountryList();
      }).rejects.toThrowError();
    });
  });

  describe('getStateList', () => {
    it('should able to return result properly for Success case', async () => {
      const mockData: State[] = [{ id: 1, value: 'Brisbane' }];
      const fetchSpyOn = generateFetchSpyOn({
        mockOk: true,
        mockStatus: 200,
        mockStatusText: 'Success',
        mockJson: mockData,
      });
      const expected = await getStateList(1);

      expect(fetchSpyOn).toHaveBeenCalled();
      expect(expected).toStrictEqual(mockData);
    });

    it('should able to return result properly for Failed case', async () => {
      generateFetchSpyOn({
        mockOk: false,
        mockStatus: 404,
        mockStatusText: 'Data not found',
      });

      expect(async () => {
        await getStateList(1);
      }).rejects.toThrowError();
    });

    it('should still able to return result properly for somehow broken response of Success case', async () => {
      const fetchSpyOn = generateFetchSpyOn({
        mockOk: true,
        mockStatus: 200,
        mockStatusText: 'Success',
        mockJson: null as unknown as State[],
      });
      const expected = await getStateList(1);

      expect(fetchSpyOn).toHaveBeenCalled();
      expect(expected).toStrictEqual([]);
    });

    it('should still able to return result properly for somehow broken response of Failed case', async () => {
      generateFetchSpyOn({
        mockOk: false,
        mockStatus: 500,
        mockStatusText: '',
      });

      expect(async () => {
        await getStateList(1);
      }).rejects.toThrowError();
    });
  });
});
