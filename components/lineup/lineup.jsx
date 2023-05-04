import styles from './lineup.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import PastLineupDropdown from './past-lineup-dropdown';
import { useEffect, useRef, useState } from 'react';
import Artists from './artists';
import Headliners from './headliners';
import Announcement from './announcement';

export default function Lineup({
  headlinerFeatureFlag = false,
  headliners = [],
}) {
  const [year, setYear] = useState('');
  const lineupRef = useRef();
  useEffect(() => {
    if (year && lineupRef) {
      lineupRef.current.scrollIntoView();
    }
  }, [year, lineupRef]);
  return (
    <>
      {headlinerFeatureFlag && <Announcement headliners={headliners} />}
      <div className={styles.container}>
        <h1
          className={clsx(styles.heading, styles.center, styles.lineupHeading)}
        >
          Stay tuned for more 2023 lineup announcements
        </h1>

        <PastLineupDropdown
          year={year}
          setYear={setYear}
          classNames={styles.dropdown}
        />
        {year && (
          <div className={styles.lineupContainer} ref={lineupRef}>
            <Image
              src="/yellow-sun.png"
              alt=""
              className={styles.lineupBackground}
              width={1184}
              height={620}
              quality={10}
            />
            <Headliners />
            <Artists />
          </div>
        )}
      </div>
    </>
  );
}
