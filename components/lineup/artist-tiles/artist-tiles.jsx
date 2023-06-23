import Image from 'next/image';
import styles from './artist-tiles.module.scss';

const getFormattedLineup = lineup => {
  const headliners = lineup.headlinersCollection.items;
  const artists = lineup.artistsCollection.items;
  return [...headliners, ...artists];
};

const Tile = ({ name, image }) => {
  return (
    <div className={styles.tile}>
      <div className={styles.overlay}>
        <p className={styles.name}>{name}</p>
      </div>

      {image && (
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          className={styles.image}
        />
      )}
    </div>
  );
};
export default function ArtistTiles({ lineup }) {
  const formatttedLineup = getFormattedLineup(lineup);
  return (
    <div className={styles.container}>
      {formatttedLineup.map(artist => {
        return <Tile {...artist} key={`tile-${artist.name}`} />;
      })}
    </div>
  );
}
