import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useCheckoutContext } from 'context/checkout-context';
import { createSubscription } from 'lib/stripe-lib';
import { ErrorMessage } from 'components/checkout/checkout-shared-components';
import Button from 'components/shared/button';
import { addTicketToAirtable } from 'lib/airtable-lib';
import { sendCabinReservationEmail, sendConfirmationEmail } from 'lib/mailgun';
import { sendSlackNotification } from 'lib/slack-lib';

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { priceData, quantity, paymentIntent, customer, promoCode } =
    useCheckoutContext();
  const [successfulPaymentIntentId, setSuccessfulPaymentIntentId] =
    useState(null);

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
      setIsLoading(false);
      setErrorMessage(error.message);
      return;
    }

    // Create subscription
    const subscriptionResponse = await createSubscription({
      priceData,
      quantity,
      customerId: paymentIntent.customer,
      paymentMethodId: paymentResult.payment_method,
    });

    const name = customer.name;
    const email = customer.email.toLowerCase();

    const airtableResponse = await addTicketToAirtable({
      amount: paymentResult.amount / 100,
      paymentIntentId: paymentResult.id,
      name,
      emailAddress: email,
      discountCode: promoCode,
      fullTicketPrice: parseFloat(priceData.total),
    });

    // TEMPORARILY REMOVING FOR SUPER EARLY BIRD
    // const mailgunResponse = await sendCabinReservationEmail({
    //   paymentIntentId: paymentResult.id,
    //   emailAddress: customer.email,
    // });

    const isAirtableSuccessful = airtableResponse.isSuccess;

    if (
      paymentResult.status === 'succeeded' &&
      subscriptionResponse === 200 &&
      isAirtableSuccessful
    ) {
      const mailgunConfirmationEmailResponse = await sendConfirmationEmail({
        emailAddress: email,
      });
      if (process.env.NODE_ENV === 'production') {
        try {
          const slackNotificationResponse = await sendSlackNotification({
            name,
            email,
            discountCode: promoCode,
          });
        } catch (error) {
          console.log(error);
        }
      }
      setSuccessfulPaymentIntentId(paymentResult.id);
    }
  };

  // To ensure that re-direct happens after order confirmation email is triggered
  useEffect(() => {
    if (successfulPaymentIntentId) {
      setIsLoading(false);
      window.location = `/order-confirmation?payment_intent=${successfulPaymentIntentId}`;
    }
  }, [successfulPaymentIntentId]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        style={{ display: 'none' }}
        value={paymentIntent.receipt_email}
        readOnly
      />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <PaymentElement clientSecret={paymentIntent.client_secret} />
      <Button isDisabled={!stripe} isLoading={isLoading}>
        Pay Now
      </Button>
    </form>
  );
}
