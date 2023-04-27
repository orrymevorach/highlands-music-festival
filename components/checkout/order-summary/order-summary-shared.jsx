import styles from './order-summary.module.scss';
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
}) => {
  if (price) {
    price = formatPrice(price);
  }
  if (price && shouldAddCanadianDollars) {
    price = addCanadianDollars(price);
  }
  return (
    <div className={clsx(styles.row, isBold && styles.bold, className)}>
      <p>{label}:</p>
      <p>{price || '--'}</p>
    </div>
  );
};
