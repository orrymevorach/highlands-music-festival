import React from 'react';
import { CheckoutProvider } from 'context/checkout-context';
import Layout from 'components/checkout/layout';
import Container from 'components/checkout/container';
import { getPageLoadData } from 'lib/contentful-lib';
import { getPriceModel } from 'lib/stripe-lib';
import { PAGE_SLUGS } from 'utils/constants';
import Head from 'components/head';
import Legal from 'components/checkout/legal';
import { useWindowSize } from 'hooks';

export default function CheckoutPage({ priceModel }) {
  const { isMobile } = useWindowSize();
  return (
    <CheckoutProvider priceModel={priceModel}>
      <Head title="Checkout" />
      <Layout>
        <Container />
        {!isMobile && <Legal />}
      </Layout>
      {isMobile && <Legal />}
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
