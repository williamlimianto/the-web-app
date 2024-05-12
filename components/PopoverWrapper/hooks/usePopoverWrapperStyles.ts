import { CSSProperties, RefObject, useEffect, useState } from 'react';

export type UsePopoverWrapperStylesProps<T> = {
  parentContainerRef: T;
  offset?: number;
};

export const usePopoverWrapperStyles = <
  T extends RefObject<HTMLElement | null>
>({
  parentContainerRef,
  offset,
}: UsePopoverWrapperStylesProps<T>) => {
  const [styles, setStyles] = useState<CSSProperties>({});

  // NOTE: This useEffect is added to add listener to update generatedStyles state
  //       whenever user resizing their browser screen.
  useEffect(() => {
    const computeGeneratedStyles = () => {
      const parentElement = parentContainerRef?.current;

      const parentElementPosition = parentElement?.getBoundingClientRect();
      const parentElementTop = parentElementPosition?.top || 0;
      const parentElementLeft = parentElementPosition?.left || 0;

      const parentElementHeight = parentElementPosition?.height || 0;

      return {
        top: parentElementTop + parentElementHeight + (offset || 0),
        left: parentElementLeft,
      } as CSSProperties;
    };

    const handleResize = () => {
      setStyles(computeGeneratedStyles());
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return styles;
};
