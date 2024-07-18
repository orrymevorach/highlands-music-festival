import styles from './marketplace.module.scss';
import ImageTiles from 'components/shared/image-tiles/image-tiles';
import RichText from 'components/shared/rich-text/rich-text';

const ImageTileBack = ({ description, image }) => {
  return (
    <div className={styles.tileBack}>
      <div className={styles.tileBackBackgroundImage}></div>
      <div className={styles.overlay}>
        {description?.json && <RichText json={description.json} />}
      </div>
    </div>
  );
};

export default function Marketplace({ vendors }) {
  return (
    <main>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Marketplace</h2>
        <div className={styles.innerContainer}>
          <p className={styles.bodyCopyMedium}>
            In between performances, explore our marketplace and indulge in the
            products and services offered by businesses within Ontario!
          </p>
        </div>
      </div>
      <ImageTiles
        tiles={vendors}
        classNames={styles.imageTiles}
        ImageTileBack={ImageTileBack}
      />
    </main>
  );
}
