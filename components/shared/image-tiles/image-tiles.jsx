import Image from 'next/image';
import styles from './image-tiles.module.scss';
import clsx from 'clsx';

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
          quality={50}
        />
      )}
    </div>
  );
};
export default function ImageTiles({ tiles, classNames = '' }) {
  return (
    <div className={clsx(styles.container, classNames)}>
      {tiles.map(artist => {
        return <Tile {...artist} key={`tile-${artist.name}`} />;
      })}
    </div>
  );
}
