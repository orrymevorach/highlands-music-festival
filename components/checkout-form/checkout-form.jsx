import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';

export default function CheckoutForm({ paymentIntent }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Collect $100 payment
    const { error, paymentIntent: paymentResult } = await stripe.confirmPayment(
      {
        elements,
        redirect: 'if_required', // stop redirect on payment success so that we can create a subscription
      }
    );

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    // Create subscription, $100 monthyl payments starting on May 1
    const subscriptionRequestStatus = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: paymentIntent.customer,
      }),
    }).then(res => res.json());

    if (
      paymentResult.status === 'succeeded' &&
      subscriptionRequestStatus === 200
    ) {
      router.push('/order-confirmation');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement clientSecret={paymentIntent.client_secret} />
      <button disabled={!stripe}>Submit</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}
