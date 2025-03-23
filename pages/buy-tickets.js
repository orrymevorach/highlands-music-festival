import Head from 'components/shared/Head/Head';
import { getFeatureFlags, getPageLoadData } from 'lib/contentful-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';
import { useFacebookPixel } from 'hooks';
import Layout from 'components/shared/Layout/Layout';
import Merch from 'components/BuyTicketsPage/Merch/Merch';
import { getProducts } from 'lib/airtable-lib';
import EmailCaptureForm from 'components/shared/EmailCaptureForm/EmailCaptureForm';
import { useEmailCaptureContext } from 'context/email-capture-context';
// import { getPriceModel } from 'lib/stripe-lib';
// import BuyTickets from 'components/buy-tickets';
import Contact from 'components/BuyTicketsPage/Contact/Contact';

export default function TicketLinks({
  festivalDate,
  showEmailCapture,
  products,
  isTicketSalesOpen,
}) {
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  useFacebookPixel();
  return (
    <>
      <Head title="Buy Tickets" festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        {isTicketSalesOpen ? <Merch products={products} /> : <Contact />}
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.BUY_TICKETS,
  });

  const isTicketSalesOpen = await getFeatureFlags({
    name: FEATURE_FLAGS.TICKET_SALES_OPEN,
  });

  const products = await getProducts();

  return {
    props: {
      ...pageLoadData,
      products,
      isTicketSalesOpen,
    },
  };
}
