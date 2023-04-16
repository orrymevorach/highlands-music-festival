import styles from './announcement.module.scss';
import { CloseButton } from 'components/icons/icons';
import clsx from 'clsx';

export default function Announcement({ setShowAnnouncement = () => {} }) {
  return (
    <div className={styles.announcement}>
      <div
        className={clsx(styles.headlinerAnnouncementContainer, styles.fadeIn)}
      >
        <CloseButton dark handleClick={() => setShowAnnouncement(false)} />
        <p className={styles.lineOne}>Announcing:</p>
        <p className={styles.artist}>
          <span>WiILD</span>
          <span>RIVERS</span>
        </p>
      </div>
    </div>
  );
}
