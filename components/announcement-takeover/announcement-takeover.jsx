import styles from './announcement-takeover.module.scss';
import { CloseButton } from 'components/icons/icons';
import clsx from 'clsx';

export default function AnnouncementTakeover({
  closeAnnouncement = () => {},
  headliners,
}) {
  return (
    <div className={styles.announcement}>
      <div
        className={clsx(styles.headlinerAnnouncementContainer, styles.fadeIn)}
      >
        <CloseButton dark handleClick={closeAnnouncement} />
        <p className={styles.lineOne}>Announcing:</p>
        {/* These animation only work for headliners with 2 words. animation-delay changes must be done manually in scss file  */}
        {headliners.map((headliner, index) => {
          const words = headliner.split(' ');
          const isLastHeadliner = headliners.length === index + 1;
          return (
            <>
              <p
                key={headliner}
                className={clsx(styles.artist, styles[`artist${index + 1}`])}
              >
                {words.map((word, index) => {
                  const isLastWord = index === words.length - 1;
                  return (
                    <span
                      className={clsx(isLastWord && styles.lastWord)}
                      key={word}
                    >
                      {word}
                    </span>
                  );
                })}
              </p>
              {!isLastHeadliner && (
                <p
                  key={headliner}
                  className={clsx(
                    styles.artist,
                    styles[`artistAnd${index + 1}`]
                  )}
                >
                  <span>&</span>
                </p>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
