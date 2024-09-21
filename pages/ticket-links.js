import Head from 'components/head';
import { useEmailCaptureContext } from 'context/email-capture-context';
import { getPageLoadData } from 'lib/contentful-lib';
import { PAGE_SLUGS } from 'utils/constants';
import { useFacebookPixel } from 'hooks';
import Layout from 'components/layout';

export default function Index({ festivalDate }) {
  useFacebookPixel();
  return (
    <>
      <Head festivalDate={festivalDate} />
      <Layout hideHeaderMargin festivalDate={festivalDate}>
        <div
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
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const pageLoadData = await getPageLoadData({
    url: PAGE_SLUGS.TICKET_LINKS,
  });

  return {
    props: {
      ...pageLoadData,
    },
  };
}
