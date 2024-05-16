import Image from 'next/image';
import styles from './image-tiles.module.scss';
import clsx from 'clsx';

const Tile = props => {
  const { name, image, ImageTileBack } = props;

  const ImageTileFront = () => {
    return (
      <>
        <div className={styles.overlay}>
          <p className={styles.name}>{name}</p>
        </div>
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          className={styles.image}
          quality={50}
        />
      </>
    );
  };
  return (
    <div className={styles.tileContainer}>
      {ImageTileBack ? (
        <div className={styles.flipCardInner}>
          <div className={styles.flipCardFront}>
            <ImageTileFront />
          </div>
          <div className={styles.flipCardBack}>
            <ImageTileBack {...props} />
          </div>
        </div>
      ) : (
        <ImageTileFront />
      )}
    </div>
  );
};
export default function ImageTiles({ tiles, classNames = '', ImageTileBack }) {
  return (
    <div className={clsx(styles.container, classNames)}>
      {tiles.map(artist => {
        return (
          <Tile
            {...artist}
            key={`tile-${artist.name}`}
            ImageTileBack={ImageTileBack}
          />
        );
      })}
    </div>
  );
}
