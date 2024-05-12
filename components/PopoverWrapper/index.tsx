import { ReactNode, useEffect, useState } from 'react';
import cx from 'classnames';
import { ANIMATION_TIME_IN_MS } from './constants';

import styles from './index.module.css';

interface PopoverWrapper extends React.ComponentPropsWithoutRef<'div'> {
  isOpen: boolean;
  className?: string;
  children: ReactNode;
}

const PopoverWrapper = ({
  isOpen,
  className,
  children,
  style,
}: PopoverWrapper) => {
  // NOTE: This state is used to render or destroy the JSX (in delayed manner) 
  //       so the CSS animation can displayed properly.
  const [isMounted, setIsMounted] = useState(isOpen);

  // NOTE: This useEffect is added to add listener to update isMounted state accordingly
  //       depends on the isOpen state.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setIsMounted(true);
    } else {
      timeout = setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_TIME_IN_MS);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isOpen]);

  if (!isOpen && !isMounted) {
    return null;
  }

  return (
    <div
      className={cx(styles.popover_wrapper, className, {
        [styles.closing]: !isOpen,
      })}
      style={style}
    >
      {children}
    </div>
  );
};

export default PopoverWrapper;
