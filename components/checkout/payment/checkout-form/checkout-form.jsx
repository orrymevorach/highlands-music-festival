import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import styles from './checkout-form.module.scss';
import { useCheckoutContext } from 'context/checkout-context';
import { createSubscription } from 'lib/stripe-lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { priceModel, quantity, paymentIntent } = useCheckoutContext();

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
      priceModel,
      quantity,
    });

    if (paymentResult.status === 'succeeded' && subscriptionResponse === 200) {
      setIsLoading(false);
      window.location = `/order-confirmation?payment_intent=${paymentResult.id}`;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      <PaymentElement clientSecret={paymentIntent.client_secret} />
      <button className={styles.payNow} disabled={!stripe}>
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} className={styles.spinnerIcon} />
        ) : (
          'Pay Now'
        )}
      </button>
    </form>
  );
}
