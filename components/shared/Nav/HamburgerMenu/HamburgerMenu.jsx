import styles from './HamburgerMenu.module.scss';
import clsx from 'clsx';

export default function HamburgerMenu({ isOpen = false, setIsOpen }) {
  return (
    <button
      className={clsx(styles.hamburgerMenu, isOpen ? styles.open : '')}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
