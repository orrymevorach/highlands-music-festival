import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import styles from './checkout-form.module.scss';
import { useCheckoutContext } from 'context/checkout-context';

export default function CheckoutForm({ paymentIntent, quantity }) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { priceModel } = useCheckoutContext();

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
        quantity,
        priceModel,
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
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <PaymentElement clientSecret={paymentIntent.client_secret} />
      <button className={styles.payNow} disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
}
