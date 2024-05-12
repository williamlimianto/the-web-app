import { CSSProperties, RefObject, useEffect, useState } from 'react';

export type UsePopoverWrapperStylesProps<T> = {
  anchorRef: T;
  offset?: number;
};

export const usePopoverWrapperStyles = <
  T extends RefObject<HTMLElement | null>
>({
  anchorRef,
  offset,
}: UsePopoverWrapperStylesProps<T>) => {
  const [styles, setStyles] = useState<CSSProperties>({});

  // NOTE: This useEffect is added to add listener to update generatedStyles state
  //       whenever user resizing their browser screen.
  useEffect(() => {
    const computeGeneratedStyles = () => {
      const windowInnerWidth = window.innerWidth;
      const anchorElement = anchorRef?.current;

      const anchorElementPosition = anchorElement?.getBoundingClientRect();
      const anchorElementTop = anchorElementPosition?.top || 0;
      const anchorElementLeft = anchorElementPosition?.left || 0;
      const anchorElementRight = anchorElementPosition?.right || 0;
      const anchorElementHeight = anchorElementPosition?.height || 0;

      return {
        top: anchorElementTop + anchorElementHeight + (offset || 0),
        left: anchorElementLeft,
        right: windowInnerWidth - anchorElementRight,
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
