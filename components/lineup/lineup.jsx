import styles from './lineup.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import PastLineupDropdown from './past-lineup-dropdown';
import { useRef, useState } from 'react';
import Artists from './artists';
import Headliners from './headliners';

export default function Lineup() {
  const [year, setYear] = useState('');
  const lineupRef = useRef();
  return (
    <div className={styles.container}>
      <h2 className={clsx(styles.heading, styles.center, styles.lineupHeading)}>
        Stay tuned for 2024 lineup announcements
      </h2>
      <PastLineupDropdown year={year} setYear={setYear} />
      {year && (
        <div className={styles.lineupContainer} ref={lineupRef}>
          <Image
            src="/yellow-sun.png"
            alt=""
            className={styles.lineupBackground}
            width={1184}
            height={620}
          />
          <Headliners />
          <Artists />
        </div>
      )}
    </div>
  );
}
