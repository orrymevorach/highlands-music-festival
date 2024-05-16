import styles from './header.module.scss';
import { imgPath } from 'utils/constants';
import clsx from 'clsx';
import Nav from 'components/nav';
import Link from 'next/link';
import { useWindowSize } from 'hooks';

export default function Header({ hideBottomMargin }) {
  const { isMobile } = useWindowSize();
  return (
    <div
      className={clsx(
        styles.header,
        styles.grid,
        hideBottomMargin && styles.hideBottomMargin
      )}
    >
      <div className={clsx(styles.navContainer, styles.grid)}>
        <Nav />
      </div>
      <div className={clsx(styles.logoContainer, styles.grid)}>
        <Link href="/">
          <img
            src={`${imgPath}/Logo-1200px-No-Bkgd-min.png`}
            className={styles.thankYouLogo}
          />
        </Link>
        <h3>September 26th - 29th, 2024</h3>
      </div>
      {!isMobile && (
        <div className={styles.buttonsContainer}>
          <Link
            href="/lineup-and-schedule"
            className={clsx(styles.lineupButton, styles.grid)}
          >
            Lineup
          </Link>
          <Link
            href="/buy-tickets"
            className={clsx(styles.buyTicketsButton, styles.grid)}
          >
            Buy Tickets
          </Link>
        </div>
      )}
    </div>
  );
}
