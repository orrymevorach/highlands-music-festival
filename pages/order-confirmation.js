import OrderConfirmation from 'components/order-confirmation';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';
import Head from 'components/head/head';
import { useFacebookPixel } from 'hooks';

export default function CommitteePage({
  customer,
  orderDetails,
  festivalDate,
}) {
  useFacebookPixel();
  return (
    <>
      <Head title="Order Confirmed!" festivalDate={festivalDate} />
      <OrderConfirmation customer={customer} orderDetails={orderDetails} />
    </>
  );
}

export const getServerSideProps = async context => {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.ORDER_CONFIRMATION,
  });

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const { payment_intent } = context.query;
  const getPaymentIntent = async () => {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        payment_intent
      );
      return paymentIntent;
    } catch (error) {
      console.log(error);
    }
  };

  const paymentIntent = await getPaymentIntent();
  if (!paymentIntent) {
    return {
      props: {},
    };
  }
  const customer = await stripe.customers.retrieve(paymentIntent?.customer);
  return {
    props: {
      customer,
      orderDetails: {
        status: paymentIntent.status,
      },
      ...pageLoadData,
    },
  };
};
