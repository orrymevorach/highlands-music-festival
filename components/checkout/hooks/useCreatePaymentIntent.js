import { useState, useEffect } from 'react';

export default function useCreatePaymentIntent({
  customer,
  quantity,
  initialPaymentAmount,
}) {
  const [paymentIntent, setPaymentIntent] = useState(null);
  useEffect(() => {
    const createPaymentIntent = async () => {
      const paymentIntentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customer, quantity, initialPaymentAmount }),
      }).then(res => res.json());

      setPaymentIntent(paymentIntentResponse);
    };
    if (customer && !paymentIntent) {
      createPaymentIntent();
    }
  }, [customer, paymentIntent, quantity]);
  return paymentIntent;
}
