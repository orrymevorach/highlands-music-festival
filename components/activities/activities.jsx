import styles from './activities.module.scss';
import Image from 'next/image';
import Hammock from 'public/backgrounds/HL_2023_Logo491.jpg';
import ImageTiles from 'components/shared/image-tiles/image-tiles';
import RichText from 'components/shared/rich-text/rich-text';

const ImageTileBack = ({ description }) => {
  return (
    <div className={styles.tileBack}>
      {description?.json && <RichText json={description.json} />}
    </div>
  );
};
export default function Activities({ activities }) {
  return (
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
      <ImageTiles
        tiles={activities}
        classNames={styles.imageTiles}
        ImageTileBack={ImageTileBack}
      />
    </main>
  );
}
