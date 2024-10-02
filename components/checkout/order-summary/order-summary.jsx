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
      name: productName,
      deposit = '',
    },
    promoCode,
    paymentType,
  } = useCheckoutContext();

  const numberOfSubscriptionIterationsAsArray = Array.from(
    Array(numberOfSubscriptionIterations)
  );

  const isSubscription =
    paymentType &&
    paymentType === 'subscription' &&
    !!subscriptionInstallmentAmount;

  return (
    <div className={clsx(styles.orderSummary, styles.bodyCopy)}>
      <div>
        <p className={styles.title}>Order Summary</p>
        <Border />
        <LineItem
          label={`${quantity ? `${quantity} x ` : ''} ${productName}`}
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
          <LineItem
            label={`${promoCode} Promotion x ${quantity}`}
            price={promoAmount ? `-${promoAmount}` : ''}
            className={styles.discount}
          />
        )}
        <Border />
        <LineItem label="Subtotal" price={subtotal} />
        <LineItem label="HST (13%)" price={tax} />
        <Border />
        <LineItem label="Total" price={total} isBold shouldAddCanadianDollars />
        {!!deposit && (
          <>
            <LineItem
              label="Due Today"
              price={deposit}
              isBold
              shouldAddCanadianDollars
            />

            <p className={styles.asterisk}>
              *Future payments will be available as single payments or broken
              down as multiple installments. The Highands team will follow up to
              discuss options at a later date.
            </p>
          </>
        )}
        {isSubscription && (
          <LineItem
            label="Due Today"
            price={firstInstalmentTotalAfterTax}
            isBold
            shouldAddCanadianDollars
          />
        )}
        {isSubscription &&
          numberOfSubscriptionIterationsAsArray.map((_, index) => {
            const month = getMonth({ subscriptionStartDate, iteration: index });
            return (
              <LineItem
                key={month}
                label={`Due ${month} 1*`}
                price={subscriptionInstallmentAmount}
                shouldAddCanadianDollars
              />
            );
          })}
        {isSubscription && numberOfSubscriptionIterations !== 0 ? (
          <p className={styles.asterisk}>
            *Future payments will automatically be charged to your credit card
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
