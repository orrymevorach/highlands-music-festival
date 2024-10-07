import Image from 'next/image';
import styles from './jamlands.module.scss';
import GreenSun from 'public/green-sun-small.png';

export default function Jamlands({ lineup }) {
  return (
    <div className={styles.jamlands}>
      <div className={styles.titleContainer}>
        <Image src={GreenSun} className={styles.sun} quality={10} />
        <p className={styles.title}>
          JAM<span className={styles.titleInner}>LANDS</span> Lineup
        </p>
        <Image src={GreenSun} className={styles.sun} quality={10} />
      </div>
      <p className={styles.description}>
        Experience the Highlands community united for a one-night only jam
        session on Saturday, September 28th. Enjoy performances by artists from
        past & present lineups, covering your favourtie songs.
      </p>
      <div className={styles.lineup}>
        <p className={styles.featuring}>Featuring</p>
        {lineup.map(artist => {
          return (
            <a
              className={styles.artist}
              href={artist.spotifyLink}
              target="_blank"
            >
              {artist.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
