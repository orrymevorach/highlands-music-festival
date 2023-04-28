import { useCheckoutContext } from 'context/checkout-context';
import styles from './user-details.module.scss';

export default function UserDetails() {
  const { customer } = useCheckoutContext();
  return (
    <div className={styles.userDetails}>
      <p className={styles.contactInformation}>Guest Information:</p>
      <p className={styles.name}>
        <span className={styles.left}>Name:</span>
        <span className={styles.right}>{customer.name}</span>
      </p>
      <p className={styles.email}>
        <span className={styles.left}>Email:</span>
        <span className={styles.right}>{customer.email}</span>
      </p>
    </div>
  );
}
