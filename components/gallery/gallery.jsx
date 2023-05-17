import styles from './gallery.module.scss';
import Masonry from 'react-masonry-css';
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
        <img src={src} className={clsx(styles.image)} alt={text || ''} />
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
      <Tile src="./2022 EVENT PHOTOS/bonfire.jpg" text="Big Ass Bonfire" />
      <Tile src={'./2022 EVENT PHOTOS/concert-night.jpg'} />
      <Tile src={'./2022 EVENT PHOTOS/flagpole.jpg'} text="Immaculate Vibes" />

      <Tile
        videoSrc="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/busty.mov"
        text="Late Night Funk"
      />

      <Tile src={'./2022 EVENT PHOTOS/pink-vibes.jpg'} />
      <Tile src={'./2022 EVENT PHOTOS/backyard.jpg'} />
      <Tile src={'./2022 EVENT PHOTOS/cabin.jpeg'} text="Slumber Party" />
      <Tile src={'./2022 EVENT PHOTOS/concert-day.jpg'} />

      <Tile src={'./2022 EVENT PHOTOS/amphitheatre-show.jpg'} />
      <Tile src={'./2022 EVENT PHOTOS/poutine.jpg'} text="Midnight Poutine" />
      <Tile src={'./2022 EVENT PHOTOS/photographer.jpg'} />
      <Tile src={'./2022 EVENT PHOTOS/swimTower.jpg'} text="Epic Waterfront" />
      <Tile
        videoSrc="https://highlands-music-festival.s3.ca-central-1.amazonaws.com/fire.mov"
        text="VIP Seating"
      />

      <Tile src={'./2022 EVENT PHOTOS/music-sign.jpg'} />
      <Tile
        src={'./2022 EVENT PHOTOS/chicken.jpeg'}
        text="Chicken Finger Rave"
      />
      <Tile src={'./2022 EVENT PHOTOS/rosie.jpg'} text="PJ Dance Party" />

      <Tile src={'./2022 EVENT PHOTOS/brook-night.jpg'} />
      <Tile src={'./2022 EVENT PHOTOS/waterfront.jpg'} />
      <Tile src={'./2022 EVENT PHOTOS/stage-night.jpg'} />
      <Tile src={'./2022 EVENT PHOTOS/foliage.jpg'} text="Fall Foliage" />
    </Masonry>
  );
}
