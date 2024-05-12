import { fireEvent, render, screen, waitFor } from '@lib/test-utils';
import DropdownInput from '..';
import { DEFAULT_PLACEHOLDER_TEXT } from '../constants';
import { DropdownOption } from '../types';

describe('components - Form - Dropdown', () => {
  const dummyOptions: DropdownOption<number>[] = [
    { value: 1, label: 'Dummy Option 1' },
    { value: 2, label: 'Dummy Option 2' },
  ];

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('UI related', () => {
    it('should able to render properly without selected data', () => {
      render(<DropdownInput value={0} options={dummyOptions} />);

      expect(screen.getByText(DEFAULT_PLACEHOLDER_TEXT)).toBeInTheDocument();
    });

    it('should able to render properly with selected data', () => {
      render(<DropdownInput value={1} options={dummyOptions} />);

      expect(screen.getByText('Dummy Option 1')).toBeInTheDocument();
    });

    it('should able to render properly with info remark text', () => {
      const dummyPlaceholderText = 'Dummy placeholder';
      render(
        <DropdownInput
          value={0}
          options={dummyOptions}
          placeholderText={dummyPlaceholderText}
        />
      );

      expect(screen.getByText(dummyPlaceholderText)).toBeInTheDocument();
    });

    it('should able to render properly with info remark text', () => {
      const dummyInfoRemarkText = 'Dummy remark';
      render(
        <DropdownInput
          value={0}
          options={dummyOptions}
          infoRemarkText={dummyInfoRemarkText}
        />
      );

      expect(screen.getByText(dummyInfoRemarkText)).toBeInTheDocument();
    });

    it('should able to render properly with error remark text', () => {
      const dummyErrorRemarkText = 'Dummy remark';
      render(
        <DropdownInput
          value={0}
          options={dummyOptions}
          infoRemarkText={dummyErrorRemarkText}
        />
      );

      expect(screen.getByText(dummyErrorRemarkText)).toBeInTheDocument();
    });

    it('should still able to render properly with invalid options', () => {
      render(
        <DropdownInput
          value={0}
          options={null as unknown as DropdownOption<number>[]}
        />
      );

      expect(screen.getByText(DEFAULT_PLACEHOLDER_TEXT)).toBeInTheDocument();
    });
  });

  describe('Functionality related', () => {
    it('should able to trigger its open popover handler', async () => {
      const mockOnChange = jest.fn();
      render(
        <DropdownInput
          value={0}
          options={dummyOptions}
          onChange={mockOnChange}
        />
      );

      const inputElement = screen.getByText(DEFAULT_PLACEHOLDER_TEXT);

      await fireEvent.click(inputElement);

      expect(screen.getByText('Dummy Option 2')).toBeInTheDocument();
    });

    it('should able to trigger its dismiss popover handler', async () => {
      render(
        <>
          <DropdownInput value={0} options={dummyOptions} />

          <p>Dismiss</p>
        </>
      );

      const inputElement = screen.getByText(DEFAULT_PLACEHOLDER_TEXT);

      await fireEvent.click(inputElement);

      const dummyDismissElement = screen.getByText('Dismiss');

      await fireEvent.mouseDown(dummyDismissElement);

      await waitFor(() => {
        expect(screen.queryByText('Dummy Option 2')).not.toBeInTheDocument();
      });
    });

    it('should able to trigger its onChange handler', async () => {
      const mockOnChange = jest.fn();
      render(
        <DropdownInput
          value={0}
          options={dummyOptions}
          onChange={mockOnChange}
        />
      );

      const inputElement = screen.getByText(DEFAULT_PLACEHOLDER_TEXT);

      await fireEvent.click(inputElement);

      const optionElement = screen.getByText('Dummy Option 2');

      await fireEvent.click(optionElement);

      expect(mockOnChange).toHaveBeenCalled();
      expect(mockOnChange).toHaveBeenCalledWith({
        selectedValue: 2,
        selectedOption: { value: 2, label: 'Dummy Option 2' },
      });
    });
  });
});
