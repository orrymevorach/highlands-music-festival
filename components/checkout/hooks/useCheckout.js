import { useState } from 'react';
import {
  useCancelPaymentIntent,
  useCreatePaymentIntent,
  useGetStripeCustomer,
} from 'components/checkout/hooks';

export default function useCheckout({ priceModel }) {
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [quantity, setQuantity] = useState('');

  const customer = useGetStripeCustomer({ user });
  useCreatePaymentIntent({
    customer,
    quantity,
    paymentIntent,
    setPaymentIntent,
    priceModel,
  });
  useCancelPaymentIntent({ paymentIntent, setPaymentIntent });
  return {
    user,
    setUser,
    customer,
    paymentIntent,
    quantity,
    setQuantity,
    priceModel,
  };
}
