import { useState } from 'react';
import {
  useCancelPaymentIntent,
  useCreatePaymentIntent,
  useGetStripeCustomer,
} from 'components/checkout/hooks';

export default function useCheckout({ priceModel }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [quantity, setQuantity] = useState('');

  const customer = useGetStripeCustomer({ user });
  const paymentIntent = useCreatePaymentIntent({
    customer,
    quantity,
    initialPaymentAmount: priceModel.initialPaymentAmount,
  });
  useCancelPaymentIntent({ paymentIntent });
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
