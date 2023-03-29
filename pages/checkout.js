import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from 'components/checkout-form';
import CreateUser from 'components/checkout-form/create-user';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage() {
  const [user, setUser] = useState(null);
  const [paymentIntentResponse, setPaymentIntentResponse] = useState(null);
  useEffect(() => {
    const getPaymentIntent = async () => {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      }).then(res => res.json());

      setPaymentIntentResponse(response);
    };
    if (user && !paymentIntentResponse) {
      getPaymentIntent();
    }
  }, [user, paymentIntentResponse]);

  if (!user) return <CreateUser setUser={setUser} />;

  if (!paymentIntentResponse) return;

  const { paymentIntent } = paymentIntentResponse;

  const options = {
    clientSecret: paymentIntent.client_secret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm paymentIntent={paymentIntent} user={user} />
    </Elements>
  );
}
