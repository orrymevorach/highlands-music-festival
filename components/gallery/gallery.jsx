import styles from './gallery.module.scss';
import Masonry from 'react-masonry-css';
import Image from 'next/image';
import * as images from './images';
import { useWindowSize } from 'hooks';
import clsx from 'clsx';

const Tile = ({ src, text, videoSrc }) => {
  return (
    <div className={styles.tile}>
      {text && (
        <div className={styles.tileOverlay}>
          <p className={styles.text}>{text}</p>
        </div>
      )}
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          className={styles.image}
          loop
          playsInline
        ></video>
      ) : (
        <Image src={src} className={clsx(styles.image)} alt={text || ''} />
      )}
    </div>
  );
};

export default function Gallery() {
  const { device } = useWindowSize();
  const mapDeviceToColumns = {
    desktop: 4,
    tablet: 3,
    mobile: 2,
  };
  const numberOfColumns = mapDeviceToColumns[device];
  return (
    <Masonry
      breakpointCols={numberOfColumns}
      className={styles['my-masonry-grid']}
      columnClassName={styles['my-masonry-grid_column']}
    >
      <Tile src={images.bonfire} text="Big Ass Bonfire" />
      <Tile src={images.concertNight} />
      <Tile src={images.flagpole} text="Immaculate Vibes" />

      <Tile
        videoSrc="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/busty.mov"
        text="Late Night Funk"
      />

      <Tile src={images.pinkVibes} />
      <Tile src={images.backyard} />
      <Tile src={images.cabin} text="Slumber Party" />
      <Tile src={images.concertDay} />

      <Tile src={images.amphiteatreShow} />
      <Tile src={images.poutine} text="Midnight Poutine" />
      <Tile src={images.photographer} />
      <Tile src={images.swimTower} text="Epic Waterfront" />
      <Tile
        videoSrc="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/fire.mov"
        text="VIP Seating"
      />

      <Tile src={images.musicSign} />
      <Tile src={images.chicken} text="Chicken Finger Rave" />
      <Tile src={images.rosie} text="PJ Dance Party" />

      <Tile src={images.brookBluffNight} />
      <Tile src={images.waterfront} />
      <Tile src={images.stageNight} />
      <Tile src={images.foliage} text="Fall Foliage" />
    </Masonry>
  );
}
