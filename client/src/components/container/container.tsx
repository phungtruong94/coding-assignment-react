import { ReactNode } from 'react';
import { clsx } from 'clsx';

import styles from './container.module.css';

export interface IContainer {
  className?: string,
  children?: ReactNode
}

const Container = (props: IContainer) => {
  const { className, children } = props
  return (
    <div className={clsx(styles['root'], className && className)}>
      {children}
    </div>
  );
};

export default Container;
