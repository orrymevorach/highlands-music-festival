import { PRICE_MODEL_IDS } from 'utils/constants';
import { getPriceModel as getPriceModelFromContentful } from './contentful-lib';

export async function getStripeCustomer({ user }) {
  const customerResponse = await fetch('/api/get-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  }).then(res => res.json());
  return customerResponse;
}

export async function createPaymentIntent({ customer, amount, metadata }) {
  const paymentIntent = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customer, amount, metadata }),
  }).then(res => res.json());
  return paymentIntent;
}

export async function createSubscription({
  priceData,
  quantity,
  customerId,
  paymentMethodId,
}) {
  const subscription = await fetch('/api/create-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId,
      quantity,
      priceData,
      paymentMethodId,
    }),
  }).then(res => res.json());
  return subscription;
}

export async function applyPromoCode({
  promoCode,
  customer,
  paymentIntent,
  quantity,
}) {
  const promoCodeData = await fetch('/api/apply-promo-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ promoCode, customer, paymentIntent, quantity }),
  }).then(res => res.json());
  return promoCodeData;
}

export async function applyChampionsPromoCode({
  promoCode,
  customer,
  paymentIntent,
}) {
  const promoCodeData = await fetch('/api/apply-champions-promo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ promoCode, customer, paymentIntent }),
  }).then(res => res.json());
  return promoCodeData;
}

export async function applyFixedPricePromo({ promoCode, paymentIntent }) {
  const promoCodeData = await fetch('/api/apply-fixed-price-promo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ promoCode, paymentIntent }),
  }).then(res => res.json());
  return promoCodeData;
}

export async function getSubscriptionPricingData(priceModel) {
  // const isProduction = process.env.STRIPE_ENV === 'production';
  // const priceModelId = isProduction
  //   ? PRICE_MODEL_IDS.SITE_WIDE
  //   : PRICE_MODEL_IDS.TEST_MODE;

  // const priceModel = await getPriceModelFromContentful({
  //   priceModelId,
  // });

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const price = await stripe.prices.retrieve(priceModel.subscriptionId);
  const priceInDollars = price.unit_amount / 100;

  return {
    firstInstalmentTotalAfterTax: priceInDollars,
    subscriptionInstallmentAmount: priceInDollars,
  };
}
