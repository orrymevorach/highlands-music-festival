import OrderConfirmation from 'components/order-confirmation';

export default function CommitteePage({ customer, orderDetails }) {
  return <OrderConfirmation customer={customer} orderDetails={orderDetails} />;
}

export const getServerSideProps = async context => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const { payment_intent } = context.query;
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
  const customer = await stripe.customers.retrieve(paymentIntent.customer);
  return {
    props: {
      customer,
      orderDetails: {
        status: paymentIntent.status,
        ...paymentIntent.metadata,
      },
    },
  };
};
