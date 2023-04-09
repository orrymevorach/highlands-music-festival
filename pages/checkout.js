import React from 'react';
import { CheckoutProvider } from 'context/checkout-context';
import Layout from 'components/checkout/layout';
import Container from 'components/checkout/container';
import { getPriceModel } from 'lib/contentful-lib';

export default function CheckoutPage({ priceModel }) {
  return (
    <CheckoutProvider priceModel={priceModel}>
      <Layout>
        <Container />
      </Layout>
    </CheckoutProvider>
  );
}

export async function getServerSideProps() {
  const priceModel = await getPriceModel();
  return {
    props: {
      priceModel,
    },
  };
}
