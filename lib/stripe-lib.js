import { getProduct } from './airtable-lib';

export async function getStripeCustomer({ user }) {
  const customerResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/get-customer`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    }
  ).then(res => res.json());
  return customerResponse;
}

export async function createPaymentIntent({ customer, amount, metadata }) {
  const paymentIntent = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/create-payment-intent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer, amount, metadata }),
    }
  ).then(res => res.json());
  return paymentIntent;
}

export async function createSetupIntent({ customer }) {
  const paymentIntent = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/create-setup-intent`,
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
  subscriptionData,
  customerId,
  paymentMethodId,
}) {
  const subscription = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/create-subscription`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        subscriptionData,
        paymentMethodId,
      }),
    }
  ).then(res => res.json());
  return subscription;
}

export async function applyPromoCode({
  promoCode,
  customer,
  paymentIntent,
  quantity,
}) {
  const promoCodeData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/apply-promo-code`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promoCode, customer, paymentIntent, quantity }),
    }
  ).then(res => res.json());
  return promoCodeData;
}

export async function applyChampionsPromoCode({
  promoCode,
  customer,
  paymentIntent,
}) {
  const promoCodeData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/apply-champions-promo`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promoCode, customer, paymentIntent }),
    }
  ).then(res => res.json());
  return promoCodeData;
}

export async function applyFixedPricePromo({ promoCode, paymentIntent }) {
  const promoCodeData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/apply-fixed-price-promo`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promoCode, paymentIntent }),
    }
  ).then(res => res.json());
  return promoCodeData;
}

export async function getPriceModel({ productId }) {
  const generalAdmissionTicketProductId = 'recUPn1IyKMbsGyFp';
  const productID = productId || generalAdmissionTicketProductId;
  const productData = await getProduct({ recordId: productID });
  return productData;
}
