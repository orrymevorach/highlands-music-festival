import Quantity from 'components/checkout/quantity';
import User from 'components/checkout/user';
import Payment from 'components/checkout/payment';
import { useCheckoutContext } from 'context/checkout-context';
import Takeover from 'components/takeover';
import styles from './container.module.scss';
import Loader from 'components/loader/loader';

export default function CheckoutContainer() {
  const { quantity, paymentIntent, isLoading } = useCheckoutContext();
  const isPaymentIntentExpired = paymentIntent?.status === 'canceled';
  if (isLoading) return <Loader centerInContainer />;
  return (
    <div>
      {isPaymentIntentExpired && (
        <Takeover disableClose classNames={styles.takeover}>
          <p>
            Checkout session has expired. <a href="/checkout">Click here</a> to
            start again.
          </p>
        </Takeover>
      )}
      {!quantity && <Quantity />}
      {!!quantity && <User />}
      {paymentIntent && !isPaymentIntentExpired && <Payment />}
    </div>
  );
}
