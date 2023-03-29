import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import Router, { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';

export default function CheckoutForm({ paymentIntent, customerId }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent: paymentResult } = await stripe.confirmPayment(
      {
        elements,
        redirect: 'if_required',
      }
    );

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const res = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        customerId,
      }),
    }).then(res => res.json());
    console.log('res', res);
    console.log('status', paymentResult.status);
    if (paymentResult.status === 'succeeded' && res === 200) {
      destroyCookie(null, 'paymentIntentId');
      router.push('/order-confirmation');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <AddressElement options={{ mode: 'billing' }} /> */}

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <PaymentElement clientSecret={paymentIntent.client_secret} />
      <button disabled={!stripe}>Submit</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}
