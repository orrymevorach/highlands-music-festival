import Quantity from 'components/checkout/quantity';
import User from 'components/checkout/user';
import Payment from 'components/checkout/payment';
import { useCheckoutContext } from 'context/checkout-context';
import Takeover from 'components/takeover';
import styles from './container.module.scss';

export default function CheckoutContainer() {
  const { quantity, paymentIntent } = useCheckoutContext();
  const isPaymentIntentExpired = paymentIntent?.status === 'canceled';
  return (
    <div>
      {isPaymentIntentExpired && (
        <Takeover disableClose classNames={styles.takeover}>
          <p>
            Checkout session has expired. Click <a href="/checkout">here</a> to
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
