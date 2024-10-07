import { useEffect } from 'react';

const cancelPaymentIntent = async ({ paymentIntent, dispatch, actions }) => {
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

  // Pulver - this is where you can add code to be executed when a checkout session expires

  dispatch({
    type: actions.CANCEL_PAYMENT_INTENT,
    paymentIntent: cancelledPaymentIntent,
  });
};

export default function useCancelPaymentIntent({
  paymentIntent,
  dispatch,
  actions,
}) {
  // Cancel payment intent if user closes tab
  useEffect(() => {
    if (!paymentIntent) return;

    window.addEventListener('unload', () =>
      cancelPaymentIntent({
        paymentIntent,
        dispatch,
        actions,
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
          dispatch,
          actions,
        });
      }, fifteenMinutes);
    }
  }, [paymentIntent]);
}
