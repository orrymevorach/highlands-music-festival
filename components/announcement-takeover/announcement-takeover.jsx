import styles from './announcement-takeover.module.scss';
import { CloseButton } from 'components/icons/icons';
import clsx from 'clsx';

export default function AnnouncementTakeover({ closeAnnouncement = () => {} }) {
  return (
    <div className={styles.announcement}>
      <div
        className={clsx(styles.headlinerAnnouncementContainer, styles.fadeIn)}
      >
        <CloseButton dark handleClick={closeAnnouncement} />
        <p className={styles.lineOne}>Announcing:</p>
        <p className={styles.artist}>
          <span>WiILD</span>
          <span>RIVERS</span>
        </p>
      </div>
    </div>
  );
}
