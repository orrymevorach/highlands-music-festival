import Head from 'components/shared/Head/Head';
import { getFeatureFlags, getPageLoadData } from 'lib/contentful-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';
import { useFacebookPixel } from 'hooks';
import Layout from 'components/shared/Layout/Layout';
import { getProducts } from 'lib/airtable-lib';
import { useEmailCaptureContext } from 'context/email-capture-context';
import BuyTicketsPage from 'components/BuyTicketsPage/BuyTickets';

export default function BuyTickets({
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
        <BuyTicketsPage
          products={products}
          isTicketSalesOpen={isTicketSalesOpen}
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.BUY_TICKETS,
  });

  const isTicketSalesOpen = await getFeatureFlags({
    name: FEATURE_FLAGS.TICKET_SALES_OPEN,
  });

  const products = await getProducts({ tableId: 'Product Inventory' });

  return {
    props: {
      ...pageLoadData,
      products,
      isTicketSalesOpen,
    },
  };
}
