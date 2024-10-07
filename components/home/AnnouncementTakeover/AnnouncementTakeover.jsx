import styles from './AnnouncementTakeover.module.scss';
import CloseButton from 'components/shared/CloseButton/CloseButton';
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
        <div
          className={styles.background}
          style={{
            backgroundImage: 'url(./backgrounds/HL_2023_Logo247.jpg)',
          }}
        ></div>
        <CloseButton dark handleClick={closeAnnouncement} />
        <p className={styles.lineOne}>Announcing:</p>
        {/* These animation only work for headliners with 2 words. animation-delay changes must be done manually in scss file  */}
        {headliners.map((headliner, index) => {
          const words = headliner.split(' ');
          const isLastHeadliner = headliners.length === index + 1;
          return (
            <div key={headliner}>
              <p className={clsx(styles.artist, styles[`artist${index + 1}`])}>
                {words.map((word, wordIndex) => {
                  const isLastWord = wordIndex === words.length - 1;
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
                  key={`&-${index}`}
                  className={clsx(
                    styles.artist,
                    styles[`artistAnd${index + 1}`]
                  )}
                >
                  <span>&</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
