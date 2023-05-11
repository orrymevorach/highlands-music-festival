import { imgPath } from 'utils/constants';
import styles from './video.module.scss';
import { useWindowSize } from 'hooks';

export default function Video() {
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.videoContainer}>
      <div className={styles.imageContainer}>
        <img
          src={`${imgPath}/Logo-1200px-Neutral.png`}
          alt="Highlands Music Festival logo"
          className={styles.logo}
        />
      </div>
      {!isMobile && (
        <>
          <video
            // src={`${imgPath}/Walden-HighQ-cropped-v2.mp4`}
            src={`${imgPath}/highlands-teaser-video.mp4`}
            autoPlay
            muted
            className={styles.video}
            loop
            playsInline
          ></video>
          <div className={styles.videoOverlay}></div>
        </>
      )}
    </div>
  );
}
