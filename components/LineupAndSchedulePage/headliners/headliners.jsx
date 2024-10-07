import clsx from 'clsx';
import Image from 'next/image';
import styles from './headliners.module.scss';

export default function Headliners() {
  return (
    <div className={styles.headlineRow}>
      <p className={clsx(styles.heading, styles.headliner)}>
        Busty <br />
        and <br />
        the <br />
        Bass
      </p>
      <Image
        src="/green-sun-small.png"
        width={80}
        height={80}
        className={styles.headlineSun}
        quality={10}
      />
      <p className={clsx(styles.heading, styles.headliner)}>
        The <br /> Brook <br /> & the <br /> Bluff
      </p>
    </div>
  );
}
