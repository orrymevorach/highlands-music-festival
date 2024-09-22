import Link from 'next/link';
import styles from './card.module.scss';
import { amountToDollar } from 'utils/utils';
import clsx from 'clsx';

export default function Card({ product }) {
  const { name, price, deposit } = product;

  const priceInDollars = amountToDollar(price);
  const dueTodayInDollars = deposit !== 0 ? amountToDollar(deposit) : '';

  return (
    <>
      <Link
        className={styles.card}
        key={name}
        href={`/checkout?productId=${product.productID}&installments=false`}
      >
        <div className={clsx(styles.row, styles.topRow)}>
          <p>{name}</p>
          <p>{priceInDollars}</p>
        </div>

        {dueTodayInDollars && (
          <p className={styles.due}>Due Today: {dueTodayInDollars}</p>
        )}
      </Link>
    </>
  );
}
