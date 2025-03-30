import styles from './Video.module.scss';
import VideoOverlay from '../VideoOverlay/VideoOverlay';

export default function Video({ video }) {
  return (
    <div className={styles.videoContainer}>
      {video?.overlayText && <VideoOverlay overlayText={video.overlayText} />}

      <video
        src={video?.href}
        autoPlay
        muted
        className={styles.video}
        loop
        playsInline
      ></video>
    </div>
  );
}
