import styles from './sidebar.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import clsx from 'clsx';

const getOrderSummaryLineItems = ({
  quantity,
  ticketPrice,
  subtotal,
  discount,
  total,
}) => [
  {
    label: `${quantity ? `${quantity} x ` : ''}General Admission`,
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
  const {
    quantity,
    paymentIntent,
    priceModel: { discountName, discountAmount, initialPaymentAmount },
  } = useCheckoutContext();

  const amount = paymentIntent
    ? paymentIntent.amount / 100 / 1.13
    : initialPaymentAmount;

  const ticketPrice = Math.round(amount * 4 + discountAmount * quantity);
  const subtotal = ticketPrice - discountAmount * quantity;
  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  const orderSummaryLineItems = getOrderSummaryLineItems({
    quantity,
    ticketPrice,
    subtotal,
    discount: {
      name: discountName,
      price: discountAmount,
    },
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
          if (!price) return;
          return (
            <div key={label} className={clsx(styles.row, bold && styles.bold)}>
              <p>{label}:</p>
              <p>{quantity ? formatPrice(price) : '--'}</p>
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
