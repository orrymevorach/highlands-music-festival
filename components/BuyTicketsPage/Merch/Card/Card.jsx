import Link from 'next/link';
import styles from './Card.module.scss';
import { amountToDollar } from 'utils/utils';
import Button from 'components/shared/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faShoppingCart,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

export default function Card({ product, isSold = false, isInCart = false }) {
  const {
    name,
    price,
    deposit,
    discountAmountPerUnit,
    description,
    href,
    handleAddToCart: addToCart,
    handleRemoveFromCart: removeFromCart,
    isLoading,
    allowRemoveFromCart,
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

  const isLink = href && !isSold;
  const Element = isLink ? Link : 'div';

  const handleAddToCart = () => {
    if (isSold || !addToCart) return;
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product);
  };

  return (
    <Element
      className={styles.card}
      key={name}
      href={isLink ? href : undefined}
    >
      <div className={styles.row}>
        <div className={styles.left}>
          <p className={styles.name}>
            {name} {isSold && <span className={styles.sold}>Sold Out</span>}
          </p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.right}>
          <div className={styles.topRowRightContainer}>
            {!!discountAmountPerUnit && (
              <p className={styles.strikethrough}>{priceInDollars}</p>
            )}
            <p>{numberToShow}</p>
            {!isInCart && addToCart && (
              <Button
                isLoading={isLoading}
                classNames={styles.addToCartButton}
                handleClick={handleAddToCart}
                isDarkBeige
                isSmall
              >
                Add to Cart <FontAwesomeIcon icon={faShoppingCart} size="sm" />
              </Button>
            )}
            {isInCart && (
              <div>
                {allowRemoveFromCart !== 'False' && (
                  <button
                    onClick={handleRemoveFromCart}
                    className={styles.removeFromCartButton}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
                <Button
                  isLoading={isLoading}
                  classNames={styles.addToCartButton}
                  isSmall
                >
                  Item Added <FontAwesomeIcon icon={faCheckCircle} size="sm" />
                </Button>
              </div>
            )}
          </div>
          {dueTodayInDollars && !isSold && (
            <div>
              <p className={styles.due}>Due Today: {dueTodayInDollars}</p>
            </div>
          )}
        </div>
      </div>
    </Element>
  );
}
