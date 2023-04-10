import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useCheckoutContext } from 'context/checkout-context';
import { createSubscription } from 'lib/stripe-lib';
import {
  ErrorMessage,
  SubmitButton,
} from 'components/checkout/checkout-shared-components';

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { priceData, quantity, paymentIntent } = useCheckoutContext();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

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
    const subscriptionResponse = await createSubscription({
      paymentIntent,
      priceData,
      quantity,
    });

    if (paymentResult.status === 'succeeded' && subscriptionResponse === 200) {
      setIsLoading(false);
      window.location = `/order-confirmation?payment_intent=${paymentResult.id}`;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <PaymentElement clientSecret={paymentIntent.client_secret} />
      <SubmitButton isDisabled={!stripe} isLoading={isLoading}>
        Pay Now
      </SubmitButton>
    </form>
  );
}
