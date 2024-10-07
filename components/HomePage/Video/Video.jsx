import { imgPath } from 'utils/constants';
import styles from './Video.module.scss';
import ThankYou from '../ThankYou/ThankYou';

export default function Video({ thankYouMessageFeatureFlag = false }) {
  return (
    <div className={styles.videoContainer}>
      {thankYouMessageFeatureFlag && <ThankYou />}

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
