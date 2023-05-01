import Button from 'components/shared/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './pricing-container.module.scss';

const inclusions = [
  'Access to 20 concerts over the course of the weekend',
  'All meals and snacks starting from Thursday dinner to Sunday brunch',
  'Your own bed',
  'A shared cabin with up to 12 people',
  'Access to all camp activites',
];

const availableForPurchase = ['Alcohol', 'Merch', 'More to come!'];

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

const List = ({ listItems = [], subheading }) => {
  return (
    <>
      {subheading && <p className={styles.pricingSubheading}>{subheading}</p>}
      <ul className={styles.detailsContainer}>
        {listItems.map(detail => {
          return (
            <li key={detail} className={styles.detail}>
              <FontAwesomeIcon icon={faCheck} className={styles.checkMark} />{' '}
              <p>{detail}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default function PricingContainer({
  buttonText,
  query,
  details = [],
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

      <List listItems={details} />
      <List
        listItems={inclusions}
        subheading="Included in the price of your ticket:"
      />
      <List
        listItems={availableForPurchase}
        subheading="Available for purchase"
      />
    </div>
  );
}
