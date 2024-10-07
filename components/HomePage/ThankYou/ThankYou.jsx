import { useWindowSize } from 'hooks';
import styles from './ThankYou.module.scss';
import { imgPath } from 'utils/constants';

export default function ThankYou() {
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
        <p className={styles.thankYouHeading}>THANK YOU!</p>
        <p className={styles.thankYouHeading}>Same time next year.</p>
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
