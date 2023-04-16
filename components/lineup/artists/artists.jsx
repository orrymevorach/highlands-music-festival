import Image from 'next/image';
import styles from './artists.module.scss';
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

export default function Artists() {
  const chunkedLineup = chunkLineupIntoRowsOfThree(lineup);
  return (
    <>
      {chunkedLineup.map((chunkedRow, index) => {
        return (
          <div key={`${chunkedRow[0]}-${index}`} className={styles.artistRow}>
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
                      className={styles.lineupSun}
                      width={80}
                      height={80}
                      quality={10}
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
}
