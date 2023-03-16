import styles from './lineup.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

const lineup = [
  'Ada Lea',
  'Adria Kain',
  'Amaka',
  'Clerel',
  'Dave Borins',
  'Ellevator',
  'Erez Zobary',
  'Katie Tupper',
  'Le Ren',
  'Logan Staats',
  'Loving',
  'Mighloe',
  'Niall Mutter',
  'Shallow Alcove',
  'SORAN',
  'THe LYONZ',
  'Zenesoul',
];

const chunkLineupIntoRowsOfThree = lineup => {
  let chunkedLineup = [];
  const chunkSize = 3;
  for (let i = 0; i < lineup.length; i += chunkSize) {
    const chunk = lineup.slice(i, i + chunkSize);
    chunkedLineup.push(chunk);
  }
  return chunkedLineup;
};

const Headliners = () => (
  <div className={clsx(styles.lineupRow, styles.headlineRow)}>
    <p className={styles.heading}>
      Busty <br />
      and <br />
      the <br />
      Bass
    </p>
    <Image
      src="/green-sun.png"
      width={80}
      height={80}
      className={clsx(styles.lineupSun, styles.headlineSun)}
    />
    <p className={styles.heading}>
      The <br /> Brook <br /> & the <br /> Bluff
    </p>
  </div>
);

const Artists = () => {
  const chunkedLineup = chunkLineupIntoRowsOfThree(lineup);
  return (
    <>
      {chunkedLineup.map((chunkedRow, index) => {
        return (
          <div key={`${chunkedRow[0]}-${index}`} className={styles.lineupRow}>
            {chunkedRow.map((artist, index) => {
              const isLastArtistInRow = index === chunkedRow.length - 1;
              return (
                <div key={artist} className={styles.artistContainer}>
                  <p className={clsx(styles.heading, styles.artist)}>
                    {artist}
                  </p>
                  {!isLastArtistInRow && (
                    <Image
                      src="/green-sun.png"
                      className={clsx(styles.lineupSun)}
                      width={80}
                      height={80}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default function Lineup() {
  return (
    <div className={styles.lineupContainer}>
      <h2 className={clsx(styles.heading, styles.center)}>2023 Lineup</h2>
      {/* <YellowSun classNames="lineupBackground" /> */}
      <Headliners />
      <Artists />
    </div>
  );
}
