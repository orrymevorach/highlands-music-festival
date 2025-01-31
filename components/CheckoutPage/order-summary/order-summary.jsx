import styles from './order-summary.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import clsx from 'clsx';
import { Border, LineItem } from './order-summary-shared';
import { getInstallmentDate } from '../checkout-utils';
import { useRouter } from 'next/router';

export default function OrderSummary() {
  const {
    quantity,
    priceData: {
      discountName,
      discountTotal,
      ticketPrice,
      subtotal,
      total,
      tax,
      promoAmount,
      name: productName,
      deposit = '',
    },
    subscriptionData: {
      subscriptionInstallmentAmount,
      numberOfSubscriptionIterations,
    },
    promoCode,
  } = useCheckoutContext();

  const numberOfSubscriptionIterationsAsArray = Array.from(
    Array(numberOfSubscriptionIterations)
  );

  const router = useRouter();
  const isSubscription = router.query.installments === 'true';

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
        {tax && (
          <>
            <Border />
            <LineItem label="Subtotal" price={subtotal} />
            <LineItem label="HST (13%)" price={tax} />
          </>
        )}
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

            {/* <p className={styles.asterisk}>
              *Future payments will be available as single payments or broken
              down as multiple installments. The Highands team will follow up to
              discuss options at a later date.
            </p> */}
          </>
        )}
        {isSubscription && (
          <LineItem
            label="Due Today"
            price={subscriptionInstallmentAmount}
            isBold
            shouldAddCanadianDollars
          />
        )}
        {isSubscription &&
          numberOfSubscriptionIterationsAsArray.map((_, index) => {
            if (index === 0) return; // Skip the first installment, it's already displayed above as "Due Today"
            const { month, day, year } = getInstallmentDate({
              iteration: index,
            });
            return (
              <LineItem
                key={month}
                label={`Due ${month} ${day}`}
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
