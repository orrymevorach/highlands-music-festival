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
        {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
          }}
        >
          <h1
            style={{
              fontFamily: 'Neue Haas Regular',
              fontSize: '34px',
              textAlign: 'center',
              padding: '0 25px',
            }}
          >
            2025 Ticket Information Coming Soon...
          </h1>
        </div> */}
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
