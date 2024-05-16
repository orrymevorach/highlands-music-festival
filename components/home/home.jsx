import styles from './home.module.scss';
import { colors } from 'utils/constants';
import Layout from 'components/layout';
import AnnouncementTakeover from 'components/announcement-takeover';
import useAnimateAnnouncement from 'components/announcement-takeover/useAnimateAnnouncement';
import TopRow from './top-row';
import Video from './video';

export default function Home({
  headlinerFeatureFlag = false,
  headliners = [],
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
          <div className={styles.background}></div>
          <Layout hasPaddingBottom={false} hamburgerMenuColor={colors.beige}>
            <main className={styles.mainContent}>
              <h1 className={styles.h1}>Highlands Music Festival</h1>
              {/* <TopRow /> */}
              <Video />
            </main>
          </Layout>
        </div>
      )}
    </>
  );
}
