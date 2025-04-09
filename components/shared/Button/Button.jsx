import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './Button.module.scss';
import Link from 'next/link';
import clsx from 'clsx';

const ButtonContents = ({ isLoading, children }) => {
  return (
    <>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className={styles.spinnerIcon} />
      ) : (
        children
      )}
    </>
  );
};

export default function Button({
  children,
  isLoading = false,
  isDisabled = false,
  href = null,
  handleClick = null,
  classNames = '',
  target = '',
  isSmall = false,
  isDarkBeige = false,
}) {
  const classes = clsx(styles.button, classNames, {
    [styles.small]: isSmall,
    [styles.darkBeige]: isDarkBeige,
  });
  if (href) {
    return (
      <Link href={href} target={target} className={classes}>
        {children}
      </Link>
    );
  }
  if (handleClick) {
    return (
      <button className={classes} disabled={isDisabled} onClick={handleClick}>
        <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
      </button>
    );
  }
  return (
    <button className={classes} type="submit" disabled={isDisabled}>
      <ButtonContents isLoading={isLoading}>{children}</ButtonContents>
    </button>
  );
}
