import { useWindowSize } from 'hooks';
import styles from './VideoOverlay.module.scss';
import { imgPath } from 'utils/constants';
import RichText from 'components/shared/RichText/RichText';
import { BLOCKS } from '@contentful/rich-text-types';

export const config = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className={styles.thankYouHeading}>{children}</p>;
    },
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
  },
};

export default function VideoOverlay({ overlayText }) {
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
        <RichText json={overlayText.json} config={config} />
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
