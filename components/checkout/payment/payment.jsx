import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from 'components/checkout/payment/checkout-form';
import { loadStripe } from '@stripe/stripe-js';
import { useCheckoutContext } from 'context/checkout-context';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Payment() {
  const { paymentIntent } = useCheckoutContext();
  const options = {
    clientSecret: paymentIntent.client_secret,
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
