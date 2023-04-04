import { useEffect } from 'react';

export default function useCancelPaymentIntent({ paymentIntent }) {
  useEffect(() => {
    if (!paymentIntent) return;
    const cancelPaymentIntent = async () => {
      await fetch('/api/cancel-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        keepalive: true, // Required to complete request after tab close
        body: JSON.stringify({ paymentIntent }),
      }).then(res => res.json());
    };

    window.addEventListener('beforeunload', cancelPaymentIntent);

    return () => {
      window.removeEventListener('beforeunload', cancelPaymentIntent);
    };
  }, [paymentIntent]);
}
