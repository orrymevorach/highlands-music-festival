import { imgPath } from 'utils/constants';
import styles from './Video.module.scss';

const ThankYou = () => {
  return (
    <div className={styles.thankYou}>
      <img
        src={`${imgPath}/Logo-1200px-Neutral.png`}
        alt="Highlands Music Festival logo"
        className={styles.thankYouLogo}
      />
      <p className={styles.thankYouHeading}>THANK YOU!</p>
      <p className={styles.thankYouHeading}>Same time next year.</p>
    </div>
  );
};
export default function Video({ thankYouMessageFeatureFlag = false }) {
  return (
    <div className={styles.videoContainer}>
      {thankYouMessageFeatureFlag && (
        <>
          <ThankYou />
          <div className={styles.videoOverlay}></div>
        </>
      )}

      <video
        src={`${imgPath}/highlands-2023.mp4`}
        autoPlay
        muted
        className={styles.video}
        loop
        playsInline
      ></video>
    </div>
  );
}
