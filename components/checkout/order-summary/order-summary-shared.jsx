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

export const LineItem = ({ label, price, isBold, className }) => {
  return (
    <div className={clsx(styles.row, isBold && styles.bold, className)}>
      <p>{label}:</p>
      <p>{price ? formatPrice(price) : '--'}</p>
    </div>
  );
};
