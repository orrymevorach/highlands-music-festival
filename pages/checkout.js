import Stripe from 'stripe';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from 'components/checkout-form';
import { parseCookies, setCookie } from 'nookies';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutPage({ paymentIntent, customerId }) {
  const options = {
    clientSecret: paymentIntent.client_secret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm paymentIntent={paymentIntent} customerId={customerId} />
    </Elements>
  );
}

export const getServerSideProps = async ctx => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let paymentIntent;

  const { paymentIntentId } = await parseCookies(ctx);

  if (paymentIntentId) {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      props: {
        paymentIntent,
        customerId: paymentIntent.customer,
      },
    };
  }
  const customer = await stripe.customers.create();
  paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    setup_future_usage: 'off_session',
    amount: 10000,
    currency: 'cad',
    automatic_payment_methods: {
      enabled: true,
    },
    payment_method_options: {
      card: {
        setup_future_usage: 'off_session',
      },
    },
  });
  setCookie(ctx, 'paymentIntentId', paymentIntent.id);

  return {
    props: {
      paymentIntent,
      customerId: customer.id,
    },
  };
};
