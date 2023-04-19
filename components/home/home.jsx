import styles from './home.module.scss';
import { imgPath, colors } from 'utils/constants';
import Layout from 'components/layout';
import { useWindowSize } from 'hooks';
import AnnouncementTakeover from 'components/announcement-takeover';
import useAnimateAnnouncement from 'components/announcement-takeover/useAnimateAnnouncement';

const TopRow = () => (
  <div className={styles.topRow}>
    <div>
      <p className={styles.ticketsAvailable}>Tickets on sale soon!</p>
      <p className={styles.ticketsAvailable}>
        September 28th - October 1st, 2023
      </p>
      <p className={styles.ticketsAvailable}>Camp Walden, ON</p>
    </div>
  </div>
);

const Video = () => {
  return (
    <>
      <video
        // src={`${imgPath}/Walden-HighQ-cropped-v2.mp4`}
        src={`${imgPath}/highlands-teaser-video.mp4`}
        autoPlay
        muted
        className={styles.video}
        loop
        playsInline
      ></video>
      <div className={styles.videoOverlay}></div>
    </>
  );
};

export default function Home({
  headlinerFeatureFlag = false,
  headliners = [],
}) {
  const { isMobile } = useWindowSize();
  const { showAnnouncement, closeAnnouncement } = useAnimateAnnouncement();
  return (
    <>
      {showAnnouncement && headlinerFeatureFlag ? (
        <AnnouncementTakeover
          closeAnnouncement={closeAnnouncement}
          headliners={headliners}
        />
      ) : (
        <div className={styles.homePageContainer}>
          <Layout hasPaddingBottom={false} hamburgerMenuColor={colors.beige}>
            <main>
              <h1 className={styles.h1}>Highlands Music Festival</h1>
              <div className={styles.videoContainer}>
                <div className={styles.imageContainer}>
                  <img
                    src={`${imgPath}/Logo-1200px-Neutral.png`}
                    alt="Highlands Music Festival logo"
                    className={styles.logo}
                  />
                  <TopRow />
                </div>
                {!isMobile && <Video />}
              </div>
            </main>
          </Layout>
        </div>
      )}
    </>
  );
}
