import Layout from 'components/layout';
import styles from './activities.module.scss';
import Image from 'next/image';
import Hammock from 'public/backgrounds/HL_2023_Logo491.jpg';
import ImageTiles from 'components/shared/image-tiles/image-tiles';

export default function Activities({ activities }) {
  return (
    <Layout>
      <main>
        <div className={styles.imageContainer}>
          <Image src={Hammock} priority alt="" quality={70} />
        </div>
        <div className={styles.activitiesWrapper}>
          <h2 className={styles.heading}>Activities</h2>
          <div className={styles.activitiesContainer}>
            <p className={styles.bodyCopyMedium}>
              In between performances, take advantage of the many activities
              available on the campgrounds.
            </p>
          </div>
        </div>
        <ImageTiles tiles={activities} classNames={styles.imageTiles} />
      </main>
    </Layout>
  );
}
