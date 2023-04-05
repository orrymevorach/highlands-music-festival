import React, { useEffect, useState } from 'react';
import styles from './payment.module.scss';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from 'components/checkout/payment/checkout-form';
import { loadStripe } from '@stripe/stripe-js';
import { useCheckoutContext } from 'context/checkout-context';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Payment() {
  const { paymentIntent, user, quantity } = useCheckoutContext();
  if (!paymentIntent) return;
  const options = {
    clientSecret: paymentIntent.client_secret,
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm
          paymentIntent={paymentIntent}
          user={user}
          quantity={quantity}
        />
      </Elements>
    </div>
  );
}
