import { imgPath } from 'utils/constants';
import styles from './Video.module.scss';
import VideoOverlay from '../VideoOverlay/VideoOverlay';

export default function Video({ thankYouMessageFeatureFlag = false }) {
  return (
    <div className={styles.videoContainer}>
      {thankYouMessageFeatureFlag ? (
        <VideoOverlay />
      ) : (
        <VideoOverlay textArray={['Early Bird Tickets available now!']} />
      )}

      <video
        src={`${imgPath}/promo-2025.mp4`}
        autoPlay
        muted
        className={styles.video}
        loop
        playsInline
      ></video>
    </div>
  );
}
