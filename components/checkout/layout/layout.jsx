import styles from './layout.module.scss';
import Sidebar from '../sidebar';

export default function Layout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.left}>
        <p className={styles.highlands}>Highlands Music Festival</p>
        {children}
      </div>
      <div className={styles.right}>
        <Sidebar />
      </div>
    </div>
  );
}
