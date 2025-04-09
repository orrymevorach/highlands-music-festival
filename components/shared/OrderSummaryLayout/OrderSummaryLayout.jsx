import styles from './OrderSummaryLayout.module.scss';
import clsx from 'clsx';

export const Border = () => {
  return <div className={styles.border}></div>;
};

export const formatPrice = number => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(number);
};

const addCanadianDollars = price => `${price} CAD`;

export const LineItem = ({
  label,
  price,
  isBold,
  className,
  shouldAddCanadianDollars,
  isDiscount,
}) => {
  if (price) {
    price = formatPrice(price);
  }
  if (price && shouldAddCanadianDollars) {
    price = addCanadianDollars(price);
  }
  return (
    <div
      className={clsx(
        styles.row,
        isBold && styles.bold,
        isDiscount && styles.discount,
        className
      )}
    >
      <p>{label}:</p>
      <p>{price || '--'}</p>
    </div>
  );
};

export default function OrderSummaryLayout({
  children,
  tax,
  subtotal,
  total,
  classNames = {},
}) {
  return (
    <div className={clsx(styles.orderSummary, styles.bodyCopy, classNames)}>
      <p className={styles.title}>Order Summary</p>
      <Border />
      {children}
      {tax && (
        <>
          <Border />
          <LineItem label="Subtotal" price={subtotal} />
          <LineItem label="HST (13%)" price={tax} />
        </>
      )}
      <Border />
      <LineItem label="Total" price={total} isBold shouldAddCanadianDollars />
    </div>
  );
}
