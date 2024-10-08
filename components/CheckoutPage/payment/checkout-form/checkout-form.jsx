import React, { useState, useEffect } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useCheckoutContext } from 'context/checkout-context';
import { createSubscription } from 'lib/stripe-lib';
import { ErrorMessage } from 'components/CheckoutPage/checkout-shared-components';
import Button from 'components/shared/Button/Button';
import { createRecord, updateRecord } from 'lib/airtable-lib';
import { sendCabinReservationEmail, sendConfirmationEmail } from 'lib/mailgun';
import { sendSlackNotification } from 'lib/slack-lib';

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    priceData,
    quantity,
    paymentIntent,
    customer,
    promoCode,
    vendorName,
    vendorSecondGuest,
    paymentType,
  } = useCheckoutContext();

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

    const { response: airtableResponse } = await createRecord({
      tableId: 'Ticket Purchases',
      newFields: {
        amount: paymentResult.amount / 100,
        paymentIntent: paymentResult.id,
        Name: name,
        'Email Address': email,
        discountCode: promoCode,
        'Full Ticket Price': parseFloat(priceData.total),
        Status:
          process.env.NODE_ENV === 'production'
            ? 'Ticket Purchased'
            : 'Testing',
        'Vendor Name': vendorName,
        'Vendor Second Guest': vendorSecondGuest,
        Cabin: priceData.cabin?.length ? [priceData.cabin[0]] : null,
      },
    });

    // If a cabin is purchased, update cabin status to sold. If it is a ticket, leave statas as is
    if (priceData.cabin?.length) {
      await updateRecord({
        tableId: 'Product Inventory',
        recordId: priceData.id,
        newFields: { Status: 'Sold' },
      });
    }

    const isAirtableSuccessful = airtableResponse.id;

    if (
      paymentResult.status === 'succeeded' &&
      subscriptionResponse === 200 &&
      isAirtableSuccessful
    ) {
      const mailgunConfirmationEmailResponse = await sendConfirmationEmail({
        emailAddress: email,
      });
      // const mailgunResponse = await sendCabinReservationEmail({
      //   paymentIntentId: paymentResult.id,
      //   emailAddress: email,
      // });

      try {
        // Slack Notification
        const slackNotificationResponse = await sendSlackNotification({
          name,
          email,
          discountCode: promoCode,
          cabinRecordId: priceData.cabin?.length ? priceData.cabin[0] : '',
        });
      } catch (error) {
        console.error('Slack Notification Failed:', error);
      }

      if (process.env.NODE_ENV === 'production') {
        // Facebook Pixel Tracking
        try {
          const isSubscription =
            paymentType &&
            paymentType === 'subscription' &&
            !!priceData?.subscriptionInstallmentAmount;

          fbq('track', 'Purchase', {
            installments: isSubscription,
            promoCode,
          });
        } catch (error) {
          console.error('Facebook Pixel Tracking Failed:', error);
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
