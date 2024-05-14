import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './close-button.module.scss';
import clsx from 'clsx';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export default function CloseButton({
  handleClick,
  dark = false,
  classNames = '',
}) {
  return (
    <button
      onClick={handleClick}
      className={clsx(
        classNames,
        styles.closeButton,
        dark && styles.darkButton
      )}
    >
      <FontAwesomeIcon icon={faTimesCircle} size="2x" />
    </button>
  );
}
