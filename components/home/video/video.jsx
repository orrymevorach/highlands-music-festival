import { imgPath } from 'utils/constants';
import styles from './video.module.scss';
import { useWindowSize } from 'hooks';
import clsx from 'clsx';

const ThankYou = () => {
  return (
    <div className={styles.thankYou}>
      <img
        src={`${imgPath}/Logo-1200px-Neutral.png`}
        alt="Highlands Music Festival logo"
        className={styles.thankYouLogo}
      />
      {/* <p className={styles.thankYouHeading}>THANK YOU!</p>
      <p className={styles.thankYouHeading}>Same time next year.</p> */}
      <p className={clsx(styles.thankYouText, styles.thankYouTextDate)}>
        September 26-29, 2024
      </p>
      <p className={styles.thankYouText}>Camp Walden, Ontario</p>
    </div>
  );
};
export default function Video() {
  const { isMobile } = useWindowSize();
  return (
    <div className={styles.videoContainer}>
      <div className={styles.imageContainer}>
        {/* <img
          src={`${imgPath}/Logo-1200px-Neutral.png`}
          alt="Highlands Music Festival logo"
          className={styles.logo}
        /> */}
        <ThankYou />
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
