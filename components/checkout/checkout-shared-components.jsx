import styles from './checkout-shared-components.module.scss';
import clsx from 'clsx';
import parse from 'html-react-parser';

export const ErrorMessage = ({ message, classNames = '' }) => {
  return (
    <div className={clsx(styles.errorMessage, classNames)}>
      {parse(message)}
    </div>
  );
};
