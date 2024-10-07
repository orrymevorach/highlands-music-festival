import Image from 'next/image';
import Rainbow from 'public/rainbow-min.png';
import styles from './404.module.scss';
import Head from 'components/head/head';
import { useFacebookPixel } from 'hooks';
import { PAGE_SLUGS } from 'utils/constants';
import { getPageLoadData } from 'lib/contentful-lib';

export default function Unsubscribe({ festivalDate }) {
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
      <p className={styles.text}>You have been successfully unsubscribed.</p>
    </div>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.UNSUBSCRIBE,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
