import { useCheckoutContext } from 'context/checkout-context';
import styles from './user-details.module.scss';

export default function UserDetails() {
  const { customer, vendorName, vendorSecondGuest } = useCheckoutContext();
  return (
    <div className={styles.userDetails}>
      <p className={styles.bold}>Guest Information:</p>
      <p>
        <span className={styles.left}>Name:</span>
        <span>{customer.name}</span>
      </p>
      <p>
        <span className={styles.left}>Email:</span>
        <span>{customer.email}</span>
      </p>
      {vendorName && (
        <div className={styles.vendorContainer}>
          <p className={styles.bold}>Vendor Information:</p>
          <p>
            <span className={styles.left}>Business Name:</span>
            <span>{vendorName}</span>
          </p>
          {vendorSecondGuest && (
            <p>
              <span className={styles.left}>Second Guest:</span>
              <span>{vendorSecondGuest}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
