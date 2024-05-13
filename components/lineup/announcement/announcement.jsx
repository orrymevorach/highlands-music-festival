import styles from './announcement.module.scss';
import clsx from 'clsx';

export default function Announcement({ headliners }) {
  const headlinerNames = headliners.map(({ name }) => name);
  return (
    <div className={styles.announcementContainer}>
      <p className={styles.justAnnounced}>Just announced:</p>
      <div className={styles.headlinersContainer}>
        {headlinerNames.map((headliner, index) => {
          const isLastHeadliner = headlinerNames.length === index + 1;
          return (
            <>
              <p className={styles.headliner}>{headliner}</p>
              {!isLastHeadliner && (
                <p className={clsx(styles.headliner, styles.and)}>|</p>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
