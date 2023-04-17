import styles from './checkout-shared-components.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const SubmitButton = ({
  children,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <button className={styles.button} type="submit" disabled={isDisabled}>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className={styles.spinnerIcon} />
      ) : (
        children
      )}
    </button>
  );
};

export const ErrorMessage = ({ message }) => {
  return <div className={styles.errorMessage}>{message}</div>;
};
