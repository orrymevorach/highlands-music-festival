import Head from 'components/head';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';
import { useFacebookPixel } from 'hooks';
import Layout from 'components/layout';
import Merch from 'components/merch/merch';
import { getProducts } from 'lib/airtable-lib';

export default function TicketLinks({ festivalDate, products }) {
  useFacebookPixel();
  return (
    <>
      <Head festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        <Merch products={products} />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.TICKET_LINKS,
  });

  const products = await getProducts();

  return {
    props: {
      ...pageLoadData,
      products,
    },
  };
}
