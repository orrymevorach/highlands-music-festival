import styles from './announcement.module.scss';
export default function Announcement() {
  return (
    <div className={styles.announcementContainer}>
      <p className={styles.justAnnounced}>Just annonuced:</p>
      <p className={styles.headliner}>Wild Rivers</p>
    </div>
  );
}
