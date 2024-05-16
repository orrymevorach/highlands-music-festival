import { imgPath } from 'utils/constants';
import styles from './video.module.scss';

const showThankYou = false;
const ThankYou = ({ festivalDate }) => {
  return (
    <div className={styles.thankYou}>
      <img
        src={`${imgPath}/Logo-1200px-Neutral.png`}
        alt="Highlands Music Festival logo"
        className={styles.thankYouLogo}
      />
      <p className={styles.thankYouHeading}>THANK YOU!</p>
      <p className={styles.thankYouHeading}>Same time next year.</p>
      {/* <p className={clsx(styles.thankYouText, styles.thankYouTextDate)}>
        {festivalDate}
      </p>
      <p className={styles.thankYouText}>Camp Walden, Ontario</p> */}
    </div>
  );
};
export default function Video({ festivalDate }) {
  return (
    <div className={styles.videoContainer}>
      {showThankYou && (
        <>
          <ThankYou festivalDate={festivalDate} />
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
