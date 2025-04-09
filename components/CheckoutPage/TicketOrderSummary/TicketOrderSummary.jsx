import styles from './TicketOrderSummary.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import OrderSummaryLayout, {
  LineItem,
} from '../../shared/OrderSummaryLayout/OrderSummaryLayout';
import { getInstallmentDate } from '../checkout-utils';
import { useRouter } from 'next/router';

export default function TicketOrderSummary() {
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
    <OrderSummaryLayout tax={tax} subtotal={subtotal} total={total}>
      <LineItem
        label={`${quantity ? `${quantity} x ` : ''} ${productName}`}
        price={ticketPrice}
      />
      {discountName && discountTotal ? (
        <LineItem label={discountName} price={`-${discountTotal}`} isDiscount />
      ) : (
        ''
      )}
      {promoCode && (
        <LineItem
          label={`${promoCode} Promotion x ${quantity}`}
          price={promoAmount ? `-${promoAmount}` : ''}
          isDiscount
        />
      )}

      {!!deposit && (
        <LineItem
          label="Due Today"
          price={deposit}
          isBold
          shouldAddCanadianDollars
        />
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
    </OrderSummaryLayout>
  );
}
