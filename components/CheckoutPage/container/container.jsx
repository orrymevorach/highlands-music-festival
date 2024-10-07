import Quantity from 'components/CheckoutPage/quantity/quantity';
import UserForm from 'components/CheckoutPage/user/user-form/user-form';
import Payment from 'components/CheckoutPage/payment/payment';
import { useCheckoutContext } from 'context/checkout-context';
import Takeover from 'components/shared/Takeover/Takeover';
import styles from './container.module.scss';
import Loader from 'components/shared/Loader/Loader';
import PromoCodeForm from 'components/CheckoutPage/promo-code/promo-code-form/promo-code-form';
import UserDetails from 'components/CheckoutPage/user/user-details/user-details';
import PromoCodeSuccess from 'components/CheckoutPage/promo-code/promo-code-success/promo-code-success';

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
          {/* {!promoCode && <PromoCodeForm />} */}
          {promoCode && <PromoCodeSuccess />}
          <Payment />
        </>
      )}
    </div>
  );
}
