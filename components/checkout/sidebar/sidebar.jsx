import styles from './sidebar.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import clsx from 'clsx';

const price = 500;

const discount = {
  name: 'Early Bird Discount',
  price: 100,
};
const subtotal = price - discount.price;
const tax = subtotal * 0.13;
const total = subtotal + tax;
const dueToday = 100 * 1.13;

export const formatPrice = number => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(number);
};

export default function Sidebar() {
  const { quantity } = useCheckoutContext();
  return (
    <div className={clsx(styles.sidebar, styles.bodyCopy)}>
      <div>
        <p className={styles.orderSummary}>Order Summary</p>
        <div className={styles.border}></div>
        <div className={styles.row}>
          <p>{quantity} x General Admission:</p>
          <p>{formatPrice(price * quantity)}</p>
        </div>
        {discount.price && (
          <div className={styles.row}>
            <p>{discount.name}</p>
            <p>-{formatPrice(discount.price * quantity)}</p>
          </div>
        )}
        <div className={styles.border}></div>
        <div className={styles.row}>
          <p>Subtotal:</p>
          <p>{formatPrice(subtotal * quantity)}</p>
        </div>
        <div className={styles.row}>
          <p>HST (13%):</p>
          <p>{formatPrice(tax * quantity)}</p>
        </div>
        <div className={styles.border}></div>
        <div className={clsx(styles.row, styles.total)}>
          <p>Total:</p>
          <p>{formatPrice(total * quantity)}</p>
        </div>
        <div className={clsx(styles.row, styles.total)}>
          <p>Due Today:</p>
          <p>{formatPrice(dueToday * quantity)}</p>
        </div>
        <div className={clsx(styles.row)}>
          <p>Due May 1*:</p>
          <p>{formatPrice(dueToday * quantity)}</p>
        </div>
        <div className={clsx(styles.row)}>
          <p>Due June 1*:</p>
          <p>{formatPrice(dueToday * quantity)}</p>
        </div>
        <div className={clsx(styles.row)}>
          <p>Due July 1*:</p>
          <p>{formatPrice(dueToday * quantity)}</p>
        </div>
        <p className={styles.asterisk}>
          *Future payments will automatically be charged to your credit card
        </p>
      </div>
    </div>
  );
}
