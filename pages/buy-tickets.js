import Head from 'components/head/head';
import { getFeatureFlags, getPageLoadData } from 'lib/contentful-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';
import { useFacebookPixel } from 'hooks';
import Layout from 'components/layout/layout';
import Merch from 'components/merch/merch';
import { getProducts } from 'lib/airtable-lib';
import EmailCaptureForm from 'components/email-capture-form/email-capture-form';
import { useEmailCaptureContext } from 'context/email-capture-context';
// import { getPriceModel } from 'lib/stripe-lib';
// import BuyTickets from 'components/buy-tickets';
import Contact from 'components/buy-tickets/contact/contact';

export default function TicketLinks({
  festivalDate,
  showEmailCapture,
  products,
  isTicketSalesOpen,
  // priceModel,
}) {
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  useFacebookPixel();
  return (
    <>
      <Head title="Buy Tickets" festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        {/* <BuyTickets priceModel={priceModel} /> */}
        {isTicketSalesOpen ? <Merch products={products} /> : <Contact />}
      </Layout>
    </>
  );
}

export async function getServerSideProps(props) {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.BUY_TICKETS,
  });

  // const productId = props.query.productId;
  // const hasInstallments = props.query.installments;
  // const priceModel = await getPriceModel({ hasInstallments, productId });

  const isTicketSalesOpen = await getFeatureFlags({
    name: FEATURE_FLAGS.TICKET_SALES_OPEN,
  });

  const products = await getProducts();

  return {
    props: {
      ...pageLoadData,
      products,
      isTicketSalesOpen,
      isPagePublished: true,
      // priceModel,
    },
  };
}
