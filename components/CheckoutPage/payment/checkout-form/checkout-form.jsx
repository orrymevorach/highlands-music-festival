import React, { useState } from 'react';
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
import { useRouter } from 'next/router';
import { createTemporaryPassword } from 'components/CheckoutPage/checkout-utils';

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    priceData,
    subscriptionData,
    paymentIntent,
    customer,
    promoCode,
    vendorName,
    vendorSecondGuest,
  } = useCheckoutContext();
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    let paymentResponse;
    const hasSubscription = router.query.installments === 'true';
    if (hasSubscription) {
      // Create a payment method
      const { setupIntent, error: setupError } = await stripe.confirmSetup({
        elements,
        redirect: 'if_required',
      });

      if (setupError) {
        setErrorMessage(setupError.message);
        setIsLoading(false);
        return;
      }
      // Create subscription
      paymentResponse = await createSubscription({
        subscriptionData,
        customerId: customer.id,
        paymentMethodId: setupIntent.payment_method,
      });
    } else {
      const response = await stripe.confirmPayment({
        elements,
        redirect: 'if_required', // stop redirect on payment success so that we can create a subscription
      });
      paymentResponse = response.error ? response : response.paymentIntent;
    }

    if (paymentResponse.error) {
      setIsLoading(false);
      setErrorMessage(paymentResponse.error.message);
      return;
    }

    const name = customer.name;
    const email = customer.email.toLowerCase();

    const amount = hasSubscription
      ? subscriptionData.subscriptionInstallmentAmount
      : paymentResponse.amount / 100;

    const password = createTemporaryPassword(paymentResponse.id);

    const isPurchasingCabin = priceData.cabin?.length;
    const ticketStatus = isPurchasingCabin
      ? 'Cabin Purchased'
      : 'Ticket Purchased';

    const { response: airtableResponse } = await createRecord({
      tableId: 'Ticket Purchases',
      newFields: {
        amount,
        'Temporary Password': password,
        Name: name,
        'Email Address': email,
        discountCode: promoCode,
        'Full Ticket Price': parseFloat(priceData.total),
        Status:
          process.env.NODE_ENV === 'production' ? ticketStatus : 'Testing',
        'Vendor Name': vendorName,
        'Vendor Second Guest': vendorSecondGuest,
        Cabin: isPurchasingCabin ? [priceData.cabin[0]] : null,
      },
    });

    // If a cabin is purchased:
    // 1. Update Inventory - cabin status to sold
    // 2. Update Cabin - cabin availability to price, and total beds to 24 so user can fill cabin
    if (isPurchasingCabin) {
      await updateRecord({
        tableId: 'Product Inventory',
        recordId: priceData.id,
        newFields: { Status: 'Sold' },
      });
      await updateRecord({
        tableId: 'Cabins',
        recordId: priceData.cabin[0],
        newFields: {
          Availability: 'Private',
        },
      });
    }

    const isAirtableSuccessful = airtableResponse.id;

    if (isAirtableSuccessful) {
      const mailgunConfirmationEmailResponse = await sendConfirmationEmail({
        emailAddress: email,
      });
      // const mailgunResponse = await sendCabinReservationEmail({
      //   temporaryPassword: password,
      //   emailAddress: email,
      // });

      try {
        // Slack Notification
        const slackNotificationResponse = await sendSlackNotification({
          name,
          email,
          discountCode: promoCode,
          cabinRecordId: isPurchasingCabin ? priceData.cabin[0] : '',
        });
      } catch (error) {
        console.error('Slack Notification Failed:', error);
      }

      if (process.env.NODE_ENV === 'production') {
        // Facebook Pixel Tracking
        try {
          fbq('track', 'Purchase', {
            installments: hasSubscription,
            promoCode,
          });
        } catch (error) {
          console.error('Facebook Pixel Tracking Failed:', error);
        }
      }
      setIsLoading(false);
      window.location = `/order-confirmation?id=${airtableResponse.id}`;
    }
  };

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
