import * as locationServices from '@lib/services/location';
import { render, screen, waitFor } from '@lib/test-utils';
import type { Country, State } from '@lib/types/location';

import LandingPage from '../index.page';

describe('pages - Landing', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should able to render properly', async () => {
    jest
      .spyOn(locationServices, 'getCountryList')
      .mockImplementation(async () =>
        Promise.resolve([
          { id: 1, value: 'Indonesia' },
          { id: 2, value: 'Australia' },
        ] as Country[])
      );

    jest
      .spyOn(locationServices, 'getStateList')
      .mockImplementation(async () =>
        Promise.resolve([{ id: 1, value: 'Brisbane' }] as State[])
      );

    render(<LandingPage />);

    await waitFor(() => {
      expect(screen.getByTestId('dummy-pre-country').innerHTML).toContain(
        'Australia'
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('dummy-pre-state').innerHTML).toContain(
        'Brisbane'
      );
    });
  });

  it('should still able to render properly with Broken API', async () => {
    jest
      .spyOn(locationServices, 'getCountryList')
      .mockImplementation(async () => {
        return Promise.reject(new Error('Dummy Error Country'));
      });

    jest
      .spyOn(locationServices, 'getStateList')
      .mockImplementation(async () => {
        return Promise.reject(new Error('Dummy Error State'));
      });

    render(<LandingPage />);

    await waitFor(() => {
      expect(screen.getByTestId('dummy-pre-country').innerHTML).toContain(
        'Error: Dummy Error Country'
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('dummy-pre-state').innerHTML).toContain(
        'Error: Dummy Error State'
      );
    });
  });
});
