import clsx from 'clsx';
import Image from 'next/image';
import styles from './headliners.module.scss';
import { lineupRow, heading } from '../lineup.module.scss';

export default function Headliners() {
  return (
    <div className={clsx(lineupRow, styles.headlineRow)}>
      <p className={heading}>
        Busty <br />
        and <br />
        the <br />
        Bass
      </p>
      <Image
        src="/green-sun.png"
        width={80}
        height={80}
        className={styles.headlineSun}
        quality={10}
      />
      <p className={heading}>
        The <br /> Brook <br /> & the <br /> Bluff
      </p>
    </div>
  );
}
