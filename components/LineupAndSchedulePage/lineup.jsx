import styles from './lineup.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import ImageTiles from '../shared/ImageTiles/ImageTiles';
import GreenSun from 'public/green-sun-small.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { useWindowSize } from 'hooks';
import { useState } from 'react';
import Takeover from 'components/shared/Takeover/Takeover';
import Jamlands from './jamlands/jamlands';

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
  const { isMobile } = useWindowSize();
  const [showModal, setShowModal] = useState(false);
  const [lineupGraphic, setLineupGraphic] = useState(null);
  // const headliners = lineup.headlinersCollection.items;
  const formatttedLineup = getFormattedLineup(lineup);
  const jamlandsLineup = lineup.jamlandsCollection.items;

  const ImageTileBack = ({ spotifyLink }) => {
    return (
      <Link href={spotifyLink} className={styles.imageTileBack} target="_blank">
        <p>Listen on Spotify</p>
        <FontAwesomeIcon icon={faSpotify} size="xl" />
      </Link>
    );
  };

  const handleClickImage = graphic => {
    setShowModal(true);
    setLineupGraphic(graphic);
  };

  return (
    <>
      {/* {headlinerFeatureFlag && <Announcement headliners={headliners} />} */}

      {showModal && (
        <Takeover handleClose={() => setShowModal(false)}>
          <Image
            src={lineupGraphic.url}
            height={lineupGraphic.height}
            width={lineupGraphic.width}
            className={styles.modalLineupGraphic}
          />
        </Takeover>
      )}
      <Heading>
        <p className={styles.paragraph}>
          2024 Lineup{' '}
          {/* <span className={styles.comingSoon}>(schedule coming soon...)</span> */}
          {/* {headlinerFeatureFlag ? (
            <>
              {isMobile && <br />}
              <span className={styles.comingSoon}>
                (more announcements coming soon...)
              </span>
            </>
          ) : (
            <span className={styles.comingSoon}>(schedule coming soon...)</span>
          )} */}
        </p>
      </Heading>

      <div className={styles.tilesContainer}>
        <ImageTiles tiles={formatttedLineup} ImageTileBack={ImageTileBack} />
        <Jamlands lineup={jamlandsLineup} />
        {headlinerFeatureFlag && (
          <p className={styles.comingSoon}>More announcements coming soon...</p>
        )}
      </div>
      <div className={styles.pastLineupsContainer}>
        <Heading>
          <p>Past Lineups</p>
        </Heading>
        <div className={styles.pastLineups}>
          {lineupGraphics.map(graphic => {
            return (
              <div
                className={styles.lineupGraphic}
                key={graphic.url}
                onClick={() => handleClickImage(graphic)}
              >
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
