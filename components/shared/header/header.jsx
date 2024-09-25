import styles from './header.module.scss';
import clsx from 'clsx';
import Nav from 'components/nav';
import Link from 'next/link';
import { useWindowSize } from 'hooks';
import logo from 'public/Logo-1200px-No-Bkgd-min-small.png';
import Image from 'next/image';
import { PAGE_SLUGS } from 'utils/constants';

export default function Header({ hideBottomMargin, festivalDate = '' }) {
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
          <Image src={logo} className={styles.thankYouLogo} />
        </Link>
        <h3>{festivalDate}</h3>
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
            href={PAGE_SLUGS.CHECKOUT}
            className={clsx(styles.buyTicketsButton, styles.grid)}
          >
            Buy Tickets
          </Link>
        </div>
      )}
    </div>
  );
}
