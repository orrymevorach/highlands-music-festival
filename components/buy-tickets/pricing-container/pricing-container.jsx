import Button from 'components/shared/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './pricing-container.module.scss';

const Price = ({ ticketPrice, strikethroughPrice, discountText }) => {
  const hasDiscount = !!strikethroughPrice;
  return (
    <div>
      {strikethroughPrice && (
        <p className={clsx(styles.price, styles.discount)}>
          <FontAwesomeIcon icon={faDollarSign} className={styles.dollar} />
          {strikethroughPrice} CAD
        </p>
      )}
      <p className={clsx(styles.price, !hasDiscount && styles.regularPrice)}>
        <FontAwesomeIcon icon={faDollarSign} className={styles.dollar} />
        {ticketPrice} CAD
      </p>
      {discountText && <p className={styles.discountName}>{discountText}</p>}
    </div>
  );
};

export default function PricingContainer({
  buttonText,
  query,
  details,
  pricing,
}) {
  const { ticketPrice, discountName, subtotal } = pricing;
  const priceToShow = discountName ? subtotal : ticketPrice;
  const strikethroughPrice = discountName ? ticketPrice : null;
  return (
    <div className={styles.pricingContainer}>
      <Button
        href={{ pathname: '/checkout', query }}
        classNames={styles.button}
      >
        {buttonText}
      </Button>
      <Price
        ticketPrice={priceToShow}
        strikethroughPrice={strikethroughPrice}
        discountText={discountName}
      />
      <ul className={styles.detailsContainer}>
        {details.map(detail => {
          return (
            <li key={detail}>
              <p>
                <FontAwesomeIcon icon={faCheck} className={styles.checkMark} />{' '}
                {detail}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
