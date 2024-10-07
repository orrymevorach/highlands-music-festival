import Link from 'next/link';
import styles from './legal.module.scss';
export default function Legal() {
  return (
    <div className={styles.container}>
      <p>
        <Link href="/policies" target="_blank" className={styles.underline}>
          Click here
        </Link>{' '}
        to read our ticket policies
      </p>
      <p>
        Questions? Email us at <span>info@highlandsmusicfestival.ca</span>
      </p>
    </div>
  );
}
