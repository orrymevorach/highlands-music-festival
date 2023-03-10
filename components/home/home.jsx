import styles from './home.module.scss';
import { imgPath, colors } from 'utils/constants';
import Layout from 'components/layout';
import { useWindowSize } from 'hooks';

const TopRow = () => (
  <div className={styles.topRow}>
    {/* <h2 className={styles.date">Septemeber 30 - October 2</h2>
    <p className={styles.ticketsAvailable">2022 tickets are now available</p>
    <a
      href="https://www.eventbrite.ca/e/highlands-music-festival-tickets-353399967817"
      className={styles.buyNowButton"
      target="_blank"
      rel="noreferrer"
    >
      Buy Now
    </a> */}
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
      {/* <div className={styles.videoOverlay"></div> */}
    </>
  );
};

export default function Home() {
  const { isMobile } = useWindowSize();
  return (
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
  );
}
