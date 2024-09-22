import React from 'react';
import { CheckoutProvider } from 'context/checkout-context';
import Layout from 'components/checkout/layout';
import Container from 'components/checkout/container';
import { getPageLoadData } from 'lib/contentful-lib';
import { getSubscriptionPricingData } from 'lib/stripe-lib';
import { PAGE_SLUGS } from 'utils/constants';
import Head from 'components/head';
import Legal from 'components/checkout/legal';
import { useWindowSize } from 'hooks';
import { useFacebookPixel } from 'hooks';
import { getProduct } from 'lib/airtable-lib';

export default function CheckoutPage({ priceModel, festivalDate }) {
  useFacebookPixel();
  const { isMobile } = useWindowSize();

  return (
    <CheckoutProvider priceModel={priceModel}>
      <Head title="Checkout" festivalDate={festivalDate} />
      <Layout>
        <Container />
        {!isMobile && <Legal />}
      </Layout>
      {isMobile && <Legal />}
    </CheckoutProvider>
  );
}

export async function getServerSideProps(props) {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.CHECKOUT,
  });

  const generalAdmissionTicketProductId = 'rec24ualnEOrvcd6T';
  const productId = props.query.productId || generalAdmissionTicketProductId;
  const productData = await getProduct({ recordId: productId });

  if (!props.query.installments || props.query.installments !== 'true') {
    return {
      props: {
        priceModel: productData,
        ...pageLoadData,
      },
    };
  }
  const subscriptionPricingData = await getSubscriptionPricingData(productData);

  return {
    props: {
      priceModel: {
        ...productData,
        ...subscriptionPricingData,
      },
      ...pageLoadData,
    },
  };
}
