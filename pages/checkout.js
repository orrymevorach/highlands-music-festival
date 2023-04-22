import React from 'react';
import { CheckoutProvider } from 'context/checkout-context';
import Layout from 'components/checkout/layout';
import Container from 'components/checkout/container';
import { getPriceModel, getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS, PRICE_MODEL_AUDIENCES } from 'utils/constants';
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
  const priceModel = await getPriceModel({
    audience: PRICE_MODEL_AUDIENCES.SITE_WIDE,
  });
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.CHECKOUT,
  });
  return {
    props: {
      priceModel,
      ...pageLoadData,
    },
  };
}
