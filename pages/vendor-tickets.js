import Head from 'components/shared/Head/Head';
import { getFeatureFlags, getPageLoadData } from 'lib/contentful-lib';
import { FEATURE_FLAGS, PAGE_SLUGS } from 'utils/constants';
import { useFacebookPixel } from 'hooks';
import Layout from 'components/shared/Layout/Layout';
import { getProducts } from 'lib/airtable-lib';
import { useEmailCaptureContext } from 'context/email-capture-context';
import VendorTicketsPage from 'components/VendorTicketsPage/VendorTickets';

export default function VendorTickets({
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
        <VendorTicketsPage
          products={products}
          isTicketSalesOpen={isTicketSalesOpen}
        />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.VENDOR_TICKETS,
  });

  const isTicketSalesOpen = await getFeatureFlags({
    name: FEATURE_FLAGS.TICKET_SALES_OPEN,
  });

  const products = await getProducts({ tableId: 'Vendor Ticket Options' });

  return {
    props: {
      ...pageLoadData,
      products,
      isTicketSalesOpen,
    },
  };
}
