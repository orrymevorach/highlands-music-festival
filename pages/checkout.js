import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from 'components/checkout-form';
import CreateUser from 'components/checkout-form/create-user';
import {
  useCancelPaymentIntent,
  useCreatePaymentIntent,
  useGetStripeCustomer,
} from 'components/checkout-form/hooks';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const [orderDetails, setOrderDetails] = useState({
    user: {
      name: '',
      email: '',
    },
    quantity: '',
  });

  const customer = useGetStripeCustomer({ user: orderDetails.user });
  const paymentIntent = useCreatePaymentIntent({
    customer,
    quantity: orderDetails.quantity,
  });
  useCancelPaymentIntent({ paymentIntent });

  if (!orderDetails.user.name)
    return <CreateUser setOrderDetails={setOrderDetails} />;

  if (!paymentIntent) return;

  const options = {
    clientSecret: paymentIntent.client_secret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        paymentIntent={paymentIntent}
        user={orderDetails.user}
        quantity={orderDetails.quantity}
      />
    </Elements>
  );
}
