import styles from './checkout-shared-components.module.scss';
import clsx from 'clsx';

export const ErrorMessage = ({ message, classNames = '' }) => {
  return <div className={clsx(styles.errorMessage, classNames)}>{message}</div>;
};
