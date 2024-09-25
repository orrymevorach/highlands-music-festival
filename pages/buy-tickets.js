import Head from 'components/head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';
import BuyTickets from 'components/buy-tickets';
import { getPriceModel } from 'lib/stripe-lib';
import { useFacebookPixel } from 'hooks';
import Layout from 'components/layout/layout';

export default function BuyTicketsPage({
  priceModel,
  showEmailCapture,
  festivalDate,
}) {
  return;
  useFacebookPixel();
  const { setShowEmailCapture } = useEmailCaptureContext();
  setShowEmailCapture(showEmailCapture);
  return (
    <>
      <Head title="Buy Tickets" festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        <BuyTickets priceModel={priceModel} />
      </Layout>
    </>
  );
}

// export async function getStaticProps() {
//   const pageLoadData = await getPageLoadData({
//     url: PAGE_SLUGS.BUY_TICKETS,
//   });
//   const { priceModel } = await getPriceModel();
//   return {
//     props: {
//       ...pageLoadData,
//       priceModel,
//     },
//   };
// }
