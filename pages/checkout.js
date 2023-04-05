import React from 'react';
import User from 'components/checkout/user';
import Payment from 'components/checkout/payment';
import { CheckoutProvider } from 'context/checkout-context';
import Layout from 'components/checkout/layout';
import Quantity from 'components/checkout/quantity';

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <Layout>
        <Quantity />
        <User />
        <Payment />
      </Layout>
    </CheckoutProvider>
  );
}
