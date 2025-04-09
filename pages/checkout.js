import React from 'react';
import { CheckoutProvider } from 'context/checkout-context';
import Layout from 'components/CheckoutPage/layout/layout';
import Container from 'components/CheckoutPage/container/container';
import { getFeatureFlags, getPageLoadData } from 'lib/contentful-lib';
import { getPriceModel } from 'lib/stripe-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';
import Head from 'components/shared/Head/Head';
import Legal from 'components/CheckoutPage/legal/legal';
import { useWindowSize } from 'hooks';
import { useFacebookPixel } from 'hooks';
import nookies from 'nookies';
import { getRecordById } from 'lib/airtable-lib';

export default function CheckoutPage({
  priceModel,
  festivalDate,
  enablePromoCodeFeatureFlag,
}) {
  useFacebookPixel();
  const { isMobile } = useWindowSize();

  return (
    <CheckoutProvider priceModel={priceModel}>
      <Head title="Checkout" festivalDate={festivalDate} />
      <Layout>
        <Container enablePromoCodeFeatureFlag={enablePromoCodeFeatureFlag} />
        {!isMobile && <Legal />}
      </Layout>
      {isMobile && <Legal />}
    </CheckoutProvider>
  );
}

export async function getServerSideProps(context) {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.CHECKOUT,
  });

  const enablePromoCodeFeatureFlag = await getFeatureFlags({
    name: FEATURE_FLAGS.ENABLE_PROMO_CODE,
  });

  const productId = context.query.productId;
  const hasInstallments = context.query.installments;

  const cookies = nookies.get(context);
  const cartId = cookies.cartId;

  if (cartId) {
    const { record: cart } = await getRecordById({
      tableId: 'Carts',
      recordId: cartId,
    });
    const priceModel = {
      price: cart.subtotal,
      name: cart.name,
    };
    return {
      props: {
        priceModel,
        enablePromoCodeFeatureFlag: false,
        ...pageLoadData,
      },
    };
  }

  // Allowing people to pay their remaining balances on cabins, but keeping GA ticket sales closed
  // if (!productId) {
  //   return {
  //     props: {
  //       ...pageLoadData,
  //       isPagePublished: false,
  //     },
  //   };
  // }

  const priceModel = await getPriceModel({ hasInstallments, productId });

  return {
    props: {
      priceModel,
      enablePromoCodeFeatureFlag,
      ...pageLoadData,
    },
  };
}
