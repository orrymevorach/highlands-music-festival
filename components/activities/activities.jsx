import Layout from 'components/layout';
import styles from './activities.module.scss';
import { colors } from 'utils/constants';
import { GreenSun, Hammocks } from 'public';
import { useWindowSize } from 'hooks';
import clsx from 'clsx';

const activities = [
  'Tennis, Basketball, & Hockey',
  'Painting, Beading, & Crafts',
  'Canoe, Kayak, Sail, & Swim',
  'Yoga & Fitness Classes',
  'Waterski',
];

export default function Activities() {
  const { isMobile } = useWindowSize();
  return (
    <Layout hamburgerMenuColor={colors.beige}>
      <main>
        <div className={styles.hammocksContainer}>
          <Hammocks />
        </div>
        <div className={styles.activitiesWrapper}>
          <h2 className={styles.heading}>Activities</h2>
          {!isMobile && <GreenSun classNames={styles.activitiesSun} />}
          <div className={styles.activitiesContainer}>
            <div className={clsx(styles.activitiesCol, styles.activitiesCol1)}>
              <p className={styles.bodyCopyMedium}>
                In between performances, take advantage of the many activities
                available on the campgrounds.
              </p>
            </div>
            <ul className={clsx(styles.activitiesCol, styles.activitiesCol2)}>
              {activities.map(activity => (
                <li
                  key={activity}
                  className={clsx(styles.bodyCopy, styles.activity)}
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </Layout>
  );
}
