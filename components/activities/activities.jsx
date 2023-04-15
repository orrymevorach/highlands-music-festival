import Layout from 'components/layout';
import styles from './activities.module.scss';
import { colors } from 'utils/constants';
import { useWindowSize } from 'hooks';
import clsx from 'clsx';
import Image from 'next/image';
import Hammock from 'public/CL-HAMMOCK.jpg';

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
          <Image src={Hammock} priority alt="" quality={30} />
        </div>
        <div className={styles.activitiesWrapper}>
          <h2 className={styles.heading}>Activities</h2>
          {!isMobile && (
            <Image
              src="/green-sun.png"
              alt=""
              className={styles.activitiesSun}
              width={150}
              height={150}
              quality={10}
            />
          )}
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
