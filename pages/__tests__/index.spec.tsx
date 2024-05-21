import { fireEvent, render, screen, waitFor } from '@lib/test-utils';
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
    const { container } = render(<LandingPage />);

    expect(container).toBeInTheDocument();
  });

  it('should able to trigger the Page Flow / handlers properly', async () => {
    const { container } = render(<LandingPage />);

    const countryListDropdownInputElement = screen.getByText(
      PLACEHOLDER_TEXT_DROPDOWN_INPUT_COUNTRY_LIST
    );
    await fireEvent.click(countryListDropdownInputElement);

    const countryListDropdownSecondOptionElement = await screen.findByText(
      'Algeria',
      undefined,
      { timeout: 5000 }
    );
    await fireEvent.click(countryListDropdownSecondOptionElement);

    const stateListDropdownInputElement = screen.getByText(
      PLACEHOLDER_TEXT_DROPDOWN_INPUT_STATE_LIST
    );
    await fireEvent.click(stateListDropdownInputElement);

    const stateListDropdownFirstOptionElement = await screen.findByText(
      'Adrar',
      undefined,
      { timeout: 5000 }
    );
    await fireEvent.click(stateListDropdownFirstOptionElement);

    await waitFor(() => {
      expect(container.innerHTML).toContain('Algeria');
    });

    await waitFor(() => {
      expect(container.innerHTML).toContain('Adrar');
    });
  });
});
