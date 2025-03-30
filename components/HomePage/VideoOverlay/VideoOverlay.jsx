import { useWindowSize } from 'hooks';
import styles from './VideoOverlay.module.scss';
import { imgPath } from 'utils/constants';

export default function VideoOverlay({
  textArray = ['THANK YOU!', , 'Same time next year.'],
}) {
  const { isDesktop } = useWindowSize();
  return (
    <div className={styles.thankYouContainer}>
      <div className={styles.contentContainer}>
        {isDesktop && (
          <img
            src={`${imgPath}/Logo-1200px-Neutral.png`}
            alt="Highlands Music Festival logo"
            className={styles.thankYouLogo}
          />
        )}
        {textArray.map((text, index) => (
          <p key={`${text}-${index}`} className={styles.thankYouHeading}>
            {text}
          </p>
        ))}
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
