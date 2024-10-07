import styles from './marketplace.module.scss';
import ImageTiles from 'components/shared/image-tiles/image-tiles';
import RichText from 'components/shared/rich-text/rich-text';
import Link from 'next/link';
import { getInstagramHandle } from 'utils/utils';

const ImageTileBack = ({ description, link }) => {
  const instaHandle = link ? getInstagramHandle(link) : '';
  return (
    <div className={styles.tileBack}>
      <div className={styles.overlay}>
        {description?.json && <RichText json={description.json} />}
        {link && (
          <p>
            Instagram:{' '}
            <Link href={link} target="_blank">
              {instaHandle}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default function Marketplace({ vendors, partners }) {
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
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Partners of Highlands</h2>
      </div>
      <ImageTiles
        tiles={partners}
        classNames={styles.imageTiles}
        ImageTileBack={ImageTileBack}
      />
    </main>
  );
}
