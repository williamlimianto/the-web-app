import { useRef } from 'react';
import cx from 'classnames';
import { IconChevronDown } from '@components/Icons';
import PopoverWrapper from '@components/PopoverWrapper';
import { usePopoverWrapperState } from '@components/PopoverWrapper/hooks/usePopoverWrapperState';
import { usePopoverWrapperStyles } from '@components/PopoverWrapper/hooks/usePopoverWrapperStyles';
import { DEFAULT_PLACEHOLDER_TEXT } from './constants';
import { DropdownOption } from './types';

import styles from './index.module.css';

export type DropdownInputProps<T> = {
  rootClassname?: string;
  disabled?: boolean;
  placeholderText?: string;
  infoRemarkText?: string;
  errorRemarkText?: string;
  value: T;
  options: DropdownOption<T>[];
  onChange?: ({
    selectedValue,
    selectedOption,
  }: {
    selectedValue: T;
    selectedOption: DropdownOption<T>;
  }) => void;
};

const DropdownInput = <T,>({
  rootClassname,
  disabled,
  placeholderText = DEFAULT_PLACEHOLDER_TEXT,
  infoRemarkText,
  errorRemarkText,
  value,
  options,
  onChange,
}: DropdownInputProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, setOpen } = usePopoverWrapperState({
    parentContainerRef: containerRef,
  });
  const popoverStyles = usePopoverWrapperStyles({
    anchorRef: inputRef,
  });

  const selectedOptionsObj =
    (options || []).find((itemObj) => {
      return itemObj?.value === value;
    }) || ({} as DropdownOption<T>);
  const isError = !!errorRemarkText;

  const handleOptionItemClick = (itemObj: DropdownOption<T>) => {
    setOpen(false);
    onChange &&
      onChange({
        selectedValue: itemObj?.value,
        selectedOption: itemObj,
      });
  };

  return (
    <div
      className={cx(styles.dropdown_input_container, rootClassname)}
      ref={containerRef}
    >
      <div
        ref={inputRef}
        className={cx(styles.dropdown_input, {
          [styles.disabled]: !!disabled,
          [styles.error]: !disabled && isError,
        })}
        onClick={() => {
          setOpen((currentIsOpen) => !currentIsOpen);
        }}
      >
        <div className={styles.text_wrapper}>
          {selectedOptionsObj?.label || placeholderText}
        </div>

        <IconChevronDown
          className={cx(styles.icon_chevron, {
            [styles.rotated]: isOpen,
            [styles.error]: isError,
          })}
        />
      </div>

      {isError && <p className={styles.text_error_remark}>{errorRemarkText}</p>}
      {infoRemarkText && (
        <p className={styles.text_info_remark}>{infoRemarkText}</p>
      )}

      {!disabled && !!(options || []).length && (
        <PopoverWrapper
          className={styles.popover_wrapper}
          isOpen={isOpen}
          style={popoverStyles}
        >
          {options.map((itemObj, idx) => {
            return (
              <div
                key={`dropdown-option-item-${idx}`}
                className={styles.dropdown_option_item}
                onClick={() => {
                  handleOptionItemClick(itemObj);
                }}
              >
                {itemObj?.label}
              </div>
            );
          })}
        </PopoverWrapper>
      )}
    </div>
  );
};

export default DropdownInput;
