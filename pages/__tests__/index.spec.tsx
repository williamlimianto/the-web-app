import * as locationServices from '@lib/services/location';
import { fireEvent, render, screen, waitFor } from '@lib/test-utils';
import type { Country, State } from '@lib/types/location';
import {
  PLACEHOLDER_TEXT_DROPDOWN_INPUT_COUNTRY_LIST,
  PLACEHOLDER_TEXT_DROPDOWN_INPUT_STATE_LIST,
} from '@pages/constants';

import LandingPage from '../index.page';

describe('pages - Landing', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should able to render properly', () => {
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

    const { container } = render(<LandingPage />);

    expect(container).toBeInTheDocument();
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

    const { container } = render(<LandingPage />);

    await waitFor(() => {
      expect(container.innerHTML).toContain('Error: Dummy Error Country');
    });
  });

  it('should able to trigger the Page Flow / handlers properly', async () => {
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

    const { container } = render(<LandingPage />);

    const countryListDropdownInputElement = screen.getByText(
      PLACEHOLDER_TEXT_DROPDOWN_INPUT_COUNTRY_LIST
    );
    await fireEvent.click(countryListDropdownInputElement);

    const countryListDropdownSecondOptionElement =
      screen.getByText('Australia');
    await fireEvent.click(countryListDropdownSecondOptionElement);

    const stateListDropdownInputElement = screen.getByText(
      PLACEHOLDER_TEXT_DROPDOWN_INPUT_STATE_LIST
    );
    await fireEvent.click(stateListDropdownInputElement);

    const stateListDropdownFirstOptionElement = await screen.findByText(
      'Brisbane'
    );
    await fireEvent.click(stateListDropdownFirstOptionElement);

    await waitFor(() => {
      expect(container.innerHTML).toContain('Australia');
    });

    await waitFor(() => {
      expect(container.innerHTML).toContain('Brisbane');
    });
  });
});
