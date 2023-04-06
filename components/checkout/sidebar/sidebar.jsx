import styles from './sidebar.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import clsx from 'clsx';

const discount = {
  name: 'Early Bird Discount',
  price: 100,
};

const getOrderSummaryLineItems = ({
  quantity,
  ticketPrice,
  subtotal,
  discount,
  total,
}) => [
  {
    label: `${quantity} x General Admission`,
    price: ticketPrice,
  },
  {
    label: discount.name,
    price: discount.price * quantity,
  },
  {
    border: true,
  },
  {
    label: 'Subtotal',
    price: subtotal,
  },
  {
    label: 'HST (13%)',
    price: subtotal * 0.13,
  },
  {
    border: true,
  },
  {
    label: 'Total',
    price: total,
    bold: true,
  },
  {
    label: 'Due Today',
    price: total / 4,
    bold: true,
  },
  {
    label: 'Due May 1*',
    price: total / 4,
  },
  {
    label: 'Due June 1*',
    price: total / 4,
  },
  {
    label: 'Due July 1*',
    price: total / 4,
  },
];

export const formatPrice = number => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(number);
};

export default function Sidebar() {
  const { quantity, paymentIntent } = useCheckoutContext();

  const ticketPrice = Math.round(
    (paymentIntent?.amount / 100 / 1.13) * 4 + discount.price * quantity
  );
  const subtotal = ticketPrice - discount.price * quantity;
  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  const orderSummaryLineItems = getOrderSummaryLineItems({
    quantity,
    ticketPrice,
    subtotal,
    discount,
    total,
  });
  return (
    <div className={clsx(styles.sidebar, styles.bodyCopy)}>
      <div>
        <p className={styles.orderSummary}>Order Summary</p>
        <div className={styles.border}></div>
        {orderSummaryLineItems.map(({ label, price, border, bold }, index) => {
          if (border)
            return (
              <div key={`border-${index}`} className={styles.border}></div>
            );
          return (
            <div key={label} className={clsx(styles.row, bold && styles.bold)}>
              <p>{label}:</p>
              <p>{paymentIntent ? formatPrice(price) : '--'}</p>
            </div>
          );
        })}
        <p className={styles.asterisk}>
          *Future payments will automatically be charged to your credit card
        </p>
      </div>
    </div>
  );
}
