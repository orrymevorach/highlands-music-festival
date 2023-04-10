import styles from './order-summary.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import clsx from 'clsx';
import { Border, LineItem } from './order-summary-shared';
import { getMonth } from '../checkout-utils';

export default function OrderSummary() {
  const {
    quantity,
    priceData: {
      discountName,
      discountTotal,
      subscriptionStartDate,
      ticketPrice,
      subtotal,
      total,
      tax,
      subscriptionInstallmentAmount,
      numberOfSubscriptionIterations,
      promoAmount,
      firstInstalmentTotalAfterTax,
    },
    promoCode,
  } = useCheckoutContext();

  const numberOfSubscriptionIterationsAsArray = Array.from(
    Array(numberOfSubscriptionIterations)
  );
  return (
    <div className={clsx(styles.orderSummary, styles.bodyCopy)}>
      <div>
        <p className={styles.title}>Order Summary</p>
        <Border />
        <LineItem
          label={`${quantity ? `${quantity} x ` : ''}General Admission`}
          price={ticketPrice}
        />
        {discountName && discountTotal ? (
          <LineItem
            label={discountName}
            price={`-${discountTotal}`}
            className={styles.discount}
          />
        ) : (
          ''
        )}
        {promoCode && (
          <>
            <LineItem
              label={`${promoCode} Promotion`}
              price={`-${promoAmount}`}
              className={styles.discount}
            />
            <p className={styles.promoSubtext}>(Applied to first instalment)</p>
          </>
        )}
        <Border />
        <LineItem label="Subtotal" price={subtotal} />
        <LineItem label="HST (13%)" price={tax} />
        <Border />
        <LineItem label="Total" price={total} isBold />
        <LineItem
          label="Due Today"
          price={firstInstalmentTotalAfterTax}
          isBold
        />
        {numberOfSubscriptionIterationsAsArray.map((_, index) => {
          const month = getMonth({ subscriptionStartDate, iteration: index });
          return (
            <LineItem
              key={month}
              label={`Due ${month} 1*`}
              price={subscriptionInstallmentAmount}
            />
          );
        })}
        <p className={styles.asterisk}>
          *Future payments will automatically be charged to your credit card
        </p>
      </div>
    </div>
  );
}
