import styles from './Home.module.scss';
import AnnouncementTakeover from 'components/HomePage/AnnouncementTakeover/AnnouncementTakeover';
import useAnimateAnnouncement from 'components/HomePage/AnnouncementTakeover/useAnimateAnnouncement';
import Video from './Video/Video';
import Layout from 'components/shared/Layout/Layout';

export default function Home({
  headlinerFeatureFlag = false,
  headliners = [],
  festivalDate,
}) {
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
          <Layout hideHeaderMargin festivalDate={festivalDate}>
            <main className={styles.mainContent}>
              <h1 className={styles.h1}>Highlands Music Festival</h1>
              <Video festivalDate={festivalDate} />
            </main>
          </Layout>
        </div>
      )}
    </>
  );
}
