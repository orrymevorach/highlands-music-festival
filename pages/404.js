import Image from 'next/image';
import Rainbow from 'public/rainbow-min.png';
import styles from './404.module.scss';
import Head from 'components/head/head';
import { useFacebookPixel } from 'hooks';

export default function PageNotFound({ festivalDate }) {
  useFacebookPixel();
  return (
    <div className={styles.pageNotFoundContainer}>
      <Head festivalDate={festivalDate} />
      <Image
        src={Rainbow}
        alt="Highlands Music Festival logo"
        className={styles.logo}
        priority
        quality={10}
      />
      <h2 className={styles.title}>404: Page Not Found</h2>
      <p className={styles.text}>
        Apologies, it appears this page does not exist.
      </p>
    </div>
  );
}
