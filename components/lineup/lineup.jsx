import styles from './lineup.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import Announcement from './announcement';
import ImageTiles from '../shared/image-tiles';
import GreenSun from 'public/green-sun.png';

const getFormattedLineup = lineup => {
  const headliners = lineup.headlinersCollection.items;
  const artists = lineup.artistsCollection.items;
  return [...headliners, ...artists];
};

const Heading = ({ children }) => (
  <div className={styles.headingContainer}>
    <Image src={GreenSun} className={styles.sun} quality={10} />
    <h2 className={clsx(styles.heading, styles.lineupHeading)}>{children}</h2>
    <Image src={GreenSun} className={styles.sun} quality={10} />
  </div>
);

export default function Lineup({
  headlinerFeatureFlag = false,
  lineup = [],
  lineupGraphics = [],
}) {
  // const headliners = lineup.headlinersCollection.items;
  const formatttedLineup = getFormattedLineup(lineup);

  return (
    <>
      {/* {headlinerFeatureFlag && <Announcement headliners={headliners} />} */}

      <Heading>
        <p>
          2024 Lineup{' '}
          {/* <span className={styles.comingSoon}>(schedule coming soon...)</span> */}
          {headlinerFeatureFlag ? (
            <span className={styles.comingSoon}>
              (more announcements coming soon...)
            </span>
          ) : (
            <span className={styles.comingSoon}>(schedule coming soon...)</span>
          )}
        </p>{' '}
      </Heading>

      <div className={styles.tilesContainer}>
        <ImageTiles tiles={formatttedLineup} />
      </div>
      <div className={styles.pastLineupsContainer}>
        <Heading>
          <p>Past Lineups</p>
        </Heading>
        <div className={styles.pastLineups}>
          {lineupGraphics.map(graphic => {
            return (
              <div className={styles.lineupGraphic} key={graphic.url}>
                <Image
                  src={graphic.url}
                  height={graphic.height}
                  width={graphic.width}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
