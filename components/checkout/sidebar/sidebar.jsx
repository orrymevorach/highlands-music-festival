import styles from './sidebar.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import clsx from 'clsx';

const mapIndexToMonth = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};
const getMonth = ({ subscriptionStartDate, iteration = 0 }) => {
  const [_, monthIndex] = subscriptionStartDate.split('-');
  return mapIndexToMonth[parseInt(monthIndex) + iteration];
};

const getOrderSummaryLineItems = ({
  quantity,
  ticketPrice,
  subtotal,
  discount,
  total,
  subscriptionStartDate,
}) => [
  {
    label: `${quantity ? `${quantity} x ` : ''}General Admission`,
    price: ticketPrice,
  },
  {
    className: styles.discount,
    label: discount.name ? discount.name : null,
    price: discount.price ? `-${discount.price * quantity}` : '',
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
    label: `Due ${getMonth({ subscriptionStartDate })} 1*`,
    price: total / 4,
  },
  {
    label: `Due ${getMonth({ subscriptionStartDate, iteration: 1 })} 1*`,
    price: total / 4,
  },
  {
    label: `Due ${getMonth({ subscriptionStartDate, iteration: 2 })} 1*`,
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
    priceModel: {
      discountName,
      discountAmount,
      initialPaymentAmount,
      subscriptionStartDate,
    },
  } = useCheckoutContext();

  const amount = paymentIntent
    ? paymentIntent.amount / 100 / 1.13
    : initialPaymentAmount * quantity;

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
    subscriptionStartDate,
  });
  return (
    <div className={clsx(styles.sidebar, styles.bodyCopy)}>
      <div>
        <p className={styles.orderSummary}>Order Summary</p>
        <div className={styles.border}></div>
        {orderSummaryLineItems.map(
          ({ label, price, border, bold, className }, index) => {
            if (border)
              return (
                <div key={`border-${index}`} className={styles.border}></div>
              );
            if (!label) return;
            return (
              <div
                key={label}
                className={clsx(styles.row, bold && styles.bold, className)}
              >
                <p>{label}:</p>
                <p>{quantity ? formatPrice(price) : '--'}</p>
              </div>
            );
          }
        )}
        <p className={styles.asterisk}>
          *Future payments will automatically be charged to your credit card
        </p>
      </div>
    </div>
  );
}
