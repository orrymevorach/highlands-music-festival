import Link from 'next/link';
import styles from './Card.module.scss';
import { amountToDollar } from 'utils/utils';
import clsx from 'clsx';

export default function Card({ product, isSold = false, isInCart = false }) {
  const {
    name,
    price,
    deposit,
    discountAmountPerUnit,
    description,
    href,
    handleClick,
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

  const Element = isSold ? 'div' : href ? Link : 'button';

  const props = {
    href: !isSold && href ? href : undefined,
    onClick: !isSold && handleClick ? () => handleClick(product) : undefined,
  };

  return (
    <Element className={styles.card} key={name} {...props}>
      <div className={clsx(styles.row, styles.topRow)}>
        <p>
          {name} {isSold && <span className={styles.sold}>Sold Out</span>}
        </p>
        <div className={styles.topRowRightContainer}>
          {!!discountAmountPerUnit && (
            <p className={styles.strikethrough}>{priceInDollars}</p>
          )}
          <p>{numberToShow}</p>
          {isInCart && (
            <div>
              <p className={styles.addedToCart}>Added to cart!</p>
            </div>
          )}
        </div>
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
  );
}
