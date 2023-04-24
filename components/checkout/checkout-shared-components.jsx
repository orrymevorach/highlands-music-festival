import styles from './checkout-shared-components.module.scss';

export const ErrorMessage = ({ message }) => {
  return <div className={styles.errorMessage}>{message}</div>;
};
