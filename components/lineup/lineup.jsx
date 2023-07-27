import styles from './lineup.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import PastLineupDropdown from './past-lineup-dropdown';
import { useEffect, useRef, useState } from 'react';
import Artists from './artists';
import Headliners from './headliners';
import Announcement from './announcement';
import ArtistTiles from './artist-tiles';
import GreenSun from 'public/green-sun.png';

const Heading = ({ children }) => (
  <div className={styles.headingContainer}>
    <Image src={GreenSun} className={styles.sun} quality={10} />
    <h2 className={clsx(styles.heading, styles.lineupHeading)}>{children}</h2>
    <Image src={GreenSun} className={styles.sun} quality={10} />
  </div>
);

export default function Lineup({ headlinerFeatureFlag = false, lineup = [] }) {
  const [year, setYear] = useState('');
  const lineupRef = useRef();
  useEffect(() => {
    if (year && lineupRef) {
      lineupRef.current.scrollIntoView();
    }
  }, [year, lineupRef]);

  const headliners = lineup.headlinersCollection.items;

  return (
    <>
      {headlinerFeatureFlag ? (
        <>
          <Announcement headliners={headliners} />
          <Heading>Stay tuned for more 2023 lineup announcements</Heading>
        </>
      ) : (
        <>
          <Heading>
            <p>
              2023 Lineup{' '}
              <span className={styles.comingSoon}>
                (schedule coming soon...)
              </span>
            </p>
          </Heading>
          <ArtistTiles lineup={lineup} />
        </>
      )}

      <div className={styles.container}>
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
              quality={1}
            />
            <Headliners />
            <Artists />
          </div>
        )}
      </div>
    </>
  );
}
