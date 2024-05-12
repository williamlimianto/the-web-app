import { RefObject, useEffect, useState } from 'react';

export type UsePopoverWrapperStateProps<T> = {
  parentContainerRef: T;
};

export const usePopoverWrapperState = <T extends RefObject<HTMLElement | null>>({
  parentContainerRef,
}: UsePopoverWrapperStateProps<T>) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  // NOTE: This useEffect is added to add listener to set isOpen = false
  //       whenever user clicking outside from the parentContainerRef.
  useEffect(() => {
    const handleClickOutsideParentContainer = (e: any) => {
      if (
        isOpen &&
        parentContainerRef.current &&
        !parentContainerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideParentContainer);

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutsideParentContainer
      );
    };
  }, [isOpen]);

  return {
    isOpen,
    setOpen,
  };
};
