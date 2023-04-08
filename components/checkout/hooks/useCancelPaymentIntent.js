import { useEffect } from 'react';

const cancelPaymentIntent = async ({ paymentIntent, setPaymentIntent }) => {
  const isPaymentIntentExpired = paymentIntent?.status === 'canceled';
  if (isPaymentIntentExpired || !paymentIntent) return;
  const cancelledPaymentIntent = await fetch('/api/cancel-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    keepalive: true, // Required to complete request after tab close
    body: JSON.stringify({ paymentIntent }),
  }).then(res => res.json());
  setPaymentIntent(cancelledPaymentIntent);
};

export default function useCancelPaymentIntent({
  paymentIntent,
  setPaymentIntent,
}) {
  // Cancel payment intent if user closes tab
  useEffect(() => {
    if (!paymentIntent) return;

    window.addEventListener('unload', () =>
      cancelPaymentIntent({
        paymentIntent,
        setPaymentIntent,
      })
    );

    return () => {
      window.removeEventListener('unload', () => cancelPaymentIntent({}));
    };
  }, [paymentIntent]);

  // Cancel payment intent after fifteen minutes
  useEffect(() => {
    const isPaymentIntentExpired = paymentIntent?.status === 'canceled';
    if (paymentIntent && !isPaymentIntentExpired) {
      const fifteenMinutes = 900000;
      setTimeout(() => {
        cancelPaymentIntent({
          paymentIntent,
          setPaymentIntent,
        });
      }, fifteenMinutes);
    }
  }, [paymentIntent]);
}
