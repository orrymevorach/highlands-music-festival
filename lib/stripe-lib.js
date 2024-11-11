import { getProduct } from './airtable-lib';

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

export async function createSetupIntent({ customer }) {
  const paymentIntent = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/create-setup-intent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer }),
    }
  ).then(res => res.json());
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
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const subscriptionId =
    process.env.STRIPE_ENV === 'staging'
      ? priceModel['subscriptionId(TestMode)']
      : priceModel.subscriptionId;
  if (!subscriptionId) return {};
  const price = await stripe.prices.retrieve(subscriptionId);
  const priceInDollars = price.unit_amount / 100;

  return {
    subscriptionInstallmentAmount: priceInDollars,
    subscriptionId,
  };
}

export async function getPriceModel({ hasInstallments = false, productId }) {
  const generalAdmissionTicketProductId = 'recBmH3q6rEd9juwi';
  const productID = productId || generalAdmissionTicketProductId;
  const productData = await getProduct({ recordId: productID });

  if (!hasInstallments || hasInstallments !== 'true') return productData;

  const subscriptionPricingData = await getSubscriptionPricingData(productData);

  return {
    ...productData,
    ...subscriptionPricingData,
  };
}
