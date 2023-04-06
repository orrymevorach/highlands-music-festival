import Quantity from 'components/checkout/quantity';
import User from 'components/checkout/user';
import Payment from 'components/checkout/payment';
import { useCheckoutContext } from 'context/checkout-context';

export default function CheckoutContainer() {
  const { quantity, paymentIntent } = useCheckoutContext();
  return (
    <div>
      {!quantity && <Quantity />}
      {!!quantity && <User />}
      {paymentIntent && <Payment />}
    </div>
  );
}
