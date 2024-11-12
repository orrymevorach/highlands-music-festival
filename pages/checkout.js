import React from 'react';
import { CheckoutProvider } from 'context/checkout-context';
import Layout from 'components/CheckoutPage/layout/layout';
import Container from 'components/CheckoutPage/container/container';
import { getPageLoadData } from 'lib/contentful-lib';
import { getPriceModel } from 'lib/stripe-lib';
import { PAGE_SLUGS } from 'utils/constants';
import Head from 'components/shared/Head/Head';
import Legal from 'components/CheckoutPage/legal/legal';
import { useWindowSize } from 'hooks';
import { useFacebookPixel } from 'hooks';
import { getProduct } from 'lib/airtable-lib';

export default function CheckoutPage({ priceModel, festivalDate, product }) {
  useFacebookPixel();
  const { isMobile } = useWindowSize();

  return (
    <CheckoutProvider priceModel={priceModel} product={product}>
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

  const productId = props.query.productId;
  const hasInstallments = props.query.installments;

  const priceModel = await getPriceModel({ hasInstallments, productId });
  const product = await getProduct({ recordId: productId });

  return {
    props: {
      priceModel,
      product,
      ...pageLoadData,
    },
  };
}
