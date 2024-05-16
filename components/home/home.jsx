import styles from './home.module.scss';
import AnnouncementTakeover from 'components/announcement-takeover';
import useAnimateAnnouncement from 'components/announcement-takeover/useAnimateAnnouncement';
import Video from './video';
import Layout from 'components/layout/layout';

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
              {/* <TopRow /> */}
              <Video festivalDate={festivalDate} />
            </main>
          </Layout>
        </div>
      )}
    </>
  );
}
