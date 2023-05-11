import Link from 'next/link';
import styles from './top-row.module.scss';
import Button from 'components/shared/button/button';

export default function TopRow() {
  return (
    <div className={styles.topRow}>
      <h2 className={styles.date}>September 28 - October 1</h2>
      <div className={styles.middle}>
        <p className={styles.ticketsAvailable}>
          2023 tickets are now available
        </p>
        <p className={styles.link}>
          <Link href="/buy-tickets">Click here</Link> to see what's included in
          the ticket price
        </p>
      </div>
      <Button href="/buy-tickets" classNames={styles.buyNowButton}>
        Buy Now
      </Button>
    </div>
  );
}
