import React from 'react';
import { CheckoutProvider } from 'context/checkout-context';
import Layout from 'components/checkout/layout';
import Container from 'components/checkout/container';
import { getPageLoadData } from 'lib/contentful-lib';
import { getPriceModel } from 'lib/stripe-lib';
import { PAGE_SLUGS } from 'utils/constants';
import Head from 'components/head';

export default function CheckoutPage({ priceModel }) {
  return (
    <CheckoutProvider priceModel={priceModel}>
      <Head title="Buy Tickets" />
      <Layout>
        <Container />
      </Layout>
    </CheckoutProvider>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.CHECKOUT,
  });
  const { priceModel } = await getPriceModel();

  return {
    props: {
      priceModel,
      ...pageLoadData,
    },
  };
}
