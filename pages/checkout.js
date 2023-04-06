import React from 'react';
import { CheckoutProvider } from 'context/checkout-context';
import Layout from 'components/checkout/layout';
import Container from 'components/checkout/container';

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <Layout>
        <Container />
      </Layout>
    </CheckoutProvider>
  );
}
