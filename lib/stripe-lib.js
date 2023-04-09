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

export async function createPaymentIntent({ customer, quantity, priceData }) {
  const paymentIntent = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customer, quantity, priceData }),
  }).then(res => res.json());
  return paymentIntent;
}

export async function createSubscription({
  paymentIntent,
  quantity,
  priceData,
}) {
  const subscription = await fetch('/api/create-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId: paymentIntent.customer,
      quantity,
      priceData,
    }),
  }).then(res => res.json());
  return subscription;
}
