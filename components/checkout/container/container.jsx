import Quantity from 'components/checkout/quantity';
import UserForm from 'components/checkout/user/user-form';
import Payment from 'components/checkout/payment';
import { useCheckoutContext } from 'context/checkout-context';
import Takeover from 'components/takeover';
import styles from './container.module.scss';
import Loader from 'components/loader/loader';
import PromoCodeForm from 'components/checkout/promo-code/promo-code-form';
import UserDetails from 'components/checkout/user/user-details';
import PromoCodeSuccess from 'components/checkout/promo-code/promo-code-success';

export default function CheckoutContainer() {
  const { quantity, paymentIntent, isLoading, promoCode, customer } =
    useCheckoutContext();
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
      {!!quantity && !customer ? <UserForm /> : ''}
      {customer && <UserDetails />}

      {paymentIntent && !isPaymentIntentExpired && (
        <>
          {!promoCode && <PromoCodeForm />}
          {promoCode && <PromoCodeSuccess />}
          <Payment />
        </>
      )}
    </div>
  );
}
