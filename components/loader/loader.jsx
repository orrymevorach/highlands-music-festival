import styles from './loader.module.scss';
import clsx from 'clsx';

export default function Loader({ centerInContainer = false, isWhite = false }) {
  return (
    <div
      className={clsx(
        styles['lds-ring'],
        centerInContainer && styles.centerInContainer,
        isWhite && styles.white
      )}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
