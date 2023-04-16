import Image from 'next/image';
import Logo from 'public/Logo-1200px-No-Bkgd-min.png';
import styles from './404.module.scss';

export default function PageNotFound() {
  return (
    <div className={styles.pageNotFoundContainer}>
      <Image
        src={Logo}
        alt="Highlands Music Festival logo"
        // className={styles.aboutLogo}
        priority
        quality={10}
        width={500}
        height={130}
      />
      <h2 className={styles.title}>404: Page Not Found</h2>
      <p className={styles.text}>
        Apologies, it appears this page does not exist.
      </p>
    </div>
  );
}
