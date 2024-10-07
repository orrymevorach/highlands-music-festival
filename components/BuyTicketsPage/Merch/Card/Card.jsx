import Link from 'next/link';
import styles from './Card.module.scss';
import { amountToDollar } from 'utils/utils';
import clsx from 'clsx';

export default function Card({ product, isSold = false }) {
  const {
    name,
    price,
    deposit,
    discountAmountPerUnit,
    description,
    subscriptionId,
  } = product;

  const priceInDollars = amountToDollar(price);
  const dueTodayInDollars = deposit !== 0 ? amountToDollar(deposit) : '';
  const discountAmountPerUnitInDollars =
    discountAmountPerUnit !== 0
      ? amountToDollar(price - discountAmountPerUnit)
      : '';

  const numberToShow = !!discountAmountPerUnit
    ? discountAmountPerUnitInDollars
    : priceInDollars;

  const hasInstallments = !!subscriptionId;

  const Element = isSold ? 'div' : Link;

  return (
    <>
      <Element
        className={styles.card}
        key={name}
        href={`/checkout?productId=${product.productID}&installments=${hasInstallments}`}
      >
        <div className={clsx(styles.row, styles.topRow)}>
          <p>
            {name} {isSold && <span className={styles.sold}>Sold</span>}
          </p>
          {!isSold && (
            <div>
              {!!discountAmountPerUnit && (
                <p className={styles.strikethrough}>{priceInDollars}</p>
              )}
              <p>{numberToShow}</p>
            </div>
          )}
        </div>

        <div className={styles.bottomRow}>
          {description && <p className={styles.description}>{description}</p>}
          {dueTodayInDollars && !isSold && (
            <div>
              <p className={styles.due}>Due Today: {dueTodayInDollars}</p>
            </div>
          )}
        </div>
      </Element>
    </>
  );
}
