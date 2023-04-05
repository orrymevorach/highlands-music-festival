import styles from './sidebar.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import clsx from 'clsx';

const discount = {
  name: 'Early Bird Discount',
  price: 100,
};

export const formatPrice = number => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(number);
};

export default function Sidebar() {
  const { quantity, paymentIntent } = useCheckoutContext();

  const amountToDisplay = paymentIntent?.amount || 0;
  const amountToDiscount = paymentIntent?.amount
    ? discount.price * quantity
    : 0;

  const ticketPrice = Math.round(
    (amountToDisplay / 100 / 1.13) * 4 + amountToDiscount
  );
  const subtotal = ticketPrice - amountToDiscount;
  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  const dueToday = total / 4;
  return (
    <div className={clsx(styles.sidebar, styles.bodyCopy)}>
      <div>
        <p className={styles.orderSummary}>Order Summary</p>
        <div className={styles.border}></div>
        <div className={styles.row}>
          <p>{quantity} x General Admission:</p>
          <p>{formatPrice(ticketPrice)}</p>
        </div>
        {discount.price && (
          <div className={styles.row}>
            <p>{discount.name}</p>
            <p>-{formatPrice(amountToDiscount)}</p>
          </div>
        )}
        <div className={styles.border}></div>
        <div className={styles.row}>
          <p>Subtotal:</p>
          <p>{formatPrice(subtotal)}</p>
        </div>
        <div className={styles.row}>
          <p>HST (13%):</p>
          <p>{formatPrice(tax)}</p>
        </div>
        <div className={styles.border}></div>
        <div className={clsx(styles.row, styles.total)}>
          <p>Total:</p>
          <p>{formatPrice(total)}</p>
        </div>
        <div className={clsx(styles.row, styles.total)}>
          <p>Due Today:</p>
          <p>{formatPrice(dueToday)}</p>
        </div>
        <div className={clsx(styles.row)}>
          <p>Due May 1*:</p>
          <p>{formatPrice(dueToday)}</p>
        </div>
        <div className={clsx(styles.row)}>
          <p>Due June 1*:</p>
          <p>{formatPrice(dueToday)}</p>
        </div>
        <div className={clsx(styles.row)}>
          <p>Due July 1*:</p>
          <p>{formatPrice(dueToday)}</p>
        </div>
        <p className={styles.asterisk}>
          *Future payments will automatically be charged to your credit card
        </p>
      </div>
    </div>
  );
}
