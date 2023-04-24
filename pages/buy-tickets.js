import Head from 'components/head';
import { EmailCaptureProvider } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';
import BuyTickets from 'components/buy-tickets';

export default function BuyTicketsPage() {
  return (
    <EmailCaptureProvider>
      <Head />
      <BuyTickets />
    </EmailCaptureProvider>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.BUY_TICKETS,
  });
  return {
    props: {
      ...pageLoadData,
    },
  };
}
