import styles from './layout.module.scss';
import OrderSummary from '../order-summary/order-summary';
import Image from 'next/image';
import Logo from 'public/Logo-1200px-No-Bkgd-min-small.png';
import clsx from 'clsx';

export default function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.left}>
        <Image
          src={Logo}
          alt="Highlands Music Festival logo"
          className={clsx(styles.aboutLogo, styles.highlands)}
          priority
          quality={10}
          width={400}
          height={120}
        />
        {children}
      </div>
      <div className={styles.right}>
        <OrderSummary />
      </div>
    </div>
  );
}
